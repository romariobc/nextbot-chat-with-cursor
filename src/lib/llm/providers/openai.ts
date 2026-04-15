import type { LLMProvider, ChatMessage } from '../types';

interface OpenAIResponse {
  choices: Array<{ message: { content: string } }>;
}

const DEFAULT_MODEL = 'gpt-3.5-turbo';
const ENDPOINT = 'https://api.openai.com/v1/chat/completions';

export class OpenAIProvider implements LLMProvider {
  private readonly apiKey: string;
  private readonly model: string;

  constructor() {
    const key = process.env.OPENAI_API_KEY;
    if (!key) throw new Error('OPENAI_API_KEY não está definida');
    this.apiKey = key;
    this.model = process.env.LLM_MODEL || DEFAULT_MODEL;
  }

  async chat(messages: ChatMessage[]): Promise<string> {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.model,
        messages,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI error: ${response.status}`);
    }

    const data = await response.json() as OpenAIResponse;
    return data.choices[0].message.content;
  }
}
