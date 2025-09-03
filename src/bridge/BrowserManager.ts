import puppeteer, { Browser, Page } from 'puppeteer';

export class BrowserManager {
  private browser: Browser | null = null;
  private chatPage: Page | null = null;

  public async launch() {
    this.browser = await puppeteer.launch({
      headless: false,
      userDataDir: './.browser_data',
      args: ['--no-sandbox']
    });
  }

  public async getChatPage(): Promise<Page> {
    if (!this.browser) throw new Error('Browser not initialized');

    if (!this.chatPage || this.chatPage.isClosed()) {
      this.chatPage = await this.browser.newPage();
      await this.chatPage.goto('https://chat.openai.com', {
        waitUntil: 'networkidle2',
        timeout: 60000
      });
    }
    return this.chatPage;
  }

  public async close() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
      this.chatPage = null;
    }
  }
}
