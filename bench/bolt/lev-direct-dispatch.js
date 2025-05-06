
// ./lev-direct.js
"use strict";

import { lev_3x3, lev_4x4, lev_4x3, lev_4x2, lev_4x1  } from './levenshtein_Direct_Matrix.js';

/* ==== 2-char Cases ==== */

/**
 * (2,2): Handles exact match, transposition, partial matches
 */
export function lev22_direct(a, b) {
  const a0 = a.charCodeAt(0), a1 = a.charCodeAt(1);
  const b0 = b.charCodeAt(0), b1 = b.charCodeAt(1);

  if (a0 === b0 && a1 === b1) return 0;
  if (a0 === b1 && a1 === b0) return 1;
  if (a0 === b0 || a1 === b1 || a0 === b1 || a1 === b0) return 1;
  return 2;
}

/**
 * (2,1) or (1,2): Handles overlap and full mismatch, !!Assumes a >= b
 */
export function lev21_direct(a, b) {
  const a0 = a.charCodeAt(0), a1 = a.charCodeAt(1);
  const b0 = b.charCodeAt(0);

  if (a0 === b0 || a1 === b0) return 1;
  return 2;
}

/**
 * Dispatcher for 1–2 length combinations !!Assumes a >= b
 */
export function lev2_dispatch(a, b) {
  const lb = b.length;
  if (lb === 2) return lev22_direct(a, b);
  if (lb === 1) return lev21_direct(a, b);
  return 2;

}


/* ==== 3-char Cases ==== */

/**
 * (3,1): Count character overlap, return 3 - matches
 */
export function lev31_direct(a, b) {
  const ac0 = a.charCodeAt(0);
  const ac1 = a.charCodeAt(1);
  const ac2 = a.charCodeAt(2);
  const bc = b.charCodeAt(0);

  let matches = (ac0 === bc) + (ac1 === bc) + (ac2 === bc);
  return 3 - matches;
}

/**
 * (3,2): Count overlap and return minimal edits
 */
export function lev32_direct(a, b) {
  const ac0 = a.charCodeAt(0);
  const ac1 = a.charCodeAt(1);
  const ac2 = a.charCodeAt(2);
  const bc0 = b.charCodeAt(0);
  const bc1 = b.charCodeAt(1);

  let matches = 0;
  matches += (ac0 === bc0) + (ac0 === bc1);
  matches += (ac1 === bc0) + (ac1 === bc1);
  matches += (ac2 === bc0) + (ac2 === bc1);
  matches = Math.min(matches, 2);

  return (3 - matches) + (2 - matches);
}

/**
 * Dispatcher for 1–3 length combinations. !!Assumes a >= b
 */
export function lev3_dispatch(a, b) {
  const lb = b.length;
  if (lb === 3) return lev_3x3(a, b);
  if (lb === 2) return lev32_direct(a, b);
  if (lb === 1) return lev31_direct(a, b);
  return 3
}



/**
 * Dispatcher for 1–4 length combinations. !!Assumes a >= b
 */
export function lev4_dispatch(a, b) {
  const lb = b.length;
  if (lb === 4) return lev_4x4(a, b);
  if (lb === 3) return lev_4x3(a, b);
  if (lb === 2) return lev_4x2(a, b);
  if (lb === 1) return lev_4x1(a, b);
  return 4

}
