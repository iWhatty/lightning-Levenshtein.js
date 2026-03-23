// ./build-gcc.mjs
"use strict";

import {
  mkdirSync,
  unlinkSync,
  readFileSync,
  writeFileSync,
  existsSync
} from "fs";
import { execSync } from "child_process";
import { resolve } from "path";

const srcDir = resolve("./src/");
const distDir = resolve("./dist/");

const entryFile = resolve(srcDir, "index.js");
const externsFile = resolve("./", "externs.js");

const closureFile = resolve(distDir, "lightning-levenshtein.min.js");
const tempWrappedFile = resolve(srcDir, "index_temp.js");

mkdirSync(distDir, { recursive: true });

// Ensure externs file exists
if (!existsSync(externsFile)) {
  writeFileSync(externsFile, "/** @externs */\n");
}

// Inject global exports safely so Closure preserves them
const base = readFileSync(entryFile, "utf8");
const globalExport = `
if (typeof globalThis !== 'undefined') {
  globalThis['distance'] = distance;
  globalThis['distanceMax'] = distanceMax;
  globalThis['closest'] = closest;
}
`;
writeFileSync(tempWrappedFile, base + globalExport);

const cmd = [
  "npx",
  "google-closure-compiler",
  `--js="${srcDir}/*.js"`,
  `--entry_point="${tempWrappedFile}"`,
  `--externs="${externsFile}"`,
  "--language_in=ECMASCRIPT_NEXT",
  "--language_out=ECMASCRIPT_NEXT",
  "--compilation_level=ADVANCED",
  "--assume_function_wrapper",
  "--warning_level=VERBOSE",
  `--js_output_file="${closureFile}"`,
  "--rewrite_polyfills=false",
  "--dependency_mode=PRUNE",
  "--module_resolution=NODE"
].join(" ");

console.log("Running Closure Compiler...");
try {
  execSync(cmd, { stdio: "pipe" });
} catch (err) {
  console.error("Closure Compiler failed:\n");
  console.error(err.stdout?.toString() || "");
  console.error(err.stderr?.toString() || "");
  throw err;
}

console.log("Rewriting preserved global exports to ESM export...");
const closureCode = readFileSync(closureFile, "utf8");

let fixedCode = closureCode.replace(
  /"undefined"!==typeof globalThis&&\(\s*globalThis\.distance=([a-zA-Z_$][\w$]*),\s*globalThis\.distanceMax=([a-zA-Z_$][\w$]*),\s*globalThis\.closest=([a-zA-Z_$][\w$]*)\);?/,
  "\nexport {$1 as distance, $2 as distanceMax, $3 as closest};"
);

fixedCode = addUseStrict(fixedCode);
writeFileSync(closureFile, fixedCode);

console.log(`Output written to: ${closureFile}`);

try {
  unlinkSync(tempWrappedFile);
  console.log("Cleaned up temporary file: index_temp.js");
} catch (err) {
  console.warn("Failed to remove temporary file:", err.message);
}

function addUseStrict(code) {
  const strictRegex = /^\s*["']use strict["'];?/;
  if (strictRegex.test(code)) return code;

  const shebangMatch = code.match(/^#!.*\n/);
  if (shebangMatch) {
    const [shebang] = shebangMatch;
    return shebang + `"use strict";\n` + code.slice(shebang.length);
  }

  return `"use strict";\n` + code;
}