//  ./src/distanceMax.js


import { myers_32_max } from './myers_32_max.js';
import { myers_x_max } from './myers_x_max.js';
import { myers_32 } from './myers_32.js';
import { myers_x } from './myers_x.js';


/**
 * Computes the Levenshtein edit distance between two strings with an optional early-exit threshold.
 * Internally selects the most efficient Myers variant based on string length and cutoff value.
 *
 * If `maxDistance` is a float between 0 and 1, it's treated as a percentage of the original `a` string length.
 * For example, maxDistance = 0.25 and a.length = 10 → effective maxDistance = 3 (Math.ceil(2.5)).
 *
 * @param {string} a - First string (typically the user-input search term).
 * @param {string} b - Second string to compare.
 * @param {number} [maxDistance=Number.MAX_SAFE_INTEGER] - Max absolute or relative edit distance.
 * @returns {number} Levenshtein distance between `a` and `b`, or cutoff if threshold is exceeded.
 */
export function distanceMax(a, b, maxDistance = Number.MAX_SAFE_INTEGER) {
  if (a === b) return 0;

  const originalLength = a.length;
  const bLength = b.length;

  if (originalLength === 0) return bLength;
  if (bLength === 0) return originalLength;

  // 🧩 Developer Experience (DX) feature: interpret float as % of `a.length`
  if (typeof maxDistance === 'number' && maxDistance > 0 && maxDistance < 1) {
    maxDistance = Math.ceil(maxDistance * originalLength);
  }

  // Swap `a` and `b` if needed for bit-parallel optimization
  let n = originalLength, m = bLength;
  if (n < m) {
    [a, b] = [b, a];
    [n, m] = [m, n];
  }

  const maxSafe = n;

  return n <= 32
    ? (maxDistance > maxSafe
        ? myers_32(a, b, n, m)
        : myers_32_max(a, b, n, m, maxDistance))
    : (maxDistance > maxSafe
        ? myers_x(a, b, n, m)
        : myers_x_max(a, b, n, m, maxDistance));
}