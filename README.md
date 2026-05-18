# Hash & Transcode to Clipboard

Select text in the editor, run a command, and the **hash** or **transcoded**
form is placed on your clipboard ready to paste elsewhere. The document is
**never modified**.

Works in **VSCode**, **Cursor**, and **Antigravity** (any VSCode-API editor,
engine `^1.74.0`).

## Features

- **16 hash algorithms**, each exposed as its own command so you can bind a
  keyboard shortcut to exactly the one you use:

  | Secure | |
  |---|---|
  | SHA-256, SHA-384, SHA-512, SHA-512/256 | SHA3-224, SHA3-256, SHA3-384, SHA3-512 |
  | BLAKE2b-512, BLAKE2s-256 | SHA-224, SHA-512/224 |
  | RIPEMD-160, SM3 | |

  | Legacy (insecure — common, included for interop) |
  |---|
  | SHA-1, MD5 |

- **5 reversible transcoder pairs**, each its own command: **Base64**,
  **Base64URL**, **URL (percent)**, **Hex**, **HTML entities** — encode *and*
  decode.
- **Pick commands** for discoverability: `Hash: Pick Algorithm`,
  `Encode: Pick Format`, `Decode: Pick Format`.
- Algorithms not present in your editor's Node/OpenSSL build are hidden
  automatically.

## Usage

1. Select text (or place the cursor — see below).
2. Open the Command Palette and run a `Hash & Transcode:` command, or use a
   keybinding you've bound.
3. Paste the result anywhere.

**No selection?** You're asked whether to use the **word under the cursor** or
the **entire file**. If that source is empty, you get a *"Nothing to do"*
notice and nothing is changed.

**Multiple cursors?** Controlled by `hashToClipboard.multiSelection`
(`primary` — default — uses the last-active selection; `concatenate` joins
all selections with newlines).

## Keyboard shortcuts

Every command has a stable ID. Bind any of them in your `keybindings.json`:

```jsonc
[
  { "key": "cmd+alt+h", "command": "hashToClipboard.sha256" },
  { "key": "cmd+alt+5", "command": "hashToClipboard.md5" },
  { "key": "cmd+alt+b", "command": "transcode.base64Encode" },
  { "key": "cmd+alt+shift+b", "command": "transcode.base64Decode" },
  { "key": "cmd+alt+p", "command": "hashToClipboard.pick" }
]
```

Hash command IDs: `hashToClipboard.<id>` where `<id>` is one of
`sha256 sha384 sha512 sha512_256 sha3_224 sha3_256 sha3_384 sha3_512
blake2b512 blake2s256 sha224 sha512_224 ripemd160 sm3 sha1 md5`, plus
`hashToClipboard.pick`.

Transcoder command IDs: `transcode.<id>` where `<id>` is one of
`base64Encode base64Decode base64urlEncode base64urlDecode urlEncode urlDecode
hexEncode hexDecode htmlEncode htmlDecode`, plus `transcode.pickEncode` and
`transcode.pickDecode`.

## Settings

| Setting | Default | Description |
|---|---|---|
| `hashToClipboard.encoding` | `hex` | Digest encoding: `hex`, `base64`, `base64url`. |
| `hashToClipboard.uppercase` | `false` | Uppercase the digest (hex only). |
| `hashToClipboard.showNotification` | `true` | Confirmation toast after copying. |
| `hashToClipboard.multiSelection` | `primary` | `primary` or `concatenate`. |

(Transcoder output is defined by the command itself and is not affected by
the `encoding` setting.)

## Build from source

```bash
npm install
npm run check     # type-check (tsc --noEmit)
npm run build     # minified single-file bundle -> out/extension.js
npm run qa        # standalone QA harness (mandatory gate, see below)
npm run package   # runs qa, then -> vscode-hash-ext-0.0.1.vsix
```

Press **F5** in VSCode to launch the Extension Development Host for debugging.

## QA harness

`npm run qa` is a standalone test bundle that is **never shipped in the
`.vsix`** and runs automatically before `npm run package` (a failing QA
aborts packaging). Its hash check is anchored to a **frozen baseline dataset
that QA reads ONLY from the committed `/baseline` folder** (via
`git show HEAD:`) — uncommitted, staged, or working-tree baseline data is
never used to test.

### The `/baseline` folder (committed source of truth)

- **`baseline/test-strings.json`** — the canonical 7 frozen test strings
  (alpha lower / UPPER / mixed-case sharing the same letters; +numeric;
  +safe symbols; +extended symbols). Never change a value once committed.
- **`baseline/baseline.json`** — the permanent dataset: every string × all
  16 algorithms × `{hex, base64}` (224 values), computed by Node `crypto`
  directly (the oracle, independent of the extension code).

### Regenerating the baseline (deliberate, independent steps)

No `npm` command regenerates the baseline as a side effect. The only way to
produce a new one:

```bash
# 1. (optional) edit baseline/test-strings.json
npm run gen:baseline       # writes a CANDIDATE to gitignored qa/.staging-baseline/
                           #   — does NOT touch /baseline, NOT read by QA
# 2. review the candidate
npm run baseline:promote   # copies the candidate over /baseline/baseline.json
git add baseline && git commit -m "update QA baseline"   # REQUIRED
```

QA refuses to run until `/baseline` is committed — so an unreviewed or
unpromoted candidate can never be tested against.

### QA flow

1. **Committed-only load** — read `/baseline/*` from `git HEAD`; abort if not
   committed (or not a git repo).
2. **Oracle** — validate Node `crypto` against ~20 **published** KAT vectors
   (NIST/RFC/SM3); abort if untrustworthy.
3. **Baseline integrity** — assert the committed baseline still matches the
   canonical strings, exactly covers the production algorithm registry, and
   re-derives byte-for-byte from the oracle (catches a tampered/stale
   baseline or a forked OpenSSL → abort).
4. **Extension vs baseline** — the core test: the **production**
   `computeDigest()` (the exact function the extension uses) must equal the
   committed baseline `hex` and `base64` for every string × algorithm, plus
   base64url/uppercase encoding-path spot-checks vs the oracle.
5. **Transcoders** — round-trip + independent-oracle check on the frozen
   strings plus a seeded random corpus subset (`QA_FULL=1` whole corpus;
   `QA_SEED=<n>` to reproduce), and decoders must reject malformed input.

Every assertion prints to stdout (`PASS`/`FAIL`, expected, got, and a
first-difference diff on mismatch). `QA_QUIET=1` collapses passing lines but
always prints failures. Non-zero exit on any failure.

## Install the .vsix (Cursor / Antigravity / VSCode)

These editors don't all share the Marketplace, so sideload the same `.vsix`:

- **VSCode:** `code --install-extension vscode-hash-ext-0.0.1.vsix`
- **Cursor:** `cursor --install-extension vscode-hash-ext-0.0.1.vsix`
- **Antigravity:** Extensions panel → **⋯** → **Install from VSIX…**
  (or the editor's `--install-extension` CLI flag).

## Notes

- Input is hashed/encoded as **UTF-8**.
- Decoding invalid input (e.g. malformed Base64/Hex) shows an error and leaves
  the clipboard untouched.
- Zero runtime dependencies — only Node's built-in `crypto`/`Buffer` and the
  host `vscode` API.

## License

MIT — see [LICENSE](LICENSE).
