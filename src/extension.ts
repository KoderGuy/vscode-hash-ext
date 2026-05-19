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
// Command Palette declutter — explicit and deterministic, no heuristics.
//
// Always visible: the 3 pickers (run any algo/codec without palette clutter)
// and 2 management commands. Every specific per-algorithm / per-codec command
// is declared in package.json but gated by a `when` context key, controlled
// solely by the user setting `hashToClipboard.visibleCommands`:
//
//  • "Show Command in Palette…"  → add chosen commands to the setting.
//  • "Hide Command from Palette…" → remove chosen commands.
//
// The user can also edit the setting directly; changes apply live. Once a
// command is shown it can be given a keybinding via the normal UI. Every
// command is keybindable at all times regardless of palette visibility.
// ---------------------------------------------------------------------------
const VISIBLE_SETTING = 'visibleCommands';

interface CommandChoice {
  id: string;
  label: string;
}
const COMMAND_CHOICES: CommandChoice[] = [
  ...ALGORITHMS.map((a) => ({
    id: `hashToClipboard.${a.id}`,
    label: `Hash: ${a.label}${a.legacy ? ' (insecure)' : ''}`,
  })),
  ...TRANSCODERS.map((t) => ({
    id: `transcode.${t.id}`,
    label: `${t.direction === 'encode' ? 'Encode' : 'Decode'}: ${t.label}`,
  })),
];
const ALL_COMMAND_IDS = COMMAND_CHOICES.map((c) => c.id);

/** Context-key name for a command id — must match package.json `when`. */
function keyFor(commandId: string): string {
  return `hashExt.cmd.${commandId.replace(/[^A-Za-z0-9]/g, '_')}`;
}

function getVisibleList(): string[] {
  return vscode.workspace
    .getConfiguration('hashToClipboard')
    .get<string[]>(VISIBLE_SETTING, []);
}

async function setVisibleList(ids: string[]): Promise<void> {
  await vscode.workspace
    .getConfiguration('hashToClipboard')
    .update(VISIBLE_SETTING, ids, vscode.ConfigurationTarget.Global);
}

/** Drive palette visibility entirely from the persisted setting. */
function applyVisibility(): void {
  const visible = new Set(getVisibleList());
  for (const id of ALL_COMMAND_IDS) {
    void vscode.commands.executeCommand(
      'setContext',
      keyFor(id),
      visible.has(id),
    );
  }
}

type ChoiceItem = vscode.QuickPickItem & { id: string };

async function manageShow(): Promise<void> {
  const visible = new Set(getVisibleList());
  const items: ChoiceItem[] = COMMAND_CHOICES.filter(
    (c) => !visible.has(c.id),
  ).map((c) => ({ label: c.label, id: c.id }));
  if (items.length === 0) {
    vscode.window.showInformationMessage(
      'Every command is already shown in the Command Palette.',
    );
    return;
  }
  const picked = await vscode.window.showQuickPick(items, {
    canPickMany: true,
    placeHolder: 'Select commands to SHOW in the Command Palette',
  });
  if (!picked || picked.length === 0) {
    return;
  }
  await setVisibleList([...getVisibleList(), ...picked.map((p) => p.id)]);
  applyVisibility();
}

async function manageHide(): Promise<void> {
  const list = getVisibleList();
  if (list.length === 0) {
    vscode.window.showInformationMessage(
      'No optional commands are currently shown (only the pickers/managers).',
    );
    return;
  }
  const byId = new Map(COMMAND_CHOICES.map((c) => [c.id, c.label]));
  const items: ChoiceItem[] = list.map((id) => ({
    label: byId.get(id) ?? id,
    id,
  }));
  const picked = await vscode.window.showQuickPick(items, {
    canPickMany: true,
    placeHolder: 'Select commands to HIDE from the Command Palette',
  });
  if (!picked || picked.length === 0) {
    return;
  }
  const remove = new Set(picked.map((p) => p.id));
  await setVisibleList(list.filter((id) => !remove.has(id)));
  applyVisibility();
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

  // Specific commands just run — visibility is managed explicitly via the
  // settings list / the Show/Hide commands, never implicitly.
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
    vscode.commands.registerCommand('hashToClipboard.showCommand', manageShow),
    vscode.commands.registerCommand('hashToClipboard.hideCommand', manageHide),
  );
}

export function deactivate(): void {
  /* no-op: all disposables are registered on context.subscriptions */
}
