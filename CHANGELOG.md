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
- Standalone QA harness (`npm run qa`) — KAT-validated oracle, transcoder
  round-trips with verbose per-test stdout. Hard-gates packaging and is
  excluded from the `.vsix`.
- Permanent, human-reviewed baseline dataset in the dedicated `/baseline`
  folder (`test-strings.json` + `baseline.json`, 16 algorithms × hex+base64).
  QA reads it **only from the committed git HEAD** and refuses to run against
  uncommitted/staged/working-tree baseline data. Generation is independent
  and explicit: `npm run gen:baseline` writes a gitignored staging candidate
  (never `/baseline`, never read by QA); `npm run baseline:promote` copies it
  into `/baseline`; the maintainer reviews and commits. No `npm` command
  regenerates the baseline as a side effect.
