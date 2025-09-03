import { EventEmitter } from 'events';
import { BrowserManager } from '../bridge/BrowserManager';
import { MCPTool } from './MCPTypes';

export class LocalMCPServer extends EventEmitter {
  private tools: Map<string, (params: any) => Promise<any>> = new Map();
  private browserManager: BrowserManager;

  constructor(browserManager: BrowserManager) {
    super();
    this.browserManager = browserManager;
    this.registerCoreTools();
  }

  private registerCoreTools() {
    this.addTool({
      name: 'query_chatgpt',
      description: 'Query ChatGPT through web interface',
      inputSchema: {
        type: 'object',
        properties: {
          message: { type: 'string' },
          context: { type: 'string', optional: true }
        },
        required: ['message']
      }
    }, this.handleChatGPTQuery.bind(this));
  }

  public async start() {
    await this.browserManager.getChatPage();
    this.emit('ready');
  }

  public async stop() {
    /* no-op */
  }

  public addTool(tool: MCPTool, handler: (params: any) => Promise<any>) {
    this.tools.set(tool.name, handler);
  }

  public async callTool(name: string, params: any): Promise<any> {
    const handler = this.tools.get(name);
    if (!handler) throw new Error(`Tool ${name} not found`);
    return handler(params);
  }

  private async handleChatGPTQuery(params: { message: string }): Promise<string> {
    const page = await this.browserManager.getChatPage();
    await page.waitForSelector('#prompt-textarea', { timeout: 30000 });
    await page.type('#prompt-textarea', params.message);
    await page.keyboard.press('Enter');

    await page.waitForFunction(() => {
      const el = document.querySelector('.result-streaming');
      return !el;
    }, { timeout: 90000 });

    return page.evaluate(() => {
      const responses = document.querySelectorAll('[data-message-author-role="assistant"]');
      const last = responses[responses.length - 1] as HTMLElement | undefined;
      return last?.innerText ?? '';
    });
  }
}
