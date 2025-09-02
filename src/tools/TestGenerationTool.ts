import { LocalMCPServer } from '../mcp/LocalMCPServer';
import * as vscode from 'vscode';
export function registerTestGenerationTools(mcpServer: LocalMCPServer){
  mcpServer.addTool({name:'generate_tests',description:'Generate unit tests for code',inputSchema:{type:'object',properties:{framework:{type:'string',enum:['jest','mocha','pytest','unittest'],default:'jest'},coverage:{type:'string',enum:['basic','edge-cases','full'],default:'edge-cases'}}}},async(params)=>{
    const editor=vscode.window.activeTextEditor;if(!editor) return 'No active editor';
    const code=editor.document.getText();const language=editor.document.languageId;
    const prompt=`Generate ${params.framework} ${params.coverage} tests for this ${language} code:\n\n${code}`;
    const tests=await mcpServer.callTool('query_chatgpt',{message:prompt});
    const testPath=vscode.Uri.parse(`untitled:${editor.document.fileName}.test.${language}`);const testEditor=await vscode.window.showTextDocument(testPath);
    await testEditor.edit(edit=>edit.insert(new vscode.Position(0,0),tests));return 'Tests generated in new file';
  });
}