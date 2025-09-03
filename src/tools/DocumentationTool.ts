import { LocalMCPServer } from '../mcp/LocalMCPServer';
import * as vscode from 'vscode';
export function registerDocumentationTools(mcpServer: LocalMCPServer){
  mcpServer.addTool({name:'generate_docs',description:'Generate documentation for code',inputSchema:{type:'object',properties:{style:{type:'string',enum:['JSDoc','TSDoc','Python','Markdown'],default:'JSDoc'},detail:{type:'string',enum:['brief','detailed','examples'],default:'detailed'}}}},async(params)=>{
    const editor=vscode.window.activeTextEditor;if(!editor) return 'No active editor';
    const code=editor.document.getText();const language=editor.document.languageId;
    const prompt=`Generate ${params.style}-style ${params.detail} documentation for this ${language} code:\n\n${code}`;
    const docs=await mcpServer.callTool('query_chatgpt',{message:prompt});
    const docPath=vscode.Uri.parse(`untitled:${editor.document.fileName}.docs.md`);const docEditor=await vscode.window.showTextDocument(docPath);
    await docEditor.edit(edit=>edit.insert(new vscode.Position(0,0),docs));return 'Documentation generated in new file';
  });
}