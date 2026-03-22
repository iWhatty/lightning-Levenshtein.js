# packages benchmark notes

## Goal
Benchmark the shipped lightning-levenshtein package against other npm Levenshtein libraries.

## Rules
- Equal-length random string pairs
- Same dataset for all libraries per seed/length
- 500 pairs per dataset
- Median across 3 seeds
- Throughput reported as ops/sec

## Included packages
- lightning-levenshtein
- fastest-levenshtein
- js-levenshtein
- leven
- fast-levenshtein
- levenshtein-edit-distance

## Excluded
Internal kernels and bench-only variants. Those belong in internal optimization benches, not README marketing tables.