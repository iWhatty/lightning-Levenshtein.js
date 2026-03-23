// codegen\tools\generateMyers32-A.cjs

const fs = require('fs');
const path = require('path');

const out = [];
out.push('// Auto-generated: Optimized Myers 32-bit variants with fixed A.length');
out.push('// Source: codegen/tools/generateMyers32-A.cjs');
out.push('const peq = new Uint32Array(65536);');
out.push('export const myers_table = [];');

for (let n = 1; n <= 32; n++) {
  const lastMask = 1 << (n - 1);

  out.push('');
  out.push(`function myers_${n}(a, b) {`);
  out.push(`  const m = b.length;`);
  out.push(`  let mv = 0;`);
  out.push(`  let pv = -1;`);
  out.push(`  let sc = ${n};`);
  out.push(`  const lastMask = ${lastMask};`);

  // Setup peq (fixed A-length unrolled)
  for (let i = 0; i < n; i++) {
    out.push(`  peq[a.charCodeAt(${i})] |= ${1 << i};`);
  }

  // Main loop using v4 kernel
  out.push(`  for (let i = 0; i < m; i++) {`);
  out.push(`    const bCode = b.charCodeAt(i);`);
  out.push(`    const eq = peq[bCode];`);
  out.push(`    const xv = eq | mv;`);
  out.push(`    const eqv = eq | (((eq & pv) + pv) ^ pv);`);
  out.push(`    const nh = ~(eqv | pv);`);
  out.push(`    const ph = mv | nh;`);
  out.push(`    const mh = pv & eqv;`);
  out.push(`    const phLst = ph & lastMask;`);
  out.push(`    const mhLst = mh & lastMask;`);
  out.push(`    sc += (phLst !== 0) - (mhLst !== 0);`);
  out.push(`    const newMv = (ph << 1) | 1;`);
  out.push(`    const newPv = (mh << 1) | ~(xv | newMv);`);
  out.push(`    pv = newPv;`);
  out.push(`    mv = newMv & xv;`);
  out.push(`  }`);

  // Cleanup peq
  for (let i = 0; i < n; i++) {
    out.push(`  peq[a.charCodeAt(${i})] = 0;`);
  }

  out.push(`  return sc;`);
  out.push(`}`);
  out.push(`myers_table[${n}] = myers_${n};`);
}

// Dispatcher
out.push('');
out.push('export function myers32_unrolledA(a, b) {');
out.push('  const fn = myers_table[a.length];');
out.push('  return fn ? fn(a, b) : null;');
out.push('}');
out.push('');

const outputPath = path.resolve(__dirname, '..', 'artifacts', 'myers32-unrolledA.js');

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, out.join('\n'), 'utf8');

console.log(`✅ Generated ${outputPath}`);