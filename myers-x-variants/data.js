
// myers-x-variants\data.js

export const mulberry32 = (seed) => {
  let t = seed >>> 0;
  return () => {
    t += 0x6D2B79F5;
    let r = Math.imul(t ^ (t >>> 15), t | 1);
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
};

export const randomString = (len, rand, alphabet = "abcdefghijklmnopqrstuvwxyz") => {
  let out = "";
  for (let i = 0; i < len; i++) {
    out += alphabet[(rand() * alphabet.length) | 0];
  }
  return out;
};

export const buildPairs = ({ count, lenA, lenB, seed, alphabet }) => {
  const rand = mulberry32(seed);
  const pairs = new Array(count);
  for (let i = 0; i < count; i++) {
    pairs[i] = [
      randomString(lenA, rand, alphabet),
      randomString(lenB, rand, alphabet),
    ];
  }
  return pairs;
};