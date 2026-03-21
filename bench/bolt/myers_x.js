
// ./src/myers_x.js

// Global pattern equality table shared across invocations
const peq = new Uint32Array(65536); // UTF-16 code unit table
// import { peq } from './peq.js';


/**
 * Decode string into UTF-16 code units once.
 * This avoids repeated charCodeAt() inside hot loops.
 */
function toCodeUnits(str, len) {
    const out = new Uint16Array(len);
    for (let i = 0; i < len; i++) {
        out[i] = str.charCodeAt(i);
    }
    return out;
}

/**
 * Calculates the edit distance (or alignment score) between two strings `a` and `b`
 * using a bit-parallel implementation of the Myers algorithm.
 * This variant partitions the input `b` into 32-bit blocks for performance.
 * 
 * @param {string} a - Longer string, processed horizontally.
 * @param {string} b - Shorter string, processed in 32-bit vertical blocks.
 * @param {number} n - Length of string `a`.
 * @param {number} m - Length of string `b`.
 * @returns {number} edit distance (or score) from `a` to `b`
 */
export function myers_x(a, b, n, m) {

    const aCodes = toCodeUnits(a, n);
    const bCodes = toCodeUnits(b, m);


    // Horizontal word size: number of 32-bit chunks needed for string `a`
    let hsize = (n + 31) >> 5;
    const vsize = (m + 31) >> 5;

    // Initialize horizontal positive and negative bitvectors
    const mhc = new Int32Array(hsize);
    const phc = new Int32Array(hsize);
    phc.fill(-1);

    let j = 0;

    for (; j < vsize - 1; j++) {
        let pv = -1, mv = 0;
        const start = j * 32;
        const end = Math.min(start + 32, m);

        // Set bitmasks for current 32-character slice of string `b`
        for (let k = start; k < end; k++) {
            peq[bCodes[k]] |= 1 << (k - start);
        }


        for (let i = 0; i < n; i++) {
            const idx = i >> 5;
            const bit = i & 31;
            const eq = peq[aCodes[i]];
            const pb = (phc[idx] >>> bit) & 1;
            const mb = (mhc[idx] >>> bit) & 1;
            const xv = eq | mv;
            const xh = ((((eq | mb) & pv) + pv) ^ pv) | eq | mb;

            let ph = mv | ~(xh | pv);
            let mh = pv & xh;

            if ((ph >>> 31) ^ pb) phc[idx] ^= 1 << bit;
            if ((mh >>> 31) ^ mb) mhc[idx] ^= 1 << bit;

            ph = (ph << 1) | pb;
            mh = (mh << 1) | mb;
            pv = mh | ~(xv | ph);
            mv = ph & xv;
        }

        // Reset bitmasks for the next block of `b`
        for (let k = start; k < end; k++) {
            peq[bCodes[k]] = 0;
        }

    }

    // Final block processing
    let pv = -1, mv = 0;
    const start = j * 32;
    const end = Math.min(start + 32, m);
    const shift = end - start - 1;

    for (let k = start; k < end; k++) {
        peq[bCodes[k]] |= 1 << (k - start);
    }

    let score = m;
    for (let i = 0; i < n; i++) {
        const idx = i >> 5;
        const bit = i & 31;
        const eq = peq[aCodes[i]];
        const pb = (phc[idx] >>> bit) & 1;
        const mb = (mhc[idx] >>> bit) & 1;
        const xv = eq | mv;
        const xh = ((((eq | mb) & pv) + pv) ^ pv) | eq | mb;

        let ph = mv | ~(xh | pv);
        let mh = pv & xh;

        score += (ph >>> shift) & 1;
        score -= (mh >>> shift) & 1;

        if ((ph >>> 31) ^ pb) phc[idx] ^= 1 << bit;
        if ((mh >>> 31) ^ mb) mhc[idx] ^= 1 << bit;

        ph = (ph << 1) | pb;
        mh = (mh << 1) | mb;
        pv = mh | ~(xv | ph);
        mv = ph & xv;
    }


    // Clear final bitmask state
    for (let k = start; k < end; k++) {
        peq[bCodes[k]] = 0;
    }


    return score;
};
