export interface MCPTool {
  name: string;
  description: string;
  inputSchema: any;
}

export interface MCPServer {
  start(): Promise<void>;
  stop(): Promise<void>;
  addTool(tool: MCPTool, handler: (params: any) => Promise<any>): void;
  callTool(name: string, params: any): Promise<any>;
}
