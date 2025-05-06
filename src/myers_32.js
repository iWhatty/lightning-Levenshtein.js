
// ./src/myers_32.js

// Global pattern equality table shared across invocations
// const peq = new Uint32Array(0x10000); // One bitmask per Unicode char (up to 16-bit space)
import { peq } from './peq.js';


/**
 * Bit-parallel Myers' algorithm for Levenshtein distance.
 * Optimized for pattern strings ≤ 32 characters.
 *
 * @param {string} a - Pattern string (must be longer or equal to `b`)
 * @param {string} b - Text string to compare
 * @param {number} n - Length of `a`
 * @param {number} m - Length of `b`
 * @returns {number} Edit distance between `a` and `b`
 */
export function myers_32(a, b, n, m) {

    let mv = 0;             // Negative bitmask (all zeros). represents delete state
    let pv = -1;            // Positive bitmask (all ones). represents insert state
    let score = n;          // Worst-case initial score (all insertions)

    // Build pattern equality masks (peq[char] has 1s at positions where a[i] === char)
    let i = n;
    var lst = 1 << (n - 1);
    while (i--) peq[a.charCodeAt(i)] |= 1 << i;

    // for (let i = 0; i < m; i++) {
    //     const bCode = b.charCodeAt(i);
    //     const eq = peq[bCode];
        
    //     const xv = eq | mv;
    //     const eqv = eq | (((eq & pv) + pv) ^ pv); // merged eq update inline
      
    //     const nh = ~(eqv | pv);
    //     const ph = mv | nh;
    //     const mh = pv & eqv;
      
    //     const phLst = ph & lst;
    //     const mhLst = mh & lst;
      
    //     score += (phLst !== 0) - (mhLst !== 0); // branchless scoring
      
    //     const newMv = (ph << 1) | 1;
    //     const newPv = (mh << 1) | ~(xv | newMv);
      
    //     pv = newPv;
    //     mv = newMv & xv;
    //   }
      
    // for (let i = 0; i < m; i++) {
    //     const bCode = b.charCodeAt(i);
    //     let eq = peq[bCode];
      
    //     const xv = eq | mv;
    //     eq |= ((eq & pv) + pv) ^ pv;
      
    //     const nh = ~(eq | pv);
    //     const ph = mv | nh;
    //     const mh = pv & eq;
      
    //     if (ph & lst) score++;
    //     if (mh & lst) score--;
      
    //     const newMv = (ph << 1) | 1;
    //     pv = (mh << 1) | ~(xv | newMv);
    //     mv = newMv & xv;
    //   }


    for (let i = 0; i < m; i++) {
        let eq = peq[b.charCodeAt(i)];
        const xv = eq | mv;
        eq |= ((eq & pv) + pv) ^ pv;
        mv |= ~(eq | pv);
        pv &= eq;
        if (mv & lst) score++;
        if (pv & lst) score--;
        mv = ((mv << 1) | 1) >>> 0;
        pv = ((pv << 1) | ~(xv | mv)) >>> 0;
        mv &= xv;
      }


    // for (i = 0; i < m; i++) {
    //     var eq = peq[b.charCodeAt(i)];
    //     var xv = eq | mv;
    //     eq |= ((eq & pv) + pv) ^ pv;
    //     mv |= ~(eq | pv);
    //     pv &= eq;
    //     if (mv & lst) {
    //         score++;
    //     }
    //     if (pv & lst) {
    //         score--;
    //     }
    //     mv = (mv << 1) | 1;
    //     pv = (pv << 1) | ~(xv | mv);
    //     mv &= xv;
    // }

    // for (let i = 0; i < m; i++) {
    //     let eq = peq[b.charCodeAt(i)];
    //     const xv = eq | mv;
    //     eq |= ((eq & pv) + pv) ^ pv;
      
    //     let ph = mv | ~(eq | pv);
    //     let mh = pv & eq;
      
    //     score += ((ph >>> (n - 1)) & 1) - ((mh >>> (n - 1)) & 1);
      
    //     ph = (ph << 1) | 1;
    //     mh <<= 1;
      
    //     pv = mh | ~(xv | ph);
    //     mv = ph & xv;
    //   }


    // for (let i = 0; i < m; i++) {
    //     const ch = b.charCodeAt(i);
    //     const eq = peq[ch];               // EQ: match vector for b[i] over a[0..n]
    //     const xv = eq | mv;               // EQ or previously deleted
    //     const xh = (((eq & pv) + pv) ^ pv) | eq; // Horizontal transitions

    //     let ph = mv | ~(xh | pv);         // Insertion positions
    //     let mh = pv & xh;                 // Deletion positions

    //     // Branchless score adjustment using only the top (n-1)th bit
    //     // Scoring logic: update score based on bit at the highest tracked position
    //     const inc = (ph >>> (n - 1)) & 1;
    //     const dec = (mh >>> (n - 1)) & 1;
    //     score += inc - dec;

    //     // Advance state vectors by 1 position
    //     // Shift and update bitvectors for next iteration
    //     ph = (ph << 1) | 1;
    //     mh = (mh << 1);

    //     pv = mh | ~(xv | ph);
    //     mv = ph & xv;
    // }

    // Clear used bitmasks for reuse
    i = n;
    while (i--) peq[a.charCodeAt(i)] = 0;

    return score;
};






///// v5

// for (let i = 0; i < m; i++) {
//     const bCode = b.charCodeAt(i);
//     const eq = peq[bCode];
    
//     const xv = eq | mv;
//     const eqv = eq | (((eq & pv) + pv) ^ pv); // merged eq update inline
  
//     const nh = ~(eqv | pv);
//     const ph = mv | nh;
//     const mh = pv & eqv;
  
//     const phLst = ph & lst;
//     const mhLst = mh & lst;
  
//     score += (phLst !== 0) - (mhLst !== 0); // branchless scoring
  
//     const newMv = (ph << 1) | 1;
//     const newPv = (mh << 1) | ~(xv | newMv);
  
//     pv = newPv;
//     mv = newMv & xv;
//   }
  



//// v4

// for (let i = 0; i < m; i++) {
//     const bCode = b.charCodeAt(i);
//     let eq = peq[bCode];
  
//     const xv = eq | mv;
//     eq |= ((eq & pv) + pv) ^ pv;
  
//     const nh = ~(eq | pv);
//     const ph = mv | nh;
//     const mh = pv & eq;
  
//     if (ph & lst) score++;
//     if (mh & lst) score--;
  
//     const newMv = (ph << 1) | 1;
//     pv = (mh << 1) | ~(xv | newMv);
//     mv = newMv & xv;
//   }


//  /// v1

// for (let i = 0; i < m; i++) {
//     const ch = b.charCodeAt(i);
//     const eq = peq[ch];                         // Match vector
//     const xv = eq | mv;
//     const xh = (((eq & pv) + pv) ^ pv) | eq;
  
//     let ph = mv | ~(xh | pv);                   // Insertions
//     let mh = pv & xh;                           // Deletions
  
//     // Branch-based score update — same logic, different perf profile
//     if ((ph >>> (n - 1)) & 1) score++;
//     if ((mh >>> (n - 1)) & 1) score--;
  
//     ph = (ph << 1) | 1;
//     mh <<= 1;
  
//     pv = mh | ~(xv | ph);
//     mv = ph & xv;
//   }



///// v2


// for (let i = 0; i < m; i++) {
//     let eq = peq[b.charCodeAt(i)];
//     const xv = eq | mv;
//     eq |= ((eq & pv) + pv) ^ pv;           // Reuse `eq` as horizontal transitions (xh)
  
//     let ph = mv | ~(eq | pv);
//     let mh = pv & eq;
  
//     // Fast score update with explicit bit test
//     score += ((ph >>> (n - 1)) & 1) - ((mh >>> (n - 1)) & 1);
  
//     // Advance bitvectors
//     ph = (ph << 1) | 1;
//     mh <<= 1;
  
//     pv = mh | ~(xv | ph);
//     mv = ph & xv;
//   }




/// v3 -- slower than v2

// const topBit = 1 << (n - 1);

// for (let i = 0; i < m; i++) {
//   let eq = peq[b.charCodeAt(i)];
//   const xv = eq | mv;
//   eq |= ((eq & pv) + pv) ^ pv;

//   let ph = mv | ~(eq | pv);
//   let mh = pv & eq;

//   // Extract top bits and use subtraction for score change
//   const phBit = ph & topBit;
//   const mhBit = mh & topBit;
//   score += (phBit >>> (n - 1)) - (mhBit >>> (n - 1));

//   ph = (ph << 1) | 1;
//   mh <<= 1;

//   pv = mh | ~(xv | ph);
//   mv = ph & xv;
// }
