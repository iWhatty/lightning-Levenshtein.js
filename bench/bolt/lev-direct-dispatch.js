


// bench\bolt\lev-direct-dispatch.js
"use strict";

import {
  lev_2x2,
  lev_3x2,
  lev_3x3,
  lev_4x4,
  lev_4x3,
  lev_4x2,
  lev_4x1
} from './levenshtein_Direct_Matrix.js';


/* ==== 2-char Cases ==== */

/**
 * (2,1): Assumes a.length === 2 and b.length === 1
 */
export function lev21_direct(a, b) {
  const a0 = a.charCodeAt(0), a1 = a.charCodeAt(1);
  const b0 = b.charCodeAt(0);

  if (a0 === b0 || a1 === b0) return 1;
  return 2;
}

/**
 * Dispatcher for length-2 `a`, assuming a.length >= b.length
 */
export function lev2_dispatch(a, b) {
  const lb = b.length;
  if (lb === 2) return lev_2x2(a, b);
  if (lb === 1) return lev21_direct(a, b);
  return 2;

}


/* ==== 3-char Cases ==== */

/**
 * (3,1): Assumes a.length === 3 and b.length === 1
 */
export function lev31_direct(a, b) {
  const a0 = a.charCodeAt(0), a1 = a.charCodeAt(1), a2 = a.charCodeAt(2);
  const b0 = b.charCodeAt(0);
  return (a0 === b0 || a1 === b0 || a2 === b0) ? 2 : 3;
}


/**
 * Dispatcher for length-3 `a`, assuming a.length >= b.length
 */
export function lev3_dispatch(a, b) {
  const lb = b.length;
  if (lb === 3) return lev_3x3(a, b);
  if (lb === 2) return lev_3x2(a, b);
  if (lb === 1) return lev31_direct(a, b);
  return 3
}



/**
 * Dispatcher for length-4 `a`, assuming a.length >= b.length
 */
export function lev4_dispatch(a, b) {
  const lb = b.length;
  if (lb === 4) return lev_4x4(a, b);
  if (lb === 3) return lev_4x3(a, b);
  if (lb === 2) return lev_4x2(a, b);
  if (lb === 1) return lev_4x1(a, b);
  return 4

}
