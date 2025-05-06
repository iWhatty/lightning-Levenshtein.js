"use strict";


// Auto-generated: Optimized Myers 32-bit variants
const peq = new Uint32Array(256);
export const myers_table = [];

function myers_1(a, b) {
  // const m = b.length;
  const lst = 1;
  let pv = -1 >>> 0, mv = 0, sc = 1;
  peq[a.charCodeAt(0)] |= 1;

  let eq = peq[b.charCodeAt(0)];
  // const xv = eq | mv;
  eq |= ((eq & pv) + pv) ^ pv;
  mv |= ~(eq | pv);
  pv &= eq;
  if (mv & lst) sc++;
  if (pv & lst) sc--;
  // mv = ((mv << 1) | 1) >>> 0;
  // pv = ((pv << 1) | ~(xv | mv)) >>> 0;
  // mv &= xv;

  peq[a.charCodeAt(0)] = 0;
  return sc;
}
myers_table[1] = myers_1;

function myers_2(a, b) {
  const m = b.length;
  const lst = 2;
  let pv = -1 >>> 0, mv = 0, sc = 2;
  peq[a.charCodeAt(0)] |= 1;
  peq[a.charCodeAt(1)] |= 2;
  // for (let i = 0; i < m; i++) {
  let eq = peq[b.charCodeAt(0)];
  let xv = eq | mv;
  eq |= ((eq & pv) + pv) ^ pv;
  mv |= ~(eq | pv);
  pv &= eq;
  if (mv & lst) sc++;
  if (pv & lst) sc--;
  mv = ((mv << 1) | 1) >>> 0;
  pv = ((pv << 1) | ~(xv | mv)) >>> 0;
  mv &= xv;


  eq = peq[b.charCodeAt(1)];
  // xv = eq | mv;
  eq |= ((eq & pv) + pv) ^ pv;
  mv |= ~(eq | pv);
  pv &= eq;
  if (mv & lst) sc++;
  if (pv & lst) sc--;
  // mv = ((mv << 1) | 1) >>> 0;
  // pv = ((pv << 1) | ~(xv | mv)) >>> 0;
  // mv &= xv;


  // }
  peq[a.charCodeAt(0)] = 0;
  peq[a.charCodeAt(1)] = 0;
  return sc;
}
myers_table[2] = myers_2;

function myers_3(a, b) {
  const m = b.length;
  const lst = 4;
  let pv = -1 >>> 0, mv = 0, sc = 3;
  peq[a.charCodeAt(0)] |= 1;
  peq[a.charCodeAt(1)] |= 2;
  peq[a.charCodeAt(2)] |= 4;
  for (let i = 0; i < m; i++) {
    let eq = peq[b.charCodeAt(i)];
    const xv = eq | mv;
    eq |= ((eq & pv) + pv) ^ pv;
    mv |= ~(eq | pv);
    pv &= eq;
    if (mv & lst) sc++;
    if (pv & lst) sc--;
    mv = ((mv << 1) | 1) >>> 0;
    pv = ((pv << 1) | ~(xv | mv)) >>> 0;
    mv &= xv;
  }
  peq[a.charCodeAt(0)] = 0;
  peq[a.charCodeAt(1)] = 0;
  peq[a.charCodeAt(2)] = 0;
  return sc;
}
myers_table[3] = myers_3;

function myers_4(a, b) {
  const m = b.length;
  const lst = 8;
  let pv = -1 >>> 0, mv = 0, sc = 4;
  peq[a.charCodeAt(0)] |= 1;
  peq[a.charCodeAt(1)] |= 2;
  peq[a.charCodeAt(2)] |= 4;
  peq[a.charCodeAt(3)] |= 8;
  for (let i = 0; i < m; i++) {
    let eq = peq[b.charCodeAt(i)];
    const xv = eq | mv;
    eq |= ((eq & pv) + pv) ^ pv;
    mv |= ~(eq | pv);
    pv &= eq;
    if (mv & lst) sc++;
    if (pv & lst) sc--;
    mv = ((mv << 1) | 1) >>> 0;
    pv = ((pv << 1) | ~(xv | mv)) >>> 0;
    mv &= xv;
  }
  peq[a.charCodeAt(0)] = 0;
  peq[a.charCodeAt(1)] = 0;
  peq[a.charCodeAt(2)] = 0;
  peq[a.charCodeAt(3)] = 0;
  return sc;
}
myers_table[4] = myers_4;

function myers_5(a, b) {
  const m = b.length;
  const lst = 16;
  let pv = -1 >>> 0, mv = 0, sc = 5;
  peq[a.charCodeAt(0)] |= 1;
  peq[a.charCodeAt(1)] |= 2;
  peq[a.charCodeAt(2)] |= 4;
  peq[a.charCodeAt(3)] |= 8;
  peq[a.charCodeAt(4)] |= 16;
  for (let i = 0; i < m; i++) {
    let eq = peq[b.charCodeAt(i)];
    const xv = eq | mv;
    eq |= ((eq & pv) + pv) ^ pv;
    mv |= ~(eq | pv);
    pv &= eq;
    if (mv & lst) sc++;
    if (pv & lst) sc--;
    mv = ((mv << 1) | 1) >>> 0;
    pv = ((pv << 1) | ~(xv | mv)) >>> 0;
    mv &= xv;
  }
  peq[a.charCodeAt(0)] = 0;
  peq[a.charCodeAt(1)] = 0;
  peq[a.charCodeAt(2)] = 0;
  peq[a.charCodeAt(3)] = 0;
  peq[a.charCodeAt(4)] = 0;
  return sc;
}
myers_table[5] = myers_5;

function myers_6(a, b) {
  const m = b.length;
  const lst = 32;
  let pv = -1 >>> 0, mv = 0, sc = 6;
  peq[a.charCodeAt(0)] |= 1;
  peq[a.charCodeAt(1)] |= 2;
  peq[a.charCodeAt(2)] |= 4;
  peq[a.charCodeAt(3)] |= 8;
  peq[a.charCodeAt(4)] |= 16;
  peq[a.charCodeAt(5)] |= 32;
  for (let i = 0; i < m; i++) {
    let eq = peq[b.charCodeAt(i)];
    const xv = eq | mv;
    eq |= ((eq & pv) + pv) ^ pv;
    mv |= ~(eq | pv);
    pv &= eq;
    if (mv & lst) sc++;
    if (pv & lst) sc--;
    mv = ((mv << 1) | 1) >>> 0;
    pv = ((pv << 1) | ~(xv | mv)) >>> 0;
    mv &= xv;
  }
  peq[a.charCodeAt(0)] = 0;
  peq[a.charCodeAt(1)] = 0;
  peq[a.charCodeAt(2)] = 0;
  peq[a.charCodeAt(3)] = 0;
  peq[a.charCodeAt(4)] = 0;
  peq[a.charCodeAt(5)] = 0;
  return sc;
}
myers_table[6] = myers_6;

function myers_7(a, b) {
  const m = b.length;
  const lst = 64;
  let pv = -1 >>> 0, mv = 0, sc = 7;
  peq[a.charCodeAt(0)] |= 1;
  peq[a.charCodeAt(1)] |= 2;
  peq[a.charCodeAt(2)] |= 4;
  peq[a.charCodeAt(3)] |= 8;
  peq[a.charCodeAt(4)] |= 16;
  peq[a.charCodeAt(5)] |= 32;
  peq[a.charCodeAt(6)] |= 64;
  for (let i = 0; i < m; i++) {
    let eq = peq[b.charCodeAt(i)];
    const xv = eq | mv;
    eq |= ((eq & pv) + pv) ^ pv;
    mv |= ~(eq | pv);
    pv &= eq;
    if (mv & lst) sc++;
    if (pv & lst) sc--;
    mv = ((mv << 1) | 1) >>> 0;
    pv = ((pv << 1) | ~(xv | mv)) >>> 0;
    mv &= xv;
  }
  peq[a.charCodeAt(0)] = 0;
  peq[a.charCodeAt(1)] = 0;
  peq[a.charCodeAt(2)] = 0;
  peq[a.charCodeAt(3)] = 0;
  peq[a.charCodeAt(4)] = 0;
  peq[a.charCodeAt(5)] = 0;
  peq[a.charCodeAt(6)] = 0;
  return sc;
}
myers_table[7] = myers_7;

function myers_8(a, b) {
  const m = b.length;
  const lst = 128;
  let pv = -1 >>> 0, mv = 0, sc = 8;
  peq[a.charCodeAt(0)] |= 1;
  peq[a.charCodeAt(1)] |= 2;
  peq[a.charCodeAt(2)] |= 4;
  peq[a.charCodeAt(3)] |= 8;
  peq[a.charCodeAt(4)] |= 16;
  peq[a.charCodeAt(5)] |= 32;
  peq[a.charCodeAt(6)] |= 64;
  peq[a.charCodeAt(7)] |= 128;
  for (let i = 0; i < m; i++) {
    let eq = peq[b.charCodeAt(i)];
    const xv = eq | mv;
    eq |= ((eq & pv) + pv) ^ pv;
    mv |= ~(eq | pv);
    pv &= eq;
    if (mv & lst) sc++;
    if (pv & lst) sc--;
    mv = ((mv << 1) | 1) >>> 0;
    pv = ((pv << 1) | ~(xv | mv)) >>> 0;
    mv &= xv;
  }
  peq[a.charCodeAt(0)] = 0;
  peq[a.charCodeAt(1)] = 0;
  peq[a.charCodeAt(2)] = 0;
  peq[a.charCodeAt(3)] = 0;
  peq[a.charCodeAt(4)] = 0;
  peq[a.charCodeAt(5)] = 0;
  peq[a.charCodeAt(6)] = 0;
  peq[a.charCodeAt(7)] = 0;
  return sc;
}
myers_table[8] = myers_8;

function myers_9(a, b) {
  const m = b.length;
  const lst = 256;
  let pv = -1 >>> 0, mv = 0, sc = 9;
  peq[a.charCodeAt(0)] |= 1;
  peq[a.charCodeAt(1)] |= 2;
  peq[a.charCodeAt(2)] |= 4;
  peq[a.charCodeAt(3)] |= 8;
  peq[a.charCodeAt(4)] |= 16;
  peq[a.charCodeAt(5)] |= 32;
  peq[a.charCodeAt(6)] |= 64;
  peq[a.charCodeAt(7)] |= 128;
  peq[a.charCodeAt(8)] |= 256;
  for (let i = 0; i < m; i++) {
    let eq = peq[b.charCodeAt(i)];
    const xv = eq | mv;
    eq |= ((eq & pv) + pv) ^ pv;
    mv |= ~(eq | pv);
    pv &= eq;
    if (mv & lst) sc++;
    if (pv & lst) sc--;
    mv = ((mv << 1) | 1) >>> 0;
    pv = ((pv << 1) | ~(xv | mv)) >>> 0;
    mv &= xv;
  }
  peq[a.charCodeAt(0)] = 0;
  peq[a.charCodeAt(1)] = 0;
  peq[a.charCodeAt(2)] = 0;
  peq[a.charCodeAt(3)] = 0;
  peq[a.charCodeAt(4)] = 0;
  peq[a.charCodeAt(5)] = 0;
  peq[a.charCodeAt(6)] = 0;
  peq[a.charCodeAt(7)] = 0;
  peq[a.charCodeAt(8)] = 0;
  return sc;
}
myers_table[9] = myers_9;

function myers_10(a, b) {
  const m = b.length;
  const lst = 512;
  let pv = -1 >>> 0, mv = 0, sc = 10;
  peq[a.charCodeAt(0)] |= 1;
  peq[a.charCodeAt(1)] |= 2;
  peq[a.charCodeAt(2)] |= 4;
  peq[a.charCodeAt(3)] |= 8;
  peq[a.charCodeAt(4)] |= 16;
  peq[a.charCodeAt(5)] |= 32;
  peq[a.charCodeAt(6)] |= 64;
  peq[a.charCodeAt(7)] |= 128;
  peq[a.charCodeAt(8)] |= 256;
  peq[a.charCodeAt(9)] |= 512;
  for (let i = 0; i < m; i++) {
    let eq = peq[b.charCodeAt(i)];
    const xv = eq | mv;
    eq |= ((eq & pv) + pv) ^ pv;
    mv |= ~(eq | pv);
    pv &= eq;
    if (mv & lst) sc++;
    if (pv & lst) sc--;
    mv = ((mv << 1) | 1) >>> 0;
    pv = ((pv << 1) | ~(xv | mv)) >>> 0;
    mv &= xv;
  }
  peq[a.charCodeAt(0)] = 0;
  peq[a.charCodeAt(1)] = 0;
  peq[a.charCodeAt(2)] = 0;
  peq[a.charCodeAt(3)] = 0;
  peq[a.charCodeAt(4)] = 0;
  peq[a.charCodeAt(5)] = 0;
  peq[a.charCodeAt(6)] = 0;
  peq[a.charCodeAt(7)] = 0;
  peq[a.charCodeAt(8)] = 0;
  peq[a.charCodeAt(9)] = 0;
  return sc;
}
myers_table[10] = myers_10;

function myers_11(a, b) {
  const m = b.length;
  const lst = 1024;
  let pv = -1 >>> 0, mv = 0, sc = 11;
  peq[a.charCodeAt(0)] |= 1;
  peq[a.charCodeAt(1)] |= 2;
  peq[a.charCodeAt(2)] |= 4;
  peq[a.charCodeAt(3)] |= 8;
  peq[a.charCodeAt(4)] |= 16;
  peq[a.charCodeAt(5)] |= 32;
  peq[a.charCodeAt(6)] |= 64;
  peq[a.charCodeAt(7)] |= 128;
  peq[a.charCodeAt(8)] |= 256;
  peq[a.charCodeAt(9)] |= 512;
  peq[a.charCodeAt(10)] |= 1024;
  for (let i = 0; i < m; i++) {
    let eq = peq[b.charCodeAt(i)];
    const xv = eq | mv;
    eq |= ((eq & pv) + pv) ^ pv;
    mv |= ~(eq | pv);
    pv &= eq;
    if (mv & lst) sc++;
    if (pv & lst) sc--;
    mv = ((mv << 1) | 1) >>> 0;
    pv = ((pv << 1) | ~(xv | mv)) >>> 0;
    mv &= xv;
  }
  peq[a.charCodeAt(0)] = 0;
  peq[a.charCodeAt(1)] = 0;
  peq[a.charCodeAt(2)] = 0;
  peq[a.charCodeAt(3)] = 0;
  peq[a.charCodeAt(4)] = 0;
  peq[a.charCodeAt(5)] = 0;
  peq[a.charCodeAt(6)] = 0;
  peq[a.charCodeAt(7)] = 0;
  peq[a.charCodeAt(8)] = 0;
  peq[a.charCodeAt(9)] = 0;
  peq[a.charCodeAt(10)] = 0;
  return sc;
}
myers_table[11] = myers_11;

function myers_12(a, b) {
  const m = b.length;
  const lst = 2048;
  let pv = -1 >>> 0, mv = 0, sc = 12;
  peq[a.charCodeAt(0)] |= 1;
  peq[a.charCodeAt(1)] |= 2;
  peq[a.charCodeAt(2)] |= 4;
  peq[a.charCodeAt(3)] |= 8;
  peq[a.charCodeAt(4)] |= 16;
  peq[a.charCodeAt(5)] |= 32;
  peq[a.charCodeAt(6)] |= 64;
  peq[a.charCodeAt(7)] |= 128;
  peq[a.charCodeAt(8)] |= 256;
  peq[a.charCodeAt(9)] |= 512;
  peq[a.charCodeAt(10)] |= 1024;
  peq[a.charCodeAt(11)] |= 2048;
  for (let i = 0; i < m; i++) {
    let eq = peq[b.charCodeAt(i)];
    const xv = eq | mv;
    eq |= ((eq & pv) + pv) ^ pv;
    mv |= ~(eq | pv);
    pv &= eq;
    if (mv & lst) sc++;
    if (pv & lst) sc--;
    mv = ((mv << 1) | 1) >>> 0;
    pv = ((pv << 1) | ~(xv | mv)) >>> 0;
    mv &= xv;
  }
  peq[a.charCodeAt(0)] = 0;
  peq[a.charCodeAt(1)] = 0;
  peq[a.charCodeAt(2)] = 0;
  peq[a.charCodeAt(3)] = 0;
  peq[a.charCodeAt(4)] = 0;
  peq[a.charCodeAt(5)] = 0;
  peq[a.charCodeAt(6)] = 0;
  peq[a.charCodeAt(7)] = 0;
  peq[a.charCodeAt(8)] = 0;
  peq[a.charCodeAt(9)] = 0;
  peq[a.charCodeAt(10)] = 0;
  peq[a.charCodeAt(11)] = 0;
  return sc;
}
myers_table[12] = myers_12;

function myers_13(a, b) {
  const m = b.length;
  const lst = 4096;
  let pv = -1 >>> 0, mv = 0, sc = 13;
  peq[a.charCodeAt(0)] |= 1;
  peq[a.charCodeAt(1)] |= 2;
  peq[a.charCodeAt(2)] |= 4;
  peq[a.charCodeAt(3)] |= 8;
  peq[a.charCodeAt(4)] |= 16;
  peq[a.charCodeAt(5)] |= 32;
  peq[a.charCodeAt(6)] |= 64;
  peq[a.charCodeAt(7)] |= 128;
  peq[a.charCodeAt(8)] |= 256;
  peq[a.charCodeAt(9)] |= 512;
  peq[a.charCodeAt(10)] |= 1024;
  peq[a.charCodeAt(11)] |= 2048;
  peq[a.charCodeAt(12)] |= 4096;
  for (let i = 0; i < m; i++) {
    let eq = peq[b.charCodeAt(i)];
    const xv = eq | mv;
    eq |= ((eq & pv) + pv) ^ pv;
    mv |= ~(eq | pv);
    pv &= eq;
    if (mv & lst) sc++;
    if (pv & lst) sc--;
    mv = ((mv << 1) | 1) >>> 0;
    pv = ((pv << 1) | ~(xv | mv)) >>> 0;
    mv &= xv;
  }
  peq[a.charCodeAt(0)] = 0;
  peq[a.charCodeAt(1)] = 0;
  peq[a.charCodeAt(2)] = 0;
  peq[a.charCodeAt(3)] = 0;
  peq[a.charCodeAt(4)] = 0;
  peq[a.charCodeAt(5)] = 0;
  peq[a.charCodeAt(6)] = 0;
  peq[a.charCodeAt(7)] = 0;
  peq[a.charCodeAt(8)] = 0;
  peq[a.charCodeAt(9)] = 0;
  peq[a.charCodeAt(10)] = 0;
  peq[a.charCodeAt(11)] = 0;
  peq[a.charCodeAt(12)] = 0;
  return sc;
}
myers_table[13] = myers_13;

function myers_14(a, b) {
  const m = b.length;
  const lst = 8192;
  let pv = -1 >>> 0, mv = 0, sc = 14;
  peq[a.charCodeAt(0)] |= 1;
  peq[a.charCodeAt(1)] |= 2;
  peq[a.charCodeAt(2)] |= 4;
  peq[a.charCodeAt(3)] |= 8;
  peq[a.charCodeAt(4)] |= 16;
  peq[a.charCodeAt(5)] |= 32;
  peq[a.charCodeAt(6)] |= 64;
  peq[a.charCodeAt(7)] |= 128;
  peq[a.charCodeAt(8)] |= 256;
  peq[a.charCodeAt(9)] |= 512;
  peq[a.charCodeAt(10)] |= 1024;
  peq[a.charCodeAt(11)] |= 2048;
  peq[a.charCodeAt(12)] |= 4096;
  peq[a.charCodeAt(13)] |= 8192;
  for (let i = 0; i < m; i++) {
    let eq = peq[b.charCodeAt(i)];
    const xv = eq | mv;
    eq |= ((eq & pv) + pv) ^ pv;
    mv |= ~(eq | pv);
    pv &= eq;
    if (mv & lst) sc++;
    if (pv & lst) sc--;
    mv = ((mv << 1) | 1) >>> 0;
    pv = ((pv << 1) | ~(xv | mv)) >>> 0;
    mv &= xv;
  }
  peq[a.charCodeAt(0)] = 0;
  peq[a.charCodeAt(1)] = 0;
  peq[a.charCodeAt(2)] = 0;
  peq[a.charCodeAt(3)] = 0;
  peq[a.charCodeAt(4)] = 0;
  peq[a.charCodeAt(5)] = 0;
  peq[a.charCodeAt(6)] = 0;
  peq[a.charCodeAt(7)] = 0;
  peq[a.charCodeAt(8)] = 0;
  peq[a.charCodeAt(9)] = 0;
  peq[a.charCodeAt(10)] = 0;
  peq[a.charCodeAt(11)] = 0;
  peq[a.charCodeAt(12)] = 0;
  peq[a.charCodeAt(13)] = 0;
  return sc;
}
myers_table[14] = myers_14;

function myers_15(a, b) {
  const m = b.length;
  const lst = 16384;
  let pv = -1 >>> 0, mv = 0, sc = 15;
  peq[a.charCodeAt(0)] |= 1;
  peq[a.charCodeAt(1)] |= 2;
  peq[a.charCodeAt(2)] |= 4;
  peq[a.charCodeAt(3)] |= 8;
  peq[a.charCodeAt(4)] |= 16;
  peq[a.charCodeAt(5)] |= 32;
  peq[a.charCodeAt(6)] |= 64;
  peq[a.charCodeAt(7)] |= 128;
  peq[a.charCodeAt(8)] |= 256;
  peq[a.charCodeAt(9)] |= 512;
  peq[a.charCodeAt(10)] |= 1024;
  peq[a.charCodeAt(11)] |= 2048;
  peq[a.charCodeAt(12)] |= 4096;
  peq[a.charCodeAt(13)] |= 8192;
  peq[a.charCodeAt(14)] |= 16384;
  for (let i = 0; i < m; i++) {
    let eq = peq[b.charCodeAt(i)];
    const xv = eq | mv;
    eq |= ((eq & pv) + pv) ^ pv;
    mv |= ~(eq | pv);
    pv &= eq;
    if (mv & lst) sc++;
    if (pv & lst) sc--;
    mv = ((mv << 1) | 1) >>> 0;
    pv = ((pv << 1) | ~(xv | mv)) >>> 0;
    mv &= xv;
  }
  peq[a.charCodeAt(0)] = 0;
  peq[a.charCodeAt(1)] = 0;
  peq[a.charCodeAt(2)] = 0;
  peq[a.charCodeAt(3)] = 0;
  peq[a.charCodeAt(4)] = 0;
  peq[a.charCodeAt(5)] = 0;
  peq[a.charCodeAt(6)] = 0;
  peq[a.charCodeAt(7)] = 0;
  peq[a.charCodeAt(8)] = 0;
  peq[a.charCodeAt(9)] = 0;
  peq[a.charCodeAt(10)] = 0;
  peq[a.charCodeAt(11)] = 0;
  peq[a.charCodeAt(12)] = 0;
  peq[a.charCodeAt(13)] = 0;
  peq[a.charCodeAt(14)] = 0;
  return sc;
}
myers_table[15] = myers_15;

function myers_16(a, b) {
  const m = b.length;
  const lst = 32768;
  let pv = -1 >>> 0, mv = 0, sc = 16;
  peq[a.charCodeAt(0)] |= 1;
  peq[a.charCodeAt(1)] |= 2;
  peq[a.charCodeAt(2)] |= 4;
  peq[a.charCodeAt(3)] |= 8;
  peq[a.charCodeAt(4)] |= 16;
  peq[a.charCodeAt(5)] |= 32;
  peq[a.charCodeAt(6)] |= 64;
  peq[a.charCodeAt(7)] |= 128;
  peq[a.charCodeAt(8)] |= 256;
  peq[a.charCodeAt(9)] |= 512;
  peq[a.charCodeAt(10)] |= 1024;
  peq[a.charCodeAt(11)] |= 2048;
  peq[a.charCodeAt(12)] |= 4096;
  peq[a.charCodeAt(13)] |= 8192;
  peq[a.charCodeAt(14)] |= 16384;
  peq[a.charCodeAt(15)] |= 32768;
  for (let i = 0; i < m; i++) {
    let eq = peq[b.charCodeAt(i)];
    const xv = eq | mv;
    eq |= ((eq & pv) + pv) ^ pv;
    mv |= ~(eq | pv);
    pv &= eq;
    if (mv & lst) sc++;
    if (pv & lst) sc--;
    mv = ((mv << 1) | 1) >>> 0;
    pv = ((pv << 1) | ~(xv | mv)) >>> 0;
    mv &= xv;
  }
  peq[a.charCodeAt(0)] = 0;
  peq[a.charCodeAt(1)] = 0;
  peq[a.charCodeAt(2)] = 0;
  peq[a.charCodeAt(3)] = 0;
  peq[a.charCodeAt(4)] = 0;
  peq[a.charCodeAt(5)] = 0;
  peq[a.charCodeAt(6)] = 0;
  peq[a.charCodeAt(7)] = 0;
  peq[a.charCodeAt(8)] = 0;
  peq[a.charCodeAt(9)] = 0;
  peq[a.charCodeAt(10)] = 0;
  peq[a.charCodeAt(11)] = 0;
  peq[a.charCodeAt(12)] = 0;
  peq[a.charCodeAt(13)] = 0;
  peq[a.charCodeAt(14)] = 0;
  peq[a.charCodeAt(15)] = 0;
  return sc;
}
myers_table[16] = myers_16;

function myers_17(a, b) {
  const m = b.length;
  const lst = 65536;
  let pv = -1 >>> 0, mv = 0, sc = 17;
  peq[a.charCodeAt(0)] |= 1;
  peq[a.charCodeAt(1)] |= 2;
  peq[a.charCodeAt(2)] |= 4;
  peq[a.charCodeAt(3)] |= 8;
  peq[a.charCodeAt(4)] |= 16;
  peq[a.charCodeAt(5)] |= 32;
  peq[a.charCodeAt(6)] |= 64;
  peq[a.charCodeAt(7)] |= 128;
  peq[a.charCodeAt(8)] |= 256;
  peq[a.charCodeAt(9)] |= 512;
  peq[a.charCodeAt(10)] |= 1024;
  peq[a.charCodeAt(11)] |= 2048;
  peq[a.charCodeAt(12)] |= 4096;
  peq[a.charCodeAt(13)] |= 8192;
  peq[a.charCodeAt(14)] |= 16384;
  peq[a.charCodeAt(15)] |= 32768;
  peq[a.charCodeAt(16)] |= 65536;
  for (let i = 0; i < m; i++) {
    let eq = peq[b.charCodeAt(i)];
    const xv = eq | mv;
    eq |= ((eq & pv) + pv) ^ pv;
    mv |= ~(eq | pv);
    pv &= eq;
    if (mv & lst) sc++;
    if (pv & lst) sc--;
    mv = ((mv << 1) | 1) >>> 0;
    pv = ((pv << 1) | ~(xv | mv)) >>> 0;
    mv &= xv;
  }
  peq[a.charCodeAt(0)] = 0;
  peq[a.charCodeAt(1)] = 0;
  peq[a.charCodeAt(2)] = 0;
  peq[a.charCodeAt(3)] = 0;
  peq[a.charCodeAt(4)] = 0;
  peq[a.charCodeAt(5)] = 0;
  peq[a.charCodeAt(6)] = 0;
  peq[a.charCodeAt(7)] = 0;
  peq[a.charCodeAt(8)] = 0;
  peq[a.charCodeAt(9)] = 0;
  peq[a.charCodeAt(10)] = 0;
  peq[a.charCodeAt(11)] = 0;
  peq[a.charCodeAt(12)] = 0;
  peq[a.charCodeAt(13)] = 0;
  peq[a.charCodeAt(14)] = 0;
  peq[a.charCodeAt(15)] = 0;
  peq[a.charCodeAt(16)] = 0;
  return sc;
}
myers_table[17] = myers_17;

function myers_18(a, b) {
  const m = b.length;
  const lst = 131072;
  let pv = -1 >>> 0, mv = 0, sc = 18;
  peq[a.charCodeAt(0)] |= 1;
  peq[a.charCodeAt(1)] |= 2;
  peq[a.charCodeAt(2)] |= 4;
  peq[a.charCodeAt(3)] |= 8;
  peq[a.charCodeAt(4)] |= 16;
  peq[a.charCodeAt(5)] |= 32;
  peq[a.charCodeAt(6)] |= 64;
  peq[a.charCodeAt(7)] |= 128;
  peq[a.charCodeAt(8)] |= 256;
  peq[a.charCodeAt(9)] |= 512;
  peq[a.charCodeAt(10)] |= 1024;
  peq[a.charCodeAt(11)] |= 2048;
  peq[a.charCodeAt(12)] |= 4096;
  peq[a.charCodeAt(13)] |= 8192;
  peq[a.charCodeAt(14)] |= 16384;
  peq[a.charCodeAt(15)] |= 32768;
  peq[a.charCodeAt(16)] |= 65536;
  peq[a.charCodeAt(17)] |= 131072;
  for (let i = 0; i < m; i++) {
    let eq = peq[b.charCodeAt(i)];
    const xv = eq | mv;
    eq |= ((eq & pv) + pv) ^ pv;
    mv |= ~(eq | pv);
    pv &= eq;
    if (mv & lst) sc++;
    if (pv & lst) sc--;
    mv = ((mv << 1) | 1) >>> 0;
    pv = ((pv << 1) | ~(xv | mv)) >>> 0;
    mv &= xv;
  }
  peq[a.charCodeAt(0)] = 0;
  peq[a.charCodeAt(1)] = 0;
  peq[a.charCodeAt(2)] = 0;
  peq[a.charCodeAt(3)] = 0;
  peq[a.charCodeAt(4)] = 0;
  peq[a.charCodeAt(5)] = 0;
  peq[a.charCodeAt(6)] = 0;
  peq[a.charCodeAt(7)] = 0;
  peq[a.charCodeAt(8)] = 0;
  peq[a.charCodeAt(9)] = 0;
  peq[a.charCodeAt(10)] = 0;
  peq[a.charCodeAt(11)] = 0;
  peq[a.charCodeAt(12)] = 0;
  peq[a.charCodeAt(13)] = 0;
  peq[a.charCodeAt(14)] = 0;
  peq[a.charCodeAt(15)] = 0;
  peq[a.charCodeAt(16)] = 0;
  peq[a.charCodeAt(17)] = 0;
  return sc;
}
myers_table[18] = myers_18;

function myers_19(a, b) {
  const m = b.length;
  const lst = 262144;
  let pv = -1 >>> 0, mv = 0, sc = 19;
  peq[a.charCodeAt(0)] |= 1;
  peq[a.charCodeAt(1)] |= 2;
  peq[a.charCodeAt(2)] |= 4;
  peq[a.charCodeAt(3)] |= 8;
  peq[a.charCodeAt(4)] |= 16;
  peq[a.charCodeAt(5)] |= 32;
  peq[a.charCodeAt(6)] |= 64;
  peq[a.charCodeAt(7)] |= 128;
  peq[a.charCodeAt(8)] |= 256;
  peq[a.charCodeAt(9)] |= 512;
  peq[a.charCodeAt(10)] |= 1024;
  peq[a.charCodeAt(11)] |= 2048;
  peq[a.charCodeAt(12)] |= 4096;
  peq[a.charCodeAt(13)] |= 8192;
  peq[a.charCodeAt(14)] |= 16384;
  peq[a.charCodeAt(15)] |= 32768;
  peq[a.charCodeAt(16)] |= 65536;
  peq[a.charCodeAt(17)] |= 131072;
  peq[a.charCodeAt(18)] |= 262144;
  for (let i = 0; i < m; i++) {
    let eq = peq[b.charCodeAt(i)];
    const xv = eq | mv;
    eq |= ((eq & pv) + pv) ^ pv;
    mv |= ~(eq | pv);
    pv &= eq;
    if (mv & lst) sc++;
    if (pv & lst) sc--;
    mv = ((mv << 1) | 1) >>> 0;
    pv = ((pv << 1) | ~(xv | mv)) >>> 0;
    mv &= xv;
  }
  peq[a.charCodeAt(0)] = 0;
  peq[a.charCodeAt(1)] = 0;
  peq[a.charCodeAt(2)] = 0;
  peq[a.charCodeAt(3)] = 0;
  peq[a.charCodeAt(4)] = 0;
  peq[a.charCodeAt(5)] = 0;
  peq[a.charCodeAt(6)] = 0;
  peq[a.charCodeAt(7)] = 0;
  peq[a.charCodeAt(8)] = 0;
  peq[a.charCodeAt(9)] = 0;
  peq[a.charCodeAt(10)] = 0;
  peq[a.charCodeAt(11)] = 0;
  peq[a.charCodeAt(12)] = 0;
  peq[a.charCodeAt(13)] = 0;
  peq[a.charCodeAt(14)] = 0;
  peq[a.charCodeAt(15)] = 0;
  peq[a.charCodeAt(16)] = 0;
  peq[a.charCodeAt(17)] = 0;
  peq[a.charCodeAt(18)] = 0;
  return sc;
}
myers_table[19] = myers_19;

function myers_20(a, b) {
  const m = b.length;
  const lst = 524288;
  let pv = -1 >>> 0, mv = 0, sc = 20;
  peq[a.charCodeAt(0)] |= 1;
  peq[a.charCodeAt(1)] |= 2;
  peq[a.charCodeAt(2)] |= 4;
  peq[a.charCodeAt(3)] |= 8;
  peq[a.charCodeAt(4)] |= 16;
  peq[a.charCodeAt(5)] |= 32;
  peq[a.charCodeAt(6)] |= 64;
  peq[a.charCodeAt(7)] |= 128;
  peq[a.charCodeAt(8)] |= 256;
  peq[a.charCodeAt(9)] |= 512;
  peq[a.charCodeAt(10)] |= 1024;
  peq[a.charCodeAt(11)] |= 2048;
  peq[a.charCodeAt(12)] |= 4096;
  peq[a.charCodeAt(13)] |= 8192;
  peq[a.charCodeAt(14)] |= 16384;
  peq[a.charCodeAt(15)] |= 32768;
  peq[a.charCodeAt(16)] |= 65536;
  peq[a.charCodeAt(17)] |= 131072;
  peq[a.charCodeAt(18)] |= 262144;
  peq[a.charCodeAt(19)] |= 524288;
  for (let i = 0; i < m; i++) {
    let eq = peq[b.charCodeAt(i)];
    const xv = eq | mv;
    eq |= ((eq & pv) + pv) ^ pv;
    mv |= ~(eq | pv);
    pv &= eq;
    if (mv & lst) sc++;
    if (pv & lst) sc--;
    mv = ((mv << 1) | 1) >>> 0;
    pv = ((pv << 1) | ~(xv | mv)) >>> 0;
    mv &= xv;
  }
  peq[a.charCodeAt(0)] = 0;
  peq[a.charCodeAt(1)] = 0;
  peq[a.charCodeAt(2)] = 0;
  peq[a.charCodeAt(3)] = 0;
  peq[a.charCodeAt(4)] = 0;
  peq[a.charCodeAt(5)] = 0;
  peq[a.charCodeAt(6)] = 0;
  peq[a.charCodeAt(7)] = 0;
  peq[a.charCodeAt(8)] = 0;
  peq[a.charCodeAt(9)] = 0;
  peq[a.charCodeAt(10)] = 0;
  peq[a.charCodeAt(11)] = 0;
  peq[a.charCodeAt(12)] = 0;
  peq[a.charCodeAt(13)] = 0;
  peq[a.charCodeAt(14)] = 0;
  peq[a.charCodeAt(15)] = 0;
  peq[a.charCodeAt(16)] = 0;
  peq[a.charCodeAt(17)] = 0;
  peq[a.charCodeAt(18)] = 0;
  peq[a.charCodeAt(19)] = 0;
  return sc;
}
myers_table[20] = myers_20;

function myers_21(a, b) {
  const m = b.length;
  const lst = 1048576;
  let pv = -1 >>> 0, mv = 0, sc = 21;
  peq[a.charCodeAt(0)] |= 1;
  peq[a.charCodeAt(1)] |= 2;
  peq[a.charCodeAt(2)] |= 4;
  peq[a.charCodeAt(3)] |= 8;
  peq[a.charCodeAt(4)] |= 16;
  peq[a.charCodeAt(5)] |= 32;
  peq[a.charCodeAt(6)] |= 64;
  peq[a.charCodeAt(7)] |= 128;
  peq[a.charCodeAt(8)] |= 256;
  peq[a.charCodeAt(9)] |= 512;
  peq[a.charCodeAt(10)] |= 1024;
  peq[a.charCodeAt(11)] |= 2048;
  peq[a.charCodeAt(12)] |= 4096;
  peq[a.charCodeAt(13)] |= 8192;
  peq[a.charCodeAt(14)] |= 16384;
  peq[a.charCodeAt(15)] |= 32768;
  peq[a.charCodeAt(16)] |= 65536;
  peq[a.charCodeAt(17)] |= 131072;
  peq[a.charCodeAt(18)] |= 262144;
  peq[a.charCodeAt(19)] |= 524288;
  peq[a.charCodeAt(20)] |= 1048576;
  for (let i = 0; i < m; i++) {
    let eq = peq[b.charCodeAt(i)];
    const xv = eq | mv;
    eq |= ((eq & pv) + pv) ^ pv;
    mv |= ~(eq | pv);
    pv &= eq;
    if (mv & lst) sc++;
    if (pv & lst) sc--;
    mv = ((mv << 1) | 1) >>> 0;
    pv = ((pv << 1) | ~(xv | mv)) >>> 0;
    mv &= xv;
  }
  peq[a.charCodeAt(0)] = 0;
  peq[a.charCodeAt(1)] = 0;
  peq[a.charCodeAt(2)] = 0;
  peq[a.charCodeAt(3)] = 0;
  peq[a.charCodeAt(4)] = 0;
  peq[a.charCodeAt(5)] = 0;
  peq[a.charCodeAt(6)] = 0;
  peq[a.charCodeAt(7)] = 0;
  peq[a.charCodeAt(8)] = 0;
  peq[a.charCodeAt(9)] = 0;
  peq[a.charCodeAt(10)] = 0;
  peq[a.charCodeAt(11)] = 0;
  peq[a.charCodeAt(12)] = 0;
  peq[a.charCodeAt(13)] = 0;
  peq[a.charCodeAt(14)] = 0;
  peq[a.charCodeAt(15)] = 0;
  peq[a.charCodeAt(16)] = 0;
  peq[a.charCodeAt(17)] = 0;
  peq[a.charCodeAt(18)] = 0;
  peq[a.charCodeAt(19)] = 0;
  peq[a.charCodeAt(20)] = 0;
  return sc;
}
myers_table[21] = myers_21;

function myers_22(a, b) {
  const m = b.length;
  const lst = 2097152;
  let pv = -1 >>> 0, mv = 0, sc = 22;
  peq[a.charCodeAt(0)] |= 1;
  peq[a.charCodeAt(1)] |= 2;
  peq[a.charCodeAt(2)] |= 4;
  peq[a.charCodeAt(3)] |= 8;
  peq[a.charCodeAt(4)] |= 16;
  peq[a.charCodeAt(5)] |= 32;
  peq[a.charCodeAt(6)] |= 64;
  peq[a.charCodeAt(7)] |= 128;
  peq[a.charCodeAt(8)] |= 256;
  peq[a.charCodeAt(9)] |= 512;
  peq[a.charCodeAt(10)] |= 1024;
  peq[a.charCodeAt(11)] |= 2048;
  peq[a.charCodeAt(12)] |= 4096;
  peq[a.charCodeAt(13)] |= 8192;
  peq[a.charCodeAt(14)] |= 16384;
  peq[a.charCodeAt(15)] |= 32768;
  peq[a.charCodeAt(16)] |= 65536;
  peq[a.charCodeAt(17)] |= 131072;
  peq[a.charCodeAt(18)] |= 262144;
  peq[a.charCodeAt(19)] |= 524288;
  peq[a.charCodeAt(20)] |= 1048576;
  peq[a.charCodeAt(21)] |= 2097152;
  for (let i = 0; i < m; i++) {
    let eq = peq[b.charCodeAt(i)];
    const xv = eq | mv;
    eq |= ((eq & pv) + pv) ^ pv;
    mv |= ~(eq | pv);
    pv &= eq;
    if (mv & lst) sc++;
    if (pv & lst) sc--;
    mv = ((mv << 1) | 1) >>> 0;
    pv = ((pv << 1) | ~(xv | mv)) >>> 0;
    mv &= xv;
  }
  peq[a.charCodeAt(0)] = 0;
  peq[a.charCodeAt(1)] = 0;
  peq[a.charCodeAt(2)] = 0;
  peq[a.charCodeAt(3)] = 0;
  peq[a.charCodeAt(4)] = 0;
  peq[a.charCodeAt(5)] = 0;
  peq[a.charCodeAt(6)] = 0;
  peq[a.charCodeAt(7)] = 0;
  peq[a.charCodeAt(8)] = 0;
  peq[a.charCodeAt(9)] = 0;
  peq[a.charCodeAt(10)] = 0;
  peq[a.charCodeAt(11)] = 0;
  peq[a.charCodeAt(12)] = 0;
  peq[a.charCodeAt(13)] = 0;
  peq[a.charCodeAt(14)] = 0;
  peq[a.charCodeAt(15)] = 0;
  peq[a.charCodeAt(16)] = 0;
  peq[a.charCodeAt(17)] = 0;
  peq[a.charCodeAt(18)] = 0;
  peq[a.charCodeAt(19)] = 0;
  peq[a.charCodeAt(20)] = 0;
  peq[a.charCodeAt(21)] = 0;
  return sc;
}
myers_table[22] = myers_22;

function myers_23(a, b) {
  const m = b.length;
  const lst = 4194304;
  let pv = -1 >>> 0, mv = 0, sc = 23;
  peq[a.charCodeAt(0)] |= 1;
  peq[a.charCodeAt(1)] |= 2;
  peq[a.charCodeAt(2)] |= 4;
  peq[a.charCodeAt(3)] |= 8;
  peq[a.charCodeAt(4)] |= 16;
  peq[a.charCodeAt(5)] |= 32;
  peq[a.charCodeAt(6)] |= 64;
  peq[a.charCodeAt(7)] |= 128;
  peq[a.charCodeAt(8)] |= 256;
  peq[a.charCodeAt(9)] |= 512;
  peq[a.charCodeAt(10)] |= 1024;
  peq[a.charCodeAt(11)] |= 2048;
  peq[a.charCodeAt(12)] |= 4096;
  peq[a.charCodeAt(13)] |= 8192;
  peq[a.charCodeAt(14)] |= 16384;
  peq[a.charCodeAt(15)] |= 32768;
  peq[a.charCodeAt(16)] |= 65536;
  peq[a.charCodeAt(17)] |= 131072;
  peq[a.charCodeAt(18)] |= 262144;
  peq[a.charCodeAt(19)] |= 524288;
  peq[a.charCodeAt(20)] |= 1048576;
  peq[a.charCodeAt(21)] |= 2097152;
  peq[a.charCodeAt(22)] |= 4194304;
  for (let i = 0; i < m; i++) {
    let eq = peq[b.charCodeAt(i)];
    const xv = eq | mv;
    eq |= ((eq & pv) + pv) ^ pv;
    mv |= ~(eq | pv);
    pv &= eq;
    if (mv & lst) sc++;
    if (pv & lst) sc--;
    mv = ((mv << 1) | 1) >>> 0;
    pv = ((pv << 1) | ~(xv | mv)) >>> 0;
    mv &= xv;
  }
  peq[a.charCodeAt(0)] = 0;
  peq[a.charCodeAt(1)] = 0;
  peq[a.charCodeAt(2)] = 0;
  peq[a.charCodeAt(3)] = 0;
  peq[a.charCodeAt(4)] = 0;
  peq[a.charCodeAt(5)] = 0;
  peq[a.charCodeAt(6)] = 0;
  peq[a.charCodeAt(7)] = 0;
  peq[a.charCodeAt(8)] = 0;
  peq[a.charCodeAt(9)] = 0;
  peq[a.charCodeAt(10)] = 0;
  peq[a.charCodeAt(11)] = 0;
  peq[a.charCodeAt(12)] = 0;
  peq[a.charCodeAt(13)] = 0;
  peq[a.charCodeAt(14)] = 0;
  peq[a.charCodeAt(15)] = 0;
  peq[a.charCodeAt(16)] = 0;
  peq[a.charCodeAt(17)] = 0;
  peq[a.charCodeAt(18)] = 0;
  peq[a.charCodeAt(19)] = 0;
  peq[a.charCodeAt(20)] = 0;
  peq[a.charCodeAt(21)] = 0;
  peq[a.charCodeAt(22)] = 0;
  return sc;
}
myers_table[23] = myers_23;

function myers_24(a, b) {
  const m = b.length;
  const lst = 8388608;
  let pv = -1 >>> 0, mv = 0, sc = 24;
  peq[a.charCodeAt(0)] |= 1;
  peq[a.charCodeAt(1)] |= 2;
  peq[a.charCodeAt(2)] |= 4;
  peq[a.charCodeAt(3)] |= 8;
  peq[a.charCodeAt(4)] |= 16;
  peq[a.charCodeAt(5)] |= 32;
  peq[a.charCodeAt(6)] |= 64;
  peq[a.charCodeAt(7)] |= 128;
  peq[a.charCodeAt(8)] |= 256;
  peq[a.charCodeAt(9)] |= 512;
  peq[a.charCodeAt(10)] |= 1024;
  peq[a.charCodeAt(11)] |= 2048;
  peq[a.charCodeAt(12)] |= 4096;
  peq[a.charCodeAt(13)] |= 8192;
  peq[a.charCodeAt(14)] |= 16384;
  peq[a.charCodeAt(15)] |= 32768;
  peq[a.charCodeAt(16)] |= 65536;
  peq[a.charCodeAt(17)] |= 131072;
  peq[a.charCodeAt(18)] |= 262144;
  peq[a.charCodeAt(19)] |= 524288;
  peq[a.charCodeAt(20)] |= 1048576;
  peq[a.charCodeAt(21)] |= 2097152;
  peq[a.charCodeAt(22)] |= 4194304;
  peq[a.charCodeAt(23)] |= 8388608;
  for (let i = 0; i < m; i++) {
    let eq = peq[b.charCodeAt(i)];
    const xv = eq | mv;
    eq |= ((eq & pv) + pv) ^ pv;
    mv |= ~(eq | pv);
    pv &= eq;
    if (mv & lst) sc++;
    if (pv & lst) sc--;
    mv = ((mv << 1) | 1) >>> 0;
    pv = ((pv << 1) | ~(xv | mv)) >>> 0;
    mv &= xv;
  }
  peq[a.charCodeAt(0)] = 0;
  peq[a.charCodeAt(1)] = 0;
  peq[a.charCodeAt(2)] = 0;
  peq[a.charCodeAt(3)] = 0;
  peq[a.charCodeAt(4)] = 0;
  peq[a.charCodeAt(5)] = 0;
  peq[a.charCodeAt(6)] = 0;
  peq[a.charCodeAt(7)] = 0;
  peq[a.charCodeAt(8)] = 0;
  peq[a.charCodeAt(9)] = 0;
  peq[a.charCodeAt(10)] = 0;
  peq[a.charCodeAt(11)] = 0;
  peq[a.charCodeAt(12)] = 0;
  peq[a.charCodeAt(13)] = 0;
  peq[a.charCodeAt(14)] = 0;
  peq[a.charCodeAt(15)] = 0;
  peq[a.charCodeAt(16)] = 0;
  peq[a.charCodeAt(17)] = 0;
  peq[a.charCodeAt(18)] = 0;
  peq[a.charCodeAt(19)] = 0;
  peq[a.charCodeAt(20)] = 0;
  peq[a.charCodeAt(21)] = 0;
  peq[a.charCodeAt(22)] = 0;
  peq[a.charCodeAt(23)] = 0;
  return sc;
}
myers_table[24] = myers_24;

function myers_25(a, b) {
  const m = b.length;
  const lst = 16777216;
  let pv = -1 >>> 0, mv = 0, sc = 25;
  peq[a.charCodeAt(0)] |= 1;
  peq[a.charCodeAt(1)] |= 2;
  peq[a.charCodeAt(2)] |= 4;
  peq[a.charCodeAt(3)] |= 8;
  peq[a.charCodeAt(4)] |= 16;
  peq[a.charCodeAt(5)] |= 32;
  peq[a.charCodeAt(6)] |= 64;
  peq[a.charCodeAt(7)] |= 128;
  peq[a.charCodeAt(8)] |= 256;
  peq[a.charCodeAt(9)] |= 512;
  peq[a.charCodeAt(10)] |= 1024;
  peq[a.charCodeAt(11)] |= 2048;
  peq[a.charCodeAt(12)] |= 4096;
  peq[a.charCodeAt(13)] |= 8192;
  peq[a.charCodeAt(14)] |= 16384;
  peq[a.charCodeAt(15)] |= 32768;
  peq[a.charCodeAt(16)] |= 65536;
  peq[a.charCodeAt(17)] |= 131072;
  peq[a.charCodeAt(18)] |= 262144;
  peq[a.charCodeAt(19)] |= 524288;
  peq[a.charCodeAt(20)] |= 1048576;
  peq[a.charCodeAt(21)] |= 2097152;
  peq[a.charCodeAt(22)] |= 4194304;
  peq[a.charCodeAt(23)] |= 8388608;
  peq[a.charCodeAt(24)] |= 16777216;
  for (let i = 0; i < m; i++) {
    let eq = peq[b.charCodeAt(i)];
    const xv = eq | mv;
    eq |= ((eq & pv) + pv) ^ pv;
    mv |= ~(eq | pv);
    pv &= eq;
    if (mv & lst) sc++;
    if (pv & lst) sc--;
    mv = ((mv << 1) | 1) >>> 0;
    pv = ((pv << 1) | ~(xv | mv)) >>> 0;
    mv &= xv;
  }
  peq[a.charCodeAt(0)] = 0;
  peq[a.charCodeAt(1)] = 0;
  peq[a.charCodeAt(2)] = 0;
  peq[a.charCodeAt(3)] = 0;
  peq[a.charCodeAt(4)] = 0;
  peq[a.charCodeAt(5)] = 0;
  peq[a.charCodeAt(6)] = 0;
  peq[a.charCodeAt(7)] = 0;
  peq[a.charCodeAt(8)] = 0;
  peq[a.charCodeAt(9)] = 0;
  peq[a.charCodeAt(10)] = 0;
  peq[a.charCodeAt(11)] = 0;
  peq[a.charCodeAt(12)] = 0;
  peq[a.charCodeAt(13)] = 0;
  peq[a.charCodeAt(14)] = 0;
  peq[a.charCodeAt(15)] = 0;
  peq[a.charCodeAt(16)] = 0;
  peq[a.charCodeAt(17)] = 0;
  peq[a.charCodeAt(18)] = 0;
  peq[a.charCodeAt(19)] = 0;
  peq[a.charCodeAt(20)] = 0;
  peq[a.charCodeAt(21)] = 0;
  peq[a.charCodeAt(22)] = 0;
  peq[a.charCodeAt(23)] = 0;
  peq[a.charCodeAt(24)] = 0;
  return sc;
}
myers_table[25] = myers_25;

function myers_26(a, b) {
  const m = b.length;
  const lst = 33554432;
  let pv = -1 >>> 0, mv = 0, sc = 26;
  peq[a.charCodeAt(0)] |= 1;
  peq[a.charCodeAt(1)] |= 2;
  peq[a.charCodeAt(2)] |= 4;
  peq[a.charCodeAt(3)] |= 8;
  peq[a.charCodeAt(4)] |= 16;
  peq[a.charCodeAt(5)] |= 32;
  peq[a.charCodeAt(6)] |= 64;
  peq[a.charCodeAt(7)] |= 128;
  peq[a.charCodeAt(8)] |= 256;
  peq[a.charCodeAt(9)] |= 512;
  peq[a.charCodeAt(10)] |= 1024;
  peq[a.charCodeAt(11)] |= 2048;
  peq[a.charCodeAt(12)] |= 4096;
  peq[a.charCodeAt(13)] |= 8192;
  peq[a.charCodeAt(14)] |= 16384;
  peq[a.charCodeAt(15)] |= 32768;
  peq[a.charCodeAt(16)] |= 65536;
  peq[a.charCodeAt(17)] |= 131072;
  peq[a.charCodeAt(18)] |= 262144;
  peq[a.charCodeAt(19)] |= 524288;
  peq[a.charCodeAt(20)] |= 1048576;
  peq[a.charCodeAt(21)] |= 2097152;
  peq[a.charCodeAt(22)] |= 4194304;
  peq[a.charCodeAt(23)] |= 8388608;
  peq[a.charCodeAt(24)] |= 16777216;
  peq[a.charCodeAt(25)] |= 33554432;
  for (let i = 0; i < m; i++) {
    let eq = peq[b.charCodeAt(i)];
    const xv = eq | mv;
    eq |= ((eq & pv) + pv) ^ pv;
    mv |= ~(eq | pv);
    pv &= eq;
    if (mv & lst) sc++;
    if (pv & lst) sc--;
    mv = ((mv << 1) | 1) >>> 0;
    pv = ((pv << 1) | ~(xv | mv)) >>> 0;
    mv &= xv;
  }
  peq[a.charCodeAt(0)] = 0;
  peq[a.charCodeAt(1)] = 0;
  peq[a.charCodeAt(2)] = 0;
  peq[a.charCodeAt(3)] = 0;
  peq[a.charCodeAt(4)] = 0;
  peq[a.charCodeAt(5)] = 0;
  peq[a.charCodeAt(6)] = 0;
  peq[a.charCodeAt(7)] = 0;
  peq[a.charCodeAt(8)] = 0;
  peq[a.charCodeAt(9)] = 0;
  peq[a.charCodeAt(10)] = 0;
  peq[a.charCodeAt(11)] = 0;
  peq[a.charCodeAt(12)] = 0;
  peq[a.charCodeAt(13)] = 0;
  peq[a.charCodeAt(14)] = 0;
  peq[a.charCodeAt(15)] = 0;
  peq[a.charCodeAt(16)] = 0;
  peq[a.charCodeAt(17)] = 0;
  peq[a.charCodeAt(18)] = 0;
  peq[a.charCodeAt(19)] = 0;
  peq[a.charCodeAt(20)] = 0;
  peq[a.charCodeAt(21)] = 0;
  peq[a.charCodeAt(22)] = 0;
  peq[a.charCodeAt(23)] = 0;
  peq[a.charCodeAt(24)] = 0;
  peq[a.charCodeAt(25)] = 0;
  return sc;
}
myers_table[26] = myers_26;

function myers_27(a, b) {
  const m = b.length;
  const lst = 67108864;
  let pv = -1 >>> 0, mv = 0, sc = 27;
  peq[a.charCodeAt(0)] |= 1;
  peq[a.charCodeAt(1)] |= 2;
  peq[a.charCodeAt(2)] |= 4;
  peq[a.charCodeAt(3)] |= 8;
  peq[a.charCodeAt(4)] |= 16;
  peq[a.charCodeAt(5)] |= 32;
  peq[a.charCodeAt(6)] |= 64;
  peq[a.charCodeAt(7)] |= 128;
  peq[a.charCodeAt(8)] |= 256;
  peq[a.charCodeAt(9)] |= 512;
  peq[a.charCodeAt(10)] |= 1024;
  peq[a.charCodeAt(11)] |= 2048;
  peq[a.charCodeAt(12)] |= 4096;
  peq[a.charCodeAt(13)] |= 8192;
  peq[a.charCodeAt(14)] |= 16384;
  peq[a.charCodeAt(15)] |= 32768;
  peq[a.charCodeAt(16)] |= 65536;
  peq[a.charCodeAt(17)] |= 131072;
  peq[a.charCodeAt(18)] |= 262144;
  peq[a.charCodeAt(19)] |= 524288;
  peq[a.charCodeAt(20)] |= 1048576;
  peq[a.charCodeAt(21)] |= 2097152;
  peq[a.charCodeAt(22)] |= 4194304;
  peq[a.charCodeAt(23)] |= 8388608;
  peq[a.charCodeAt(24)] |= 16777216;
  peq[a.charCodeAt(25)] |= 33554432;
  peq[a.charCodeAt(26)] |= 67108864;
  for (let i = 0; i < m; i++) {
    let eq = peq[b.charCodeAt(i)];
    const xv = eq | mv;
    eq |= ((eq & pv) + pv) ^ pv;
    mv |= ~(eq | pv);
    pv &= eq;
    if (mv & lst) sc++;
    if (pv & lst) sc--;
    mv = ((mv << 1) | 1) >>> 0;
    pv = ((pv << 1) | ~(xv | mv)) >>> 0;
    mv &= xv;
  }
  peq[a.charCodeAt(0)] = 0;
  peq[a.charCodeAt(1)] = 0;
  peq[a.charCodeAt(2)] = 0;
  peq[a.charCodeAt(3)] = 0;
  peq[a.charCodeAt(4)] = 0;
  peq[a.charCodeAt(5)] = 0;
  peq[a.charCodeAt(6)] = 0;
  peq[a.charCodeAt(7)] = 0;
  peq[a.charCodeAt(8)] = 0;
  peq[a.charCodeAt(9)] = 0;
  peq[a.charCodeAt(10)] = 0;
  peq[a.charCodeAt(11)] = 0;
  peq[a.charCodeAt(12)] = 0;
  peq[a.charCodeAt(13)] = 0;
  peq[a.charCodeAt(14)] = 0;
  peq[a.charCodeAt(15)] = 0;
  peq[a.charCodeAt(16)] = 0;
  peq[a.charCodeAt(17)] = 0;
  peq[a.charCodeAt(18)] = 0;
  peq[a.charCodeAt(19)] = 0;
  peq[a.charCodeAt(20)] = 0;
  peq[a.charCodeAt(21)] = 0;
  peq[a.charCodeAt(22)] = 0;
  peq[a.charCodeAt(23)] = 0;
  peq[a.charCodeAt(24)] = 0;
  peq[a.charCodeAt(25)] = 0;
  peq[a.charCodeAt(26)] = 0;
  return sc;
}
myers_table[27] = myers_27;

function myers_28(a, b) {
  const m = b.length;
  const lst = 134217728;
  let pv = -1 >>> 0, mv = 0, sc = 28;
  peq[a.charCodeAt(0)] |= 1;
  peq[a.charCodeAt(1)] |= 2;
  peq[a.charCodeAt(2)] |= 4;
  peq[a.charCodeAt(3)] |= 8;
  peq[a.charCodeAt(4)] |= 16;
  peq[a.charCodeAt(5)] |= 32;
  peq[a.charCodeAt(6)] |= 64;
  peq[a.charCodeAt(7)] |= 128;
  peq[a.charCodeAt(8)] |= 256;
  peq[a.charCodeAt(9)] |= 512;
  peq[a.charCodeAt(10)] |= 1024;
  peq[a.charCodeAt(11)] |= 2048;
  peq[a.charCodeAt(12)] |= 4096;
  peq[a.charCodeAt(13)] |= 8192;
  peq[a.charCodeAt(14)] |= 16384;
  peq[a.charCodeAt(15)] |= 32768;
  peq[a.charCodeAt(16)] |= 65536;
  peq[a.charCodeAt(17)] |= 131072;
  peq[a.charCodeAt(18)] |= 262144;
  peq[a.charCodeAt(19)] |= 524288;
  peq[a.charCodeAt(20)] |= 1048576;
  peq[a.charCodeAt(21)] |= 2097152;
  peq[a.charCodeAt(22)] |= 4194304;
  peq[a.charCodeAt(23)] |= 8388608;
  peq[a.charCodeAt(24)] |= 16777216;
  peq[a.charCodeAt(25)] |= 33554432;
  peq[a.charCodeAt(26)] |= 67108864;
  peq[a.charCodeAt(27)] |= 134217728;
  for (let i = 0; i < m; i++) {
    let eq = peq[b.charCodeAt(i)];
    const xv = eq | mv;
    eq |= ((eq & pv) + pv) ^ pv;
    mv |= ~(eq | pv);
    pv &= eq;
    if (mv & lst) sc++;
    if (pv & lst) sc--;
    mv = ((mv << 1) | 1) >>> 0;
    pv = ((pv << 1) | ~(xv | mv)) >>> 0;
    mv &= xv;
  }
  peq[a.charCodeAt(0)] = 0;
  peq[a.charCodeAt(1)] = 0;
  peq[a.charCodeAt(2)] = 0;
  peq[a.charCodeAt(3)] = 0;
  peq[a.charCodeAt(4)] = 0;
  peq[a.charCodeAt(5)] = 0;
  peq[a.charCodeAt(6)] = 0;
  peq[a.charCodeAt(7)] = 0;
  peq[a.charCodeAt(8)] = 0;
  peq[a.charCodeAt(9)] = 0;
  peq[a.charCodeAt(10)] = 0;
  peq[a.charCodeAt(11)] = 0;
  peq[a.charCodeAt(12)] = 0;
  peq[a.charCodeAt(13)] = 0;
  peq[a.charCodeAt(14)] = 0;
  peq[a.charCodeAt(15)] = 0;
  peq[a.charCodeAt(16)] = 0;
  peq[a.charCodeAt(17)] = 0;
  peq[a.charCodeAt(18)] = 0;
  peq[a.charCodeAt(19)] = 0;
  peq[a.charCodeAt(20)] = 0;
  peq[a.charCodeAt(21)] = 0;
  peq[a.charCodeAt(22)] = 0;
  peq[a.charCodeAt(23)] = 0;
  peq[a.charCodeAt(24)] = 0;
  peq[a.charCodeAt(25)] = 0;
  peq[a.charCodeAt(26)] = 0;
  peq[a.charCodeAt(27)] = 0;
  return sc;
}
myers_table[28] = myers_28;

function myers_29(a, b) {
  const m = b.length;
  const lst = 268435456;
  let pv = -1 >>> 0, mv = 0, sc = 29;
  peq[a.charCodeAt(0)] |= 1;
  peq[a.charCodeAt(1)] |= 2;
  peq[a.charCodeAt(2)] |= 4;
  peq[a.charCodeAt(3)] |= 8;
  peq[a.charCodeAt(4)] |= 16;
  peq[a.charCodeAt(5)] |= 32;
  peq[a.charCodeAt(6)] |= 64;
  peq[a.charCodeAt(7)] |= 128;
  peq[a.charCodeAt(8)] |= 256;
  peq[a.charCodeAt(9)] |= 512;
  peq[a.charCodeAt(10)] |= 1024;
  peq[a.charCodeAt(11)] |= 2048;
  peq[a.charCodeAt(12)] |= 4096;
  peq[a.charCodeAt(13)] |= 8192;
  peq[a.charCodeAt(14)] |= 16384;
  peq[a.charCodeAt(15)] |= 32768;
  peq[a.charCodeAt(16)] |= 65536;
  peq[a.charCodeAt(17)] |= 131072;
  peq[a.charCodeAt(18)] |= 262144;
  peq[a.charCodeAt(19)] |= 524288;
  peq[a.charCodeAt(20)] |= 1048576;
  peq[a.charCodeAt(21)] |= 2097152;
  peq[a.charCodeAt(22)] |= 4194304;
  peq[a.charCodeAt(23)] |= 8388608;
  peq[a.charCodeAt(24)] |= 16777216;
  peq[a.charCodeAt(25)] |= 33554432;
  peq[a.charCodeAt(26)] |= 67108864;
  peq[a.charCodeAt(27)] |= 134217728;
  peq[a.charCodeAt(28)] |= 268435456;
  for (let i = 0; i < m; i++) {
    let eq = peq[b.charCodeAt(i)];
    const xv = eq | mv;
    eq |= ((eq & pv) + pv) ^ pv;
    mv |= ~(eq | pv);
    pv &= eq;
    if (mv & lst) sc++;
    if (pv & lst) sc--;
    mv = ((mv << 1) | 1) >>> 0;
    pv = ((pv << 1) | ~(xv | mv)) >>> 0;
    mv &= xv;
  }
  peq[a.charCodeAt(0)] = 0;
  peq[a.charCodeAt(1)] = 0;
  peq[a.charCodeAt(2)] = 0;
  peq[a.charCodeAt(3)] = 0;
  peq[a.charCodeAt(4)] = 0;
  peq[a.charCodeAt(5)] = 0;
  peq[a.charCodeAt(6)] = 0;
  peq[a.charCodeAt(7)] = 0;
  peq[a.charCodeAt(8)] = 0;
  peq[a.charCodeAt(9)] = 0;
  peq[a.charCodeAt(10)] = 0;
  peq[a.charCodeAt(11)] = 0;
  peq[a.charCodeAt(12)] = 0;
  peq[a.charCodeAt(13)] = 0;
  peq[a.charCodeAt(14)] = 0;
  peq[a.charCodeAt(15)] = 0;
  peq[a.charCodeAt(16)] = 0;
  peq[a.charCodeAt(17)] = 0;
  peq[a.charCodeAt(18)] = 0;
  peq[a.charCodeAt(19)] = 0;
  peq[a.charCodeAt(20)] = 0;
  peq[a.charCodeAt(21)] = 0;
  peq[a.charCodeAt(22)] = 0;
  peq[a.charCodeAt(23)] = 0;
  peq[a.charCodeAt(24)] = 0;
  peq[a.charCodeAt(25)] = 0;
  peq[a.charCodeAt(26)] = 0;
  peq[a.charCodeAt(27)] = 0;
  peq[a.charCodeAt(28)] = 0;
  return sc;
}
myers_table[29] = myers_29;

function myers_30(a, b) {
  const m = b.length;
  const lst = 536870912;
  let pv = -1 >>> 0, mv = 0, sc = 30;
  peq[a.charCodeAt(0)] |= 1;
  peq[a.charCodeAt(1)] |= 2;
  peq[a.charCodeAt(2)] |= 4;
  peq[a.charCodeAt(3)] |= 8;
  peq[a.charCodeAt(4)] |= 16;
  peq[a.charCodeAt(5)] |= 32;
  peq[a.charCodeAt(6)] |= 64;
  peq[a.charCodeAt(7)] |= 128;
  peq[a.charCodeAt(8)] |= 256;
  peq[a.charCodeAt(9)] |= 512;
  peq[a.charCodeAt(10)] |= 1024;
  peq[a.charCodeAt(11)] |= 2048;
  peq[a.charCodeAt(12)] |= 4096;
  peq[a.charCodeAt(13)] |= 8192;
  peq[a.charCodeAt(14)] |= 16384;
  peq[a.charCodeAt(15)] |= 32768;
  peq[a.charCodeAt(16)] |= 65536;
  peq[a.charCodeAt(17)] |= 131072;
  peq[a.charCodeAt(18)] |= 262144;
  peq[a.charCodeAt(19)] |= 524288;
  peq[a.charCodeAt(20)] |= 1048576;
  peq[a.charCodeAt(21)] |= 2097152;
  peq[a.charCodeAt(22)] |= 4194304;
  peq[a.charCodeAt(23)] |= 8388608;
  peq[a.charCodeAt(24)] |= 16777216;
  peq[a.charCodeAt(25)] |= 33554432;
  peq[a.charCodeAt(26)] |= 67108864;
  peq[a.charCodeAt(27)] |= 134217728;
  peq[a.charCodeAt(28)] |= 268435456;
  peq[a.charCodeAt(29)] |= 536870912;
  for (let i = 0; i < m; i++) {
    let eq = peq[b.charCodeAt(i)];
    const xv = eq | mv;
    eq |= ((eq & pv) + pv) ^ pv;
    mv |= ~(eq | pv);
    pv &= eq;
    if (mv & lst) sc++;
    if (pv & lst) sc--;
    mv = ((mv << 1) | 1) >>> 0;
    pv = ((pv << 1) | ~(xv | mv)) >>> 0;
    mv &= xv;
  }
  peq[a.charCodeAt(0)] = 0;
  peq[a.charCodeAt(1)] = 0;
  peq[a.charCodeAt(2)] = 0;
  peq[a.charCodeAt(3)] = 0;
  peq[a.charCodeAt(4)] = 0;
  peq[a.charCodeAt(5)] = 0;
  peq[a.charCodeAt(6)] = 0;
  peq[a.charCodeAt(7)] = 0;
  peq[a.charCodeAt(8)] = 0;
  peq[a.charCodeAt(9)] = 0;
  peq[a.charCodeAt(10)] = 0;
  peq[a.charCodeAt(11)] = 0;
  peq[a.charCodeAt(12)] = 0;
  peq[a.charCodeAt(13)] = 0;
  peq[a.charCodeAt(14)] = 0;
  peq[a.charCodeAt(15)] = 0;
  peq[a.charCodeAt(16)] = 0;
  peq[a.charCodeAt(17)] = 0;
  peq[a.charCodeAt(18)] = 0;
  peq[a.charCodeAt(19)] = 0;
  peq[a.charCodeAt(20)] = 0;
  peq[a.charCodeAt(21)] = 0;
  peq[a.charCodeAt(22)] = 0;
  peq[a.charCodeAt(23)] = 0;
  peq[a.charCodeAt(24)] = 0;
  peq[a.charCodeAt(25)] = 0;
  peq[a.charCodeAt(26)] = 0;
  peq[a.charCodeAt(27)] = 0;
  peq[a.charCodeAt(28)] = 0;
  peq[a.charCodeAt(29)] = 0;
  return sc;
}
myers_table[30] = myers_30;

function myers_31(a, b) {
  const m = b.length;
  const lst = 1073741824;
  let pv = -1 >>> 0, mv = 0, sc = 31;
  peq[a.charCodeAt(0)] |= 1;
  peq[a.charCodeAt(1)] |= 2;
  peq[a.charCodeAt(2)] |= 4;
  peq[a.charCodeAt(3)] |= 8;
  peq[a.charCodeAt(4)] |= 16;
  peq[a.charCodeAt(5)] |= 32;
  peq[a.charCodeAt(6)] |= 64;
  peq[a.charCodeAt(7)] |= 128;
  peq[a.charCodeAt(8)] |= 256;
  peq[a.charCodeAt(9)] |= 512;
  peq[a.charCodeAt(10)] |= 1024;
  peq[a.charCodeAt(11)] |= 2048;
  peq[a.charCodeAt(12)] |= 4096;
  peq[a.charCodeAt(13)] |= 8192;
  peq[a.charCodeAt(14)] |= 16384;
  peq[a.charCodeAt(15)] |= 32768;
  peq[a.charCodeAt(16)] |= 65536;
  peq[a.charCodeAt(17)] |= 131072;
  peq[a.charCodeAt(18)] |= 262144;
  peq[a.charCodeAt(19)] |= 524288;
  peq[a.charCodeAt(20)] |= 1048576;
  peq[a.charCodeAt(21)] |= 2097152;
  peq[a.charCodeAt(22)] |= 4194304;
  peq[a.charCodeAt(23)] |= 8388608;
  peq[a.charCodeAt(24)] |= 16777216;
  peq[a.charCodeAt(25)] |= 33554432;
  peq[a.charCodeAt(26)] |= 67108864;
  peq[a.charCodeAt(27)] |= 134217728;
  peq[a.charCodeAt(28)] |= 268435456;
  peq[a.charCodeAt(29)] |= 536870912;
  peq[a.charCodeAt(30)] |= 1073741824;
  for (let i = 0; i < m; i++) {
    let eq = peq[b.charCodeAt(i)];
    const xv = eq | mv;
    eq |= ((eq & pv) + pv) ^ pv;
    mv |= ~(eq | pv);
    pv &= eq;
    if (mv & lst) sc++;
    if (pv & lst) sc--;
    mv = ((mv << 1) | 1) >>> 0;
    pv = ((pv << 1) | ~(xv | mv)) >>> 0;
    mv &= xv;
  }
  peq[a.charCodeAt(0)] = 0;
  peq[a.charCodeAt(1)] = 0;
  peq[a.charCodeAt(2)] = 0;
  peq[a.charCodeAt(3)] = 0;
  peq[a.charCodeAt(4)] = 0;
  peq[a.charCodeAt(5)] = 0;
  peq[a.charCodeAt(6)] = 0;
  peq[a.charCodeAt(7)] = 0;
  peq[a.charCodeAt(8)] = 0;
  peq[a.charCodeAt(9)] = 0;
  peq[a.charCodeAt(10)] = 0;
  peq[a.charCodeAt(11)] = 0;
  peq[a.charCodeAt(12)] = 0;
  peq[a.charCodeAt(13)] = 0;
  peq[a.charCodeAt(14)] = 0;
  peq[a.charCodeAt(15)] = 0;
  peq[a.charCodeAt(16)] = 0;
  peq[a.charCodeAt(17)] = 0;
  peq[a.charCodeAt(18)] = 0;
  peq[a.charCodeAt(19)] = 0;
  peq[a.charCodeAt(20)] = 0;
  peq[a.charCodeAt(21)] = 0;
  peq[a.charCodeAt(22)] = 0;
  peq[a.charCodeAt(23)] = 0;
  peq[a.charCodeAt(24)] = 0;
  peq[a.charCodeAt(25)] = 0;
  peq[a.charCodeAt(26)] = 0;
  peq[a.charCodeAt(27)] = 0;
  peq[a.charCodeAt(28)] = 0;
  peq[a.charCodeAt(29)] = 0;
  peq[a.charCodeAt(30)] = 0;
  return sc;
}
myers_table[31] = myers_31;

function myers_32(a, b) {
  const m = b.length;
  const lst = -2147483648;
  let pv = -1 >>> 0, mv = 0, sc = 32;
  peq[a.charCodeAt(0)] |= 1;
  peq[a.charCodeAt(1)] |= 2;
  peq[a.charCodeAt(2)] |= 4;
  peq[a.charCodeAt(3)] |= 8;
  peq[a.charCodeAt(4)] |= 16;
  peq[a.charCodeAt(5)] |= 32;
  peq[a.charCodeAt(6)] |= 64;
  peq[a.charCodeAt(7)] |= 128;
  peq[a.charCodeAt(8)] |= 256;
  peq[a.charCodeAt(9)] |= 512;
  peq[a.charCodeAt(10)] |= 1024;
  peq[a.charCodeAt(11)] |= 2048;
  peq[a.charCodeAt(12)] |= 4096;
  peq[a.charCodeAt(13)] |= 8192;
  peq[a.charCodeAt(14)] |= 16384;
  peq[a.charCodeAt(15)] |= 32768;
  peq[a.charCodeAt(16)] |= 65536;
  peq[a.charCodeAt(17)] |= 131072;
  peq[a.charCodeAt(18)] |= 262144;
  peq[a.charCodeAt(19)] |= 524288;
  peq[a.charCodeAt(20)] |= 1048576;
  peq[a.charCodeAt(21)] |= 2097152;
  peq[a.charCodeAt(22)] |= 4194304;
  peq[a.charCodeAt(23)] |= 8388608;
  peq[a.charCodeAt(24)] |= 16777216;
  peq[a.charCodeAt(25)] |= 33554432;
  peq[a.charCodeAt(26)] |= 67108864;
  peq[a.charCodeAt(27)] |= 134217728;
  peq[a.charCodeAt(28)] |= 268435456;
  peq[a.charCodeAt(29)] |= 536870912;
  peq[a.charCodeAt(30)] |= 1073741824;
  peq[a.charCodeAt(31)] |= -2147483648;
  for (let i = 0; i < m; i++) {
    let eq = peq[b.charCodeAt(i)];
    const xv = eq | mv;
    eq |= ((eq & pv) + pv) ^ pv;
    mv |= ~(eq | pv);
    pv &= eq;
    if (mv & lst) sc++;
    if (pv & lst) sc--;
    mv = ((mv << 1) | 1) >>> 0;
    pv = ((pv << 1) | ~(xv | mv)) >>> 0;
    mv &= xv;
  }
  peq[a.charCodeAt(0)] = 0;
  peq[a.charCodeAt(1)] = 0;
  peq[a.charCodeAt(2)] = 0;
  peq[a.charCodeAt(3)] = 0;
  peq[a.charCodeAt(4)] = 0;
  peq[a.charCodeAt(5)] = 0;
  peq[a.charCodeAt(6)] = 0;
  peq[a.charCodeAt(7)] = 0;
  peq[a.charCodeAt(8)] = 0;
  peq[a.charCodeAt(9)] = 0;
  peq[a.charCodeAt(10)] = 0;
  peq[a.charCodeAt(11)] = 0;
  peq[a.charCodeAt(12)] = 0;
  peq[a.charCodeAt(13)] = 0;
  peq[a.charCodeAt(14)] = 0;
  peq[a.charCodeAt(15)] = 0;
  peq[a.charCodeAt(16)] = 0;
  peq[a.charCodeAt(17)] = 0;
  peq[a.charCodeAt(18)] = 0;
  peq[a.charCodeAt(19)] = 0;
  peq[a.charCodeAt(20)] = 0;
  peq[a.charCodeAt(21)] = 0;
  peq[a.charCodeAt(22)] = 0;
  peq[a.charCodeAt(23)] = 0;
  peq[a.charCodeAt(24)] = 0;
  peq[a.charCodeAt(25)] = 0;
  peq[a.charCodeAt(26)] = 0;
  peq[a.charCodeAt(27)] = 0;
  peq[a.charCodeAt(28)] = 0;
  peq[a.charCodeAt(29)] = 0;
  peq[a.charCodeAt(30)] = 0;
  peq[a.charCodeAt(31)] = 0;
  return sc;
}
myers_table[32] = myers_32;

export function myers32_fast(a, b) {
  let n = a.length;
  let m = b.length;
  // Always process with the longer string as `a` for bitmask consistency
  if (n < m) {
    [a, b] = [b, a];
    [n, m] = [m, n];
  }
  const fn = myers_table[n];
  return fn ? fn(a, b) : null;
}
