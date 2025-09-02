import * as vscode from 'vscode';
import { LLMBridgeService } from './bridge/LLMBridgeService';
import { LocalLLMProfileLoader } from './config/loaders/LocalLLMProfileLoader';
import { ProfileLifecycleManager } from './config/ProfileLifecycleManager';
import { registerDefaultTools } from './tools';

export async function activate(context: vscode.ExtensionContext) {
  const bridge = LLMBridgeService.getInstance();
  await bridge.initialize();

  const profileManager = new ProfileLifecycleManager();
  profileManager.registerProfileLoader(new LocalLLMProfileLoader());
  await profileManager.activateProfile('local-llm');

  // expose tools for command palette
  registerDefaultTools(bridge.getMCPServer());

  context.subscriptions.push(
    vscode.commands.registerCommand('continue.explainCode', async () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const code = editor.document.getText(editor.selection);
        const language = editor.document.languageId;
        const explanation = await bridge.queryChatGPT(`Explain this ${language} code:\n\n${code}`);
        vscode.window.showInformationMessage(explanation.slice(0, 3000));
      }
    })
  );

  context.subscriptions.push({ dispose: async () => {
    await bridge.shutdown();
    await profileManager.deactivateAllProfiles();
  }});
}

export function deactivate() { /* handled by disposables */ }
