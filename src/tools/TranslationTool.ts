import { LocalMCPServer } from '../mcp/LocalMCPServer';
import * as vscode from 'vscode';
export function registerTranslationTools(mcpServer: LocalMCPServer){
  mcpServer.addTool({name:'translate_code',description:'Translate code between languages',inputSchema:{type:'object',properties:{target:{type:'string',enum:['Python','JavaScript','TypeScript','Java','C#'],default:'Python'},paradigm:{type:'string',enum:['functional','OOP','procedural'],default:'OOP'}},required:['target']}},async(params)=>{
    const editor=vscode.window.activeTextEditor;if(!editor) return 'No active editor';
    const code=editor.document.getText();const sourceLang=editor.document.languageId;
    const prompt=`Translate this ${sourceLang} code to ${params.target} using ${params.paradigm} paradigm:\n\n${code}`;
    const translated=await mcpServer.callTool('query_chatgpt',{message:prompt});
    const ext:{[k:string]:string}={'Python':'.py','JavaScript':'.js','TypeScript':'.ts','Java':'.java','C#':'.cs'};
    const newEditor=await vscode.window.showTextDocument(vscode.Uri.parse('untitled:translated'+(ext[params.target]||'.txt')));
    await newEditor.edit(edit=>edit.insert(new vscode.Position(0,0),translated));return `Code translated to ${params.target}`;
  });
}