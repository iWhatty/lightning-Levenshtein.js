

// codegen\tools\generateMyers32-B.cjs

// Optimized Myers 32-bit variants (unrolled for fixed b.length)
const fs = require('fs');
const path = require('path');

const out = [];
out.push('// Auto-generated: Optimized Myers 32-bit variants with fixed b.length');
out.push('// Source: codegen/tools/generateMyers32-B.cjs');
out.push('const peq = new Uint32Array(65535);');
out.push('export const myers_table = [];');

for (let n = 1; n <= 32; n++) {
  out.push('');
  out.push(`function myers_b${n}(a, b) {`);
  out.push('  const nA = a.length;');
  out.push(`  const lst = 1 << (nA - 1);`);
  out.push('  let pv = -1 >>> 0, mv = 0, sc = nA;');

  // Setup peq dynamically
  out.push('  for (let i = 0; i < nA; i++) {');
  out.push('    peq[a.charCodeAt(i)] |= 1 << i;');
  out.push('  }');
  out.push('');

  // Unrolled inner loop for b
  out.push(`    let eq;`);
  out.push(`    let xv;`);
  out.push('');

  for (let i = 0; i < n; i++) {

    out.push(`    eq = peq[b.charCodeAt(${i})];`);
    out.push(`    xv = eq | mv;`);
    out.push(`    eq |= ((eq & pv) + pv) ^ pv;`);
    out.push(`    mv |= ~(eq | pv);`);
    out.push(`    pv &= eq;`);

    // score += ((pv >>> (n - 1)) & 1) - ((mv >>> (n - 1)) & 1);
    out.push(`    sc += ((pv >>> (nA - 1)) & 1) - ((mv >>> (nA - 1)) & 1);`);
    // out.push(`    if (mv & lst) sc++;`);
    // out.push(`    if (pv & lst) sc--;`);

    if (i !== n - 1) {
      out.push(`    mv = ((mv << 1) | 1) >>> 0;`);
      out.push(`    pv = ((pv << 1) | ~(xv | mv)) >>> 0;`);
      out.push(`    mv &= xv;`);
    }

  }

  out.push('');

  // Cleanup peq
  out.push('  for (let i = 0; i < nA; i++) {');
  out.push('    peq[a.charCodeAt(i)] = 0;');
  out.push('  }');

  out.push('  return sc;');
  out.push('}');
  out.push(`myers_table[${n}] = myers_b${n};`);
}

// Dispatcher
out.push('');
out.push('export function myers32_unrolledB(a, b) {');
out.push('  const fn = myers_table[b.length];');
out.push('  return fn ? fn(a, b) : null;');
out.push('}');
out.push('');

const outputPath = path.resolve(__dirname, '..', 'artifacts', 'myers32-unrolledB.js');

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, out.join('\n'), 'utf8');

console.log(`✅ Generated ${outputPath}`);