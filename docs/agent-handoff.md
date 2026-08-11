# Agent Handoff

Status date: 2026-08-11

## Mission

Maintain and sharpen `lightning-levenshtein`: pure-JavaScript Levenshtein distance built around Myers bit-parallel kernels, generated short-string code, fixed-width specialization, explicit text/memory profiles, and evidence-backed promotion.

Project goal is not an unqualified “fastest everywhere” claim. Goal is strongest defensible JavaScript performance for named workloads, runtimes, and hardware while keeping correctness, package shape, memory cost, and developer experience explicit.

## Current Release State

- npm `latest`: [`lightning-levenshtein@0.0.6`](https://www.npmjs.com/package/lightning-levenshtein)
- Release commit: `1db3b35` (`Harden npm package dry run`)
- Git tag: `v0.0.6`, pushed and pointing at `1db3b35`
- GitHub Release page: not created as of status date
- Audited npm tarball: 45 files, 55,503 packed bytes, 308,087 unpacked bytes
- Tarball SHA-1: `b83ac02a1bccdf7b8c8ae922c00559bb624e206b`
- Fresh registry install passed all eight public subpaths after publication
- Default branch/worktree was clean at handoff creation

Do not move or recreate `v0.0.6`. A GitHub Release may be created from existing tag after maintainer authorization. Creating release must not re-enable GitHub Actions.

## Read First

Read in order:

1. [`AGENTS.md`](../AGENTS.md): binding workflow and repository guardrails.
2. [`README.md`](../README.md): public API, entrypoint positioning, memory inventory, benchmark claim.
3. [`technical-reflection.md`](./technical-reflection.md): architecture judgment, strengths, risks, claim discipline.
4. [`use-cases-and-text-profiles.md`](./use-cases-and-text-profiles.md): comparison semantics, domain use cases, memory model, sources.
5. [`text-profile-integration-plan.md`](./text-profile-integration-plan.md): implemented profile architecture and deferred v2/token work.
6. [`benchmark-hardening-sprint.md`](./benchmark-hardening-sprint.md): completed harness work and remaining qualification work.
7. [`ci-policy.md`](./ci-policy.md), [`node-version-testing.md`](./node-version-testing.md), and [`release-checklist.md`](./release-checklist.md): local gates and release process.
8. [`licensing-position.md`](./licensing-position.md): source-available classification and legal caveat.
9. [`bench/packages/qualification/README.md`](../bench/packages/qualification/README.md) and [`RESULTS.md`](../bench/packages/qualification/RESULTS.md): evidence promotion.
10. [`bench/assemblyscript-spike/README.md`](../bench/assemblyscript-spike/README.md): deferred batch-oriented Wasm experiment.

## Repository Map

- `src/`: stable public runtime.
- `src/v2/`: max-throughput runtime and specialized dispatch.
- `dist/`: published Closure bundles and declarations.
- `codegen/`: generated-kernel ownership and drift checks.
- `bench/bolt/`: historical/experimental v2 variants.
- `bench/packages/`: public package comparison, raw evidence, aggregation, renderers.
- `bench/diagnostics/`: correctness-first workload and dispatch-edge matrix.
- `bench/text-profile-spike/`: profile throughput and worker-memory evidence.
- `test/`: correctness, boundaries, exports, profiles, and evidence guards.
- `scripts/`: source, docs, package, declaration, tarball, and exact-pack checks.
- `.github/workflows/ci.yml.disabled`: retained but intentionally disabled paid workflow.

## Public Package Surface

Eight exported subpaths:

- `lightning-levenshtein`: `distance`, `distanceMax`, `closest`
- `lightning-levenshtein/min`: prebuilt default bundle
- `lightning-levenshtein/v2`: `levenshteinLightning`
- `lightning-levenshtein/v2/min`: prebuilt v2 bundle
- `lightning-levenshtein/unicode`: `distanceUnicode`
- `lightning-levenshtein/unicode/min`: prebuilt Unicode bundle
- `lightning-levenshtein/profiles`: `createDistance`
- `lightning-levenshtein/profiles/min`: prebuilt profiles bundle

Keep default API limited to `distance`, `distanceMax`, and `closest`. Unicode and profiles stay explicit. Do not pull wide tables into default bundle.

## Work Completed

- Fixed unsigned carry propagation in v2 33–64 and 65–96 kernels.
- Added deterministic reference coverage at every production dispatch boundary.
- Made Myers32 A generator own production and comparison outputs with drift check.
- Added `/unicode` and `/profiles` source/min entrypoints plus aligned declarations.
- Added ASCII, Latin-1, and code-unit profile factories with `throw` and explicit `assume-valid` policies.
- Extracted shared table-bound long-kernel factories.
- Added profile throughput and 1/2/4/8-worker memory harnesses.
- Hardened package benchmark scheduling, checksums, raw metadata, aggregation, promotion, and claim generation.
- Added diagnostic workload families and dispatch-edge correctness checks.
- Added docs/link/source checks, exact tarball allowlist, install smoke, and pack report.
- Documented licensing as source-available, not OSI-approved open source.
- Disabled paid GitHub Actions; local release gate is canonical.
- Published and verified npm `0.0.6`.

## Known Documentation Drift

First safe cleanup:

- `text-profile-integration-plan.md` still says npm publication/release decision is pending. `/profiles` shipped in `0.0.6`.
- `use-cases-and-text-profiles.md` says benchmark hardening is next. Harness, workload, and promotion slices are complete; remaining work is quiet-host qualification, diagnostic aggregation, and cross-platform evidence.

Update status language only. Preserve design history and source citations.

## Recommended Next Work

Order:

1. With maintainer approval, create GitHub Release `v0.0.6` from existing tag. Use `CHANGELOG.md` 0.0.6 section. Do not run Actions.
2. Reconcile known documentation drift above.
3. Run quiet-host Intel qualification: three independent raw repetitions, aggregate, inspect stability, promote only if evidence merits README change.
4. Add diagnostic aggregation if current workload runner output cannot be compared cleanly across repetitions.
5. Run separate AMD and Apple Silicon qualification when maintainer provides machines. Never pool absolute throughput across machines.
6. Treat browser/V8, Firefox/SpiderMonkey, and Safari/JavaScriptCore as separate evidence tracks.
7. Later: parameterized generated v2 width variants. Do not insert per-call width checks into hot kernels.
8. Later: dense token API for DNA, proteins, phonemes, and transcript words.
9. Later: AssemblyScript batch spike. Keep Wasm out of published package until boundary-inclusive evidence wins.

## Required Guardrails

- Never enable, dispatch, or watch GitHub Actions without explicit maintainer authorization. Paid cloud compute is disabled by policy.
- Never run qualification benchmarks on busy host. Correctness checks may run normally.
- Never change public benchmark claims from one ad hoc run.
- Keep raw runs. Promote named aggregate only.
- Never average absolute throughput across machines or engines.
- Prove algorithms in `bench/` or `codegen/` before production promotion.
- Rebuild `dist/` after source changes.
- Keep declarations and exports aligned.
- Keep `pnpm-lock.yaml`; do not add `package-lock.json`.
- Do not edit `LICENSE` or `ADDITIONAL_TERMS.md` without maintainer direction and legal review.
- Do not call project OSI-approved open source. Use “source-available.”
- Do not publish npm, create/move tags, or create GitHub Releases without explicit authorization.
- Preserve unrelated user changes in dirty worktrees.

## Commands

```powershell
pnpm.cmd run check:ci
pnpm.cmd run test:docs
pnpm.cmd run test:package:pack:report
pnpm.cmd run bench:packages:promotion:check
pnpm.cmd run bench:diagnostics:verify
```

Qualification timing is separate:

```powershell
pnpm.cmd run bench:packages
pnpm.cmd run bench:packages:aggregate
pnpm.cmd run bench:packages:promote
pnpm.cmd run bench:packages:render
```

Read qualification docs before timing. Do not infer command sequence from names alone.

## npm Authentication Note

Publishing now requires interactive 2FA or granular token with package read/write access and `Bypass 2FA` enabled. Machine token belongs in user npm config, never repository `.npmrc` and never Git:

```powershell
npm config set "//registry.npmjs.org/:_authToken=npm_TOKEN_HERE" --location=user
npm whoami
```

Never commit or paste real token into logs, issues, chat, or repository files. `npm publish` runs full local gate through `prepublishOnly`.

## Definition of Healthy State

- `pnpm run check:ci` green locally.
- Source/codegen drift checks green.
- All eight package subpaths import from packed install.
- Type declarations match exports.
- Exact pack manifest contains runtime, declarations, README assets, and controlling legal files only.
- Benchmark claims identify workload and environment.
- GitHub Actions remains disabled.
- Worktree clean or all changes understood.
