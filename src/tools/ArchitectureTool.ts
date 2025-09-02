import { LocalMCPServer } from '../mcp/LocalMCPServer';
import * as vscode from 'vscode';
function escapeHtml(s:string){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
export function registerArchitectureTools(mcpServer: LocalMCPServer){
  mcpServer.addTool({name:'suggest_architecture',description:'Suggest architectural patterns for codebase',inputSchema:{type:'object',properties:{scale:{type:'string',enum:['small','medium','large'],default:'medium'},constraints:{type:'string'}}}},async(params)=>{
    const files=await vscode.workspace.findFiles('**/*.{js,ts,py,java}','**/node_modules/**',20);
    const sample=await Promise.all(files.slice(0,5).map(async f=>{const b=await vscode.workspace.fs.readFile(f);return {path:f.path,content:Buffer.from(b).toString('utf8').slice(0,500)};}));
    const prompt=`Suggest architectural patterns for this codebase (scale: ${params.scale})${params.constraints?` with constraints: ${params.constraints}`:''}.\n\nSample files:\n${JSON.stringify(sample,null,2)}\n\nProvide:\n1. Recommended architecture\n2. Diagram (ASCII)\n3. Implementation steps`;
    const suggestion=await mcpServer.callTool('query_chatgpt',{message:prompt});
    const panel=vscode.window.createWebviewPanel('architecturePanel','Architecture Suggestions',vscode.ViewColumn.Beside,{});
    panel.webview.html=`<html><body><h1>Architecture Recommendations</h1><pre>${escapeHtml(suggestion)}</pre></body></html>`;return suggestion;
  });
}