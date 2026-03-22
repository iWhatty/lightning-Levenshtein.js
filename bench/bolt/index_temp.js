//  levenshtein-lightning-v2.js
"use strict";


// Core imports (adjust as needed if you modularize)
import { myers_table } from './myers32-unrolledA.js';
// import { myers32_v4 } from './myers32_v4.js';

import { lev2_dispatch, lev3_dispatch, lev4_dispatch } from './lev-dispatch.js';

import { myers_x } from './myers_x.js'
import { myers_64 } from './myers_64.js'
import { myers_96 } from './myers_96.js';
import { myers_128 } from './myers_128.js';
import { myers_256 } from './myers_256.js';


import { myers_x64 } from './myers_x64.js'



/** Smart dispatcher strategy by input length */
const strategy = new Array(33);

// Layer 0–1: Identity or zero-length
strategy[0] = (a, b) => Math.max(a.length, b.length);
strategy[1] = (a, b) => +(a !== b);


// Layer 2–3: use optimized small dispatchers
strategy[2] = lev2_dispatch;
strategy[3] = lev3_dispatch;

// Layer 3–4: Small matrix-based Levenshtein
strategy[4] = lev4_dispatch;

// Layer 5–32: Precompiled bit-parallel
for (let i = 5; i <= 32; i++) {
  strategy[i] = myers_table[i];
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
  // const m = b.length;

  // Handle empty string edge cases
  if (b.length === 0) return n;

  if (n < 2) return +(a !== b);

  if (n < 3) return lev2_dispatch(a, b);

  if (n < 4) return lev3_dispatch(a, b);

  if (n < 5) return lev4_dispatch(a, b);
  // if (n <= 32) return strategy[n](a, b)
  // if (n < 9) return strategy[n](a, b)

  // if (n < 17) return fast_16(a, b)

  if (n < 33) return strategy[n](a, b)
  // if (n < 33) return myers32_v4(a, b, n, b.length)
  // return myers_x64(a, b);
  if (n < 65) return myers_64(a, b);

  if (n < 97) return myers_96(a, b);

  if (n < 129) return myers_128(a, b);

  if (n < 257) return myers_256(a, b);

  return myers_x64(a, b);

}


/**
 * Unified Lightning Levenshtein v2
 * - Fast dispatch for small lengths
 * - Fully unrolled bit-parallel for midrange
 * - Correct and memory-safe for all input lengths
 */
function levenshteinLightning_prefix_suffix(a, b) {
  if (a === b) return 0;
  if (a.length < b.length) [a, b] = [b, a];

  const n = a.length;
  const m = b.length;

  if (m === 0) return n;

  // // Only try affix trimming when the shorter side is small enough
  // // that collapsing into direct dispatch is plausibly worth it.
  if (m <= 4) {
    let aEnd = n;
    let bEnd = m;

    while (bEnd > 0 && a.charCodeAt(aEnd - 1) === b.charCodeAt(bEnd - 1)) {
      aEnd--;
      bEnd--;
    }

    let start = 0;
    while (start < bEnd && a.charCodeAt(start) === b.charCodeAt(start)) {
      start++;
    }

    const la = aEnd - start; // longer residual
    const lb = bEnd - start; // shorter residual

    if (lb === 0 || la < 3) return la;
    if (la === 3) return lev3_dispatch(a, b, start, start, lb);
    if (la === 4) return lev4_dispatch(a, b, start, start, lb);
  }

  if (n <= 32) return strategy[n](a, b);
  if (n <= 64) return myers_64(a, b);
  if (n <= 96) return myers_96(a, b);
  if (n <= 128) return myers_128(a, b);
  return myers_x(a, b, n, m);
}
if (typeof globalThis !== 'undefined') {
  globalThis['levenshteinLightning'] = levenshteinLightning;
}
