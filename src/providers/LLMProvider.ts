export interface LLMProvider {
  query(prompt: string): Promise<string>;
}
