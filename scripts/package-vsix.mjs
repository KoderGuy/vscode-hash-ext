/**
 * Packages the extension into  <name>-<version>_<NNNN>.vsix
 *
 * <NNNN> is a 4-digit, zero-padded build number that auto-increments on every
 * build (first build = 0001) and resets to 0 — so the next build is 0001 —
 * whenever the MAJOR version changes. The counter persists in the gitignored
 * .vsix-build.json so it survives between builds without polluting commits.
 *
 * Filename/content note: the build number is only in the FILE NAME; it does
 * not change package.json or the bundled bytes, so it has zero effect on the
 * certify==shipped provenance.
 */
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import * as fs from 'node:fs';
import * as path from 'node:path';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pkg = JSON.parse(
  fs.readFileSync(path.join(repoRoot, 'package.json'), 'utf8'),
);
const { name, version } = pkg;
const major = String(version).split('.')[0];

const counterFile = path.join(repoRoot, '.vsix-build.json');
let prev = { major: null, build: 0 };
try {
  prev = JSON.parse(fs.readFileSync(counterFile, 'utf8'));
} catch {
  /* first ever build, or unreadable — treat as reset */
}

// New major version → reset (next build becomes 0001).
const base = prev.major === major ? Number(prev.build) || 0 : 0;
const build = base + 1;
const padded = String(build).padStart(4, '0');

fs.writeFileSync(
  counterFile,
  JSON.stringify({ major, build }, null, 2) + '\n',
  'utf8',
);

const outFile = path.join(repoRoot, `${name}-${version}_${padded}.vsix`);

execFileSync(
  'vsce',
  [
    'package',
    '--allow-missing-repository',
    '--no-rewrite-relative-links',
    '--out',
    outFile,
  ],
  { cwd: repoRoot, stdio: 'inherit' },
);

console.log(
  `\nPackaged build ${padded} (major ${major}) -> ${path.basename(outFile)}`,
);
