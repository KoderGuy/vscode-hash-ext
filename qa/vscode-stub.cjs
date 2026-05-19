/**
 * Process-level 'vscode' stub — preloaded via `node -r ./qa/vscode-stub.cjs`
 * by the QA npm script ONLY.
 *
 * The shipped extension.js leaves `vscode` external (the standard, proven
 * build). Under plain Node `require('vscode')` would throw, so QA could not
 * load the bundle to certify its computeDigest/ALGORITHMS/TRANSCODERS. This
 * preload returns an empty object for `require('vscode')` so the module
 * loads; the harness only reads the pure exports (it never calls activate /
 * touches the editor API), so the stub is sufficient.
 *
 * This is NOT part of the committed QA package (qa-dist/qa.pkg.mjs) — it is a
 * Node preload supplied on the command line. The QA package itself is
 * untouched.
 */
const Module = require('node:module');
const orig = Module._load;
Module._load = function (request, parent, isMain) {
  if (request === 'vscode') return {};
  return orig.apply(this, arguments);
};
