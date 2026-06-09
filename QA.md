# Build Certification & QA Process

This document defines how each build of **Hash & Transcode to Clipboard** is
certified before it is packaged or shipped. Certification proves that the exact
`out/extension.js` that goes into the `.vsix` produces correct, expected output
for every algorithm and transcoder it exposes — verified against an **audited,
source-controlled QA test package**.

> **TL;DR** — A build is *certified* when `npm run qa:algorithms` ends with
> `RESULT: PASS — CERTIFIED out/extension.js` and prints that file's `sha256`.
> **Never package or ship a build that has not been certified.**

## What gets certified

There is exactly **one** shipped artifact: **`out/extension.js`** — a single
minified bundle produced by esbuild from `src/`. The pure-JS hash library
(`@noble/hashes`) is **inlined** into it, so there is no separate algorithms file
and no dependence on the host editor's Node/OpenSSL build.

`src/extension.ts` re-exports the pure logic (`ALGORITHMS`, `TRANSCODERS`,
`computeDigest`), so the bundle exposes it as named exports. The QA harness loads
that bundle under plain Node — with a tiny process-level `vscode` stub
(`qa/vscode-stub.cjs`, supplied via the npm script's `node -r` flag) so
`require('vscode')` resolves — and exercises those exact bundled bytes. The QA
package itself is never altered to do this. **The certified bytes are the shipped
bytes.**

## The audited QA test package

The certifier is a single, self-contained file: **`qa-dist/qa.pkg.mjs`**. It
inlines three things — the expected-results **baseline**, the **test harness**,
and the **audited test cases** — and depends on nothing but the Node runtime and
the one file it is asked to certify (no network, no git, no other repo file, not
even itself).

Its authority comes from **provenance**, not from inspecting itself at run time:
it is reviewed, promoted, and **committed** to source control, and you run *that
committed file*. Because the control cannot be influenced by the code under test,
when the two disagree the **code** is wrong, not the test.

The trust chain has no circularity:

1. **KAT** — published Known-Answer Test vectors (`qa/vectors.mjs`; ~20 vectors
   from NIST CSRC, RFC 1321 (MD5), RFC 7693 (BLAKE2), and ISO/IEC RIPEMD-160
   references) are external ground truth.
2. **Oracle** — Node's `crypto` is proven to reproduce every KAT vector, so it is
   trustworthy as a digest oracle.
3. **Baseline** — the oracle computes the expected digests for the canonical
   inputs; that baseline is inlined into the package. Every run re-derives it and
   asserts it is unchanged (tampered data or a forked OpenSSL is caught).
4. **Code** — the code under test must equal that baseline.

### Baseline data (the auditor's own declarations)

- **`baseline/algorithms.json`** — the canonical set of **15** algorithms the
  control certifies. It is the auditor's *own* declaration; it is **not** derived
  from `src/`, so a code-under-test that exposes a different set must FAIL rather
  than silently reshape the control.
- **`baseline/test-strings.json`** — **7** frozen UTF-8 inputs (lowercase /
  uppercase / mixed-case variants prove case sensitivity, plus alphanumeric and
  symbol coverage). Never change a committed value — every baseline digest depends
  on the exact bytes.

The oracle-computed baseline therefore holds **7 strings × 15 algorithms ×
{hex, base64} = 210** digest values.

## What the harness checks

`qa/qa.mjs` runs **six sections**. It **never stops mid-run** — a thrown call is
caught and recorded as a FAIL, and oracle/baseline problems become WARNINGs — so a
single run yields the *complete* defect list. It exits non-zero if anything fails.

1. **Oracle validation** — Node `crypto` must reproduce every published KAT
   vector (a failure flags all downstream results as suspect).
2. **Baseline integrity** — the embedded strings match `test-strings.json`, and
   every one of the 210 baseline digests re-derives byte-for-byte from the oracle.
3. **Coverage / gap analysis** — per algorithm, itemize **UNTESTED** (code exposes
   it, the control has no test), **MISSING** (the control tests it, the code
   dropped/renamed it), **BROKEN** (`computeDigest` throws / returns nothing), or
   **covered**.
4. **Certification** — the code's `computeDigest()` output must equal the frozen
   baseline `hex` and `base64` for all 210 values, plus `base64url` and
   uppercase-hex spot-checks.
5. **Transcoders** — encode/decode round-trips and an independent-oracle check
   over the frozen strings plus a seeded random corpus. `QA_FULL=1` runs the whole
   corpus; `QA_SEED=<n>` reproduces a specific subset.
6. **Malformed-input rejection** — decoders must throw on invalid Base64/Hex/URL.

On success the run prints `RESULT: PASS — CERTIFIED out/extension.js` and the
file's `sha256`. On any failure it prints `RESULT: FAIL` plus a consolidated
**TO-DO list of every failure**. `QA_QUIET=1` (or `--quiet`) collapses passing
lines; failures are always printed.

## Per-build certification procedure

Run this for **every** new build, before packaging:

```bash
npm run check            # 1. type-check (tsc --noEmit)
npm run build:extension  # 2. bundle -> out/extension.js
npm run qa:algorithms    # 3. CERTIFY out/extension.js   <- must print PASS / CERTIFIED
npm run package          # 4. -> vscode-hash-ext-<version>_<NNNN>.vsix
```

- Steps 1–3 are chained by **`npm run build:certify`**.
- **Gate:** if step 3 does not end in `RESULT: PASS — CERTIFIED`, **stop** — do
  not run step 4. Work through the printed TO-DO list first.
- `npm run package` writes `vscode-hash-ext-<version>_<NNNN>.vsix`, where `<NNNN>`
  is a 4-digit build number that auto-increments per package (tracked in the
  gitignored `.vsix-build.json`, and reset on a major-version bump). The build
  number affects only the filename — never the certified bytes.
- Copy `sha256(out/extension.js)` from the QA output into the certification record
  below.

## Certification record

Append one row per certified build:

| Build (`_NNNN`) | Date | Git commit | `sha256(out/extension.js)` | QA result | Certified by |
|---|---|---|---|---|---|
| `_0010` | YYYY-MM-DD | `<short-sha>` | `<64-hex>` | PASS / CERTIFIED | `<name>` |

**Sign-off.** By recording a row above, the certifier attests that
`npm run qa:algorithms` reported `PASS — CERTIFIED` for the listed
`sha256(out/extension.js)`, and that those exact certified bytes are the
`out/extension.js` packaged into the corresponding `.vsix`.

## Rebuilding the QA package (deliberate, never automatic)

No `npm` command rebuilds the control as a side effect. Rebuild **only** when the
test logic or inputs must intentionally change (e.g. adding an algorithm to
`baseline/algorithms.json`):

```bash
# 1. (optional) edit baseline/algorithms.json, baseline/test-strings.json,
#    or the qa/ harness sources
npm run build:qa     # recompute the baseline via the oracle and bundle data +
                     #   harness -> qa/.staging-qa/qa.pkg.mjs   (gitignored staging)
# 2. review AND revalidate the staging candidate
npm run qa:promote   # copy staging over qa-dist/qa.pkg.mjs
git add qa-dist && git commit -m "update QA package"   # REQUIRED — provenance
```

A rebuilt package is **untrusted** until a human revalidates and commits it. The
committed `qa-dist/qa.pkg.mjs` is the only package the certification step ever
runs.
