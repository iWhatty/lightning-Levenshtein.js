// bench\bolt\lev-direct-dispatch.js
"use strict";

import {
    lev_2x1,
    lev_2x2,
    lev3x1,
    lev_3x2,
    lev_3x3,
    lev_4x4,
    lev_4x3,
    lev_4x2,
    lev_4x1
} from './levenshtein_Direct_Matrix.js';




/**
 * Dispatcher for length-2 a, assuming a.length >= b.length
 */
export function lev2_dispatch(a, b) {
    const lb = b.length;
    if (lb === 2) return lev_2x2(a, b);
    if (lb === 1) return lev_2x1(a, b);
    return 2;

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
    if (lb === 3) return lev_3x3(a, b);
    if (lb === 2) return lev_3x2(a, b);
    if (lb === 1) return lev3x1(a, b);
    return 3
    // return lev3_strategy[b.length](a, b)
}



/**
 * Dispatcher for length-4 a, assuming a.length >= b.length
 */
export function lev4_dispatch(a, b) {
    const lb = b.length;
    if (lb === 4) return lev_4x4(a, b);
    if (lb === 3) return lev_4x3(a, b);
    if (lb === 2) return lev_4x2(a, b);
    if (lb === 1) return lev_4x1(a, b);
    return 4

}