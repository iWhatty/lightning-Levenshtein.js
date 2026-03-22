// bench/bolt/myers_16.js
"use strict";

// const peq = new Uint32Array(65536);
const peq = new Uint16Array(65536);
/**
 * Specialized 1-word Myers for 1..16 char patterns.
 * Assumes a.length >= b.length.
 *
 * a = longer string / pattern
 * b = shorter string / text
 */
export function myers_16(a1, b1) {
    const a = a1;
    const b = b1;
    const n = a.length;
    const m = b.length;

    let pv = -1;
    let mv = 0;
    let score = n;

    const lst = 1 << (n - 1);
    const mask = n === 16 ? 0xFFFF : ((1 << n) - 1);
    
    let i = n;
    while (i--) {
        peq[a.charCodeAt(i)] |= 1 << i;
    }

    for (i = 0; i < m; i++) {
        pv &= mask;
        mv &= mask;

        let eq = peq[b.charCodeAt(i)];
        const xv = eq | mv;
        eq |= ((eq & pv) + pv) ^ pv;
        let ph = mv | ~(eq | pv);
        let mh = pv & eq;

        score += ((ph & lst) !== 0) - ((mh & lst) !== 0);

        mv = (ph << 1) | 1;
        pv = (mh << 1) | ~(xv | mv);
        mv &= xv;
    }

    i = n;
    while (i--) {
        peq[a.charCodeAt(i)] = 0;
    }

    return score;
}