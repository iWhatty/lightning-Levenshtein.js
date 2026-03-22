

// bench/bolt/fast_16.js
"use strict";

const rowBuf = new Uint16Array(17);

export function fast_16(str1, str2) {
    let str1Len = str1.length;
    let str2Len = str2.length;

    //   if (str1Len === 0) return str2Len;
    //   if (str2Len === 0) return str1Len;

    // keep row width minimal
    //   if (str1Len < str2Len) {
    //     const tmp = str1; str1 = str2; str2 = tmp;
    //     const t = str1Len; str1Len = str2Len; str2Len = t;
    //   }

    for (let j = 0; j <= str2Len; j++) rowBuf[j] = j;

    let nextCol = 0;

    for (let i = 0; i < str1Len; i++) {
        nextCol = i + 1;
        const ai = str1.charCodeAt(i);

        for (let j = 0; j < str2Len; j++) {
            const curCol = nextCol;

            let val = rowBuf[j] + (ai === str2.charCodeAt(j) ? 0 : 1);

            let t = curCol + 1;
            if (val > t) val = t;

            t = rowBuf[j + 1] + 1;
            if (val > t) val = t;

            rowBuf[j] = curCol;
            nextCol = val;
        }

        rowBuf[str2Len] = nextCol;
    }

    return nextCol;
}