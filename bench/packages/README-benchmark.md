## Benchmark

I generated 500 pairs of strings with length N. I measured the throughput each library achieved across the same dataset. Higher is better.

Reported values are median ops/sec across 3 seeds.

| Test Target | N=4 | N=8 | N=16 | N=32 | N=64 | N=128 | N=256 | N=512 | N=1024 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| lightning-levenshtein | 48264797 | 32890829 | 12047973 | 6519596 | 1821869 | 556480 | 156306 | 27795 | 7076 |
| fastest-levenshtein | 43798203 | 22965633 | 8118162 | 4217189 | 1086757 | 300987 | 78558 | 19334 | 4979 |
| js-levenshtein | 25263469 | 11889253 | 3415366 | 939329 | 245574 | 62164 | 16259 | 4105 | 1016 |
| leven | 23336193 | 8145449 | 1776881 | 419160 | 113784 | 29681 | 7578 | 1894 | 480.5 |
| levenshtein-edit-distance | 26540352 | 8437943 | 1775457 | 396544 | 106180 | 27467 | 6916 | 1728 | 435.8 |

## Relative Performance

This chart shows how many times faster lightning-levenshtein is than the second-fastest package at each tested length.
