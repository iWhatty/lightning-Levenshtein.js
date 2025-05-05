import fs from "fs";
import { performance } from "perf_hooks";

const peq = new Uint32Array(0x10000);

// Fill variants
const fillAscii = () => peq.fill(0, 0, 128);
const fillPrintableAscii = () => peq.fill(0, 32, 127);
const fillExtendedAscii = () => peq.fill(0, 0, 256);
const fillAll = () => peq.fill(0);
const resetByChar = (str) => {
    for (let i = 0; i < str.length; i++) {
        peq[str.charCodeAt(i)] = 0;
    }
};

const data = JSON.parse(fs.readFileSync("data.json", "utf8"));
const sizes = [4, 8, 16, 32, 64, 128, 256, 512, 1024];

const benchTimed = (fn, inputArray, durationMs = 500) => {
    const start = performance.now();
    const len = inputArray.length;
    let ops = 0;
    while (performance.now() - start < durationMs) {
        fn(inputArray[ops % len]);
        ops++;
    }
    return ops;
};

console.log("Benchmark: PEQ cleanup methods (ops in 5s)");

for (let i = 0; i < data.length; i++) {
    const label = `N=${sizes[i]}`;
    const strings = data[i];

    const p = benchTimed(fillPrintableAscii, strings);
    const a = benchTimed(fillAscii, strings);
    const ext = benchTimed(fillExtendedAscii, strings);
    const all = benchTimed(fillAll, strings);
    const loop = benchTimed(resetByChar, strings);

    console.log(
        `${label.padEnd(8)} | 32–127: ${p.toLocaleString()} ops | 0–127: ${a.toLocaleString()} ops | 0–255: ${ext.toLocaleString()} ops | all: ${all.toLocaleString()} ops | loop: ${loop.toLocaleString()} ops`
    );
}
