
// ./src/myers_32.js

// Global pattern equality table shared across invocations
// const peq = new Uint32Array(0x10000); // One bitmask per Unicode char (up to 16-bit space)
import { peq } from './peq.js';


/**
 * Bit-parallel Myers' algorithm for Levenshtein distance.
 * Optimized for pattern strings ≤ 32 characters.
 *
 * @param {string} a - Pattern string (must be longer or equal to `b`)
 * @param {string} b - Text string to compare
 * @param {number} n - Length of `a`
 * @param {number} m - Length of `b`
 * @returns {number} Edit distance between `a` and `b`
 */
export function myers_32(a, b, n, m) {

    let mv = 0;             // Negative bitmask (all zeros). represents delete state
    let pv = -1;            // Positive bitmask (all ones). represents insert state
    let score = n;          // Worst-case initial score (all insertions)

    // Build pattern equality masks (peq[char] has 1s at positions where a[i] === char)
    let i = n;
    while (i--) peq[a.charCodeAt(i)] |= 1 << i;

    for (let i = 0; i < m; i++) {
        const ch = b.charCodeAt(i);
        const eq = peq[ch];               // EQ: match vector for b[i] over a[0..n]
        const xv = eq | mv;               // EQ or previously deleted
        const xh = (((eq & pv) + pv) ^ pv) | eq; // Horizontal transitions

        let ph = mv | ~(xh | pv);         // Insertion positions
        let mh = pv & xh;                 // Deletion positions

        // Branchless score adjustment using only the top (n-1)th bit
        // Scoring logic: update score based on bit at the highest tracked position
        const inc = (ph >>> (n - 1)) & 1;
        const dec = (mh >>> (n - 1)) & 1;
        score += inc - dec;

        // Advance state vectors by 1 position
        // Shift and update bitvectors for next iteration
        ph = (ph << 1) | 1;
        mh = (mh << 1);

        pv = mh | ~(xv | ph);
        mv = ph & xv;
    }

    // Clear used bitmasks for reuse
    i = n;
    while (i--) peq[a.charCodeAt(i)] = 0;

    return score;
};
