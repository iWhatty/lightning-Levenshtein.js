


// bench\myers32-variants\myers32_baseline.js

"use strict";

const peq = new Uint32Array(0x10000);

export const myers32_baseline = (a, b, n = a.length, m = b.length) => {
  let mv = 0;
  let pv = -1;
  let score = n;

  const lst = 1 << (n - 1);

  let i = n;
  while (i--) {
    peq[a.charCodeAt(i)] |= 1 << i;
  }

  for (i = 0; i < m; i++) {
    let eq = peq[b.charCodeAt(i)];
    const xv = eq | mv;
    eq |= ((eq & pv) + pv) ^ pv;
    mv |= ~(eq | pv);
    pv &= eq;

    if (mv & lst) score++;
    if (pv & lst) score--;

    mv = (mv << 1) | 1;
    pv = (pv << 1) | ~(xv | mv);
    mv &= xv;
  }

  i = n;
  while (i--) {
    peq[a.charCodeAt(i)] = 0;
  }

  return score;
};