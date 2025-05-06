
// ./src/myers_x.js

// Global pattern equality table shared across invocations
const peq = new Uint32Array(256); // One bitmask per Unicode char (up to 16-bit space)
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


        for (let i = 0; i < n; i++) {
            const eq = peq[a.charCodeAt(i)];
            const pb = (phc[(i / 32) | 0] >>> i) & 1;
            const mb = (mhc[(i / 32) | 0] >>> i) & 1;
            const xv = eq | mv;
            const xh = ((((eq | mb) & pv) + pv) ^ pv) | eq | mb;
            let ph = mv | ~(xh | pv);
            let mh = pv & xh;
            if ((ph >>> 31) ^ pb) {
                phc[(i / 32) | 0] ^= 1 << i;
            }
            if ((mh >>> 31) ^ mb) {
                mhc[(i / 32) | 0] ^= 1 << i;
            }
            ph = (ph << 1) | pb;
            mh = (mh << 1) | mb;
            pv = mh | ~(xv | ph);
            mv = ph & xv;
        }

        // let shiftMask, pvIdx, mvIdx, pb, mb;
        // for (let i = 0; i < n; i++) {
        //     const ch = a.charCodeAt(i);
        //     const eq = peq[ch];
        
        //     const idx = i >> 5;
        //     const bit = i & 31;
        
        //     shiftMask = 1 << bit;
        //     pvIdx = phc[idx];
        //     mvIdx = mhc[idx];
        
        //     pb = (pvIdx >>> bit) & 1;
        //     mb = (mvIdx >>> bit) & 1;
        
        //     const xv = eq | mv;
        //     const xh = ((((eq | mb) & pv) + pv) ^ pv) | eq | mb;
        
        //     let ph = mv | ~(xh | pv);
        //     let mh = pv & xh;
        
        //     const phDelta = ((ph >>> 31) ^ pb) * shiftMask;
        //     const mhDelta = ((mh >>> 31) ^ mb) * shiftMask;
        
        //     phc[idx] ^= phDelta;
        //     mhc[idx] ^= mhDelta;
        
        //     ph = (ph << 1) | pb;
        //     mh = (mh << 1) | mb;
        
        //     pv = mh | ~(xv | ph);
        //     mv = ph & xv;
        // }



        // // Process each character of `a` using bitwise dynamic programming
        // for (let i = 0; i < n; i++) {
        //     const ch = a.charCodeAt(i);
        //     const eq = peq[ch];
        //     const idx = i >> 5;        // Divide by 32
        //     const bit = i & 31;        // Modulo 32
        //     const pb = (phc[idx] >>> bit) & 1;
        //     const mb = (mhc[idx] >>> bit) & 1;

        //     const xv = eq | mv;
        //     const xh = ((((eq | mb) & pv) + pv) ^ pv) | eq | mb;

        //     let ph = mv | ~(xh | pv);
        //     let mh = pv & xh;

        //     // Update bitvectors by XORing with new state
        //     phc[idx] ^= ((ph >>> 31) ^ pb) << bit;
        //     mhc[idx] ^= ((mh >>> 31) ^ mb) << bit;

        //     // Prepare for next iteration
        //     ph = (ph << 1) | pb;
        //     mh = (mh << 1) | mb;
        //     pv = mh | ~(xv | ph);
        //     mv = ph & xv;
        // }

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
        const eq = peq[a.charCodeAt(i)];
        const pb = (phc[(i / 32) | 0] >>> i) & 1;
        const mb = (mhc[(i / 32) | 0] >>> i) & 1;
        const xv = eq | mv;
        const xh = ((((eq | mb) & pv) + pv) ^ pv) | eq | mb;
        let ph = mv | ~(xh | pv);
        let mh = pv & xh;
        score += (ph >>> (m - 1)) & 1;
        score -= (mh >>> (m - 1)) & 1;
        if ((ph >>> 31) ^ pb) {
            phc[(i / 32) | 0] ^= 1 << i;
        }
        if ((mh >>> 31) ^ mb) {
            mhc[(i / 32) | 0] ^= 1 << i;
        }
        ph = (ph << 1) | pb;
        mh = (mh << 1) | mb;
        pv = mh | ~(xv | ph);
        mv = ph & xv;
    }
    // for (let i = 0; i < n; i++) {
    //     const eq = peq[a.charCodeAt(i)];

    //     const idx = i >> 5;
    //     const bit = i & 31;
    //     const shiftBit = 1 << bit;

    //     const pvIdx = phc[idx];
    //     const mvIdx = mhc[idx];

    //     const pb = (pvIdx >>> bit) & 1;
    //     const mb = (mvIdx >>> bit) & 1;

    //     const xv = eq | mv;
    //     const xh = ((((eq | mb) & pv) + pv) ^ pv) | eq | mb;

    //     let ph = mv | ~(xh | pv);
    //     let mh = pv & xh;

    //     // Update score (bit at `shift` only — usually 31)
    //     const phBit = (ph >>> shift) & 1;
    //     const mhBit = (mh >>> shift) & 1;
    //     score += phBit - mhBit;

    //     const phMask = ((ph >>> 31) ^ pb) * shiftBit;
    //     const mhMask = ((mh >>> 31) ^ mb) * shiftBit;

    //     phc[idx] ^= phMask;
    //     mhc[idx] ^= mhMask;

    //     ph = (ph << 1) | pb;
    //     mh = (mh << 1) | mb;
    //     pv = mh | ~(xv | ph);
    //     mv = ph & xv;
    // }


    // for (let i = 0; i < n; i++) {
    //     const ch = a.charCodeAt(i);
    //     const eq = peq[ch];
    //     const idx = i >> 5;
    //     const bit = i & 31;
    //     const pb = (phc[idx] >>> bit) & 1;
    //     const mb = (mhc[idx] >>> bit) & 1;

    //     const xv = eq | mv;
    //     const xh = ((((eq | mb) & pv) + pv) ^ pv) | eq | mb;

    //     let ph = mv | ~(xh | pv);
    //     let mh = pv & xh;

    //     // Update score based on bit shifted to `shift` position (MSB in final block)
    //     score += ((ph >>> shift) & 1);
    //     score -= ((mh >>> shift) & 1);

    //     phc[idx] ^= ((ph >>> 31) ^ pb) << bit;
    //     mhc[idx] ^= ((mh >>> 31) ^ mb) << bit;

    //     ph = (ph << 1) | pb;
    //     mh = (mh << 1) | mb;
    //     pv = mh | ~(xv | ph);
    //     mv = ph & xv;
    // }

    // Clear final bitmask state
    for (let k = start; k < end; k++) {
        peq[b.charCodeAt(k)] = 0;
    }

    return score;
};
