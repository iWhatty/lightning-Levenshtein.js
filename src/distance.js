//  ./src/distance.js

import { myers_32 } from './myers_32.js';
import { myers_x } from './myers_x.js';

/**
 * Computes the Levenshtein edit distance between two strings using the fastest available algorithm.
 * Automatically selects an optimized Myers variant based on input length.
 *
 * @param {string} a - First string (longer string will be assigned to `a` for optimization).
 * @param {string} b - Second string to compare.
 * @returns {number} The Levenshtein distance between `a` and `b`.
 */
export function distance (a, b) {
    // Fast path: identical strings
    if (a === b) return 0;
  
    let n = a.length;
    let m = b.length;
  
    // Handle empty string edge cases
    if (n === 0) return m;
    if (m === 0) return n;
  
    // Always process with the longer string as `a` for bitmask consistency
    if (n < m) {
      [a, b] = [b, a];
      [n, m] = [m, n];
    }
  
    // Algorithm dispatch based on input length
    if (n <= 32) {
      // Use optimized 32-bit Myers for short strings
      return myers_32(a, b, n, m);
    } else {
      // Use blockwise Myers for longer strings
      return myers_x(a, b, n, m);
    }
  };
  