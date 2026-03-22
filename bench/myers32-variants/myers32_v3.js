

// bench\myers32-variants\myers32_v3.js

"use strict";

const peq = new Uint32Array(0x10000);

export const myers32_v3 = (a, b, n = a.length, m = b.length) => {
  let mv = 0;
  let pv = -1;
  let score = n;

  const lst = 1 << (n - 1);

  let i = n;
  while (i--) {
    peq[a.charCodeAt(i)] |= 1 << i;
  }

  for (i = 0; i < m; i++) {
    const bCode = b.charCodeAt(i);
    let eq = peq[bCode];

    const xv = eq | mv;
    eq |= ((eq & pv) + pv) ^ pv;

    const nh = ~(eq | pv);
    const ph = mv | nh;
    const mh = pv & eq;

    if (ph & lst) score++;
    if (mh & lst) score--;

    const newMv = (ph << 1) | 1;
    pv = (mh << 1) | ~(xv | newMv);
    mv = newMv & xv;
  }

  i = n;
  while (i--) {
    peq[a.charCodeAt(i)] = 0;
  }

  return score;
};