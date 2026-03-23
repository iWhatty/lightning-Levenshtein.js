## Benchmark

I generated 500 pairs of strings with length N. I measured the throughput each library achieved across the same dataset. Higher is better.

Reported values are median ops/ms across 3 seeds.

| Test Target | N=1 | N=2 | N=4 | N=8 | N=16 | N=32 | N=64 | N=128 | N=256 | N=512 | N=1024 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| lightning-levenshtein-v2 | 180629 | 91386 | 50257 | 32369 | 11949 | 6514 | 1805 | 581.9 | 158.0 | 35.92 | 9.327 |
| lightning-levenshtein-v1 | 94625 | 61719 | 40905 | 25507 | 8577 | 4938 | 1224 | 466.0 | 134.5 | 35.25 | 9.117 |
| fastest-levenshtein | 100634 | 74359 | 43909 | 23150 | 8307 | 4240 | 1087 | 290.2 | 78.41 | 19.55 | 5.092 |
| js-levenshtein | 115773 | 87076 | 23668 | 11343 | 3373 | 924.0 | 241.7 | 61.35 | 15.92 | 3.985 | 1.006 |
| leven | 82490 | 41685 | 21482 | 8188 | 1785 | 420.2 | 114.2 | 29.90 | 7.607 | 1.913 | 0.481 |
| levenshtein-edit-distance | 114674 | 55327 | 24957 | 8463 | 1792 | 396.6 | 106.6 | 27.38 | 6.992 | 1.754 | 0.438 |

## Relative Performance

This chart shows how many times faster lightning-levenshtein-v2 is than the second-fastest package at each tested length.
