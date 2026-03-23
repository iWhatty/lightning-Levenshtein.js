// bench/bolt/myers_512.js
"use strict";

const peq0  = new Uint32Array(65536);
const peq1  = new Uint32Array(65536);
const peq2  = new Uint32Array(65536);
const peq3  = new Uint32Array(65536);
const peq4  = new Uint32Array(65536);
const peq5  = new Uint32Array(65536);
const peq6  = new Uint32Array(65536);
const peq7  = new Uint32Array(65536);
const peq8  = new Uint32Array(65536);
const peq9  = new Uint32Array(65536);
const peq10 = new Uint32Array(65536);
const peq11 = new Uint32Array(65536);
const peq12 = new Uint32Array(65536);
const peq13 = new Uint32Array(65536);
const peq14 = new Uint32Array(65536);
const peq15 = new Uint32Array(65536);

/**
 * Specialized 16-word Myers for 481..512 char patterns.
 * Assumes a.length >= b.length.
 *
 * a = longer string / pattern
 * b = shorter string / text
 */
export function myers_512(a1, b1) {

    const a = a1;
    const b = b1;
    const n = a.length;
    const m = b.length;

    let pv0 = -1,  mv0 = 0;
    let pv1 = -1,  mv1 = 0;
    let pv2 = -1,  mv2 = 0;
    let pv3 = -1,  mv3 = 0;
    let pv4 = -1,  mv4 = 0;
    let pv5 = -1,  mv5 = 0;
    let pv6 = -1,  mv6 = 0;
    let pv7 = -1,  mv7 = 0;
    let pv8 = -1,  mv8 = 0;
    let pv9 = -1,  mv9 = 0;
    let pv10 = -1, mv10 = 0;
    let pv11 = -1, mv11 = 0;
    let pv12 = -1, mv12 = 0;
    let pv13 = -1, mv13 = 0;
    let pv14 = -1, mv14 = 0;
    let pv15 = -1, mv15 = 0;

    let score = n;
    let i = 0;

    // Build PEQ
    for (; i < 32; i++) {
        peq0[a.charCodeAt(i)]       |= (1 << i);
        peq1[a.charCodeAt(i + 32)]  |= (1 << i);
        peq2[a.charCodeAt(i + 64)]  |= (1 << i);
        peq3[a.charCodeAt(i + 96)]  |= (1 << i);
        peq4[a.charCodeAt(i + 128)] |= (1 << i);
        peq5[a.charCodeAt(i + 160)] |= (1 << i);
        peq6[a.charCodeAt(i + 192)] |= (1 << i);
        peq7[a.charCodeAt(i + 224)] |= (1 << i);
        peq8[a.charCodeAt(i + 256)] |= (1 << i);
        peq9[a.charCodeAt(i + 288)] |= (1 << i);
        peq10[a.charCodeAt(i + 320)] |= (1 << i);
        peq11[a.charCodeAt(i + 352)] |= (1 << i);
        peq12[a.charCodeAt(i + 384)] |= (1 << i);
        peq13[a.charCodeAt(i + 416)] |= (1 << i);
        peq14[a.charCodeAt(i + 448)] |= (1 << i);
    }
    for (i = 480; i < n; i++) {
        peq15[a.charCodeAt(i)] |= (1 << (i - 480));
    }

    const lastIndex = n - 1;
    const lastBit = lastIndex & 31;
    const lastMask = 1 << lastBit;

    for (i = 0; i < m; i++) {
        const ch = b.charCodeAt(i);

        let carryEq = 0;

        // ---- word 0 ----
        let eq0 = peq0[ch];
        const xv0 = eq0 | mv0;
        let t0 = ((eq0 & pv0) >>> 0) + (pv0 >>> 0) + carryEq;
        carryEq = t0 > 0xffffffff ? 1 : 0;
        let xh0 = ((t0 >>> 0) ^ pv0) | eq0;
        let ph0 = mv0 | ~(xh0 | pv0);
        let mh0 = pv0 & xh0;

        const carryPh0 = (ph0 >>> 31) & 1;
        const carryMh0 = (mh0 >>> 31) & 1;

        ph0 = (ph0 << 1) | 1;
        mh0 = (mh0 << 1);

        pv0 = mh0 | ~(xv0 | ph0);
        mv0 = ph0 & xv0;

        // ---- word 1 ----
        let eq1 = peq1[ch];
        const xv1 = eq1 | mv1;
        let t1 = ((eq1 & pv1) >>> 0) + (pv1 >>> 0) + carryEq;
        carryEq = t1 > 0xffffffff ? 1 : 0;
        let xh1 = ((t1 >>> 0) ^ pv1) | eq1;
        let ph1 = mv1 | ~(xh1 | pv1);
        let mh1 = pv1 & xh1;

        const carryPh1 = (ph1 >>> 31) & 1;
        const carryMh1 = (mh1 >>> 31) & 1;

        ph1 = (ph1 << 1) | carryPh0;
        mh1 = (mh1 << 1) | carryMh0;

        pv1 = mh1 | ~(xv1 | ph1);
        mv1 = ph1 & xv1;

        // ---- word 2 ----
        let eq2 = peq2[ch];
        const xv2 = eq2 | mv2;
        let t2 = ((eq2 & pv2) >>> 0) + (pv2 >>> 0) + carryEq;
        carryEq = t2 > 0xffffffff ? 1 : 0;
        let xh2 = ((t2 >>> 0) ^ pv2) | eq2;
        let ph2 = mv2 | ~(xh2 | pv2);
        let mh2 = pv2 & xh2;

        const carryPh2 = (ph2 >>> 31) & 1;
        const carryMh2 = (mh2 >>> 31) & 1;

        ph2 = (ph2 << 1) | carryPh1;
        mh2 = (mh2 << 1) | carryMh1;

        pv2 = mh2 | ~(xv2 | ph2);
        mv2 = ph2 & xv2;

        // ---- word 3 ----
        let eq3 = peq3[ch];
        const xv3 = eq3 | mv3;
        let t3 = ((eq3 & pv3) >>> 0) + (pv3 >>> 0) + carryEq;
        carryEq = t3 > 0xffffffff ? 1 : 0;
        let xh3 = ((t3 >>> 0) ^ pv3) | eq3;
        let ph3 = mv3 | ~(xh3 | pv3);
        let mh3 = pv3 & xh3;

        const carryPh3 = (ph3 >>> 31) & 1;
        const carryMh3 = (mh3 >>> 31) & 1;

        ph3 = (ph3 << 1) | carryPh2;
        mh3 = (mh3 << 1) | carryMh2;

        pv3 = mh3 | ~(xv3 | ph3);
        mv3 = ph3 & xv3;

        // ---- word 4 ----
        let eq4 = peq4[ch];
        const xv4 = eq4 | mv4;
        let t4 = ((eq4 & pv4) >>> 0) + (pv4 >>> 0) + carryEq;
        carryEq = t4 > 0xffffffff ? 1 : 0;
        let xh4 = ((t4 >>> 0) ^ pv4) | eq4;
        let ph4 = mv4 | ~(xh4 | pv4);
        let mh4 = pv4 & xh4;

        const carryPh4 = (ph4 >>> 31) & 1;
        const carryMh4 = (mh4 >>> 31) & 1;

        ph4 = (ph4 << 1) | carryPh3;
        mh4 = (mh4 << 1) | carryMh3;

        pv4 = mh4 | ~(xv4 | ph4);
        mv4 = ph4 & xv4;

        // ---- word 5 ----
        let eq5 = peq5[ch];
        const xv5 = eq5 | mv5;
        let t5 = ((eq5 & pv5) >>> 0) + (pv5 >>> 0) + carryEq;
        carryEq = t5 > 0xffffffff ? 1 : 0;
        let xh5 = ((t5 >>> 0) ^ pv5) | eq5;
        let ph5 = mv5 | ~(xh5 | pv5);
        let mh5 = pv5 & xh5;

        const carryPh5 = (ph5 >>> 31) & 1;
        const carryMh5 = (mh5 >>> 31) & 1;

        ph5 = (ph5 << 1) | carryPh4;
        mh5 = (mh5 << 1) | carryMh4;

        pv5 = mh5 | ~(xv5 | ph5);
        mv5 = ph5 & xv5;

        // ---- word 6 ----
        let eq6 = peq6[ch];
        const xv6 = eq6 | mv6;
        let t6 = ((eq6 & pv6) >>> 0) + (pv6 >>> 0) + carryEq;
        carryEq = t6 > 0xffffffff ? 1 : 0;
        let xh6 = ((t6 >>> 0) ^ pv6) | eq6;
        let ph6 = mv6 | ~(xh6 | pv6);
        let mh6 = pv6 & xh6;

        const carryPh6 = (ph6 >>> 31) & 1;
        const carryMh6 = (mh6 >>> 31) & 1;

        ph6 = (ph6 << 1) | carryPh5;
        mh6 = (mh6 << 1) | carryMh5;

        pv6 = mh6 | ~(xv6 | ph6);
        mv6 = ph6 & xv6;

        // ---- word 7 ----
        let eq7 = peq7[ch];
        const xv7 = eq7 | mv7;
        let t7 = ((eq7 & pv7) >>> 0) + (pv7 >>> 0) + carryEq;
        carryEq = t7 > 0xffffffff ? 1 : 0;
        let xh7 = ((t7 >>> 0) ^ pv7) | eq7;
        let ph7 = mv7 | ~(xh7 | pv7);
        let mh7 = pv7 & xh7;

        const carryPh7 = (ph7 >>> 31) & 1;
        const carryMh7 = (mh7 >>> 31) & 1;

        ph7 = (ph7 << 1) | carryPh6;
        mh7 = (mh7 << 1) | carryMh6;

        pv7 = mh7 | ~(xv7 | ph7);
        mv7 = ph7 & xv7;

        // ---- word 8 ----
        let eq8 = peq8[ch];
        const xv8 = eq8 | mv8;
        let t8 = ((eq8 & pv8) >>> 0) + (pv8 >>> 0) + carryEq;
        carryEq = t8 > 0xffffffff ? 1 : 0;
        let xh8 = ((t8 >>> 0) ^ pv8) | eq8;
        let ph8 = mv8 | ~(xh8 | pv8);
        let mh8 = pv8 & xh8;

        const carryPh8 = (ph8 >>> 31) & 1;
        const carryMh8 = (mh8 >>> 31) & 1;

        ph8 = (ph8 << 1) | carryPh7;
        mh8 = (mh8 << 1) | carryMh7;

        pv8 = mh8 | ~(xv8 | ph8);
        mv8 = ph8 & xv8;

        // ---- word 9 ----
        let eq9 = peq9[ch];
        const xv9 = eq9 | mv9;
        let t9 = ((eq9 & pv9) >>> 0) + (pv9 >>> 0) + carryEq;
        carryEq = t9 > 0xffffffff ? 1 : 0;
        let xh9 = ((t9 >>> 0) ^ pv9) | eq9;
        let ph9 = mv9 | ~(xh9 | pv9);
        let mh9 = pv9 & xh9;

        const carryPh9 = (ph9 >>> 31) & 1;
        const carryMh9 = (mh9 >>> 31) & 1;

        ph9 = (ph9 << 1) | carryPh8;
        mh9 = (mh9 << 1) | carryMh8;

        pv9 = mh9 | ~(xv9 | ph9);
        mv9 = ph9 & xv9;

        // ---- word 10 ----
        let eq10 = peq10[ch];
        const xv10 = eq10 | mv10;
        let t10 = ((eq10 & pv10) >>> 0) + (pv10 >>> 0) + carryEq;
        carryEq = t10 > 0xffffffff ? 1 : 0;
        let xh10 = ((t10 >>> 0) ^ pv10) | eq10;
        let ph10 = mv10 | ~(xh10 | pv10);
        let mh10 = pv10 & xh10;

        const carryPh10 = (ph10 >>> 31) & 1;
        const carryMh10 = (mh10 >>> 31) & 1;

        ph10 = (ph10 << 1) | carryPh9;
        mh10 = (mh10 << 1) | carryMh9;

        pv10 = mh10 | ~(xv10 | ph10);
        mv10 = ph10 & xv10;

        // ---- word 11 ----
        let eq11 = peq11[ch];
        const xv11 = eq11 | mv11;
        let t11 = ((eq11 & pv11) >>> 0) + (pv11 >>> 0) + carryEq;
        carryEq = t11 > 0xffffffff ? 1 : 0;
        let xh11 = ((t11 >>> 0) ^ pv11) | eq11;
        let ph11 = mv11 | ~(xh11 | pv11);
        let mh11 = pv11 & xh11;

        const carryPh11 = (ph11 >>> 31) & 1;
        const carryMh11 = (mh11 >>> 31) & 1;

        ph11 = (ph11 << 1) | carryPh10;
        mh11 = (mh11 << 1) | carryMh10;

        pv11 = mh11 | ~(xv11 | ph11);
        mv11 = ph11 & xv11;

        // ---- word 12 ----
        let eq12 = peq12[ch];
        const xv12 = eq12 | mv12;
        let t12 = ((eq12 & pv12) >>> 0) + (pv12 >>> 0) + carryEq;
        carryEq = t12 > 0xffffffff ? 1 : 0;
        let xh12 = ((t12 >>> 0) ^ pv12) | eq12;
        let ph12 = mv12 | ~(xh12 | pv12);
        let mh12 = pv12 & xh12;

        const carryPh12 = (ph12 >>> 31) & 1;
        const carryMh12 = (mh12 >>> 31) & 1;

        ph12 = (ph12 << 1) | carryPh11;
        mh12 = (mh12 << 1) | carryMh11;

        pv12 = mh12 | ~(xv12 | ph12);
        mv12 = ph12 & xv12;

        // ---- word 13 ----
        let eq13 = peq13[ch];
        const xv13 = eq13 | mv13;
        let t13 = ((eq13 & pv13) >>> 0) + (pv13 >>> 0) + carryEq;
        carryEq = t13 > 0xffffffff ? 1 : 0;
        let xh13 = ((t13 >>> 0) ^ pv13) | eq13;
        let ph13 = mv13 | ~(xh13 | pv13);
        let mh13 = pv13 & xh13;

        const carryPh13 = (ph13 >>> 31) & 1;
        const carryMh13 = (mh13 >>> 31) & 1;

        ph13 = (ph13 << 1) | carryPh12;
        mh13 = (mh13 << 1) | carryMh12;

        pv13 = mh13 | ~(xv13 | ph13);
        mv13 = ph13 & xv13;

        // ---- word 14 ----
        let eq14 = peq14[ch];
        const xv14 = eq14 | mv14;
        let t14 = ((eq14 & pv14) >>> 0) + (pv14 >>> 0) + carryEq;
        carryEq = t14 > 0xffffffff ? 1 : 0;
        let xh14 = ((t14 >>> 0) ^ pv14) | eq14;
        let ph14 = mv14 | ~(xh14 | pv14);
        let mh14 = pv14 & xh14;

        const carryPh14 = (ph14 >>> 31) & 1;
        const carryMh14 = (mh14 >>> 31) & 1;

        ph14 = (ph14 << 1) | carryPh13;
        mh14 = (mh14 << 1) | carryMh13;

        pv14 = mh14 | ~(xv14 | ph14);
        mv14 = ph14 & xv14;

        // ---- word 15 ----
        let eq15 = peq15[ch];
        const xv15 = eq15 | mv15;
        let t15 = ((eq15 & pv15) >>> 0) + (pv15 >>> 0) + carryEq;
        let xh15 = ((t15 >>> 0) ^ pv15) | eq15;
        let ph15 = mv15 | ~(xh15 | pv15);
        let mh15 = pv15 & xh15;

        if (ph15 & lastMask) score++;
        if (mh15 & lastMask) score--;

        ph15 = (ph15 << 1) | carryPh14;
        mh15 = (mh15 << 1) | carryMh14;

        pv15 = mh15 | ~(xv15 | ph15);
        mv15 = ph15 & xv15;
    }

    // Clear PEQ
    i = 0;
    for (; i < 32; i++) {
        peq0[a.charCodeAt(i)]        = 0;
        peq1[a.charCodeAt(i + 32)]   = 0;
        peq2[a.charCodeAt(i + 64)]   = 0;
        peq3[a.charCodeAt(i + 96)]   = 0;
        peq4[a.charCodeAt(i + 128)]  = 0;
        peq5[a.charCodeAt(i + 160)]  = 0;
        peq6[a.charCodeAt(i + 192)]  = 0;
        peq7[a.charCodeAt(i + 224)]  = 0;
        peq8[a.charCodeAt(i + 256)]  = 0;
        peq9[a.charCodeAt(i + 288)]  = 0;
        peq10[a.charCodeAt(i + 320)] = 0;
        peq11[a.charCodeAt(i + 352)] = 0;
        peq12[a.charCodeAt(i + 384)] = 0;
        peq13[a.charCodeAt(i + 416)] = 0;
        peq14[a.charCodeAt(i + 448)] = 0;
    }
    for (i = 480; i < n; i++) {
        peq15[a.charCodeAt(i)] = 0;
    }

    return score;
}