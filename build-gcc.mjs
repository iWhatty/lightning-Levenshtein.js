// ./build-gcc.js


import { unlinkSync } from 'fs';
import { execSync } from 'child_process';
import { resolve } from 'path';
import { readFileSync, writeFileSync, existsSync } from 'fs';


const srcDir = resolve('./src/');
const distDir = resolve('./dist/');

const entryFile = resolve(srcDir, 'index.js');
const externsFile = resolve("./", 'externs.js');

const closureFile = resolve(distDir, 'lightning-Levenshtein.min.js');
const tempWrappedFile = resolve(srcDir, 'index_temp.js');

// Ensure externs file exists
if (!existsSync(externsFile)) {
  writeFileSync(externsFile, '/** @externs */\n');
}

// Inject global exports safely
const base = readFileSync(entryFile, 'utf8');
const globalExport = `
if (typeof globalThis !== 'undefined') {
  globalThis['distance'] = distance;
  globalThis['distanceMax'] = distanceMax;
  globalThis['closest'] = closest;
}
`;
writeFileSync(tempWrappedFile, base + globalExport);


// ✅ IMPORTANT: No backslashes, no stdin redirection
const cmd = [
  'npx',
  'google-closure-compiler',
  // '--module_resolution=node',
  `--js="${srcDir}"/**.js`,
  `--entry_point="${tempWrappedFile}"`,
  // `--js="${bundleFile}"`,
  // `--js="${tempWrappedFile}"`,
  `--externs="${externsFile}"`,
  '--language_in=ECMASCRIPT_NEXT',
  '--language_out=ECMASCRIPT_NEXT',
  '--compilation_level=ADVANCED',
  '--assume_function_wrapper',
  '--warning_level=VERBOSE',
  `--js_output_file="${closureFile}"`,
  '--rewrite_polyfills=false', // prevent unexpected polyfill insertions`

  "--dependency_mode=PRUNE",
  "--module_resolution=node",
  // "--formatting=PRETTY_PRINT",


].join(' ');

console.log('🔒 Running Closure Compiler (ADVANCED)...');
try {
  execSync(cmd, { stdio: 'pipe' });
} catch (err) {
  console.error('❌ Closure Compiler failed:\n');
  console.error(err.stdout?.toString() || '');
  console.error(err.stderr?.toString() || '');
  throw err;
}



console.log('🧹 Replacing globalThis export with ESM export...');
const closureCode = readFileSync(closureFile, 'utf8');

// Match and capture globalThis exports
let fixedCode = closureCode.replace(
  /"undefined"!==typeof globalThis&&\(\s*globalThis\.distance=([a-zA-Z_$][\w$]*),\s*globalThis\.distanceMax=([a-zA-Z_$][\w$]*),\s*globalThis\.closest=([a-zA-Z_$][\w$]*)\);?/,
  '\nexport {$1 as distance, $2 as distanceMax, $3 as closest};'
);


// Inserts "use strict"
fixedCode = addUseStrict(fixedCode);
writeFileSync(closureFile, fixedCode);




console.log(`✅ Output written to: ${closureFile}`);


// 🧼 Cleanup: remove temporary index file
try {
  unlinkSync(tempWrappedFile);
  console.log('🗑️  Cleaned up temporary file: index_temp.js');
} catch (err) {
  console.warn('⚠️  Failed to remove temporary file:', err.message);
}




/**
 * Inserts "use strict"; below a shebang (if present) or at the top of JS code.
 * @param {string} code - JavaScript source code.
 * @returns {string} - Code with "use strict"; properly inserted.
 */
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
