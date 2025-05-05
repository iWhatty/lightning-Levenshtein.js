const fs = require("fs");

// Reuse your random string/data generator
const asciiString = (length) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const result = [];
    for (let i = 0; i < length; i++) {
        result.push(chars[Math.floor(Math.random() * chars.length)]);
    }
    return result.join('');
};


const latin1String = (length) => {
    const result = [];
    for (let i = 0; i < length; i++) {
        const code = 32 + Math.floor(Math.random() * (255 - 32)); // Printable Latin-1
        result.push(String.fromCharCode(code));
    }
    return result.join('');
};


const cjkString = (length) => {
    const result = [];
    for (let i = 0; i < length; i++) {
        const code = 0x4E00 + Math.floor(Math.random() * (0x9FFF - 0x4E00));
        result.push(String.fromCharCode(code));
    }
    return result.join('');
};


const emojiString = (length) => {
    const result = [];
    for (let i = 0; i < length; i++) {
        const code = 0x1F300 + Math.floor(Math.random() * (0x1F6FF - 0x1F300));
        result.push(String.fromCodePoint(code));
    }
    return result.join('');
};


const mixedUnicodeString = (length) => {
    const generators = [asciiString, latin1String, cjkString, emojiString];
    const result = [];
    for (let i = 0; i < length; i++) {
        const g = generators[Math.floor(Math.random() * generators.length)];
        result.push(g(1));
    }
    return result.join('');
};


const randomstringArr = (genFn, strLen, arrLen) => {
    return Array.from({ length: arrLen }, () => genFn(strLen));
};


// const randomstringArr = (stringSize, arraySize) => {
//   const arr = [];
//   for (let i = 0; i < arraySize; i++) {
//     arr.push(randomstring(stringSize));
//   }
//   return arr;
// };

const arrSize = 1000;

if (!fs.existsSync("data3.json")) {
    //   const data = [
    //     randomstringArr(4, arrSize),
    //     randomstringArr(8, arrSize),
    //     randomstringArr(16, arrSize),
    //     randomstringArr(32, arrSize),
    //     randomstringArr(64, arrSize),
    //     randomstringArr(128, arrSize),
    //     randomstringArr(256, arrSize),
    //     randomstringArr(512, arrSize),
    //     randomstringArr(1024, arrSize),
    //   ];

    // const data = [
    //     randomstringArr(asciiString, 1600, 1000),
    //     randomstringArr(latin1String, 1600, 1000),
    //     randomstringArr(cjkString, 1600, 1000),
    //     randomstringArr(emojiString, 1600, 1000),
    //     randomstringArr(mixedUnicodeString, 1600, 1000),
    // ];

    const data = [
        randomstringArr(asciiString, 64, 1000),
        randomstringArr(asciiString, 128, 1000),
        randomstringArr(asciiString, 256, 1000),
        randomstringArr(asciiString, 512, 1000),
        randomstringArr(asciiString, 1024, 1000),
        randomstringArr(asciiString, 2048, 1000),
    ];


    fs.writeFileSync("data3.json", JSON.stringify(data));
}

const data = JSON.parse(fs.readFileSync("data3.json", "utf8"));

// ========== Benchmark Functions ==========
function initBlockA(n, m) {
    const hsize = Math.ceil(n / 32);
    const vsize = Math.ceil(m / 32);
    const phc = new Array(hsize).fill(-1);
    const mhc = new Array(hsize).fill(0);
    return [phc, mhc];
}

function initBlockB(n, m) {
    const mhc = [];
    const phc = [];
    const hsize = Math.ceil(n / 32);
    const vsize = Math.ceil(m / 32);
    for (let i = 0; i < hsize; i++) {
        phc[i] = -1;
        mhc[i] = 0;
    }
    return [phc, mhc];
}

function initBlockC(n, m) {
    const hsize = Math.ceil(n / 32);
    const vsize = Math.ceil(m / 32);
    const mhc = new Array(hsize);
    const phc = new Array(hsize);
    for (let i = 0; i < hsize; i++) {
        phc[i] = -1;
        mhc[i] = 0;
    }
    return [phc, mhc];
}



function initBlockD(n, m) {
    const hsize = Math.ceil(n / 32);
    const vsize = Math.ceil(m / 32);
    const phc = new Array(hsize).fill(-1, 0, 128);
    const mhc = new Array(hsize).fill(0, 0, 128);
    return [phc, mhc];
}

function initBlockE(n, m) {
    const hsize = Math.ceil(n / 32);
    const vsize = Math.ceil(m / 32);
    const mhc = new Array(hsize);
    const phc = new Array(hsize);
    let i = hsize;
    while (i--) {
        phc[i] = -1;
        mhc[i] = 0;
    }
    return [phc, mhc];

}

function initBlockF(n, m) {
    let hsize = Math.ceil(n / 32);
    const vsize = Math.ceil(m / 32);
    const mhc = new Array(hsize);
    const phc = new Array(hsize);
    while (hsize--) {
        phc[hsize] = -1;
        mhc[hsize] = 0;
    }
    return [phc, mhc];

}

function benchmark(label, fn, n, m) {
    const start = performance.now();
    let count = 0;
    const total_MS = 500
    while (performance.now() - start < total_MS) {
        fn(n, m);
        count++;
    }
    return count;
}


// ========== Run Benchmarks ==========
console.log("Running 1s ops/sec benchmark...\n");

data.forEach((pairSet, index) => {
    const [a, b] = [pairSet[0], pairSet[1]];
    const n = a.length;
    const m = b.length;

    console.log(`--- Test ${index + 1} | String lengths: ${n} x ${m}`);


    const opsE = benchmark("Block E", initBlockE, n, m);
    console.log(`Block E (while loop): ${opsE.toLocaleString()} ops/sec`);

    const opsA = benchmark("Block A", initBlockA, n, m);
    console.log(`Block A (.fill): ${opsA.toLocaleString()} ops/sec`);

    const opsB = benchmark("Block B", initBlockB, n, m);
    console.log(`Block B (manual loop): ${opsB.toLocaleString()} ops/sec`);

    const opsC = benchmark("Block C", initBlockC, n, m);
    console.log(`Block C (prealloc loop): ${opsC.toLocaleString()} ops/sec`);

    const opsD = benchmark("Block D", initBlockD, n, m);
    console.log(`Block D (.fill 0-128): ${opsD.toLocaleString()} ops/sec`);

    const opsE2 = benchmark("Block E2", initBlockE, n, m);
    console.log(`Block E (while loop): ${opsE2.toLocaleString()} ops/sec`);
    

    const opsF = benchmark("Block F", initBlockF, n, m);
    console.log(`Block F (while hsize): ${opsF.toLocaleString()} ops/sec`);

    console.log("\n");

});