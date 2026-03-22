## Benchmark

I generated 500 pairs of strings with length N. I measured the throughput each library achieved across the same dataset. Higher is better.

Reported values are median ops/sec across 3 seeds.

| Test Target | N=1 | N=2 | N=4 | N=8 | N=16 | N=32 | N=64 | N=128 | N=256 | N=512 | N=1024 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| lightning-levenshtein | 185534889 | 88970039 | 47915061 | 33126152 | 12010539 | 6568423 | 1790702 | 574413 | 155690 | 35836 | 9360 |
| fastest-levenshtein | 99195484 | 74593269 | 44281176 | 23288204 | 8121555 | 4239672 | 1087882 | 299694 | 78298 | 19392 | 4975 |
| js-levenshtein | 117858034 | 87952842 | 23753040 | 11365064 | 3371731 | 922209 | 242691 | 62090 | 15934 | 4012 | 1008 |
| leven | 82575042 | 41294182 | 21579827 | 8142399 | 1799231 | 417973 | 113628 | 29804 | 7607 | 1905 | 480.0 |
| levenshtein-edit-distance | 115678422 | 56163472 | 24884806 | 8474653 | 1804582 | 396584 | 106452 | 27466 | 6992 | 1757 | 438.4 |

## Relative Performance

This chart shows how many times faster lightning-levenshtein is than the second-fastest package at each tested length.
