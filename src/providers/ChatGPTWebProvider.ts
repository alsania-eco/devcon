import { LLMProvider } from './LLMProvider';
import { LLMBridgeService } from '../bridge/LLMBridgeService';

export class ChatGPTWebProvider implements LLMProvider {
  async query(prompt: string): Promise<string> {
    return await LLMBridgeService.getInstance().queryChatGPT(prompt);
  }
}
