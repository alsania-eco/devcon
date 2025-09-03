import { LocalMCPServer } from '../mcp/LocalMCPServer';
import * as vscode from 'vscode';
function escapeHtml(s:string){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
export function registerDebuggingTools(mcpServer: LocalMCPServer){
  mcpServer.addTool({name:'debug_error',description:'Debug errors and exceptions',inputSchema:{type:'object',properties:{error:{type:'string'},context:{type:'string'}},required:['error']}},async(params)=>{
    const editor=vscode.window.activeTextEditor;const codeContext=editor?editor.document.getText():'';
    const prompt=`Debug this error: ${params.error}\n\nCode context:\n${codeContext}\n\nAdditional context: ${params.context||'None'}\n\nProvide:\n1. Root cause\n2. Solution\n3. Prevention tips`;
    const debugInfo=await mcpServer.callTool('query_chatgpt',{message:prompt});
    const panel=vscode.window.createWebviewPanel('aiDebugger','AI Debugger',vscode.ViewColumn.Beside,{});
    panel.webview.html=`<html><body><h1>Error Debug Analysis</h1><pre>${escapeHtml(debugInfo)}</pre></body></html>`;return debugInfo;
  });
}