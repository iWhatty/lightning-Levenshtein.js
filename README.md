# ⚡ lightning-Levenshtein.js

> A fast, modern, and memory-efficient Levenshtein distance calculator written in pure JavaScript. Optimized with bit-parallel Myers' algorithm and early termination support.

---

## 🚀 Features

* ✅ **Bit-parallel Myers algorithm** for blazing fast edit distance computation
* 🎯 **Early-exit support** via `distanceMax()` to speed up fuzzy searches
* 🔍 **`closest()` utility** for nearest-match discovery in string arrays
* 🧪 Fully **unit-tested** and **benchmarked**
* 🌐 Compatible with **Node.js** and modern **browsers**
* 📦 ES Modules, zero dependencies

---

## 📦 Installation

```bash
npm install lightning-levenshtein
```

---

## ✨ Quick Start

### Basic Distance

```js
import { distance } from "lightning-levenshtein";

distance("kitten", "sitting"); // → 3
```

### Distance With Threshold

```js
import { distanceMax } from "lightning-levenshtein";

distanceMax("kitten", "sitting", 2); // → 3 (but exits early if >2)
```

### Nearest Match

```js
import { closest } from "lightning-levenshtein";

closest("fast", ["slow", "faster", "fastest"]); // → "faster"
```

---

## 🧪 Benchmark Highlights

| Input Size | fastest-levenshtein | lightning-Levenshtein | lightning-d10     |
| ---------- | ------------------- | --------------------- | ----------------- |
| 4 chars    | 80,538 ops/sec      | **91,835 ops/sec**    | 81,031 ops/sec    |
| 64 chars   | 1,451 ops/sec       | 1,771 ops/sec         | **2,612 ops/sec** |
| 1024 chars | 5.54 ops/sec        | 6.85 ops/sec          | **6.87 ops/sec**  |

> See `bench/bench.js` for detailed metrics against `leven`, `fastest-levenshtein`, `js-levenshtein`, etc.

---

## 🔧 API

### `distance(a: string, b: string): number`

> Computes the Levenshtein distance using bit-parallel Myers for strings up to 32 chars and blockwise for longer strings.

### `distanceMax(a: string, b: string, max: number): number`

> Same as `distance`, but exits early if distance exceeds `max`.

### `closest(str: string, list: string[], maxDistance?: number): string | null`

> Finds the closest match from a list. Optional `maxDistance` caps results.

---

## 📁 Project Structure

```sh
src/
  distance.js         # Auto-switching distance dispatcher. 32-Bit optimized for short strings.
  distanceMax.js      # Same with early-exit threshold
  closest.js          # Fuzzy match finder
  myers_32.js         # 32-bit Myers core
  myers_32_max.js     # 32-bit with early exit, max distance threshold
  myers_x.js          # Blockwise Myers core
  myers_x_max.js      # Blockwise with early exit, max distance threshold
```

---

## ✅ Test

```bash
npm test
```

> Uses `jest` with 16+ test cases including edge behavior and random input validation.

---

## 📈 Benchmark

```bash
npm run bench
```

> Profiles against all major Levenshtein libraries with repeatable random string datasets.

---

## 📜 License

👾DR.WATT👾 — Created by @DR.WATT with love, spark, and no unnecessary bitwise operators.

---

## 💡 Tip

> Want blazing fast fuzzy search across millions of strings? `lightning-Levenshtein` is your drop-in weapon.
