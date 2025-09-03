import { LocalMCPServer } from '../mcp/LocalMCPServer';
import { registerCodeTools } from './CodeTools';
import { registerChatTools } from './ChatTools';
import { registerLiveCodingTools } from './LiveCodingTool';
import { registerCodeReviewTools } from './CodeReviewTool';
import { registerDocumentationTools } from './DocumentationTool';
import { registerTestGenerationTools } from './TestGenerationTool';
import { registerDebuggingTools } from './DebuggingTool';
import { registerTranslationTools } from './TranslationTool';
import { registerPerformanceTools } from './PerformanceTool';
import { registerSecurityTools } from './SecurityTool';
import { registerArchitectureTools } from './ArchitectureTool';
import { registerLearningTools } from './LearningTool';

export function registerDefaultTools(mcpServer: LocalMCPServer) {
  registerCodeTools(mcpServer);
  registerChatTools(mcpServer);
  registerLiveCodingTools(mcpServer);
  registerCodeReviewTools(mcpServer);
  registerDocumentationTools(mcpServer);
  registerTestGenerationTools(mcpServer);
  registerDebuggingTools(mcpServer);
  registerTranslationTools(mcpServer);
  registerPerformanceTools(mcpServer);
  registerSecurityTools(mcpServer);
  registerArchitectureTools(mcpServer);
  registerLearningTools(mcpServer);
}
