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
- **Certify-the-component model.** One trusted file `out/algorithms.js` is
  built from the single source `src/algorithms.ts`; QA is launched with its
  path and certifies that exact file (prints its `sha256` + `CERTIFIED`
  verdict). The extension is built to **load the same file**
  (`out/extension.js` → `require("./algorithms.js")`); the `.vsix` ships both
  and the shipped `algorithms.js` is byte-identical to the certified one —
  verifiable provenance, no separate QA copy.
- QA is a **single self-contained, source-controlled control**
  (`qa-dist/qa.pkg.mjs`): esbuild inlines the oracle-computed baseline (224
  values) + harness + audited test cases. It depends on **nothing** but the
  Node runtime and the file it certifies — no git, network, other repo file,
  or third-party package. Authority is by **provenance** (reviewed, promoted,
  committed → fetched from source control to run), not runtime self-checks,
  so results cannot be externally influenced. KAT-validated oracle, baseline-
  integrity guard, component certification, transcoder round-trips; verbose
  per-test stdout; non-zero exit on any failure.
- The control declares its OWN algorithm set + inputs in audited committed
  data (`baseline/algorithms.json`, `baseline/test-strings.json`); `gen:qa`
  builds from those + the crypto oracle only — no `src/`/`out/` read, no
  prior build needed (removed the circular "control derived from the code it
  audits" dependency). A divergent code-under-test FAILs the registry check.
- Rebuilding the package is deliberate and revalidated: `npm run gen:qa`
  (gitignored staging) → review/revalidate → `npm run qa:promote` →
  `git add qa-dist && git commit`. `npm run release` runs the full trusted
  pipeline (check → build:algorithms → qa → build:extension → package).
