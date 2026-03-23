## Benchmark

I generated 500 pairs of strings with length N. I measured the throughput each library achieved across the same dataset. Higher is better.

Reported values are median ops/ms across 3 seeds.

| Test Target | N=1 | N=2 | N=4 | N=8 | N=16 | N=32 | N=64 | N=128 | N=256 | N=512 | N=1024 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| lightning-levenshtein | 179471 | 89731 | 50316 | 32155 | 11833 | 6461 | 1917 | 583.4 | 154.8 | 36.06 | 9.359 |
| fastest-levenshtein | 101486 | 74492 | 44316 | 23319 | 8105 | 4236 | 1088 | 302.2 | 77.75 | 19.32 | 4.979 |
| js-levenshtein | 117471 | 87571 | 22872 | 11103 | 3375 | 922.6 | 243.1 | 61.88 | 15.94 | 4.019 | 1.007 |
| leven | 83673 | 41215 | 21399 | 8165 | 1813 | 409.4 | 113.9 | 29.93 | 7.632 | 1.909 | 0.482 |
| levenshtein-edit-distance | 116447 | 55151 | 24667 | 8455 | 1795 | 397.0 | 106.4 | 27.41 | 6.968 | 1.756 | 0.438 |

## Relative Performance

This chart shows how many times faster lightning-levenshtein is than the second-fastest package at each tested length.
