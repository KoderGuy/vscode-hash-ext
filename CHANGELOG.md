# Changelog

## 0.0.1

Initial release.

- 16 hash algorithms, each its own bindable command: SHA-256, SHA-384,
  SHA-512, SHA-512/256, SHA3-224, SHA3-256, SHA3-384, SHA3-512, BLAKE2b-512,
  BLAKE2s-256, SHA-224, SHA-512/224, RIPEMD-160, SM3, plus legacy SHA-1 & MD5.
- 5 reversible transcoder pairs, each its own bindable command: Base64,
  Base64URL, URL (percent), Hex, HTML entities.
- "Pick" commands for hashing, encoding, and decoding via QuickPick.
- Result is copied to the clipboard; the document is never modified.
- Configurable digest encoding (hex/base64/base64url), uppercase, multi-
  selection behavior, and notification toggle.
- Prompts for word-under-cursor vs entire-file when nothing is selected.
- Zero runtime dependencies; minified single-file bundle.
- Compatible with VSCode, Cursor, and Antigravity (engine `^1.74.0`).
- QA test as a **single all-inclusive committed package**
  (`qa-dist/qa.pkg.mjs`): esbuild bundles the oracle-computed baseline
  dataset (224 values) and the JS test harness into one tracked file.
  `qa/run-qa.mjs` executes only the package as committed at git HEAD (exact
  bytes, from a temp file); an uncommitted/working-tree-modified package is
  never run. KAT-validated oracle, baseline-integrity guard, extension-vs-
  embedded-baseline, transcoder round-trips — verbose per-test stdout.
  Hard-gates packaging; excluded from the `.vsix`.
- The test is **never rebuilt by `npm run qa`/`package`** — only the
  code-under-test (`qa/algorithms.cjs`) is rebuilt each run, so the frozen
  package always validates the current extension. Rebuilding the package is
  deliberate and revalidated: `npm run gen:qa` (gitignored staging) →
  review/revalidate → `npm run qa:promote` → `git add qa-dist && git commit`.
