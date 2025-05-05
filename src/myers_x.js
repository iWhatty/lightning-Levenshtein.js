
// ./src/myers_x.js

// Global pattern equality table shared across invocations
const peq = new Uint32Array(0x10000); // One bitmask per Unicode char (up to 16-bit space)
// import { peq } from './peq.js';

/**
 * Calculates the edit distance (or alignment score) between two strings `a` and `b`
 * using a bit-parallel implementation of the Myers algorithm.
 * This variant partitions the input `b` into 32-bit blocks for performance.
 * 
 * @param {string} a - The source string (query).
 * @param {string} b - The target string (reference).
 * @param {number} n - Length of string `a`.
 * @param {number} m - Length of string `b`.
 * @returns {number} edit distance (or score) from `a` to `b`
 */
export function myers_x(a, b, n, m) {
    // Horizontal word size: number of 32-bit chunks needed for string `a`
    let hsize = Math.ceil(n / 32);
    const vsize = Math.ceil(m / 32);

    // Initialize horizontal positive and negative bitvectors
    const mhc = new Array(hsize);
    const phc = new Array(hsize);
    while (hsize--) {
        phc[hsize] = -1; // All 1s: start with optimistic assumption
        mhc[hsize] = 0;  // All 0s
    }

    let j = 0;
    for (; j < vsize - 1; j++) {
        let pv = -1, mv = 0;
        const start = j * 32;
        const end = Math.min(start + 32, m);

        // Set bitmasks for current 32-character slice of string `b`
        for (let k = start; k < end; k++) {
            peq[b.charCodeAt(k)] |= 1 << (k - start);
        }

        // Process each character of `a` using bitwise dynamic programming
        for (let i = 0; i < n; i++) {
            const ch = a.charCodeAt(i);
            const eq = peq[ch];
            const idx = i >> 5;        // Divide by 32
            const bit = i & 31;        // Modulo 32
            const pb = (phc[idx] >>> bit) & 1;
            const mb = (mhc[idx] >>> bit) & 1;

            const xv = eq | mv;
            const xh = ((((eq | mb) & pv) + pv) ^ pv) | eq | mb;

            let ph = mv | ~(xh | pv);
            let mh = pv & xh;

            // Update bitvectors by XORing with new state
            phc[idx] ^= ((ph >>> 31) ^ pb) << bit;
            mhc[idx] ^= ((mh >>> 31) ^ mb) << bit;

            // Prepare for next iteration
            ph = (ph << 1) | pb;
            mh = (mh << 1) | mb;
            pv = mh | ~(xv | ph);
            mv = ph & xv;
        }

        // Reset bitmasks for the next block of `b`
        for (let k = start; k < end; k++) {
            peq[b.charCodeAt(k)] = 0;
        }
    }

    // Final block processing
    let pv = -1, mv = 0;
    const start = j * 32;
    const end = Math.min(start + 32, m);
    const shift = end - start - 1;

    for (let k = start; k < end; k++) {
        peq[b.charCodeAt(k)] |= 1 << (k - start);
    }

    let score = m;
    for (let i = 0; i < n; i++) {
        const ch = a.charCodeAt(i);
        const eq = peq[ch];
        const idx = i >> 5;
        const bit = i & 31;
        const pb = (phc[idx] >>> bit) & 1;
        const mb = (mhc[idx] >>> bit) & 1;

        const xv = eq | mv;
        const xh = ((((eq | mb) & pv) + pv) ^ pv) | eq | mb;

        let ph = mv | ~(xh | pv);
        let mh = pv & xh;

        // Update score based on bit shifted to `shift` position (MSB in final block)
        score += ((ph >>> shift) & 1) - ((mh >>> shift) & 1);

        phc[idx] ^= ((ph >>> 31) ^ pb) << bit;
        mhc[idx] ^= ((mh >>> 31) ^ mb) << bit;

        ph = (ph << 1) | pb;
        mh = (mh << 1) | mb;
        pv = mh | ~(xv | ph);
        mv = ph & xv;
    }

    // Clear final bitmask state
    for (let k = start; k < end; k++) {
        peq[b.charCodeAt(k)] = 0;
    }

    return score;
};
