import * as vscode from 'vscode';
import * as crypto from 'crypto';
import {
  ALGORITHMS,
  TRANSCODERS,
  HashAlgo,
  Transcoder,
  DigestEncoding,
  computeDigest,
} from './algorithms';

interface HashConfig {
  encoding: DigestEncoding;
  uppercase: boolean;
  showNotification: boolean;
  multiSelection: 'primary' | 'concatenate';
}

function getConfig(): HashConfig {
  const c = vscode.workspace.getConfiguration('hashToClipboard');
  return {
    encoding: c.get<DigestEncoding>('encoding', 'hex'),
    uppercase: c.get<boolean>('uppercase', false),
    showNotification: c.get<boolean>('showNotification', true),
    multiSelection: c.get<'primary' | 'concatenate'>('multiSelection', 'primary'),
  };
}

/**
 * Resolve the text to operate on. Returns `null` when the caller should abort
 * silently (a user-visible message has already been shown, or the user
 * cancelled a prompt).
 */
async function getInputText(cfg: HashConfig): Promise<string | null> {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showErrorMessage('Hash & Transcode: no active editor.');
    return null;
  }

  const nonEmpty = editor.selections.filter((s) => !s.isEmpty);

  if (nonEmpty.length === 1) {
    return editor.document.getText(nonEmpty[0]);
  }

  if (nonEmpty.length > 1) {
    if (cfg.multiSelection === 'concatenate') {
      return [...nonEmpty]
        .sort((a, b) => a.start.compareTo(b.start))
        .map((s) => editor.document.getText(s))
        .join('\n');
    }
    // 'primary': the last-active selection.
    return editor.document.getText(editor.selection);
  }

  // No selection — ask the user what to operate on.
  const pick = await vscode.window.showQuickPick(
    [
      { label: 'Word under cursor', source: 'word' as const },
      { label: 'Entire file', source: 'file' as const },
    ],
    { placeHolder: 'Nothing is selected — what should be used as input?' },
  );
  if (!pick) {
    return null; // cancelled
  }

  let text = '';
  if (pick.source === 'word') {
    const range = editor.document.getWordRangeAtPosition(editor.selection.active);
    text = range ? editor.document.getText(range) : '';
  } else {
    text = editor.document.getText();
  }

  if (text.length === 0) {
    vscode.window.showInformationMessage('Nothing to do');
    return null;
  }
  return text;
}

const AVAILABLE_HASHES = new Set(crypto.getHashes());

async function runHash(algo: HashAlgo): Promise<void> {
  try {
    if (!AVAILABLE_HASHES.has(algo.cryptoName)) {
      vscode.window.showErrorMessage(
        `Hash & Transcode: ${algo.label} is not available in this editor's ` +
          `Node/OpenSSL build (OpenSSL ${process.versions.openssl}).`,
      );
      return;
    }

    const cfg = getConfig();
    const text = await getInputText(cfg);
    if (text === null) {
      return;
    }

    const digest = computeDigest(
      algo.cryptoName,
      text,
      cfg.encoding,
      cfg.uppercase,
    );

    await vscode.env.clipboard.writeText(digest);

    if (cfg.showNotification) {
      vscode.window.showInformationMessage(
        `Copied ${algo.label} (${digest.length} chars) to clipboard`,
      );
    }
  } catch (err) {
    vscode.window.showErrorMessage(
      `Hash & Transcode: ${algo.label} failed: ${
        err instanceof Error ? err.message : String(err)
      }`,
    );
  }
}

async function runTranscode(t: Transcoder): Promise<void> {
  try {
    const cfg = getConfig();
    const text = await getInputText(cfg);
    if (text === null) {
      return;
    }

    let result: string;
    try {
      result = t.run(text);
    } catch (e) {
      vscode.window.showErrorMessage(
        `Hash & Transcode: ${t.label} ${t.direction} failed: ${
          e instanceof Error ? e.message : String(e)
        }`,
      );
      return; // clipboard untouched
    }

    await vscode.env.clipboard.writeText(result);

    if (cfg.showNotification) {
      vscode.window.showInformationMessage(
        `${t.label} ${t.direction === 'encode' ? 'encoded' : 'decoded'} → clipboard`,
      );
    }
  } catch (err) {
    vscode.window.showErrorMessage(
      `Hash & Transcode: ${t.label} failed: ${
        err instanceof Error ? err.message : String(err)
      }`,
    );
  }
}

async function pickHash(): Promise<void> {
  const secure = ALGORITHMS.filter(
    (a) => !a.legacy && AVAILABLE_HASHES.has(a.cryptoName),
  );
  const legacy = ALGORITHMS.filter(
    (a) => a.legacy && AVAILABLE_HASHES.has(a.cryptoName),
  );

  type Item = vscode.QuickPickItem & { algo?: HashAlgo };
  const items: Item[] = [];
  for (const a of secure) {
    items.push({ label: a.label, algo: a });
  }
  if (legacy.length) {
    items.push({
      label: 'Legacy',
      kind: vscode.QuickPickItemKind.Separator,
    });
    for (const a of legacy) {
      items.push({ label: a.label, description: '(insecure)', algo: a });
    }
  }

  const choice = await vscode.window.showQuickPick(items, {
    placeHolder: 'Pick a hash algorithm — result is copied to the clipboard',
    matchOnDescription: true,
  });
  if (choice?.algo) {
    await runHash(choice.algo);
  }
}

async function pickTranscode(direction: 'encode' | 'decode'): Promise<void> {
  const list = TRANSCODERS.filter((t) => t.direction === direction);
  type Item = vscode.QuickPickItem & { t: Transcoder };
  const items: Item[] = list.map((t) => ({ label: t.label, t }));

  const choice = await vscode.window.showQuickPick(items, {
    placeHolder: `Pick a format to ${direction} — result is copied to the clipboard`,
  });
  if (choice) {
    await runTranscode(choice.t);
  }
}

export function activate(context: vscode.ExtensionContext): void {
  for (const algo of ALGORITHMS) {
    context.subscriptions.push(
      vscode.commands.registerCommand(`hashToClipboard.${algo.id}`, () =>
        runHash(algo),
      ),
    );
  }

  for (const t of TRANSCODERS) {
    context.subscriptions.push(
      vscode.commands.registerCommand(`transcode.${t.id}`, () =>
        runTranscode(t),
      ),
    );
  }

  context.subscriptions.push(
    vscode.commands.registerCommand('hashToClipboard.pick', pickHash),
    vscode.commands.registerCommand('transcode.pickEncode', () =>
      pickTranscode('encode'),
    ),
    vscode.commands.registerCommand('transcode.pickDecode', () =>
      pickTranscode('decode'),
    ),
  );
}

export function deactivate(): void {
  /* no-op: all disposables are registered on context.subscriptions */
}
