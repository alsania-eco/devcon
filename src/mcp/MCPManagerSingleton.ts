import { LocalMCPServer } from './LocalMCPServer';

export class MCPManagerSingleton {
  private static instance: MCPManagerSingleton;
  private servers: LocalMCPServer[] = [];

  private constructor() {}

  public static getInstance(): MCPManagerSingleton {
    if (!this.instance) this.instance = new MCPManagerSingleton();
    return this.instance;
  }

  public registerServer(server: LocalMCPServer) {
    this.servers.push(server);
  }

  public getServers() {
    return this.servers;
  }
}
