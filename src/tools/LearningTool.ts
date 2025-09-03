import { LocalMCPServer } from '../mcp/LocalMCPServer';
import * as vscode from 'vscode';
function escapeHtml(s:string){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
export function registerLearningTools(mcpServer: LocalMCPServer){
  mcpServer.addTool({name:'interactive_learn',description:'Interactive programming lessons',inputSchema:{type:'object',properties:{topic:{type:'string'},level:{type:'string',enum:['beginner','intermediate','advanced'],default:'intermediate'}},required:['topic']}},async(params)=>{
    const prompt=`Create an interactive ${params.level} lesson about ${params.topic}. Structure as: 1. Brief explanation 2. Code example 3. Exercise task 4. Solution. Make it suitable for a 10-minute learning session.`;
    const lesson=await mcpServer.callTool('query_chatgpt',{message:prompt});
    const panel=vscode.window.createWebviewPanel('learningPanel',`Learn: ${params.topic}`,vscode.ViewColumn.Beside,{enableScripts:true});
    panel.webview.html=`<html><body><h1>Learning Session</h1><div style="margin:20px;padding:15px;border:1px solid #ddd;"><pre>${escapeHtml(lesson)}</pre></div></body></html>`;
    return 'Interactive lesson started';
  });
}