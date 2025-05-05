//  ./src/distanceMax.js

import { myers_32 } from './myers_32.js';
import { myers_x } from './myers_x.js';


import { myers_32_max } from './myers_32_max.js';
import { myers_x_max } from './myers_x_max.js';

/**
 * Computes the Levenshtein edit distance between two strings with an optional early-exit threshold.
 * Internally selects the most efficient Myers variant based on string length and cutoff value.
 *
 * @param {string} a - First string (the longer string is assigned to `a` for optimization).
 * @param {string} b - Second string to compare.
 * @param {number} [maxDistance=Number.MAX_SAFE_INTEGER] - Optional upper limit; exits early if distance exceeds this.
 * @returns {number} Levenshtein distance between `a` and `b`, or early cutoff value if threshold exceeded.
 */
export function distanceMax(a, b, maxDistance = Number.MAX_SAFE_INTEGER) {
  // Shortcut: identical strings
  if (a === b) return 0;

  let n = a.length;
  let m = b.length;

  // Handle edge cases with empty strings
  if (n === 0) return m;
  if (m === 0) return n;

  // Ensure `a` is longer for consistent bitmask orientation
  if (n < m) {
    [a, b] = [b, a];
    [n, m] = [m, n];
  }

  const maxSafe = n; // Max possible distance (worst case)

  // Dispatch to optimal implementation based on length and cutoff
  if (n <= 32) {
    return maxDistance > maxSafe
      ? myers_32(a, b, n, m)       // No cutoff needed
      : myers_32_max(a, b, n, m, maxDistance); // With cutoff
  } else {
    return maxDistance > maxSafe
      ? myers_x(a, b, n, m)
      : myers_x_max(a, b, n, m, maxDistance);
  }
};
