export class SessionManager {
  private static instance: SessionManager;
  private conversationHistory: Array<{role: string, content: string}> = [];
  private constructor() {}
  public static getInstance(): SessionManager {
    if (!(SessionManager as any).instance) (SessionManager as any).instance = new SessionManager();
    return (SessionManager as any).instance;
  }
  public addToHistory(role: string, content: string) {
    this.conversationHistory.push({role, content});
    if (this.conversationHistory.length > 10) this.conversationHistory.shift();
  }
  public getHistory() { return [...this.conversationHistory]; }
  public clearHistory() { this.conversationHistory = []; }
}
