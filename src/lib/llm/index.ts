import type { LLMProvider } from './types';
import { OpenAIProvider } from './providers/openai';
import { GeminiProvider } from './providers/gemini';
import { AnthropicProvider } from './providers/anthropic';
import { GroqProvider } from './providers/groq';

export type { ChatMessage } from './types';
export type { LLMProvider };

export function getProvider(): LLMProvider {
  const name = (process.env.LLM_PROVIDER ?? 'openai').toLowerCase();

  switch (name) {
    case 'openai':    return new OpenAIProvider();
    case 'gemini':    return new GeminiProvider();
    case 'anthropic': return new AnthropicProvider();
    case 'groq':      return new GroqProvider();
    default:
      throw new Error(
        `LLM_PROVIDER inválido: "${name}". Valores válidos: openai, gemini, anthropic, groq`
      );
  }
}
