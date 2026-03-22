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

Benchmarks use the same generated dataset for every library.

### Methodology

* 500 random equal-length string pairs per test size
* 3 seeds: `1337`, `7331`, `20250321`
* 500 ms measurement window per seed
* 3 warm-up rounds before timing
* alphabet: `A-Z`, `a-z`, `0-9`
* reported table values: **median ops/sec across seeds**

### Median ops/sec

| Library                   |      N=1 |     N=2 |     N=4 |     N=8 |    N=16 |   N=32 |   N=64 | N=128 | N=256 | N=512 | N=1024 |
| ------------------------- | -------: | ------: | ------: | ------: | ------: | -----: | -----: | ----: | ----: | ----: | -----: |
| lightning-levenshtein     | 185534.9 | 88970.0 | 47915.1 | 33126.2 | 12010.5 | 6568.4 | 1790.7 | 574.4 | 155.7 | 35.8  | 9.4    |
| fastest-levenshtein       |  99195.5 | 74593.3 | 44281.2 | 23288.2 |  8121.6 | 4239.7 | 1087.9 | 299.7 |  78.3 | 19.4  | 5.0    |
| js-levenshtein            | 117858.0 | 87952.8 | 23753.0 | 11365.1 |  3371.7 |  922.2 |  242.7 |  62.1 |  15.9 | 4.0   | 1.0    |
| leven                     |  82575.0 | 41294.2 | 21579.8 |  8142.4 |  1799.2 |  418.0 |  113.6 |  29.8 |   7.6 | 1.9   | 0.5    |
| levenshtein-edit-distance | 115678.4 | 56163.5 | 24884.8 |  8474.7 |  1804.6 |  396.6 |  106.5 |  27.5 |   7.0 | 1.8   | 0.4    |

### Relative throughput vs `fastest-levenshtein`

`fastest-levenshtein` is normalized to **100%** at each string length.

![Relative performance vs fastest-levenshtein](./bench/packages/relative-to-fastest-levenshtein.svg)

### Throughput across input sizes

Mean ops/sec shown on a log-scaled Y axis across the full tested range.

![Levenshtein throughput by string length](./bench/packages/mean-ops-loglog-chart.svg)

## Results

* `lightning-levenshtein` is the fastest library in this benchmark set at every tested length.
* It leads at `N=1`, `N=2`, `N=4`, `N=8`, `N=16`, `N=32`, `N=64`, `N=128`, `N=256`, `N=512`, and `N=1024`.
* At `N=1024`, median throughput is **9.36 ops/ms** versus **4.98 ops/ms** for `fastest-levenshtein`.
* At `N=32`, median throughput is **6568 ops/ms** versus **4240 ops/ms** for `fastest-levenshtein`.
* At `N=8`, median throughput is **33126 ops/ms** versus **23288 ops/ms** for `fastest-levenshtein`.

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
