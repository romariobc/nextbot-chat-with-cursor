export type ChatMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export interface LLMProvider {
  chat(messages: ChatMessage[]): Promise<string>;
}
