


// bench\bolt\lev-direct-dispatch.js
"use strict";

import {
  lev_3x2,
  lev_3x3,
  lev_4x4,
  lev_4x3,
  lev_4x2,
  lev_4x1
} from './levenshtein_Direct_Matrix.js';


/* ==== 2-char Cases ==== */

export function lev_2x1_direct_at(a, b, ai = 0, bi = 0) {
  const a0 = a.charCodeAt(ai), a1 = a.charCodeAt(ai + 1);
  const b0 = b.charCodeAt(bi);
  return (a0 === b0 || a1 === b0) ? 1 : 2;
}

export function lev_2x2_direct_at(a, b, ai = 0, bi = 0) {
  const a0 = a.charCodeAt(ai);
  const a1 = a.charCodeAt(ai + 1);
  const b0 = b.charCodeAt(bi);
  const b1 = b.charCodeAt(bi + 1);

  return (a0 !== b0) + (a1 !== b1);
}

/**
 * Dispatcher for residual length-2 `a`
 */
export function lev2_dispatch(a, b, ai = 0, bi = 0, lb = b.length - bi) {
  if (lb === 2) return lev_2x2_direct_at(a, b, ai, bi);
  if (lb === 1) return lev_2x1_direct_at(a, b, ai, bi);
  return 2;
}


/* ==== 3-char Cases ==== */

export function lev_3x1_direct_at(a, b, ai = 0, bi = 0) {
  const a0 = a.charCodeAt(ai), a1 = a.charCodeAt(ai + 1), a2 = a.charCodeAt(ai + 2);
  const b0 = b.charCodeAt(bi);
  return (a0 === b0 || a1 === b0 || a2 === b0) ? 2 : 3;
}

/**
 * Dispatcher for residual length-3 `a`
 */
export function lev3_dispatch(a, b, ai = 0, bi = 0, lb = b.length - bi) {
  if (lb === 3) return lev_3x3(a, b, ai, bi);
  if (lb === 2) return lev_3x2(a, b, ai, bi);
  if (lb === 1) return lev_3x1_direct_at(a, b, ai, bi);
  return 3;
}


/* ==== 4-char Cases ==== */

export function lev4_dispatch(a, b, ai = 0, bi = 0, lb = b.length - bi) {
  if (lb === 4) return lev_4x4(a, b, ai, bi);
  if (lb === 3) return lev_4x3(a, b, ai, bi);
  if (lb === 2) return lev_4x2(a, b, ai, bi);
  if (lb === 1) return lev_4x1(a, b, ai, bi);
  return 4;
}