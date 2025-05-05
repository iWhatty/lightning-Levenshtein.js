# ⚡ lightning-Levenshtein.js

A high-performance JavaScript implementation of the Levenshtein distance algorithm using a bit-parallel Myers approach with optional early exit.

## Features
- Bit-parallel processing (32-bit)
- Early termination for threshold-based use
- Drop-in `closest()` match finder
- Fully tested, benchmarked against baseline
- Works on Node.js or in browser

## Usage

```js
import { distance } from "./mod_max.js";

distance("kitten", "sitting"); // → 3

import { closest } from "./closest.js";

closest("fast", ["slow", "faster", "fastest"]); // → "faster"
