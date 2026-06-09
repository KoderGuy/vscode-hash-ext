# Hash & Transcode to Clipboard

Select text in your editor, run a command, and the **hash** or **transcoded**
form of that text is placed on your clipboard — ready to paste elsewhere. The
document is **never modified**.

Works in **VSCode**, **Cursor**, and **Antigravity** (any VSCode-API editor;
requires engine `^1.107.0`). Hash implementations are bundled (pure-JS
[`@noble/hashes`](https://github.com/paulmillr/noble-hashes)), so every algorithm
behaves identically across hosts, independent of the editor's Node/OpenSSL build.

## Features

- **15 hash algorithms**, each exposed as its own command so you can bind a
  shortcut to exactly the one you use:

  | Secure (13) | |
  |---|---|
  | SHA-256, SHA-384, SHA-512, SHA-512/256 | SHA3-224, SHA3-256, SHA3-384, SHA3-512 |
  | BLAKE2b-512, BLAKE2s-256 | SHA-224, SHA-512/224 |
  | RIPEMD-160 | |

  | Legacy — insecure, included for interop |
  |---|
  | SHA-1, MD5 |

- **5 reversible transcoder pairs**, each its own command — **encode** *and*
  **decode**: **Base64**, **Base64URL**, **URL (percent)**, **Hex**, and
  **HTML entities**.
- **Pick commands** for quick discovery: `Hash: Pick Algorithm`,
  `Encode: Pick Format`, `Decode: Pick Format`.
- **Clipboard-only** — the result is copied; your file is never touched.

## Usage

1. Select text (or place the cursor — see below).
2. Open the Command Palette and run a **Hash & Transcode** command, or press a
   keybinding you've bound.
3. Paste the result anywhere.

**No selection?** You're asked whether to use the **word under the cursor** or
the **entire file**. If that source is empty you get a *"Nothing to do"* notice
and nothing changes.

**Multiple cursors / selections?** Controlled by `hashToClipboard.multiSelection`:

- `primary` (default) — use only the last-active selection.
- `concatenate` — join all non-empty selections in document order, separated by
  newlines.

Input is always treated as **UTF-8**. Decoding malformed input (e.g. bad
Base64/Hex) shows an error and leaves the clipboard untouched.

## Command Palette & keeping it tidy

Five commands are **always** in the Command Palette:

- `Hash: Pick Algorithm → Clipboard`
- `Encode: Pick Format → Clipboard`
- `Decode: Pick Format → Clipboard`
- `Show Command in Palette…`
- `Hide Command from Palette…`

The 25 specific per-algorithm / per-format commands are **hidden by default** to
avoid clutter. Reveal the ones you use with **Show Command in Palette…** (or edit
the `hashToClipboard.visibleCommands` setting directly — changes apply live), and
remove them again with **Hide Command from Palette…**.

> Palette visibility is purely cosmetic: **every** command is bindable in
> `keybindings.json` whether or not it appears in the palette.

## Keyboard shortcuts

No shortcuts ship by default. Every command has a stable ID — bind whichever you
use in your `keybindings.json`:

```jsonc
[
  { "key": "cmd+alt+h",       "command": "hashToClipboard.sha256" },
  { "key": "cmd+alt+5",       "command": "hashToClipboard.md5" },
  { "key": "cmd+alt+b",       "command": "transcode.base64Encode" },
  { "key": "cmd+alt+shift+b", "command": "transcode.base64Decode" },
  { "key": "cmd+alt+p",       "command": "hashToClipboard.pick" }
]
```

**Hash command IDs** — `hashToClipboard.<id>`, where `<id>` is one of:

```
sha256 sha384 sha512 sha512_256 sha3_224 sha3_256 sha3_384 sha3_512
blake2b512 blake2s256 sha224 sha512_224 ripemd160 sha1 md5
```

plus the picker `hashToClipboard.pick` and the managers
`hashToClipboard.showCommand` / `hashToClipboard.hideCommand`.

**Transcoder command IDs** — `transcode.<id>`, where `<id>` is one of:

```
base64Encode base64Decode base64urlEncode base64urlDecode
urlEncode urlDecode hexEncode hexDecode htmlEncode htmlDecode
```

plus the pickers `transcode.pickEncode` / `transcode.pickDecode`.

## Settings

| Setting | Type | Default | Description |
|---|---|---|---|
| `hashToClipboard.encoding` | `hex` \| `base64` \| `base64url` | `hex` | Output encoding for hash digests. |
| `hashToClipboard.uppercase` | boolean | `false` | Uppercase the digest (hex only). |
| `hashToClipboard.showNotification` | boolean | `true` | Show a confirmation toast after copying. |
| `hashToClipboard.multiSelection` | `primary` \| `concatenate` | `primary` | Behavior when there are multiple selections / cursors. |
| `hashToClipboard.visibleCommands` | string[] | `[]` | Which specific commands appear in the Command Palette (managed by the Show/Hide commands). |

Hash digest format is controlled by `encoding` / `uppercase`. **Transcoder**
output is fixed by the command itself and is **not** affected by these settings.

## Quality & certification

Every shipped build is **certified** before it is packaged: the built
`out/extension.js` is verified against an audited, source-controlled QA test
package (`qa-dist/qa.pkg.mjs`) whose expected results are anchored to published
Known-Answer Test vectors. A build that fails QA is not packaged.

See **[QA.md](QA.md)** for the full trust model, the per-build certification
procedure, and the certification record.

## Build from source

```bash
npm install
npm run check            # type-check (tsc --noEmit)
npm run build:extension  # bundle -> out/extension.js
npm run qa:algorithms    # CERTIFY out/extension.js against the audited QA package
npm run package          # -> vscode-hash-ext-<version>_<NNNN>.vsix

# the first three steps in one go:
npm run build:certify    # check -> build:extension -> qa:algorithms
```

Press **F5** in VSCode to launch the Extension Development Host for debugging.

## Install the .vsix (VSCode / Cursor / Antigravity)

These editors don't all share a marketplace, so sideload the same `.vsix` (the
filename carries an auto-incrementing build number, e.g. `_0010`):

- **VSCode:** `code --install-extension vscode-hash-ext-<version>_<NNNN>.vsix`
- **Cursor:** `cursor --install-extension vscode-hash-ext-<version>_<NNNN>.vsix`
- **Antigravity:** Extensions panel → **⋯** → **Install from VSIX…** (or the
  editor's `--install-extension` CLI flag).

## Notes

- Input is hashed/encoded as **UTF-8**.
- Decoding invalid input shows an error and leaves the clipboard untouched.
- **Zero runtime dependencies** — the hash library is bundled into the single
  shipped `out/extension.js` at build time.

## License

MIT — see [LICENSE](LICENSE).
