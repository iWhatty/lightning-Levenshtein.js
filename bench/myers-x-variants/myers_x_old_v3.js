
// myers-x-variants\myers_x_old_v2.js

// Global pattern equality table shared across invocations
// const peq = new Uint32Array(0x10000); // One bitmask per Unicode char (up to 16-bit space)

"use strict";

const peq = new Uint32Array(65536);



let phcBuf = new Int32Array(0);
let mhcBuf = new Int32Array(0);


const ensureScratch = (size) => {
    if (phcBuf.length < size) {
        phcBuf = new Int32Array(size);
        mhcBuf = new Int32Array(size);
    }
    let i = size;
    while (i--) {
        phcBuf[i] = -1;
        mhcBuf[i] = 0;
    }
};


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
export function myers_x(a1, b1, n, m) {

    const a = a1;
    const b = b1;

    // Horizontal word size: number of 32-bit chunks needed for string `a`
    const hsize = (n + 31) >> 5;
    const vsize = (m + 31) >> 5;

    // Initialize horizontal positive and negative bitvectors
    ensureScratch(hsize);
    const phc = phcBuf;
    const mhc = mhcBuf;

    // Final block processing
    let pv = -1, mv = 0;
    const start = (vsize - 1) * 32;
    const end = start + Math.min(32, m - start);
    const shift = end - start - 1;


    for (let j = 0; j < vsize - 1; j++) {
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
        // score += ((ph >>> shift) & 1) - ((mh >>> shift) & 1);
        score += ((ph >>> shift) & 1);
        score -= ((mh >>> shift) & 1);

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
