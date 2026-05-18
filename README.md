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
npm run check            # type-check (tsc --noEmit)
npm run build:algorithms # build the trusted component  -> out/algorithms.js
npm run qa               # CERTIFY out/algorithms.js (see below)
npm run build:extension  # build extension that LOADS the certified file
npm run package          # -> vscode-hash-ext-0.0.1.vsix
# or the whole trusted pipeline in order:
npm run release          # check → build:algorithms → qa → build:extension → package
```

Press **F5** in VSCode to launch the Extension Development Host for debugging.

## QA harness

**The QA tool certifies the one trusted component the product is built from.**
There is a single built file `out/algorithms.js` (the hash/transcoder logic).
QA is launched with that file's path and certifies *that exact file*. The
extension is then built so it **loads the same file** — `out/extension.js`
contains `require("./algorithms.js")`, and the `.vsix` ships both. The
certified bytes are the shipped bytes; there is no separate "QA copy".

### One trusted component, certified then shipped

- **`out/algorithms.js`** — the only hash/transcoder code (built from the
  single source `src/algorithms.ts`). QA certifies it; the extension loads
  it; the `.vsix` ships it. `npm run qa` prints its `sha256` and a
  `CERTIFIED` verdict — that hash equals the `algorithms.js` inside the
  `.vsix` (verifiable provenance, no switcheroo).
- **`out/extension.js`** — the VSCode entry; does **not** re-bundle the
  logic — it `require("./algorithms.js")`s the certified file at runtime.

### The QA package is one self-contained, source-controlled control

- **`qa-dist/qa.pkg.mjs`** — the entire test as one tracked artifact: the
  embedded oracle-computed baseline (7 strings × 16 algorithms ×
  `{hex, base64}` = 224 values) **+** the harness **+** the audited test
  cases, inlined. It is the **control / independent auditor**: it depends on
  **nothing** but the Node runtime and the one file it is asked to certify —
  no git, no network, no other repo file, no third-party packages, not even
  itself. Its authority comes from **provenance**: it is reviewed, promoted,
  and committed, so you *fetch the committed package from source control and
  run that*. Its results therefore cannot be externally influenced — when
  the test and the code disagree, the code is wrong, not the test.
- **`baseline/test-strings.json`** — the canonical 7 frozen input strings
  (authored source the embedded dataset is generated from).

### Rebuilding the QA package (deliberate, revalidated, never automatic)

No `npm` command rebuilds the test as a side effect. Rebuild only when the
test logic or inputs must change:

```bash
# 1. (optional) edit baseline/test-strings.json or the qa/ harness sources
npm run gen:qa        # recomputes baseline via the oracle + bundles
                      #   data+harness -> gitignored qa/.staging-qa/qa.pkg.mjs
# 2. review AND revalidate the candidate
#    (QA_SELFCHECK_BYPASS=1 node qa/.staging-qa/qa.pkg.mjs out/algorithms.js)
npm run qa:promote    # copies it over qa-dist/qa.pkg.mjs
git add qa-dist && git commit -m "update QA package"   # REQUIRED
```

A rebuilt package is untrusted until a human revalidates and commits it — QA
refuses to run an uncommitted package.

### QA flow (inside the committed package)

1. **Oracle** — validate Node `crypto` against ~20 **published** KAT vectors
   (NIST/RFC/SM3); abort if untrustworthy.
2. **Baseline integrity** — assert the embedded baseline matches the
   canonical strings, exactly covers the algorithm registry, and re-derives
   byte-for-byte from the oracle (tampered data / forked OpenSSL → abort).
3. **Certify the component** — the supplied `algorithms.js`’s
   `computeDigest()` must equal the embedded baseline `hex` and `base64` for
   every string × algorithm, plus base64url/uppercase spot-checks.
4. **Transcoders** — round-trip + independent-oracle check on the frozen
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
