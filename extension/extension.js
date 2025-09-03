// ----------------------------------------------------------
// Echo DevCon VS Code Extension (cleaned)
// ----------------------------------------------------------
const vscode = require("vscode");
const path = require("path");
const fs = require("fs");
const os = require("os");

// ------------------------- Activate -------------------------
function activate(context) {
  let lastPatch = null;

  // Status button
  const sb = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    1000,
  );
  sb.text = "$(comment-discussion) Echo";
  sb.tooltip = "Open Echo DevCon";
  sb.command = "devcon.open";
  sb.show();
  context.subscriptions.push(sb);

  // Open Chat command
  const openChat = vscode.commands.registerCommand("devcon.open", async () => {
    const panel = vscode.window.createWebviewPanel(
      "echoDevconChat",
      "Echo DevCon",
      vscode.ViewColumn.Beside,
      { enableScripts: true, retainContextWhenHidden: true },
    );

    // Panel icons
    const extUri = context.extensionUri;
    panel.iconPath = {
      dark: vscode.Uri.joinPath(
        extUri,
        "media",
        "branding",
        "icons",
        "panel-dark.svg",
      ),
      light: vscode.Uri.joinPath(
        extUri,
        "media",
        "branding",
        "icons",
        "panel-light.svg",
      ),
    };

    // Load HTML
    panel.webview.html = getWebviewHtml(panel.webview, extUri);

    // Bootstrap data to webview
    const activeEditor = vscode.window.activeTextEditor;
    panel.webview.postMessage({
      type: "init",
      data: {
        backendUrl: getCfg("echoDevcon.backendUrl", "http://127.0.0.1:8001"),
        backendWs: getCfg(
          "echoDevcon.backendWs",
          "ws://127.0.0.1:8001/ws/echo",
        ),
        workspaceFolders:
          vscode.workspace.workspaceFolders?.map((w) => w.uri.fsPath) || [],
        activeFile: activeEditor?.document?.uri?.fsPath || null,
        selectedText:
          activeEditor && !activeEditor.selection.isEmpty
            ? activeEditor.document.getText(activeEditor.selection)
            : "",
      },
    });

    // Messages from webview
    const sub = panel.webview.onDidReceiveMessage(async (msg) => {
      try {
        if (msg?.type === "applyPatch") {
          lastPatch = msg.patch;
          await applyPatch(msg.patch);
        } else if (msg?.type === "saveFile") {
          const uri = vscode.Uri.file(msg.path);
          let doc = await vscode.workspace.openTextDocument(uri);
          const edit = new vscode.WorkspaceEdit();
          edit.replace(
            uri,
            new vscode.Range(0, 0, doc.lineCount, 0),
            msg.content,
          );
          await vscode.workspace.applyEdit(edit);
          await doc.save();
          vscode.window.showInformationMessage(`Saved ${msg.path}`);
        } else if (msg?.type === "alert") {
          vscode.window.showInformationMessage(
            String(msg.message || "Echo DevCon alert"),
          );
        }
      } catch (err) {
        vscode.window.showErrorMessage(
          "Echo DevCon Error: " + (err?.message || String(err)),
        );
      }
    });
    context.subscriptions.push(sub);
  });

  // Ask about selection
  const ask = vscode.commands.registerCommand("devcon.ask", async () => {
    const prompt = await vscode.window.showInputBox({
      placeHolder: "Ask Echo about the selection…",
    });
    if (!prompt) return;
    await vscode.commands.executeCommand("devcon.open");
    vscode.window.showInformationMessage(
      "Echo DevCon: prompt sent. (Re-open panel if needed.)",
    );
  });

  // Apply last patch
  const applyPatchCmd = vscode.commands.registerCommand(
    "devcon.applyPatch",
    async () => {
      if (!lastPatch)
        return vscode.window.showWarningMessage("No patch available yet.");
      await applyPatch(lastPatch);
    },
  );

  // Open latest Scribe entry
  const openScribe = vscode.commands.registerCommand(
    "devcon.openScribeToday",
    async () => {
      await openScribeToday();
    },
  );

  context.subscriptions.push(openChat, ask, applyPatchCmd, openScribe);
}

// ------------------------- Utilities -------------------------
function getCfg(key, def) {
  try {
    return vscode.workspace.getConfiguration().get(key) ?? def;
  } catch {
    return def;
  }
}

async function applyPatch(patch) {
  const uri = vscode.Uri.file(patch.file);
  const doc = await vscode.workspace.openTextDocument(uri);
  const edit = new vscode.WorkspaceEdit();
  for (const e of patch.edits || []) {
    const range = new vscode.Range(
      new vscode.Position(e.start.line, e.start.char),
      new vscode.Position(e.end.line, e.end.char),
    );
    edit.replace(uri, range, e.text);
  }
  await vscode.workspace.applyEdit(edit);
  await doc.save();
  vscode.window.showInformationMessage(`Applied patch to ${patch.file}`);
}

function getWebviewHtml(webview, extensionUri) {
  const media = (f) =>
    webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, "media", f));
  const nonce = String(Date.now());
  return `<!doctype html>
<html><head>
<meta charset="utf-8">
<meta http-equiv="Content-Security-Policy"
      content="default-src 'none'; img-src data: https:;
               style-src 'unsafe-inline';
               script-src 'nonce-${nonce}';
               connect-src http://127.0.0.1:* ws://127.0.0.1:*;">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Echo DevCon</title>
<link rel="stylesheet" href="${media("style.css")}">
</head>
<body>
  <div id="app">
    <header><h1>Echo DevCon</h1><div id="status">ready</div></header>
    <section id="chat" class="chat"></section>
    <footer class="controls">
      <textarea id="prompt" placeholder="Ask Echo… (Shift+Enter for newline)"></textarea>
      <div class="btns">
        <button id="send">Send</button>
        <button id="anchor">Anchor Scribe</button>
      </div>
    </footer>
  </div>
  <script nonce="${nonce}" src="${media("main.js")}"></script>
</body></html>`;
}

async function openScribeToday() {
  try {
    // Default to ALSANIA scribe path; fall back to project copy if present
    const homeRoot = path.join(os.homedir(), ".alsania", "scribe");
    const projRoot = path.join(
      os.homedir(),
      "Desktop",
      "AlsaniaProjects",
      "devcon",
      ".scribe",
    );
    const today = new Date().toISOString().slice(0, 10);

    const tryDir = (root) => path.join(root, today);
    const candidates = [tryDir(homeRoot), tryDir(projRoot)];
    let dir = candidates.find((d) => fs.existsSync(d));

    if (!dir) {
      vscode.window.showWarningMessage("No Scribe entries for today yet.");
      return;
    }

    const files = fs
      .readdirSync(dir)
      .filter((f) => f.endsWith(".md"))
      .map((f) => ({ f, t: fs.statSync(path.join(dir, f)).mtimeMs }))
      .sort((a, b) => b.t - a.t);

    if (!files.length) {
      vscode.window.showWarningMessage("No Scribe entries for today yet.");
      return;
    }

    const uri = vscode.Uri.file(path.join(dir, files[0].f));
    const doc = await vscode.workspace.openTextDocument(uri);
    await vscode.window.showTextDocument(doc, { preview: false });
  } catch (e) {
    vscode.window.showErrorMessage(
      "Failed to open Scribe: " + (e?.message || String(e)),
    );
  }
}

// ------------------------- Deactivate -------------------------
function deactivate() {}

module.exports = { activate, deactivate };
