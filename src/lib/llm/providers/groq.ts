import type { LLMProvider, ChatMessage } from '../types';

interface GroqResponse {
  choices: Array<{ message: { content: string } }>;
}

const DEFAULT_MODEL = 'llama-3.3-70b-versatile';
const ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';

export class GroqProvider implements LLMProvider {
  private readonly apiKey: string;
  private readonly model: string;

  constructor() {
    const key = process.env.GROQ_API_KEY;
    if (!key) throw new Error('GROQ_API_KEY não está definida');
    this.apiKey = key;
    this.model = process.env.LLM_MODEL ?? DEFAULT_MODEL;
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
      throw new Error(`Groq error: ${response.status}`);
    }

    const data = await response.json() as GroqResponse;
    return data.choices[0].message.content;
  }
}
