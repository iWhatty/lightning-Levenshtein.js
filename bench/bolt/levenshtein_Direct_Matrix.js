
"use strict";


function min3(x, y, z) {
  return (x < y ? (x < z ? x : z) : (y < z ? y : z));
}

export function lev_3x3(a, b) {
  const a0 = a.charCodeAt(0), a1 = a.charCodeAt(1), a2 = a.charCodeAt(2);
  const b0 = b.charCodeAt(0), b1 = b.charCodeAt(1), b2 = b.charCodeAt(2);

  const d00 = 0;
  const d01 = 1, d02 = 2, d03 = 3;
  const d10 = 1;

  const d11 = d01 < d10
    ? (d01 < d00 + (a0 !== b0) ? d01 + 1 : d00 + (a0 !== b0))
    : (d10 + 1 < d00 + (a0 !== b0) ? d10 + 1 : d00 + (a0 !== b0));


  const d12 = d02 < d11
    ? (d02 < d01 + (a0 !== b1) ? d02 + 1 : d01 + (a0 !== b1))
    : (d11 + 1 < d01 + (a0 !== b1) ? d11 + 1 : d01 + (a0 !== b1));

  const d13 = d03 < d12
    ? (d03 < d02 + (a0 !== b2) ? d03 + 1 : d02 + (a0 !== b2))
    : (d12 + 1 < d02 + (a0 !== b2) ? d12 + 1 : d02 + (a0 !== b2));

  const d20 = 2;
  const d21 = d11 < d20
    ? (d11 < d10 + (a1 !== b0) ? d11 + 1 : d10 + (a1 !== b0))
    : (d20 + 1 < d10 + (a1 !== b0) ? d20 + 1 : d10 + (a1 !== b0));

  const d22 = d12 < d21
    ? (d12 < d11 + (a1 !== b1) ? d12 + 1 : d11 + (a1 !== b1))
    : (d21 + 1 < d11 + (a1 !== b1) ? d21 + 1 : d11 + (a1 !== b1));

  const d23 = d13 < d22
    ? (d13 < d12 + (a1 !== b2) ? d13 + 1 : d12 + (a1 !== b2))
    : (d22 + 1 < d12 + (a1 !== b2) ? d22 + 1 : d12 + (a1 !== b2));

  const d30 = 3;
  const d31 = d21 < d30
    ? (d21 < d20 + (a2 !== b0) ? d21 + 1 : d20 + (a2 !== b0))
    : (d30 + 1 < d20 + (a2 !== b0) ? d30 + 1 : d20 + (a2 !== b0));

  const d32 = d22 < d31
    ? (d22 < d21 + (a2 !== b1) ? d22 + 1 : d21 + (a2 !== b1))
    : (d31 + 1 < d21 + (a2 !== b1) ? d31 + 1 : d21 + (a2 !== b1));

  const d33 = d23 < d32
    ? (d23 < d22 + (a2 !== b2) ? d23 + 1 : d22 + (a2 !== b2))
    : (d32 + 1 < d22 + (a2 !== b2) ? d32 + 1 : d22 + (a2 !== b2));

  return d33;
}




export function lev_4x4(a, b) {
  const a0 = a.charCodeAt(0), a1 = a.charCodeAt(1), a2 = a.charCodeAt(2), a3 = a.charCodeAt(3);
  const b0 = b.charCodeAt(0), b1 = b.charCodeAt(1), b2 = b.charCodeAt(2), b3 = b.charCodeAt(3);

  const d00 = 0;
  const d01 = 1, d02 = 2, d03 = 3, d04 = 4;
  const d10 = 1;
  const d11 = min3(d01 + 1, d10 + 1, d00 + (a0 !== b0));
  const d12 = min3(d02 + 1, d11 + 1, d01 + (a0 !== b1));
  const d13 = min3(d03 + 1, d12 + 1, d02 + (a0 !== b2));
  const d14 = min3(d04 + 1, d13 + 1, d03 + (a0 !== b3));

  const d20 = 2;
  const d21 = min3(d11 + 1, d20 + 1, d10 + (a1 !== b0));
  const d22 = min3(d12 + 1, d21 + 1, d11 + (a1 !== b1));
  const d23 = min3(d13 + 1, d22 + 1, d12 + (a1 !== b2));
  const d24 = min3(d14 + 1, d23 + 1, d13 + (a1 !== b3));

  const d30 = 3;
  const d31 = min3(d21 + 1, d30 + 1, d20 + (a2 !== b0));
  const d32 = min3(d22 + 1, d31 + 1, d21 + (a2 !== b1));
  const d33 = min3(d23 + 1, d32 + 1, d22 + (a2 !== b2));
  const d34 = min3(d24 + 1, d33 + 1, d23 + (a2 !== b3));

  const d40 = 4;
  const d41 = min3(d31 + 1, d40 + 1, d30 + (a3 !== b0));
  const d42 = min3(d32 + 1, d41 + 1, d31 + (a3 !== b1));
  const d43 = min3(d33 + 1, d42 + 1, d32 + (a3 !== b2));
  const d44 = min3(d34 + 1, d43 + 1, d33 + (a3 !== b3));

  return d44;
}


export function lev_4x3(a, b) {
  const a0 = a.charCodeAt(0), a1 = a.charCodeAt(1), a2 = a.charCodeAt(2), a3 = a.charCodeAt(3);
  const b0 = b.charCodeAt(0), b1 = b.charCodeAt(1), b2 = b.charCodeAt(2);

  const d00 = 0;
  const d01 = 1, d02 = 2, d03 = 3;

  const d10 = 1;
  const d11 = min3(d01 + 1, d10 + 1, d00 + (a0 !== b0));
  const d12 = min3(d02 + 1, d11 + 1, d01 + (a0 !== b1));
  const d13 = min3(d03 + 1, d12 + 1, d02 + (a0 !== b2));

  const d20 = 2;
  const d21 = min3(d11 + 1, d20 + 1, d10 + (a1 !== b0));
  const d22 = min3(d12 + 1, d21 + 1, d11 + (a1 !== b1));
  const d23 = min3(d13 + 1, d22 + 1, d12 + (a1 !== b2));

  const d30 = 3;
  const d31 = min3(d21 + 1, d30 + 1, d20 + (a2 !== b0));
  const d32 = min3(d22 + 1, d31 + 1, d21 + (a2 !== b1));
  const d33 = min3(d23 + 1, d32 + 1, d22 + (a2 !== b2));

  const d40 = 4;
  const d41 = min3(d31 + 1, d40 + 1, d30 + (a3 !== b0));
  const d42 = min3(d32 + 1, d41 + 1, d31 + (a3 !== b1));
  const d43 = min3(d33 + 1, d42 + 1, d32 + (a3 !== b2));

  return d43;
}


export function lev_4x2(a, b) {
  const a0 = a.charCodeAt(0), a1 = a.charCodeAt(1), a2 = a.charCodeAt(2), a3 = a.charCodeAt(3);
  const b0 = b.charCodeAt(0), b1 = b.charCodeAt(1);

  const d00 = 0;
  const d01 = 1, d02 = 2;

  const d10 = 1;
  const d11 = min3(d01 + 1, d10 + 1, d00 + (a0 !== b0));
  const d12 = min3(d02 + 1, d11 + 1, d01 + (a0 !== b1));

  const d20 = 2;
  const d21 = min3(d11 + 1, d20 + 1, d10 + (a1 !== b0));
  const d22 = min3(d12 + 1, d21 + 1, d11 + (a1 !== b1));

  const d30 = 3;
  const d31 = min3(d21 + 1, d30 + 1, d20 + (a2 !== b0));
  const d32 = min3(d22 + 1, d31 + 1, d21 + (a2 !== b1));

  const d40 = 4;
  const d41 = min3(d31 + 1, d40 + 1, d30 + (a3 !== b0));
  const d42 = min3(d32 + 1, d41 + 1, d31 + (a3 !== b1));

  return d42;
}


export function lev_4x1(a, b) {
  const a0 = a.charCodeAt(0), a1 = a.charCodeAt(1), a2 = a.charCodeAt(2), a3 = a.charCodeAt(3);
  const b0 = b.charCodeAt(0);

  const d00 = 0;
  const d01 = 1;

  const d10 = 1;
  const d11 = min3(d01 + 1, d10 + 1, d00 + (a0 !== b0));

  const d20 = 2;
  const d21 = min3(d11 + 1, d20 + 1, d10 + (a1 !== b0));

  const d30 = 3;
  const d31 = min3(d21 + 1, d30 + 1, d20 + (a2 !== b0));

  const d40 = 4;
  const d41 = min3(d31 + 1, d40 + 1, d30 + (a3 !== b0));

  return d41;
}