/**
 * QA LAUNCHER — minimal, stable, committed.
 *
 * Executes ONLY the committed QA package (qa-dist/qa.pkg.mjs) — the single
 * file that bundles the JSON baseline data + the JS test harness together.
 * It reads the package as committed at git HEAD and runs exactly those bytes
 * from a temp file, so an uncommitted / staged / working-tree-modified
 * package is never executed. This launcher contains no test logic; the
 * substantive, revalidated test lives entirely in the committed package.
 *
 * `npm run qa` = build the (fresh) code-under-test, then run this.
 */
import { execFileSync } from 'child_process';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { pathToFileURL } from 'url';

const PKG = 'qa-dist/qa.pkg.mjs';

let repoRoot;
try {
  repoRoot = execFileSync('git', ['rev-parse', '--show-toplevel'], {
    encoding: 'utf8',
    stdio: ['pipe', 'pipe', 'pipe'],
  }).trim();
} catch {
  console.error(
    'FATAL  Not a git repository (or git unavailable). QA only runs the ' +
      'COMMITTED package and cannot verify commit state here. Aborting.',
  );
  process.exit(1);
}

let committed;
try {
  committed = execFileSync('git', ['show', `HEAD:${PKG}`], {
    cwd: repoRoot,
    stdio: ['pipe', 'pipe', 'pipe'],
    maxBuffer: 64 * 1024 * 1024,
  });
} catch {
  console.error(
    `FATAL  ${PKG} is not committed at HEAD. QA refuses to run an ` +
      'uncommitted package. Build it: edit sources → `npm run gen:qa` → ' +
      'review/revalidate → `npm run qa:promote` → ' +
      '`git add qa-dist && git commit`, then re-run QA.',
  );
  process.exit(1);
}

const onDisk = path.join(repoRoot, PKG);
if (fs.existsSync(onDisk) && !fs.readFileSync(onDisk).equals(committed)) {
  console.log(
    `NOTE  ${PKG} has uncommitted working-tree changes; running the ` +
      'COMMITTED version and ignoring those changes.',
  );
}

const tmp = path.join(
  os.tmpdir(),
  `qa-pkg-${process.pid}-${Date.now()}.mjs`,
);
fs.writeFileSync(tmp, committed);
process.on('exit', () => {
  try {
    fs.rmSync(tmp, { force: true });
  } catch {
    /* best effort */
  }
});

// The package calls process.exit() with the QA result code.
await import(pathToFileURL(tmp).href);
