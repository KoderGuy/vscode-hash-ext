/**
 * Single source of truth for every algorithm and transcoder the extension
 * exposes. The static `contributes.commands` list in package.json is derived
 * by hand from these registries (VSCode requires static command declarations
 * for them to be bindable in keybindings.json).
 *
 * This module is intentionally `vscode`-free so the QA harness can bundle and
 * exercise the exact production logic (see qa/).
 */

// Hash implementations are BUNDLED (audited @noble/hashes, pure-JS) so every
// algorithm works identically in any host — system Node, VSCode, Cursor,
// Antigravity — independent of the runtime's OpenSSL/BoringSSL. esbuild
// inlines these into the single shipped artifact.
import { sha224, sha256, sha384, sha512, sha512_224, sha512_256 } from '@noble/hashes/sha2.js';
import { sha3_224, sha3_256, sha3_384, sha3_512 } from '@noble/hashes/sha3.js';
import { blake2b, blake2s } from '@noble/hashes/blake2.js';
import { md5, ripemd160, sha1 } from '@noble/hashes/legacy.js';

export type DigestEncoding = 'hex' | 'base64' | 'base64url';

/** A fixed-length cryptographic digest exposed as its own command. */
export interface HashAlgo {
  /** Command-id suffix: `hashToClipboard.<id>`. Safe chars only. */
  id: string;
  /** Canonical algorithm key — the dispatch key and baseline key. */
  cryptoName: string;
  /** Human label shown in titles / QuickPick. */
  label: string;
  /** Legacy/broken algorithm — flagged "(insecure)" in the UI. */
  legacy?: boolean;
}

export const ALGORITHMS: HashAlgo[] = [
  { id: 'sha256', cryptoName: 'sha256', label: 'SHA-256' },
  { id: 'sha384', cryptoName: 'sha384', label: 'SHA-384' },
  { id: 'sha512', cryptoName: 'sha512', label: 'SHA-512' },
  { id: 'sha512_256', cryptoName: 'sha512-256', label: 'SHA-512/256' },
  { id: 'sha3_224', cryptoName: 'sha3-224', label: 'SHA3-224' },
  { id: 'sha3_256', cryptoName: 'sha3-256', label: 'SHA3-256' },
  { id: 'sha3_384', cryptoName: 'sha3-384', label: 'SHA3-384' },
  { id: 'sha3_512', cryptoName: 'sha3-512', label: 'SHA3-512' },
  { id: 'blake2b512', cryptoName: 'blake2b512', label: 'BLAKE2b-512' },
  { id: 'blake2s256', cryptoName: 'blake2s256', label: 'BLAKE2s-256' },
  { id: 'sha224', cryptoName: 'sha224', label: 'SHA-224' },
  { id: 'sha512_224', cryptoName: 'sha512-224', label: 'SHA-512/224' },
  { id: 'ripemd160', cryptoName: 'ripemd160', label: 'RIPEMD-160' },
  { id: 'sha1', cryptoName: 'sha1', label: 'SHA-1', legacy: true },
  { id: 'md5', cryptoName: 'md5', label: 'MD5', legacy: true },
];

type HashFn = (input: Uint8Array) => Uint8Array;

/** cryptoName → bundled implementation. The single source of dispatch. */
const ENGINE: Record<string, HashFn> = {
  sha224,
  sha256,
  sha384,
  sha512,
  'sha512-224': sha512_224,
  'sha512-256': sha512_256,
  'sha3-224': sha3_224,
  'sha3-256': sha3_256,
  'sha3-384': sha3_384,
  'sha3-512': sha3_512,
  blake2b512: (b) => blake2b(b, { dkLen: 64 }),
  blake2s256: (b) => blake2s(b, { dkLen: 32 }),
  ripemd160,
  sha1,
  md5,
};

/**
 * The exact production hash path. The extension calls this; the QA harness
 * certifies this same function — there is no second implementation to drift.
 * Input is hashed as UTF-8. `uppercase` applies only to hex output.
 */
export function computeDigest(
  cryptoName: string,
  text: string,
  encoding: DigestEncoding,
  uppercase: boolean,
): string {
  const fn = ENGINE[cryptoName];
  if (!fn) {
    throw new Error(`Unsupported hash algorithm: ${cryptoName}`);
  }
  const out = fn(new TextEncoder().encode(text));
  const digest = Buffer.from(out).toString(encoding);
  return uppercase && encoding === 'hex' ? digest.toUpperCase() : digest;
}

/** A reversible text transform exposed as its own command. */
export interface Transcoder {
  /** Command-id suffix: `transcode.<id>`. */
  id: string;
  /** Human label shown in titles / QuickPick (the format name). */
  label: string;
  /** 'encode' | 'decode' — controls which picker lists it + title prefix. */
  direction: 'encode' | 'decode';
  /**
   * Transform. May throw on malformed input (decode ops); the caller turns a
   * throw into an error toast and leaves the clipboard untouched.
   */
  run: (input: string) => string;
}

const HTML_NAMED: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

function htmlEncode(s: string): string {
  return s.replace(/[&<>"']/g, (c) => HTML_NAMED[c]);
}

function htmlDecode(s: string): string {
  return s
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

function b64Decode(input: string, urlSafe: boolean): string {
  const cleaned = input.trim();
  const buf = Buffer.from(cleaned, urlSafe ? 'base64url' : 'base64');
  // Buffer.from is lenient; round-trip to reject clearly-invalid input.
  if (buf.length === 0 && cleaned.length > 0) {
    throw new Error('not valid Base64');
  }
  return buf.toString('utf8');
}

function hexDecode(input: string): string {
  const cleaned = input.trim().replace(/\s+/g, '');
  if (cleaned.length === 0) {
    return '';
  }
  if (!/^[0-9a-fA-F]+$/.test(cleaned) || cleaned.length % 2 !== 0) {
    throw new Error('not valid hex (need an even number of 0-9a-f digits)');
  }
  return Buffer.from(cleaned, 'hex').toString('utf8');
}

export const TRANSCODERS: Transcoder[] = [
  {
    id: 'base64Encode',
    label: 'Base64',
    direction: 'encode',
    run: (s) => Buffer.from(s, 'utf8').toString('base64'),
  },
  {
    id: 'base64Decode',
    label: 'Base64',
    direction: 'decode',
    run: (s) => b64Decode(s, false),
  },
  {
    id: 'base64urlEncode',
    label: 'Base64URL',
    direction: 'encode',
    run: (s) => Buffer.from(s, 'utf8').toString('base64url'),
  },
  {
    id: 'base64urlDecode',
    label: 'Base64URL',
    direction: 'decode',
    run: (s) => b64Decode(s, true),
  },
  {
    id: 'urlEncode',
    label: 'URL (percent)',
    direction: 'encode',
    run: (s) => encodeURIComponent(s),
  },
  {
    id: 'urlDecode',
    label: 'URL (percent)',
    direction: 'decode',
    run: (s) => decodeURIComponent(s),
  },
  {
    id: 'hexEncode',
    label: 'Hex',
    direction: 'encode',
    run: (s) => Buffer.from(s, 'utf8').toString('hex'),
  },
  {
    id: 'hexDecode',
    label: 'Hex',
    direction: 'decode',
    run: (s) => hexDecode(s),
  },
  {
    id: 'htmlEncode',
    label: 'HTML Entities',
    direction: 'encode',
    run: (s) => htmlEncode(s),
  },
  {
    id: 'htmlDecode',
    label: 'HTML Entities',
    direction: 'decode',
    run: (s) => htmlDecode(s),
  },
];
