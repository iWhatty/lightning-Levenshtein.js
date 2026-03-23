// ./src/myers_32.js

"use strict";

// Shared pattern-equality table.
// For each character code, peq[ch] stores a bitmask of all positions in `a`
// where that character appears.
//
// Example:
//   a = "ABCA"
//   peq['A'] => 1001b
//   peq['B'] => 0010b
//   peq['C'] => 0100b
import { peq } from './peq.js';

/**
 * Bit-parallel Myers' algorithm for Levenshtein distance.
 * Specialized for pattern lengths <= 32, so the entire DP column fits in one 32-bit word.
 *
 * Assumes `a.length >= b.length` in the wider dispatcher design, though this function
 * itself just uses the provided inputs directly.
 *
 * @param {string} a1 - Pattern / source string
 * @param {string} b1 - Text / target string
 * @param {number} n - Length of `a`
 * @param {number} m - Length of `b`
 * @returns {number} Edit distance between `a` and `b`
 */
export const myers_32 = (a1, b1) => {

    const a = a1;
    const b = b1;
    const n = a.length;
    const m = b.length;

  // Bit corresponding to the final live position in the pattern.
  // When this bit flips in PH/MH, the total score changes.
  const lastMask = 1 << (n - 1);

  // Myers bit-vectors:
  // pv = positive differences / "plus" frontier
  // mv = negative differences / "minus" frontier
  //
  // Initial state:
  // - pv starts as all 1s
  // - mv starts as all 0s
  //
  // score starts at n, which is the cost of transforming `a` into an empty string.
  let mv = 0;
  let pv = -1;
  let score = n;

  // Build PEQ masks for the pattern string `a`.
  // Each bit i marks that a[i] == current character.
  let i = n;
  while (i--) {
    peq[a.charCodeAt(i)] |= 1 << i;
  }

  // Process each character of `b`, updating one DP column per iteration.
  for (i = 0; i < m; i++) {
    const bCode = b.charCodeAt(i);
    const eq = peq[bCode]; // bitmask of positions in `a` matching b[i]

    // Core Myers recurrence.
    //
    // xv marks candidate positions where vertical transitions can occur.
    // eqv is the expanded equality mask after incorporating the current pv state.
    const xv = eq | mv;
    const eqv = eq | (((eq & pv) + pv) ^ pv);

    // nh = positions that become "negative horizontal"
    // ph = positive horizontal differences
    // mh = negative horizontal differences
    const nh = ~(eqv | pv);
    const ph = mv | nh;
    const mh = pv & eqv;

    // Only the last pattern bit changes the overall edit score.
    // If PH hits the last bit, score increases.
    // If MH hits the last bit, score decreases.
    const phLst = ph & lastMask;
    const mhLst = mh & lastMask;
    score += (phLst !== 0) - (mhLst !== 0);

    // Shift horizontal state for the next column.
    //
    // - PH shifted left becomes the new minus candidate stream
    // - MH shifted left contributes to the new positive stream
    //
    // The low bit is seeded with 1 for insertion boundary handling.
    const newMv = (ph << 1) | 1;
    const newPv = (mh << 1) | ~(xv | newMv);

    pv = newPv;
    mv = newMv & xv;
  }

  // Clear PEQ entries touched by this call so the shared table can be reused safely.
  i = n;
  while (i--) {
    peq[a.charCodeAt(i)] = 0;
  }

  return score;
};