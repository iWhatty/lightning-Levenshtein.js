
// bench\myers32-variants\myers32_v4.js

"use strict";

const peq = new Uint32Array(0x10000);

export const myers32_v4 = (a, b, n = a.length, m = b.length) => {
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
    const eq = peq[bCode];

    const xv = eq | mv;
    const eqv = eq | (((eq & pv) + pv) ^ pv);

    const nh = ~(eqv | pv);
    const ph = mv | nh;
    const mh = pv & eqv;

    const phLst = ph & lst;
    const mhLst = mh & lst;
    score += (phLst !== 0) - (mhLst !== 0);

    const newMv = (ph << 1) | 1;
    const newPv = (mh << 1) | ~(xv | newMv);

    pv = newPv;
    mv = newMv & xv;
  }

  i = n;
  while (i--) {
    peq[a.charCodeAt(i)] = 0;
  }

  return score;
};