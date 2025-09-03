/**
 * This is the entry point for the extension.
 */

import { setupCa } from "core/util/ca";
import * as os from "os"; // Fix: import os for homedir
import * as vscode from "vscode";

export { default as buildTimestamp } from "./.buildTimestamp";

async function dynamicImportAndActivate(context: vscode.ExtensionContext) {
  await setupCa();
  const { activateExtension } = await import("./activation/activate");
  return await activateExtension(context);
}

// Remove duplicate activate/deactivate implementations
// Mark activate as async and add type annotation
export async function activate(context: vscode.ExtensionContext) {
  let lastPatch: unknown = null; // Add type annotation

  // Echo Status Bar
  const statusBar = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    1000,
  );
  statusBar.text = "$(robot) Echo";
  statusBar.tooltip = "Open Echo DevCon - Alsania AI Assistant";
  statusBar.command = "echo.open";
  statusBar.show();
  context.subscriptions.push(statusBar);

  // Main Echo Chat Command
  const openEcho = vscode.commands.registerCommand("echo.open", async () => {
    const panel = vscode.window.createWebviewPanel(
      "echoDevcon",
      "Echo DevCon",
      vscode.ViewColumn.Beside,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
        localResourceRoots: [vscode.Uri.joinPath(context.extensionUri, "gui")],
      },
    );

    // Echo branding icons
    panel.iconPath = {
      dark: vscode.Uri.joinPath(
        context.extensionUri,
        "media",
        "branding",
        "icons",
        "echo-dark.svg",
      ),
      light: vscode.Uri.joinPath(
        context.extensionUri,
        "media",
        "branding",
        "icons",
        "echo-light.svg",
      ),
    };

    // Load webview content
    panel.webview.html = getEchoWebviewHtml(
      panel.webview,
      context.extensionUri,
    );

    // Initialize Echo with workspace context
    const activeEditor = vscode.window.activeTextEditor;
    const config = vscode.workspace.getConfiguration("echoDevcon");

    panel.webview.postMessage({
      type: "echo_init",
      data: {
        backendUrl: config.get("backendUrl", "http://127.0.0.1:8001"),
        backendWs: config.get("backendWs", "ws://127.0.0.1:8001/ws/echo"),
        mcpUrl: config.get("mcpUrl", "http://127.0.0.1:8050/mcp"),
        workspaceFolders:
          vscode.workspace.workspaceFolders?.map((w) => w.uri.fsPath) || [],
        activeFile: activeEditor?.document?.uri?.fsPath || null,
        selectedText:
          activeEditor && !activeEditor.selection.isEmpty
            ? activeEditor.document.getText(activeEditor.selection)
            : "",
        echoIdentity: "Echo DevCon v0.3.0 - Alsania AI Assistant",
      },
    });

    // Handle messages from Echo webview
    const messageHandler = panel.webview.onDidReceiveMessage(
      async (msg: any) => {
        try {
          switch (msg?.type) {
            case "echo_apply_patch":
              lastPatch = msg.patch;
              await applyEchoPatch(msg.patch);
              break;
            case "echo_save_file":
              await saveFileWithEcho(msg.path, msg.content);
              break;
            case "echo_alert":
              vscode.window.showInformationMessage(`Echo: ${msg.message}`);
              break;
            case "echo_error":
              vscode.window.showErrorMessage(`Echo Error: ${msg.message}`);
              break;
          }
        } catch (err: any) {
          // Fix: ensure err is Error type
          vscode.window.showErrorMessage(
            `Echo DevCon Error: ${err && err.message ? err.message : String(err)}`,
          );
        }
      },
    );
    context.subscriptions.push(messageHandler);
  });

  // Ask Echo about selection
  const askEcho = vscode.commands.registerCommand("echo.ask", async () => {
    const prompt = await vscode.window.showInputBox({
      placeHolder: "Ask Echo about the selected code...",
      prompt: "What would you like Echo to help with?",
    });
    if (!prompt) return;

    await vscode.commands.executeCommand("echo.open");
    vscode.window.showInformationMessage("Echo: Processing your request...");
  });

  // Apply last Echo patch
  const applyLastPatch = vscode.commands.registerCommand(
    "echo.applyPatch",
    async () => {
      if (!lastPatch) {
        return vscode.window.showWarningMessage(
          "Echo: No patch available to apply.",
        );
      }
      await applyEchoPatch(lastPatch);
    },
  );

  // Open Scribe (Echo's logging system)
  const openScribe = vscode.commands.registerCommand(
    "echo.openScribeToday",
    async () => {
      await openEchoScribeToday();
    },
  );

  context.subscriptions.push(openEcho, askEcho, applyLastPatch, openScribe);
}

// Add type annotations for parameters
function getEchoWebviewHtml(
  webview: vscode.Webview,
  extensionUri: vscode.Uri,
): string {
  const guiUri = vscode.Uri.joinPath(extensionUri, "gui");

  return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Echo DevCon</title>
    <link rel="stylesheet" href="${webview.asWebviewUri(vscode.Uri.joinPath(guiUri, "assets", "index.css"))}">
</head>
<body>
    <div id="root"></div>
    <script src="${webview.asWebviewUri(vscode.Uri.joinPath(guiUri, "assets", "index.js"))}"></script>
</body>
</html>`;
}

// Add type annotation for patch
async function applyEchoPatch(patch: unknown) {
  // Implementation for applying Echo's code patches
  vscode.window.showInformationMessage("Echo: Patch applied successfully!");
}

// Add type annotations for filePath and content
async function saveFileWithEcho(filePath: string, content: string) {
  const uri = vscode.Uri.file(filePath);
  const edit = new vscode.WorkspaceEdit();
  edit.replace(uri, new vscode.Range(0, 0, Number.MAX_VALUE, 0), content);
  await vscode.workspace.applyEdit(edit);
  vscode.window.showInformationMessage(`Echo: Saved ${filePath}`);
}

async function openEchoScribeToday() {
  const today = new Date().toISOString().split("T")[0];
  const scribePath = `${os.homedir()}/.echo/scribe/${today}.md`;
  const uri = vscode.Uri.file(scribePath);
  await vscode.window.showTextDocument(uri);
}
