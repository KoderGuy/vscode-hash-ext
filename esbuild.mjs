import * as esbuild from 'esbuild';

const watch = process.argv.includes('--watch');
const test = process.argv.includes('--test');

if (test) {
  // Separate bundle of the production hash/transcoder logic for the QA
  // harness. NOT the extension bundle, NOT shipped in the .vsix (qa/** is
  // excluded by .vscodeignore; this artifact is gitignored).
  await esbuild.build({
    entryPoints: ['src/algorithms.ts'],
    bundle: true,
    outfile: 'qa/algorithms.cjs',
    platform: 'node',
    target: 'node16',
    format: 'cjs',
    minify: false,
    sourcemap: false,
    logLevel: 'info',
  });
  console.log('esbuild: test bundle written to qa/algorithms.cjs');
} else {
  const production = !watch;

  /** @type {import('esbuild').BuildOptions} */
  const options = {
    entryPoints: ['src/extension.ts'],
    bundle: true,
    outfile: 'out/extension.js',
    platform: 'node',
    target: 'node16',
    format: 'cjs',
    // Host-provided at runtime; never bundle it. Node built-ins (crypto, etc.)
    // are external on the 'node' platform automatically.
    external: ['vscode'],
    minify: production,
    sourcemap: !production,
    logLevel: 'info',
  };

  if (watch) {
    const ctx = await esbuild.context(options);
    await ctx.watch();
    console.log('esbuild: watching for changes...');
  } else {
    await esbuild.build(options);
    console.log('esbuild: production bundle written to out/extension.js');
  }
}
