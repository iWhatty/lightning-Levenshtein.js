
// myers-x-variants\myers_x7.js

// Change from baseline:
// - use bit-math sizes: (n + 31) >> 5, (m + 31) >> 5
// - use unsigned shift for word index: z >>> 5
// ensureScratch  let i = size;
// XXX-SKIP const start = j << 5;
// XXX-SKIP const start = (vsize - 1) << 5;
// declare input as const


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


export const myers_x7 = (a1, b1, n, m) => {

    const a = a1;
    const b = b1;
    const hsize = (n + 31) >> 5;
    const vsize = (m + 31) >> 5;

    const last = m - 1;
    const start = (vsize - 1) * 32;
    // const start = (vsize - 1) << 5;
    const end = start + Math.min(32, m - start);

    let mv = 0;
    let pv = -1;
    let score = m;

    ensureScratch(hsize);
    const phc = phcBuf;
    const mhc = mhcBuf;

    for (let j = 0; j < vsize - 1; j++) {
        let pv = -1, mv = 0;
        const start = j * 32;
        // const start = j << 5;
        const end = start + 32;

        for (let z = start; z < end; z++) {
            peq[b.charCodeAt(z)] |= 1 << z;
        }

        for (let z = 0; z < n; z++) {
            const word = z >>> 5;
            const eq = peq[a.charCodeAt(z)];
            const pb = (phc[word] >>> z) & 1;
            const mb = (mhc[word] >>> z) & 1;
            const xv = eq | mv;
            const xh = ((((eq | mb) & pv) + pv) ^ pv) | eq | mb;

            let ph = mv | ~(xh | pv);
            let mh = pv & xh;

            if ((ph >>> 31) ^ pb) phc[word] ^= 1 << z;
            if ((mh >>> 31) ^ mb) mhc[word] ^= 1 << z;

            ph = (ph << 1) | pb;
            mh = (mh << 1) | mb;
            pv = mh | ~(xv | ph);
            mv = ph & xv;
        }

        for (let z = start; z < end; z++) {
            peq[b.charCodeAt(z)] = 0;
        }
    }

    for (let z = start; z < end; z++) {
        peq[b.charCodeAt(z)] |= 1 << z;
    }

    for (let z = 0; z < n; z++) {
        const word = z >>> 5;
        const eq = peq[a.charCodeAt(z)];
        const pb = (phc[word] >>> z) & 1;
        const mb = (mhc[word] >>> z) & 1;
        const xv = eq | mv;
        const xh = ((((eq | mb) & pv) + pv) ^ pv) | eq | mb;

        let ph = mv | ~(xh | pv);
        let mh = pv & xh;

        score += (ph >>> last) & 1;
        score -= (mh >>> last) & 1;

        if ((ph >>> 31) ^ pb) phc[word] ^= 1 << z;
        if ((mh >>> 31) ^ mb) mhc[word] ^= 1 << z;

        ph = (ph << 1) | pb;
        mh = (mh << 1) | mb;
        pv = mh | ~(xv | ph);
        mv = ph & xv;
    }

    for (let z = start; z < end; z++) {
        peq[b.charCodeAt(z)] = 0;
    }

    return score;
};