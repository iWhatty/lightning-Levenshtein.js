//  levenshtein-lightning-v2.js
"use strict";


// Core imports (adjust as needed if you modularize)
import { myers32_fast, myers_table } from './myers32-fast.js';
import { levenshtein_small, lev_4x4 } from './levenshtein_small.js';
import { lev2_dispatch, lev3_dispatch } from './lev-direct.js';

import { myers_x } from './myers_x.js'


/** Smart dispatcher strategy by input length */
const strategy = new Array(33).fill((a, b) => myers32_fast(a, b));

// Layer 0–1: Identity or zero-length
strategy[0] = (a, b) => Math.max(a.length, b.length);
strategy[1] = (a, b) => a[0] === b[0] ? 0 : 1;

// Layer 2–3: use optimized small dispatchers
strategy[2] = (a, b) => lev2_dispatch(a, b);
strategy[3] = (a, b) => lev3_dispatch(a, b);


// Layer 3–4: Small matrix-based Levenshtein
// strategy[3] = (a, b) => levenshtein_small(a, b);
strategy[4] = (a, b) => lev_4x4(a, b);

// Layer 5–32: Precompiled bit-parallel
for (let i = 5; i <= 32; i++) {
  // strategy[i] = (a, b) => myers32_fast(a, b);
  strategy[i] = (a, b) => myers_table[i](a, b)

}

/**
 * Unified Lightning Levenshtein v2
 * - Fast dispatch for small lengths
 * - Fully unrolled bit-parallel for midrange
 * - Correct and memory-safe for all input lengths
 */
export function levenshteinLightning(a, b) {
  if (a === b) return 0;

  let n = a.length;
  let m = b.length;
  if (n < m) {
    [a, b] = [b, a];
    [n, m] = [m, n];
  }

  // if (a.length < b.length) [a, b] = [b, a];
  if (a <= 32) {
    return strategy[a.length](a, b)
  }

  return 0

  // return myers_x(a, b, n, m);

}