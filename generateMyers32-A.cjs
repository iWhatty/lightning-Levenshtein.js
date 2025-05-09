const fs = require('fs');

const out = [];
out.push('// Auto-generated: Optimized Myers 32-bit variants');
out.push('const peq = new Uint32Array(256);');
out.push('const myers_table = [];');

for (let n = 1; n <= 32; n++) {
  out.push(``);
  out.push(`function myers_${n}(a, b) {`);
  out.push(`  const m = b.length;`);
  out.push(`  const lst = ${1 << (n - 1)};`);
  out.push(`  let pv = -1 >>> 0, mv = 0, sc = ${n};`);

  // Setup peq
  for (let i = 0; i < n; i++) {
    out.push(`  peq[a.charCodeAt(${i})] |= ${1 << i};`);
  }

  // Main loop
  out.push(`  for (let i = 0; i < m; i++) {`);
  out.push(`    let eq = peq[b.charCodeAt(i)];`);
  out.push(`    const xv = eq | mv;`);
  out.push(`    eq |= ((eq & pv) + pv) ^ pv;`);
  out.push(`    mv |= ~(eq | pv);`);
  out.push(`    pv &= eq;`);
  out.push(`    if (mv & lst) sc++;`);
  out.push(`    if (pv & lst) sc--;`);
  out.push(`    mv = ((mv << 1) | 1) >>> 0;`);
  out.push(`    pv = ((pv << 1) | ~(xv | mv)) >>> 0;`);
  out.push(`    mv &= xv;`);
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
out.push(``);
out.push(`export function myers32_fast(a, b) {`);
out.push(`  const fn = myers_table[a.length];`);
out.push(`  return fn ? fn(a, b) : null;`);
out.push(`}`);
out.push(``);

fs.writeFileSync('myers32-fast.js', out.join('\n'), 'utf8');
console.log('✅ Generated myers32-fast.js');
