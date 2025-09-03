import { LocalMCPServer } from '../mcp/LocalMCPServer';
import * as vscode from 'vscode';
function escapeHtml(s:string){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
export function registerLiveCodingTools(mcpServer: LocalMCPServer){
  let panel:vscode.WebviewPanel|undefined;
  mcpServer.addTool({name:'generate_code_with_preview',description:'Generate code with live preview',inputSchema:{type:'object',properties:{requirements:{type:'string'},language:{type:'string'}},required:['requirements']}},async(params)=>{
    const response = await mcpServer.callTool('query_chatgpt',{message:`Generate ${params.language||'JavaScript'} code for: ${params.requirements}`});
    if(!panel){panel=vscode.window.createWebviewPanel('codePreview','Code Preview',vscode.ViewColumn.Beside,{enableScripts:true}); panel.onDidDispose(()=>panel=undefined);}
    panel.webview.html=`<html><body><pre>${escapeHtml(response)}</pre></body></html>`; return response;});
}