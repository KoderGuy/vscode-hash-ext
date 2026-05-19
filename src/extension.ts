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
// Command Palette declutter. Only the 3 pickers are visible by default. Every
// specific per-algorithm / per-codec command is declared in package.json but
// its palette visibility is gated by a `when` context key.
//
// Two tiers of visibility:
//
//  • SESSION — picking an algorithm/codec from a `.pick` command reveals that
//    command in the palette for the current window only (so the user can use
//    the palette's gear to assign a keybinding). It is NOT written to
//    settings, so a reload hides it again. Exploring via the picker therefore
//    never permanently clutters the palette.
//
//  • PERSISTENT — when the registered command handler itself runs (the user
//    pressed a keybinding they assigned to it; a still-hidden command cannot
//    be invoked from the palette, so the handler's run is a keypress), the
//    command id is written to the user setting
//    `hashToClipboard.visibleCommands` and stays visible every session until
//    the user removes it from that setting.
//
// Effective visibility = persisted setting ∪ this-session picks. Every
// command is keybindable at all times regardless of palette visibility.
// ---------------------------------------------------------------------------
const VISIBLE_SETTING = 'visibleCommands';

const ALL_COMMAND_IDS = [
  ...ALGORITHMS.map((a) => `hashToClipboard.${a.id}`),
  ...TRANSCODERS.map((t) => `transcode.${t.id}`),
];

/** Commands revealed for THIS session only (picker use); not persisted. */
const sessionVisible = new Set<string>();

/** Context-key name for a command id — must match package.json `when`. */
function keyFor(commandId: string): string {
  return `hashExt.cmd.${commandId.replace(/[^A-Za-z0-9]/g, '_')}`;
}

function getVisibleList(): string[] {
  return vscode.workspace
    .getConfiguration('hashToClipboard')
    .get<string[]>(VISIBLE_SETTING, []);
}

/**
 * Reconcile palette visibility for the whole set:
 * effective = persisted setting ∪ this-session picks.
 */
function applyVisibility(): void {
  const persisted = new Set(getVisibleList());
  for (const id of ALL_COMMAND_IDS) {
    void vscode.commands.executeCommand(
      'setContext',
      keyFor(id),
      persisted.has(id) || sessionVisible.has(id),
    );
  }
}

/** Reveal a command for THIS session only (picker). Not persisted. */
function promoteSession(commandId: string): void {
  if (sessionVisible.has(commandId)) {
    return;
  }
  sessionVisible.add(commandId);
  void vscode.commands.executeCommand('setContext', keyFor(commandId), true);
}

/**
 * Persist a command as visible-from-now-on (user settings, Global) and reveal
 * it. Called ONLY from the registered command handler — i.e. a keybinding
 * press (a still-hidden command can't be palette-invoked). Stays until the
 * user removes it from the setting.
 */
function reveal(commandId: string): void {
  const list = getVisibleList();
  if (list.includes(commandId)) {
    return;
  }
  void vscode.commands.executeCommand('setContext', keyFor(commandId), true);
  void vscode.workspace
    .getConfiguration('hashToClipboard')
    .update(
      VISIBLE_SETTING,
      [...list, commandId],
      vscode.ConfigurationTarget.Global,
    );
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
    // Session-only: shows in the palette now (so the user can assign a
    // keybinding via the gear) but is NOT persisted — gone after reload.
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
    // Session-only (see pickHash).
    promoteSession(`transcode.${choice.t.id}`);
    await runTranscode(choice.t);
  }
}

export function activate(context: vscode.ExtensionContext): void {
  // Apply visibility from the user setting on startup, and keep it in sync if
  // the user edits the list (adds/prunes) in their settings.
  applyVisibility();
  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration(`hashToClipboard.${VISIBLE_SETTING}`)) {
        applyVisibility();
      }
    }),
  );

  // Any invocation of a specific command (picker, keybinding, or palette)
  // records it into the user setting on first use → visible from then on.
  for (const algo of ALGORITHMS) {
    const id = `hashToClipboard.${algo.id}`;
    context.subscriptions.push(
      vscode.commands.registerCommand(id, () => {
        reveal(id);
        return runHash(algo);
      }),
    );
  }

  for (const t of TRANSCODERS) {
    const id = `transcode.${t.id}`;
    context.subscriptions.push(
      vscode.commands.registerCommand(id, () => {
        reveal(id);
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
