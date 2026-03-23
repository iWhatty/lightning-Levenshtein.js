// bench/packages/render-readme-table.js

import fs from "fs";
import path from "path";

const IN_FILE = path.resolve("bench/packages/results.json");
const OUT_FILE = path.resolve("bench/packages/README-benchmark.md");

const data = JSON.parse(fs.readFileSync(IN_FILE, "utf8"));
const lengths = data.meta.lengths;

const targetNames = Object.keys(data.results[lengths[0]]);

const fmt = (n) => {
  if (n >= 1000) return Number(n.toFixed(0)).toString();
  if (n >= 100) return n.toFixed(1);
  if (n >= 10) return n.toFixed(2);
  return n.toFixed(3);
};

const lines = [];

lines.push("## Benchmark");
lines.push("");
lines.push(
  `I generated ${data.meta.pairs} pairs of strings with length N. I measured the throughput each library achieved across the same dataset. Higher is better.`
);
lines.push("");
lines.push(
  `Reported values are median ops/ms across ${data.meta.seeds.length} seeds.`
);
lines.push("");

lines.push(
  `| Test Target | ${lengths.map((n) => `N=${n}`).join(" | ")} |`
);
lines.push(
  `|---|${lengths.map(() => "---:").join("|")}|`
);

for (const name of targetNames) {
  const row = lengths.map((len) =>
    fmt(data.results[len][name].meanOpsPerMs)
  );
  lines.push(`| ${name} | ${row.join(" | ")} |`);
}

lines.push("");

const fastestName = "lightning-levenshtein-v2";
lines.push("## Relative Performance");
lines.push("");
lines.push(
  `This chart shows how many times faster ${fastestName} is than the second-fastest package at each tested length.`
);
lines.push("");

fs.writeFileSync(OUT_FILE, lines.join("\n"), "utf8");

console.log(`✅ Wrote ${OUT_FILE}`);