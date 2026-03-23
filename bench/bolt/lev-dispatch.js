// bench\bolt\lev-direct-dispatch.js
"use strict";

import {
    lev_3x2,
    lev_3x3,
    lev_4x4,
    lev_4x3,
    lev_4x2,
    lev_4x1
} from './levenshtein_Direct_Matrix.js';


/* ==== 2-char Cases ==== */

/**
 * (2,1): Assumes a.length === 2 and b.length === 1
 */

function lev_2x1(a, b) {
    return (a[0] === b || a[1] === b) ? 1 : 2;
}

function lev_2x1_char(a, b) {
    const a0 = a.charCodeAt(0), a1 = a.charCodeAt(1);
    const b0 = b.charCodeAt(0);

    if (a0 === b0 || a1 === b0) return 1;
    return 2;
}

/**
 * (2,2): Assumes a.length === 2 and b.length === 2
 */
function lev_2x2_OG(a, b) {
    const a0 = a.charCodeAt(0);
    const a1 = a.charCodeAt(1);
    const b0 = b.charCodeAt(0);
    const b1 = b.charCodeAt(1);

    return (a0 !== b0) + (a1 !== b1);
}

function lev_2x2(a, b) {
    return (a.charCodeAt(0) !== b.charCodeAt(0)) + (a.charCodeAt(1) !== b.charCodeAt(1));
}



/**
 * Dispatcher for length-2 a, assuming a.length >= b.length
 */
export function lev2_dispatch(a, b) {
    const lb = b.length;
    if (lb > 1) return lev_2x2(a, b);
    if (lb > 0) return lev_2x1(a, b);
    return 2;

}


/**
 * (3,1): Assumes a.length === 3 and b.length === 1
 */
function lev_3x1(a, b) {
    const a0 = a.charCodeAt(0), a1 = a.charCodeAt(1), a2 = a.charCodeAt(2);
    const b0 = b.charCodeAt(0);
    return (a0 === b0 || a1 === b0 || a2 === b0) ? 2 : 3;
}



// IF'tree seems faster then the double dispatch map
// const lev3_strategy = new Array(3);
// lev3_strategy[0] = 3;
// lev3_strategy[1] = lev31_direct;
// lev3_strategy[2] = lev_3x2;
// lev3_strategy[3] = lev_3x3;

/**
 * Dispatcher for length-3 a, assuming a.length >= b.length
 */
export function lev3_dispatch(a, b) {
    const lb = b.length;
    if (lb > 2) return lev_3x3(a, b);
    if (lb > 1) return lev_3x2(a, b);
    if (lb > 0) return lev_3x1(a, b);
    return 3
    // return lev3_strategy[b.length](a, b)
}



/**
 * Dispatcher for length-4 a, assuming a.length >= b.length
 */
export function lev4_dispatch(a, b) {
    const lb = b.length;
    if (lb > 3) return lev_4x4(a, b);
    if (lb > 2) return lev_4x3(a, b);
    if (lb > 1) return lev_4x2(a, b);
    if (lb > 0) return lev_4x1(a, b);
    return 4

}