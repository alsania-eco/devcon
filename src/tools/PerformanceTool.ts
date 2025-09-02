import { LocalMCPServer } from '../mcp/LocalMCPServer';
import * as vscode from 'vscode';
function escapeHtml(s:string){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
export function registerPerformanceTools(mcpServer: LocalMCPServer){
  mcpServer.addTool({name:'optimize_performance',description:'Analyze and optimize code performance',inputSchema:{type:'object',properties:{focus:{type:'string',enum:['time','memory','both'],default:'both'},constraints:{type:'string'}}}},async(params)=>{
    const editor=vscode.window.activeTextEditor;if(!editor) return 'No active editor';
    const code=editor.document.getText();const language=editor.document.languageId;
    const prompt=`Analyze and optimize this ${language} code for ${params.focus} performance${params.constraints?` with these constraints: ${params.constraints}`:''}:\n\n${code}\n\nProvide:\n1. Bottleneck analysis\n2. Optimized version\n3. Benchmark estimates`;
    const analysis=await mcpServer.callTool('query_chatgpt',{message:prompt});
    const panel=vscode.window.createWebviewPanel('performancePanel','Performance Analysis',vscode.ViewColumn.Beside,{});
    panel.webview.html=`<html><body><h1>Performance Optimization</h1><pre>${escapeHtml(analysis)}</pre></body></html>`;return analysis;
  });
}