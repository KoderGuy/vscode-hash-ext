import * as vscode from 'vscode';
import {
  ALGORITHMS,
  TRANSCODERS,
  HashAlgo,
  Transcoder,
  DigestEncoding,
  computeDigest,
} from './algorithms';

// Re-export the pure logic so the single bundled extension.js exposes it as
// named exports. The committed QA package require()s this file (with vscode
// shimmed) and certifies these exact bundled bytes — no separate QA copy.
export { ALGORITHMS, TRANSCODERS, computeDigest } from './algorithms';

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

// ---------------------------------------------------------------------------
// Command Palette declutter: only the 3 pickers are visible by default. The
// specific per-algorithm / per-codec commands are declared in package.json
// but their palette visibility is gated by a `when` context key. The first
// time the user runs one (via a picker OR a keybinding), we flip its key on
// so it appears in the palette — for THIS session only. Context keys set via
// `setContext` are not persisted, so a window reload reverts to just the
// pickers. Every command stays keybindable at all times regardless.
// ---------------------------------------------------------------------------
const PERSIST_KEY = 'hashExt.permanentCommands';
const promoted = new Set<string>();
let extContext: vscode.ExtensionContext | undefined;

/** Context-key name for a command id — must match package.json `when`. */
function keyFor(commandId: string): string {
  return `hashExt.cmd.${commandId.replace(/[^A-Za-z0-9]/g, '_')}`;
}

/** Make a command visible in the palette for THIS session only. */
function promoteSession(commandId: string): void {
  if (promoted.has(commandId)) {
    return;
  }
  promoted.add(commandId);
  // Session-scoped: context keys set via setContext are not persisted, so a
  // window reload reverts these to hidden. Fire-and-forget.
  void vscode.commands.executeCommand('setContext', keyFor(commandId), true);
}

/**
 * Pin a command's palette visibility PERMANENTLY (persists across reloads via
 * globalState). Used when the command is invoked DIRECTLY — i.e. via a user
 * keybinding (the only way to trigger a still-hidden command) or the palette.
 * VSCode exposes no API to read keybindings.json, so direct invocation is the
 * reliable proxy for "the user wired this up and wants it to stay".
 */
function promotePermanent(commandId: string): void {
  promoteSession(commandId);
  const ctx = extContext;
  if (!ctx) {
    return;
  }
  const list = ctx.globalState.get<string[]>(PERSIST_KEY, []);
  if (!list.includes(commandId)) {
    void ctx.globalState.update(PERSIST_KEY, [...list, commandId]);
  }
}

async function runHash(algo: HashAlgo): Promise<void> {
  try {
    // Every algorithm is bundled (@noble/hashes), so all are always
    // available regardless of the editor's runtime — no availability filter.
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
      `Hash & Transcode: ${algo.label} failed: ${err instanceof Error ? err.message : String(err)
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
        `Hash & Transcode: ${t.label} ${t.direction} failed: ${e instanceof Error ? e.message : String(e)
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
      `Hash & Transcode: ${t.label} failed: ${err instanceof Error ? err.message : String(err)
      }`,
    );
  }
}

async function pickHash(): Promise<void> {
  const secure = ALGORITHMS.filter((a) => !a.legacy);
  const legacy = ALGORITHMS.filter((a) => a.legacy);

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
    // Picked via the picker → visible for this session only.
    promoteSession(`hashToClipboard.${choice.algo.id}`);
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
    // Picked via the picker → visible for this session only.
    promoteSession(`transcode.${choice.t.id}`);
    await runTranscode(choice.t);
  }
}

export function activate(context: vscode.ExtensionContext): void {
  extContext = context;

  // Restore permanently-pinned commands (set on a previous session via a
  // direct/keybinding invocation) so they stay visible across reloads.
  for (const id of context.globalState.get<string[]>(PERSIST_KEY, [])) {
    promoted.add(id);
    void vscode.commands.executeCommand('setContext', keyFor(id), true);
  }

  // Direct invocation of a specific command (keybinding or palette) pins it
  // permanently; selecting it from a picker only reveals it for the session.
  for (const algo of ALGORITHMS) {
    const id = `hashToClipboard.${algo.id}`;
    context.subscriptions.push(
      vscode.commands.registerCommand(id, () => {
        promotePermanent(id);
        return runHash(algo);
      }),
    );
  }

  for (const t of TRANSCODERS) {
    const id = `transcode.${t.id}`;
    context.subscriptions.push(
      vscode.commands.registerCommand(id, () => {
        promotePermanent(id);
        return runTranscode(t);
      }),
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
