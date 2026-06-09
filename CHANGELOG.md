# Changelog

## 0.0.1

Initial release.

- **15 hash algorithms**, each its own bindable command: SHA-256, SHA-384,
  SHA-512, SHA-512/256, SHA3-224, SHA3-256, SHA3-384, SHA3-512, BLAKE2b-512,
  BLAKE2s-256, SHA-224, SHA-512/224, RIPEMD-160, plus legacy SHA-1 & MD5.
- **5 reversible transcoder pairs**, each its own bindable command: Base64,
  Base64URL, URL (percent), Hex, HTML entities (encode + decode).
- **Pick** commands for hashing, encoding, and decoding via QuickPick.
- Result is copied to the clipboard; the document is never modified.
- Configurable digest encoding (hex/base64/base64url), uppercase, multi-selection
  behavior (primary/concatenate), and a notification toggle.
- Command Palette declutter: specific commands are hidden by default and revealed
  on demand via **Show/Hide Command in Palette…** (or the
  `hashToClipboard.visibleCommands` setting). Every command is keybindable
  regardless of palette visibility.
- Prompts for word-under-cursor vs entire-file when nothing is selected.
- Hash implementations bundled from `@noble/hashes` (pure-JS) — identical output
  across hosts, independent of the editor's Node/OpenSSL build.
- **Zero runtime dependencies**; single minified bundle (`out/extension.js`).
- Compatible with VSCode, Cursor, and Antigravity (engine `^1.107.0`).

### Build certification

- **Certify-the-bundle model.** The single shipped artifact `out/extension.js`
  (algorithms bundled in) is certified directly: `npm run qa:algorithms` loads it
  under a `vscode` stub and verifies its exported
  `computeDigest` / `ALGORITHMS` / `TRANSCODERS` against an audited baseline,
  printing the file's `sha256` and a `CERTIFIED` verdict. Certified bytes equal
  shipped bytes.
- QA is a **single self-contained, source-controlled control**
  (`qa-dist/qa.pkg.mjs`): the oracle-computed baseline (7 strings × 15 algorithms
  × {hex, base64} = 210 values) + harness + audited test cases, inlined. It
  depends only on the Node runtime and the file it certifies; authority is by
  **provenance** (reviewed → promoted → committed → run from source control).
- QA **never stops mid-run** — all six sections always execute (oracle/KAT,
  baseline integrity, coverage gap-analysis, component certification, transcoder
  round-trips, malformed-input rejection) — and the summary ends with a
  consolidated TO-DO list of every failure. Non-zero exit on any failure.
- The control declares its own algorithm set and inputs in audited committed data
  (`baseline/algorithms.json`, `baseline/test-strings.json`); `npm run build:qa`
  builds the staging package from those plus the crypto oracle only. Rebuilding is
  deliberate: `build:qa` → review → `qa:promote` → `git commit`.

See [QA.md](QA.md) for the full certification process.
