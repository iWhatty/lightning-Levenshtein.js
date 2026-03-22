


// bench\bolt\levenshtein_Direct_Matrix.js
"use strict";


function min3(x, y, z) {
    return (x < y ? (x < z ? x : z) : (y < z ? y : z));
}


/* ==== 2-char Cases ==== */

/**
 * (2,1): Assumes a.length === 2 and b.length === 1
 */
export function lev_2x1(a, b) {
    const a0 = a.charCodeAt(0), a1 = a.charCodeAt(1);
    const b0 = b.charCodeAt(0);

    if (a0 === b0 || a1 === b0) return 1;
    return 2;
}

/**
 * (2,2): Assumes a.length === 2 and b.length === 2
 */
export function lev_2x2(a, b) {
    const a0 = a.charCodeAt(0);
    const a1 = a.charCodeAt(1);
    const b0 = b.charCodeAt(0);
    const b1 = b.charCodeAt(1);

    return (a0 !== b0) + (a1 !== b1);
}


/* ==== 3-char Cases ==== */

/**
 * (3,1): Assumes a.length === 3 and b.length === 1
 */
export function lev3x1(a, b) {
    const a0 = a.charCodeAt(0), a1 = a.charCodeAt(1), a2 = a.charCodeAt(2);
    const b0 = b.charCodeAt(0);
    return (a0 === b0 || a1 === b0 || a2 === b0) ? 2 : 3;
}


export function lev_3x2(a, b) {
    const a0 = a.charCodeAt(0), a1 = a.charCodeAt(1), a2 = a.charCodeAt(2);
    const b0 = b.charCodeAt(0), b1 = b.charCodeAt(1);

    const d11 = (a0 !== b0);
    // const d11 = min3(2, 2, (a0 !== b0));
    const d12 = min3(3, d11 + 1, 1 + (a0 !== b1));

    const d21 = min3(d11 + 1, 3, 1 + (a1 !== b0));
    const d22 = min3(d12 + 1, d21 + 1, d11 + (a1 !== b1));

    const d31 = min3(d21 + 1, 4, 2 + (a2 !== b0));
    const d32 = min3(d22 + 1, d31 + 1, d21 + (a2 !== b1));

    return d32;
}


export function lev_3x3(a, b) {
    const a0 = a.charCodeAt(0), a1 = a.charCodeAt(1), a2 = a.charCodeAt(2);
    const b0 = b.charCodeAt(0), b1 = b.charCodeAt(1), b2 = b.charCodeAt(2);

    const d11 = (a0 !== b0);
    // const d11 = min3(2, 2, (a0 !== b0));
    const d12 = min3(3, d11 + 1, 1 + (a0 !== b1));
    const d13 = min3(4, d12 + 1, 2 + (a0 !== b2));

    const d21 = min3(d11 + 1, 3, 1 + (a1 !== b0));
    const d22 = min3(d12 + 1, d21 + 1, d11 + (a1 !== b1));
    const d23 = min3(d13 + 1, d22 + 1, d12 + (a1 !== b2));

    const d31 = min3(d21 + 1, 4, 2 + (a2 !== b0));
    const d32 = min3(d22 + 1, d31 + 1, d21 + (a2 !== b1));
    const d33 = min3(d23 + 1, d32 + 1, d22 + (a2 !== b2));

    return d33;
}


export function lev_4x4(a, b) {
    const a0 = a.charCodeAt(0), a1 = a.charCodeAt(1), a2 = a.charCodeAt(2), a3 = a.charCodeAt(3);
    const b0 = b.charCodeAt(0), b1 = b.charCodeAt(1), b2 = b.charCodeAt(2), b3 = b.charCodeAt(3);

    const d11 = (a0 !== b0);
    // const d11 = min3(2, 2, (a0 !== b0));
    const d12 = min3(3, d11 + 1, 1 + (a0 !== b1));
    const d13 = min3(4, d12 + 1, 2 + (a0 !== b2));
    const d14 = min3(5, d13 + 1, 3 + (a0 !== b3));

    const d21 = min3(d11 + 1, 3, 1 + (a1 !== b0));
    const d22 = min3(d12 + 1, d21 + 1, d11 + (a1 !== b1));
    const d23 = min3(d13 + 1, d22 + 1, d12 + (a1 !== b2));
    const d24 = min3(d14 + 1, d23 + 1, d13 + (a1 !== b3));

    const d31 = min3(d21 + 1, 4, 2 + (a2 !== b0));
    const d32 = min3(d22 + 1, d31 + 1, d21 + (a2 !== b1));
    const d33 = min3(d23 + 1, d32 + 1, d22 + (a2 !== b2));
    const d34 = min3(d24 + 1, d33 + 1, d23 + (a2 !== b3));

    const d41 = min3(d31 + 1, 5, 3 + (a3 !== b0));
    const d42 = min3(d32 + 1, d41 + 1, d31 + (a3 !== b1));
    const d43 = min3(d33 + 1, d42 + 1, d32 + (a3 !== b2));
    return min3(d34 + 1, d43 + 1, d33 + (a3 !== b3));
}


export function lev_4x3(a, b) {
    const a0 = a.charCodeAt(0), a1 = a.charCodeAt(1), a2 = a.charCodeAt(2), a3 = a.charCodeAt(3);
    const b0 = b.charCodeAt(0), b1 = b.charCodeAt(1), b2 = b.charCodeAt(2);

    const d11 = (a0 !== b0);
    // const d11 = min3(2, 2, (a0 !== b0));
    const d12 = min3(3, d11 + 1, 1 + (a0 !== b1));
    const d13 = min3(4, d12 + 1, 2 + (a0 !== b2));

    const d21 = min3(d11 + 1, 3, 1 + (a1 !== b0));
    const d22 = min3(d12 + 1, d21 + 1, d11 + (a1 !== b1));
    const d23 = min3(d13 + 1, d22 + 1, d12 + (a1 !== b2));

    const d31 = min3(d21 + 1, 4, 2 + (a2 !== b0));
    const d32 = min3(d22 + 1, d31 + 1, d21 + (a2 !== b1));
    const d33 = min3(d23 + 1, d32 + 1, d22 + (a2 !== b2));

    const d41 = min3(d31 + 1, 5, 3 + (a3 !== b0));
    const d42 = min3(d32 + 1, d41 + 1, d31 + (a3 !== b1));
    const d43 = min3(d33 + 1, d42 + 1, d32 + (a3 !== b2));

    return d43;
}


export function lev_4x2(a, b) {
    const a0 = a.charCodeAt(0), a1 = a.charCodeAt(1), a2 = a.charCodeAt(2), a3 = a.charCodeAt(3);
    const b0 = b.charCodeAt(0), b1 = b.charCodeAt(1);

    const d11 = (a0 !== b0);
    // const d11 = min3(2, 2, (a0 !== b0));
    const d12 = min3(3, d11 + 1, 1 + (a0 !== b1));

    const d21 = min3(d11 + 1, 3, 1 + (a1 !== b0));
    const d22 = min3(d12 + 1, d21 + 1, d11 + (a1 !== b1));

    const d31 = min3(d21 + 1, 4, 2 + (a2 !== b0));
    const d32 = min3(d22 + 1, d31 + 1, d21 + (a2 !== b1));

    const d41 = min3(d31 + 1, 5, 3 + (a3 !== b0));
    const d42 = min3(d32 + 1, d41 + 1, d31 + (a3 !== b1));

    return d42;
}


export function lev_4x1(a, b) {
    const b0 = b.charCodeAt(0);
    return 4 - ((a.charCodeAt(0) === b0) || (a.charCodeAt(1) === b0) || (a.charCodeAt(2) === b0) || (a.charCodeAt(3) === b0));
}