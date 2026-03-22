import fs from "fs";
import { performance } from "perf_hooks";

const peq = new Uint32Array(0x10000);
const BENCH_DURATION_MS = 500;

// Fill variants
const fillAscii = () => peq.fill(0, 0, 128);
const fillPrintableAscii = () => peq.fill(0, 32, 128);
const fillExtendedAscii = () => peq.fill(0, 0, 256);
const fillAll = () => peq.fill(0);

// Per-character reset variants
const resetByCharForLoop = (str) => {
    for (let i = 0; i < str.length; i++) {
        peq[str.charCodeAt(i)] = 0;
    }
};

const resetByCharWhileLoop = (str) => {
    let i = str.length;
    while (i--) {
        peq[str.charCodeAt(i)] = 0;
    }
};


const data = JSON.parse(fs.readFileSync("data.json", "utf8"));
const sizes = [4, 8, 16, 32, 64, 128, 256, 512, 1024];

const benchTimed = (fn, inputArray, durationMs = BENCH_DURATION_MS) => {
    const start = performance.now();
    const len = inputArray.length;
    let ops = 0;
    let chars = 0;

    while (performance.now() - start < durationMs) {
        const str = inputArray[ops % len];
        fn(str);
        ops++;
        chars += str.length;
    }

    return { ops, chars };
};

console.log(`Benchmark: PEQ cleanup methods (${BENCH_DURATION_MS}ms)`);

for (let i = 0; i < data.length; i++) {
    const label = `N=${sizes[i]}`;
    const strings = data[i];

    const printable = benchTimed(fillPrintableAscii, strings);
    const ascii = benchTimed(fillAscii, strings);
    const extended = benchTimed(fillExtendedAscii, strings);
    const all = benchTimed(fillAll, strings);
    const forLoop = benchTimed(resetByCharForLoop, strings);
    const whileLoop = benchTimed(resetByCharWhileLoop, strings);

    console.log(
        `${label.padEnd(8)} | ` +
        `print ops: ${printable.ops.toLocaleString()} | ` +
        `ascii ops: ${ascii.ops.toLocaleString()} | ` +
        `ext ops: ${extended.ops.toLocaleString()} | ` +
        `all ops: ${all.ops.toLocaleString()} | ` +
        `for ops: ${forLoop.ops.toLocaleString()} (${forLoop.chars.toLocaleString()} chars) | ` +
        `while ops: ${whileLoop.ops.toLocaleString()} (${whileLoop.chars.toLocaleString()} chars)`
    );
}