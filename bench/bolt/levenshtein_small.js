
"use strict";

export function levenshtein_small(a, b) {
  const la = a.length;
  const lb = b.length;

  if (la === 0) return lb;
  if (lb === 0) return la;
  if (a === b) return 0;

  // Fast paths for specific lengths
  if (la === 3 && lb === 3) return lev_3x3(a, b);
  if (la === 4 && lb === 4) return lev_4x4(a, b);
  if (la === 4 && lb === 3) return lev_4x3(a, b);
  // if (la === 4 && lb === 3) return lev_3x4(b, a); 

  // Fallback for unexpected cases
  // return genericLevenshtein(a, b);
}

function min3(x, y, z){
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


// 3x3
function _3lev_3x3(a, b) {
  const a0 = a.charCodeAt(0), a1 = a.charCodeAt(1), a2 = a.charCodeAt(2);
  const b0 = b.charCodeAt(0), b1 = b.charCodeAt(1), b2 = b.charCodeAt(2);

  const d00 = 0;
  const d01 = 1, d02 = 2, d03 = 3;
  const d10 = 1;

  const d11 = min3(d01 + 1, d10 + 1, d00 + (a0 ^ b0 ? 1 : 0));
  const d12 = min3(d02 + 1, d11 + 1, d01 + (a0 ^ b1 ? 1 : 0));
  const d13 = min3(d03 + 1, d12 + 1, d02 + (a0 ^ b2 ? 1 : 0));

  const d20 = 2;
  const d21 = min3(d11 + 1, d20 + 1, d10 + (a1 ^ b0 ? 1 : 0));
  const d22 = min3(d12 + 1, d21 + 1, d11 + (a1 ^ b1 ? 1 : 0));
  const d23 = min3(d13 + 1, d22 + 1, d12 + (a1 ^ b2 ? 1 : 0));

  const d30 = 3;
  const d31 = min3(d21 + 1, d30 + 1, d20 + (a2 ^ b0 ? 1 : 0));
  const d32 = min3(d22 + 1, d31 + 1, d21 + (a2 ^ b1 ? 1 : 0));
  const d33 = min3(d23 + 1, d32 + 1, d22 + (a2 ^ b2 ? 1 : 0));

  return d33;
}

// 3x3
function _2lev_3x3(a, b) {
  const a0 = a.charCodeAt(0), a1 = a.charCodeAt(1), a2 = a.charCodeAt(2);
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
  const d31 = Math.min(d21 + 1, d30 + 1, d20 + (a2 !== b0));
  const d32 = Math.min(d22 + 1, d31 + 1, d21 + (a2 !== b1));
  const d33 = Math.min(d23 + 1, d32 + 1, d22 + (a2 !== b2));

  return d33;
}


// 3x3
function _lev_3x3(a, b) {
  const a0 = a.charCodeAt(0), a1 = a.charCodeAt(1), a2 = a.charCodeAt(2);
  const b0 = b.charCodeAt(0), b1 = b.charCodeAt(1), b2 = b.charCodeAt(2);

  const d00 = 0;
  const d01 = 1, d02 = 2, d03 = 3;
  const d10 = 1;
  const d11 = Math.min(d01 + 1, d10 + 1, d00 + (a0 !== b0));
  const d12 = Math.min(d02 + 1, d11 + 1, d01 + (a0 !== b1));
  const d13 = Math.min(d03 + 1, d12 + 1, d02 + (a0 !== b2));

  const d20 = 2;
  const d21 = Math.min(d11 + 1, d20 + 1, d10 + (a1 !== b0));
  const d22 = Math.min(d12 + 1, d21 + 1, d11 + (a1 !== b1));
  const d23 = Math.min(d13 + 1, d22 + 1, d12 + (a1 !== b2));

  const d30 = 3;
  const d31 = Math.min(d21 + 1, d30 + 1, d20 + (a2 !== b0));
  const d32 = Math.min(d22 + 1, d31 + 1, d21 + (a2 !== b1));
  const d33 = Math.min(d23 + 1, d32 + 1, d22 + (a2 !== b2));

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



// function _2lev_4x4(a, b) {
//   const a0 = a.charCodeAt(0), a1 = a.charCodeAt(1), a2 = a.charCodeAt(2), a3 = a.charCodeAt(3);
//   const b0 = b.charCodeAt(0), b1 = b.charCodeAt(1), b2 = b.charCodeAt(2), b3 = b.charCodeAt(3);

//   const d00 = 0;
//   const d01 = 1, d02 = 2, d03 = 3, d04 = 4;
//   const d10 = 1;
//   const d11 = Math.min(d01 + 1, d10 + 1, d00 + (a0 !== b0));
//   const d12 = Math.min(d02 + 1, d11 + 1, d01 + (a0 !== b1));
//   const d13 = Math.min(d03 + 1, d12 + 1, d02 + (a0 !== b2));
//   const d14 = Math.min(d04 + 1, d13 + 1, d03 + (a0 !== b3));

//   const d20 = 2;
//   const d21 = Math.min(d11 + 1, d20 + 1, d10 + (a1 !== b0));
//   const d22 = Math.min(d12 + 1, d21 + 1, d11 + (a1 !== b1));
//   const d23 = Math.min(d13 + 1, d22 + 1, d12 + (a1 !== b2));
//   const d24 = Math.min(d14 + 1, d23 + 1, d13 + (a1 !== b3));

//   const d30 = 3;
//   const d31 = Math.min(d21 + 1, d30 + 1, d20 + (a2 !== b0));
//   const d32 = Math.min(d22 + 1, d31 + 1, d21 + (a2 !== b1));
//   const d33 = Math.min(d23 + 1, d32 + 1, d22 + (a2 !== b2));
//   const d34 = Math.min(d24 + 1, d33 + 1, d23 + (a2 !== b3));

//   const d40 = 4;
//   const d41 = Math.min(d31 + 1, d40 + 1, d30 + (a3 !== b0));
//   const d42 = Math.min(d32 + 1, d41 + 1, d31 + (a3 !== b1));
//   const d43 = Math.min(d33 + 1, d42 + 1, d32 + (a3 !== b2));
//   const d44 = Math.min(d34 + 1, d43 + 1, d33 + (a3 !== b3));

//   return d44;
// }



// // 4x4
// function _lev_4x4(a, b) {
//   const ac = [0, 0, 0, 0], bc = [0, 0, 0, 0];
//   for (let i = 0; i < 4; i++) {
//     ac[i] = a.charCodeAt(i);
//     bc[i] = b.charCodeAt(i);
//   }

//   const d = Array.from({ length: 5 }, (_, i) => Array(5).fill(0));
//   for (let i = 0; i <= 4; i++) {
//     d[i][0] = i;
//     d[0][i] = i;
//   }

//   for (let i = 1; i <= 4; i++) {
//     for (let j = 1; j <= 4; j++) {
//       const cost = ac[i - 1] === bc[j - 1] ? 0 : 1;
//       d[i][j] = Math.min(
//         d[i - 1][j] + 1,
//         d[i][j - 1] + 1,
//         d[i - 1][j - 1] + cost
//       );
//     }
//   }

//   return d[4][4];
// }

// function lev_4x3(a, b) {
//   const ac = [a.charCodeAt(0), a.charCodeAt(1), a.charCodeAt(2), a.charCodeAt(3)];
//   const bc = [b.charCodeAt(0), b.charCodeAt(1), b.charCodeAt(2)];

//   const d = Array.from({ length: 5 }, (_, i) => Array(4).fill(0));
//   for (let i = 0; i <= 4; i++) d[i][0] = i;
//   for (let j = 0; j <= 3; j++) d[0][j] = j;

//   for (let i = 1; i <= 4; i++) {
//     for (let j = 1; j <= 3; j++) {
//       const cost = ac[i - 1] === bc[j - 1] ? 0 : 1;
//       d[i][j] = Math.min(
//         d[i - 1][j] + 1,       // deletion
//         d[i][j - 1] + 1,       // insertion
//         d[i - 1][j - 1] + cost // substitution
//       );
//     }
//   }

//   return d[4][3];
// }


//   // Fallback version for safety
//   function genericLevenshtein(a, b) {
//     const la = a.length, lb = b.length;
//     const d = Array.from({ length: la + 1 }, () => Array(lb + 1).fill(0));
//     for (let i = 0; i <= la; i++) d[i][0] = i;
//     for (let j = 0; j <= lb; j++) d[0][j] = j;

//     for (let i = 1; i <= la; i++) {
//       const ac = a.charCodeAt(i - 1);
//       for (let j = 1; j <= lb; j++) {
//         const bc = b.charCodeAt(j - 1);
//         const cost = ac === bc ? 0 : 1;
//         d[i][j] = Math.min(
//           d[i - 1][j] + 1,
//           d[i][j - 1] + 1,
//           d[i - 1][j - 1] + cost
//         );
//       }
//     }

//     return d[la][lb];
//   }



// export function _2levenshtein_small(a, b) {
//   const la = a.length;
//   const lb = b.length;

//   if (la === 0) return lb;
//   if (lb === 0) return la;
//   if (a === b) return 0;

//   // Pre-allocated flat 1D matrix (max 5x5)
//   const d = new Uint8Array(25);
//   const idx = (i, j) => i * 5 + j;

//   // Init base cases
//   for (let i = 0; i <= la; i++) d[idx(i, 0)] = i;
//   for (let j = 0; j <= lb; j++) d[idx(0, j)] = j;

//   for (let i = 1; i <= la; i++) {
//     const ac = a.charCodeAt(i - 1);
//     for (let j = 1; j <= lb; j++) {
//       const bc = b.charCodeAt(j - 1);
//       const cost = +(ac !== bc);
//       d[idx(i, j)] = Math.min(
//         d[idx(i - 1, j)] + 1,
//         d[idx(i, j - 1)] + 1,
//         d[idx(i - 1, j - 1)] + cost
//       );
//     }
//   }

//   return d[idx(la, lb)];
// }



// export function _levenshtein_small(a, b) {
//   const la = a.length;
//   const lb = b.length;

//   if (la === 0) return lb;
//   if (lb === 0) return la;
//   if (a === b) return 0;

//   // Fixed-size DP matrix
//   const d = [
//     [0, 1, 2, 3, 4],
//     [1, 0, 0, 0, 0],
//     [2, 0, 0, 0, 0],
//     [3, 0, 0, 0, 0],
//     [4, 0, 0, 0, 0],
//   ];

//   for (let i = 1; i <= la; i++) {
//     const ac = a.charCodeAt(i - 1);
//     for (let j = 1; j <= lb; j++) {
//       const bc = b.charCodeAt(j - 1);
//       const cost = ac === bc ? 0 : 1;
//       d[i][j] = Math.min(
//         d[i - 1][j] + 1,       // deletion
//         d[i][j - 1] + 1,       // insertion
//         d[i - 1][j - 1] + cost // substitution
//       );
//     }
//   }

//   return d[la][lb];
// }
