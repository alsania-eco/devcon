export class LocalLLMProfileLoader {
  async load() { return { name: 'local-llm', provider: 'mcp', model: 'query_chatgpt' }; }
}
