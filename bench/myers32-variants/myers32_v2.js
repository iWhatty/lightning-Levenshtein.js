

// bench\myers32-variants\myers32_v2.js

"use strict";

const peq = new Uint32Array(0x10000);

export const myers32_v2 = (a, b, n = a.length, m = b.length) => {
  let mv = 0;
  let pv = -1;
  let score = n;

  const top = n - 1;

  let i = n;
  while (i--) {
    peq[a.charCodeAt(i)] |= 1 << i;
  }

  for (i = 0; i < m; i++) {
    let eq = peq[b.charCodeAt(i)];
    const xv = eq | mv;
    eq |= ((eq & pv) + pv) ^ pv;

    let ph = mv | ~(eq | pv);
    let mh = pv & eq;

    score += ((ph >>> top) & 1) - ((mh >>> top) & 1);

    ph = (ph << 1) | 1;
    mh <<= 1;

    pv = mh | ~(xv | ph);
    mv = ph & xv;
  }

  i = n;
  while (i--) {
    peq[a.charCodeAt(i)] = 0;
  }

  return score;
};