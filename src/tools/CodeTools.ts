import { LocalMCPServer } from '../mcp/LocalMCPServer';

export function registerCodeTools(mcpServer: LocalMCPServer) {
  mcpServer.addTool({
    name: 'explain_code',
    description: 'Explain code in detail',
    inputSchema: {
      type: 'object',
      properties: { code: { type: 'string' }, language: { type: 'string' } },
      required: ['code']
    }
  }, async (params) => {
    const prompt = `Explain this ${params.language} code:\n\n${params.code}\n\nProvide detailed analysis.`;
    return mcpServer.callTool('query_chatgpt', { message: prompt });
  });

  mcpServer.addTool({
    name: 'refactor_code',
    description: 'Refactor code with improvements',
    inputSchema: {
      type: 'object',
      properties: { code: { type: 'string' }, language: { type: 'string' }, requirements: { type: 'string', optional: true } },
      required: ['code']
    }
  }, async (params) => {
    const prompt = `Refactor this ${params.language} code${params.requirements ? ` with these requirements: ${params.requirements}` : ''}:\n\n${params.code}\n\nProvide the refactored code with explanations.`;
    return mcpServer.callTool('query_chatgpt', { message: prompt });
  });
}
