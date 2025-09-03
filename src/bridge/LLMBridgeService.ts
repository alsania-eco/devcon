import { BrowserManager } from './BrowserManager';
import { MCPManagerSingleton } from '../mcp/MCPManagerSingleton';
import { LocalMCPServer } from '../mcp/LocalMCPServer';
import { registerDefaultTools } from '../tools';

export class LLMBridgeService {
  private static instance: LLMBridgeService;
  private browserManager: BrowserManager;
  private mcpServer: LocalMCPServer;

  private constructor() {
    this.browserManager = new BrowserManager();
    this.mcpServer = new LocalMCPServer(this.browserManager);
  }

  public static getInstance(): LLMBridgeService {
    if (!LLMBridgeService.instance) {
      LLMBridgeService.instance = new LLMBridgeService();
    }
    return LLMBridgeService.instance;
  }

  public async initialize() {
    await this.browserManager.launch();
    MCPManagerSingleton.getInstance().registerServer(this.mcpServer);
    registerDefaultTools(this.mcpServer);
    await this.mcpServer.start();
  }

  public getMCPServer() { return this.mcpServer; }

  public async shutdown() {
    await this.mcpServer.stop();
    await this.browserManager.close();
  }

  public async queryChatGPT(prompt: string): Promise<string> {
    return this.mcpServer.callTool('query_chatgpt', { message: prompt });
  }
}
