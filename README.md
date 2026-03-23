# ⚡ lightning-levenshtein

Fast Levenshtein distance in pure JavaScript.

`lightning-levenshtein` uses tiny-string specializations, precompiled 32-bit kernels, fixed-width Myers variants, and a generalized large-input fallback to deliver high throughput across the full input range.

## Installation

```bash
npm install lightning-levenshtein
```

## What it does

* Specialized kernels for very short strings
* Precompiled bit-parallel dispatch for short inputs
* Fixed-width Myers variants for medium inputs
* Generalized Myers fallback for large inputs
* Zero runtime dependencies
* Works in Node.js and browsers

## Strategy

The runtime selects the cheapest correct kernel for the current input size.

* **1–4 chars:** direct specialized dispatch
* **5–32 chars:** precompiled bit-parallel kernels
* **33–64 chars:** 64-bit-width specialization
* **65–96 chars:** 96-bit-width specialization
* **97–128 chars:** 128-bit-width specialization
* **129–256 chars:** 256-bit-width specialization
* **257+ chars:** generalized Myers fallback

This keeps tiny inputs fast without sacrificing larger-input performance.

## Benchmark

Benchmarks use the same generated dataset for every library. [/bench/data.js]

Benchmarks were run in Node.js:

- **Node version:** `v24.11.0`

### Methodology

* 500 random equal-length string pairs per test size
* 3 seeds: `1337`, `7331`, `20250321`
* 500 ms measurement window per seed
* 3 warm-up rounds before timing
* alphabet: `A-Z`, `a-z`, `0-9`
* reported table values: **median ops/sec across seeds**

### Median ops/sec

| Test Target | N=1 | N=2 | N=4 | N=8 | N=16 | N=32 | N=64 | N=128 | N=256 | N=512 | N=1024 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| lightning-levenshtein | 179471 | 89731 | 50316 | 32155 | 11833 | 6461 | 1917 | 583.4 | 154.8 | 36.06 | 9.359 |
| fastest-levenshtein | 101486 | 74492 | 44316 | 23319 | 8105 | 4236 | 1088 | 302.2 | 77.75 | 19.32 | 4.979 |
| js-levenshtein | 117471 | 87571 | 22872 | 11103 | 3375 | 922.6 | 243.1 | 61.88 | 15.94 | 4.019 | 1.007 |
| leven | 83673 | 41215 | 21399 | 8165 | 1813 | 409.4 | 113.9 | 29.93 | 7.632 | 1.909 | 0.482 |
| levenshtein-edit-distance | 116447 | 55151 | 24667 | 8455 | 1795 | 397.0 | 106.4 | 27.41 | 6.968 | 1.756 | 0.438 |

### Relative throughput vs `fastest-levenshtein`

This chart normalizes `fastest-levenshtein` to **100% at each string length** and shows every other library relative to that baseline.

Use this graph when you want an apples-to-apples comparison against the package most people already know. Values above 100% mean faster than `fastest-levenshtein`; values below 100% mean slower.


![Relative performance vs fastest-levenshtein](./bench/packages/relative-to-fastest-levenshtein.svg)

### Throughput across input sizes

Mean ops/sec shown on a log-scaled Y axis across the full tested range.

![Levenshtein throughput by string length](./bench/packages/mean-ops-loglog-chart.svg)

### Win margin vs the next-fastest competitor

This chart shows how many times faster `lightning-levenshtein` is than the **second-fastest** library at each tested input length.

This is the cleanest graph for answering the blunt question: “by how much does it win?” If the value is `1.0x`, there is effectively no lead. Anything above that is the size of the advantage at that length.

![Relative performance vs second-fastest competitor](./bench/packages/relative-performance.svg)

---

### Rank by input length

This chart shows where each library ranks at each tested string length.

This is useful because raw throughput can be noisy to read at a glance, while rank makes the ordering obvious. If a library is consistently ranked first across the range, you can see that immediately without squinting at the absolute numbers.

![Rank by string length](./bench/packages/mean-rank-log-chart.svg)

## Results

* `lightning-levenshtein` is the fastest library in this benchmark set at every tested length.
* It leads at `N=1`, `N=2`, `N=4`, `N=8`, `N=16`, `N=32`, `N=64`, `N=128`, `N=256`, `N=512`, and `N=1024`.
* At `N=1024`, mean throughput is **9.36 ops/ms** versus **4.98 ops/ms** for `fastest-levenshtein`.
* At `N=32`, mean throughput is **6568 ops/ms** versus **4240 ops/ms** for `fastest-levenshtein`.
* At `N=8`, mean throughput is **33126 ops/ms** versus **23288 ops/ms** for `fastest-levenshtein`.

## Reproducing the benchmark

```bash
npm run bench:packages
npm run bench:packages:table
npm run bench:packages:chart
```

Generated files are written to `bench/packages/`.

## Project layout

```text
bench/bolt/
  lev-dispatch.js
  levenshtein-lightning-v2.js
  levenshtein_Direct_Matrix.js
  myers32_v4.js
  myers_64.js
  myers_96.js
  myers_128.js
  myers_256.js
  myers_x.js
  myers_x64.js

bench/packages/
  run-bench.js
  render-readme-table.js
  render-readme-chart.js
  render-readme-line-chart.js
  render-readme-relative-fastest-chart.js
  results.json
```

## License

See `LICENSE.md`.
