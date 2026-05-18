/**
 * QA PROMOTER — independent, explicit step (`npm run qa:promote`).
 *
 * Copies the reviewed staging QA package into qa-dist/, overwriting the
 * existing one. It does NOT commit — committing is a deliberate git action
 * and the launcher refuses to run until the package is committed. Not invoked
 * by qa / package / build.
 */
import { fileURLToPath } from 'url';
import * as fs from 'fs';
import * as path from 'path';

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, '..');
const STAGING = path.join(here, '.staging-qa', 'qa.pkg.mjs');
const DEST = path.join(repoRoot, 'qa-dist', 'qa.pkg.mjs');

if (!fs.existsSync(STAGING)) {
  console.error(
    `No staging package at ${STAGING}\n` +
      'Run `npm run gen:qa` first, then review/revalidate it.',
  );
  process.exit(1);
}

fs.mkdirSync(path.dirname(DEST), { recursive: true });
fs.copyFileSync(STAGING, DEST);

console.log(
  `Promoted staging QA package -> ${DEST} (overwritten).\n\n` +
    'REQUIRED next steps (the launcher refuses an uncommitted package):\n' +
    '  1. Revalidate this package is correct for the current test intent.\n' +
    '  2. git add qa-dist && git commit -m "update QA package"\n',
);
