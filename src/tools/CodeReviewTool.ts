import { LocalMCPServer } from '../mcp/LocalMCPServer';
import * as vscode from 'vscode';
export function registerCodeReviewTools(mcpServer: LocalMCPServer){
  const dc=vscode.languages.createDiagnosticCollection('ai-review');
  mcpServer.addTool({name:'code_review',description:'Perform AI-powered code review',inputSchema:{type:'object',properties:{strictness:{type:'string',enum:['gentle','normal','strict'],default:'normal'}}}},async(params)=>{
    const editor=vscode.window.activeTextEditor;if(!editor) return 'No active editor';
    const code=editor.document.getText();const language=editor.document.languageId;
    const prompt=`Review this ${language} code with ${params.strictness} strictness. Identify bugs, style issues, and improvements. Format as: - Line X: [ISSUE_TYPE] Description (Severity)\n\n${code}`;
    const review=await mcpServer.callTool('query_chatgpt',{message:prompt});
    const diags:vscode.Diagnostic[]=[];
    review.split('\n').forEach(line=>{const m=line.match(/- Line (\d+): \[(.*?)\] (.*?) \((.*?)\)/);if(m){const lineNum=parseInt(m[1])-1;const range=new vscode.Range(new vscode.Position(lineNum,0),new vscode.Position(lineNum,100));diags.push(new vscode.Diagnostic(range,`[${m[2]}] ${m[3]}`,vscode.DiagnosticSeverity.Warning));}});
    dc.set(editor.document.uri,diags);return review;
  });
}