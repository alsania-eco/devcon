import { LocalMCPServer } from '../mcp/LocalMCPServer';
import * as vscode from 'vscode';
export function registerSecurityTools(mcpServer: LocalMCPServer){
  const dc=vscode.languages.createDiagnosticCollection('ai-security');
  mcpServer.addTool({name:'scan_security',description:'Scan code for security vulnerabilities',inputSchema:{type:'object',properties:{level:{type:'string',enum:['basic','OWASP','critical'],default:'OWASP'}}}},async(params)=>{
    const editor=vscode.window.activeTextEditor;if(!editor) return 'No active editor';
    const code=editor.document.getText();const language=editor.document.languageId;
    const prompt=`Scan this ${language} code for ${params.level} security vulnerabilities:\n\n${code}\n\nFormat findings as:\n- Line X: [VULN_TYPE] Description (Severity)`;
    const scan=await mcpServer.callTool('query_chatgpt',{message:prompt});
    const diags:vscode.Diagnostic[]=[];
    scan.split('\n').forEach(line=>{const m=line.match(/- Line (\d+): \[(.*?)\] (.*?) \((.*?)\)/);if(m){const lineNum=parseInt(m[1])-1;const range=new vscode.Range(new vscode.Position(lineNum,0),new vscode.Position(lineNum,100));diags.push(new vscode.Diagnostic(range,`[SECURITY: ${m[2]}] ${m[3]}`,vscode.DiagnosticSeverity.Error));}});
    dc.set(editor.document.uri,diags);return scan;
  });
}