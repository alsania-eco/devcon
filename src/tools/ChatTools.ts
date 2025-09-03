import { LocalMCPServer } from '../mcp/LocalMCPServer';

export function registerChatTools(mcpServer: LocalMCPServer) {
  mcpServer.addTool({
    name: 'continue_conversation',
    description: 'Continue a conversation with context',
    inputSchema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        history: { type: 'array', items: { type: 'object', properties: { role: { type: 'string' }, content: { type: 'string' } } } }
      },
      required: ['message']
    }
  }, async (params) => {
    const history = (params.history || []).map((h: any) => `${h.role}: ${h.content}`).join('\n');
    const prompt = `Conversation context:\n${history}\n\nRespond to this:\n${params.message}`;
    return mcpServer.callTool('query_chatgpt', { message: prompt });
  });
}
