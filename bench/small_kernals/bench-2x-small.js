// bench-2x-small.js
"use strict";

import { performance } from "node:perf_hooks";

/* ========= Variants ========= */

// 2x1
function lev_2x1_charCode(a, b) {
    const a0 = a.charCodeAt(0), a1 = a.charCodeAt(1);
    const b0 = b.charCodeAt(0);
    return (a0 === b0 || a1 === b0) ? 1 : 2;
}

function lev_2x1_indexed(a, b) {
    const c = b[0];
    return (a[0] === c || a[1] === c) ? 1 : 2;
}

function lev_2x1_directString(a, b) {
    return (a[0] === b || a[1] === b) ? 1 : 2;
}

// 2x2
function lev_2x2_charCode(a, b) {
    const a0 = a.charCodeAt(0);
    const a1 = a.charCodeAt(1);
    const b0 = b.charCodeAt(0);
    const b1 = b.charCodeAt(1);
    return (a0 !== b0) + (a1 !== b1);
}

function lev_2x2_charCode_inline(a, b) {
    return (a.charCodeAt(0) !== b.charCodeAt(0)) + (a.charCodeAt(1) !== b.charCodeAt(1));
}

function lev_2x2_indexed(a, b) {
    return (a[0] !== b[0]) + (a[1] !== b[1]);
}

function lev_2x2_indexed_const(a, b) {
    const a0 = a[0];
    const a1 = a[1];
    const b0 = b[0];
    const b1 = b[1];
    return (a0 !== b0) + (a1 !== b1);
}

function lev_2x2_startsWith(a, b) {
    return (!a.startsWith(b[0])) + (!a.endsWith(b[1]));
}

// 1x1 reference curiosity
function lev_1x1_charCode(a, b) {
    return +(a.charCodeAt(0) !== b.charCodeAt(0));
}

function lev_1x1_string(a, b) {
    return +(a !== b);
}

/* ========= Data ========= */

function buildAsciiAlphabet() {
    const chars = [];
    for (let i = 97; i <= 122; i++) chars.push(String.fromCharCode(i)); // a-z
    return chars;
}

function buildPairs21(chars) {
    const out = [];
    for (const a0 of chars) {
        for (const a1 of chars) {
            const a = a0 + a1;
            for (const b of chars) {
                out.push([a, b]);
            }
        }
    }
    return out;
}

function buildPairs22(chars) {
    const out = [];
    for (const a0 of chars) {
        for (const a1 of chars) {
            const a = a0 + a1;
            for (const b0 of chars) {
                for (const b1 of chars) {
                    out.push([a, b0 + b1]);
                }
            }
        }
    }
    return out;
}

function buildPairs11(chars) {
    const out = [];
    for (const a of chars) {
        for (const b of chars) {
            out.push([a, b]);
        }
    }
    return out;
}

/* ========= Correctness ========= */

function assertSame(name, fns, pairs) {
    for (let i = 0; i < pairs.length; i++) {
        const [a, b] = pairs[i];
        const expected = fns[0].fn(a, b);
        for (let j = 1; j < fns.length; j++) {
            const got = fns[j].fn(a, b);
            if (got !== expected) {
                throw new Error(
                    `${name} mismatch on (${JSON.stringify(a)}, ${JSON.stringify(b)}): ` +
                    `${fns[0].name}=${expected}, ${fns[j].name}=${got}`
                );
            }
        }
    }
}

/* ========= Bench ========= */

function bench(name, fn, pairs, outerLoops = 200) {
    let sink = 0;

    // warmup
    for (let k = 0; k < 20; k++) {
        for (let i = 0; i < pairs.length; i++) {
            const [a, b] = pairs[i];
            sink ^= fn(a, b);
        }
    }

    const t0 = performance.now();
    for (let k = 0; k < outerLoops; k++) {
        for (let i = 0; i < pairs.length; i++) {
            const [a, b] = pairs[i];
            sink ^= fn(a, b);
        }
    }
    const t1 = performance.now();

    return {
        name,
        ms: t1 - t0,
        ops: outerLoops * pairs.length,
        sink,
    };
}

function printResults(title, results) {
    results.sort((x, y) => x.ms - y.ms);
    const fastest = results[0].ms;

    console.log(`\n=== ${title} ===`);
    for (const r of results) {
        const rel = r.ms / fastest;
        const opsPerSec = (r.ops / r.ms) * 1000;
        console.log(
            `${r.name.padEnd(20)} ` +
            `${r.ms.toFixed(2).padStart(10)} ms   ` +
            `${opsPerSec.toFixed(0).padStart(12)} ops/s   ` +
            `${rel.toFixed(2)}x`
        );
    }
}

/* ========= Main ========= */

function main() {
    const chars = buildAsciiAlphabet();

    const pairs11 = buildPairs11(chars);
    const pairs21 = buildPairs21(chars);
    const pairs22 = buildPairs22(chars);

    const f11 = [
        { name: "1x1 charCode", fn: lev_1x1_charCode },
        { name: "1x1 string", fn: lev_1x1_string },
    ];

    const f21 = [
        { name: "2x1 charCode", fn: lev_2x1_charCode },
        { name: "2x1 indexed", fn: lev_2x1_indexed },
        { name: "2x1 directStr", fn: lev_2x1_directString },
    ];

    const f22 = [
        { name: "2x2 charCode", fn: lev_2x2_charCode },
        { name: "2x2 indexed", fn: lev_2x2_indexed },
        { name: "2x2 index_const", fn: lev_2x2_indexed_const },
        { name: "2x2 startswith", fn: lev_2x2_startsWith },
        { name: "2x2 charCode_inline", fn: lev_2x2_charCode_inline },
    ];

    assertSame("1x1", f11, pairs11);
    assertSame("2x1", f21, pairs21);
    assertSame("2x2", f22, pairs22);

    printResults(
        "1x1",
        f11.map(x => bench(x.name, x.fn, pairs11, 20000))
    );

    printResults(
        "2x1",
        f21.map(x => bench(x.name, x.fn, pairs21, 600))
    );

    printResults(
        "2x2",
        f22.map(x => bench(x.name, x.fn, pairs22, 40))
    );
}

main();