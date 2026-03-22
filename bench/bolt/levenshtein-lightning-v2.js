//  levenshtein-lightning-v2.js
"use strict";


// Core imports (adjust as needed if you modularize)
import { myers32_fast, myers_table } from './myers32-fast.js';
import { lev2_dispatch, lev3_dispatch, lev4_dispatch } from './lev-direct-dispatch.js';

import { myers_x } from './myers_x.js'
import { myers_64 } from './myers_64.js'
import { myers_96 } from './myers_96.js';
import { myers_128 } from './myers_128.js';

/** Smart dispatcher strategy by input length */
const strategy = new Array(33).fill((a, b) => myers32_fast(a, b));

// Layer 0–1: Identity or zero-length
strategy[0] = (a, b) => Math.max(a.length, b.length);
strategy[1] = (a, b) => +(a.charCodeAt(0) !== b.charCodeAt(0));


// Layer 2–3: use optimized small dispatchers
strategy[2] = (a, b) => lev2_dispatch(a, b);
strategy[3] = (a, b) => lev3_dispatch(a, b);

// Layer 3–4: Small matrix-based Levenshtein
strategy[4] = (a, b) => lev4_dispatch(a, b);

// Layer 5–32: Precompiled bit-parallel
for (let i = 5; i <= 32; i++) {
  // strategy[i] = (a, b) => myers32_fast(a, b);
  strategy[i] = (a, b) => myers_table[i](a, b)

}


function prefixSuffixQuickExit(a, b) {
  let la = a.length;
  let lb = b.length;

  while (la > 0 && (a.charCodeAt(la - 1) === b.charCodeAt(lb - 1))) {
    la--;
    lb--;
  }

  let offset = 0;
  while (offset < la && (a.charCodeAt(offset) === b.charCodeAt(offset))) {
    offset++;
  }

  la -= offset;
  lb -= offset;

  if (la === 0 || lb < 3) {
    return lb;
  }

  return -1; // means “no quick exit”
}


/**
 * Unified Lightning Levenshtein v2
 * - Fast dispatch for small lengths
 * - Fully unrolled bit-parallel for midrange
 * - Correct and memory-safe for all input lengths
 */
export function levenshteinLightning(a, b) {
  if (a === b) return 0;
  if (a.length < b.length) [a, b] = [b, a];

  const n = a.length;
  const m = b.length;

  // if (n > 128) return myers_x(a, b);

  // Handle empty string edge cases
  if (m === 0) return n;

  // if (n <= 2) {
  //   const quick = prefixSuffixQuickExit(b, a);
  //   if (quick !== -1) return quick;
  // }


  if (n <= 32) return strategy[n](a, b)

  if (n <= 64) return myers_64(a, b);

  if (n <= 96) return myers_96(a, b);

  if (n <= 128) return myers_128(a, b);

  return myers_x(a, b, n, n);

}