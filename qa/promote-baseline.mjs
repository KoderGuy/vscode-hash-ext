/**
 * Baseline PROMOTER — an INDEPENDENT, explicit step (`npm run baseline:promote`).
 *
 * Copies the reviewed staging candidate into /baseline, overwriting the
 * existing file. It does NOT commit — committing is a deliberate git action
 * and QA will refuse to run until you do it. Not invoked by qa/package/build.
 */
import { fileURLToPath } from 'url';
import * as fs from 'fs';
import * as path from 'path';

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, '..');
const STAGING_FILE = path.join(here, '.staging-baseline', 'baseline.json');
const DEST = path.join(repoRoot, 'baseline', 'baseline.json');

if (!fs.existsSync(STAGING_FILE)) {
  console.error(
    `No staging candidate at ${STAGING_FILE}\n` +
      'Run `npm run gen:baseline` first, then review it.',
  );
  process.exit(1);
}

fs.mkdirSync(path.dirname(DEST), { recursive: true });
fs.copyFileSync(STAGING_FILE, DEST);

console.log(
  `Promoted staging candidate -> ${DEST} (overwritten).\n\n` +
    'REQUIRED next step (QA refuses uncommitted baselines):\n' +
    '  git add baseline && git commit -m "update QA baseline"\n',
);
