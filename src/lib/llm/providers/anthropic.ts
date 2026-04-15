import type { LLMProvider, ChatMessage } from '../types';

interface AnthropicResponse {
  content: Array<{ text: string }>;
}

const DEFAULT_MODEL = 'claude-haiku-4-5-20251001';
const ENDPOINT = 'https://api.anthropic.com/v1/messages';

export class AnthropicProvider implements LLMProvider {
  private readonly apiKey: string;
  private readonly model: string;

  constructor() {
    const key = process.env.ANTHROPIC_API_KEY;
    if (!key) throw new Error('ANTHROPIC_API_KEY não está definida');
    this.apiKey = key;
    this.model = process.env.LLM_MODEL || DEFAULT_MODEL;
  }

  async chat(messages: ChatMessage[]): Promise<string> {
    const systemText = messages
      .filter(m => m.role === 'system')
      .map(m => m.content)
      .join('\n') || undefined;

    const filteredMessages = messages
      .filter(m => m.role !== 'system')
      .map(m => ({ role: m.role, content: m.content }));

    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: this.model,
        messages: filteredMessages,
        ...(systemText ? { system: systemText } : {}),
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`Anthropic error: ${response.status}`);
    }

    const data = await response.json() as AnthropicResponse;
    return data.content[0].text;
  }
}
