import type { LLMProvider, ChatMessage } from '../types';

interface GeminiPart { text: string }
interface GeminiContent { role: 'user' | 'model'; parts: GeminiPart[] }
interface GeminiResponse {
  candidates: Array<{ content: { parts: GeminiPart[] } }>;
}

const DEFAULT_MODEL = 'gemini-2.5-flash';
const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

export class GeminiProvider implements LLMProvider {
  private readonly apiKey: string;
  private readonly model: string;

  constructor() {
    const key = process.env.GEMINI_API_KEY;
    if (!key) throw new Error('GEMINI_API_KEY não está definida');
    this.apiKey = key;
    this.model = process.env.LLM_MODEL || DEFAULT_MODEL;
  }

  async chat(messages: ChatMessage[]): Promise<string> {
    const systemMessages = messages.filter(m => m.role === 'system');
    const conversationMessages = messages.filter(m => m.role !== 'system');

    const contents: GeminiContent[] = conversationMessages.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const systemInstruction = systemMessages.length > 0
      ? { parts: [{ text: systemMessages.map(m => m.content).join('\n') }] }
      : undefined;

    const url = `${BASE_URL}/${this.model}:generateContent?key=${this.apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        ...(systemInstruction ? { systemInstruction } : {}),
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 8192,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("GEMINI API ERROR: ", errorText);
      throw new Error(`Gemini error: ${response.status} - ${errorText}`);
    }

    const data = await response.json() as GeminiResponse;
    return data.candidates[0].content.parts[0].text;
  }
}
