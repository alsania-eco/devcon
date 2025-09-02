import * as vscode from 'vscode';
export class ContextManager {
  public static async getCodeContext(): Promise<string> {
    const editor = vscode.window.activeTextEditor; if (!editor) return '';
    return `
        File: ${editor.document.fileName}
        Language: ${editor.document.languageId}
        Code:
        ${editor.document.getText()}
        `;
  }
  public static async getSelectionContext(): Promise<string> {
    const editor = vscode.window.activeTextEditor; if (!editor || editor.selection.isEmpty) return '';
    return editor.document.getText(editor.selection);
  }
}
