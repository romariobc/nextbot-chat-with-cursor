import { NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rateLimit';
import { getProvider } from '@/lib/llm';
import type { ChatMessage } from '@/lib/llm';

const VALID_ROLES = new Set(['user', 'assistant', 'system']);
const MAX_MESSAGES = 50;
const MAX_CONTENT_LENGTH = 50000;

export async function POST(request: Request) {
  const rateLimit = checkRateLimit(request);
  if (rateLimit.limited) {
    return NextResponse.json(
      { error: 'Muitas requisições. Tente novamente em instantes.' },
      { status: 429, headers: { 'Retry-After': String(rateLimit.retryAfter) } }
    );
  }

  let messages: unknown;
  try {
    ({ messages } = await request.json());
  } catch {
    return NextResponse.json({ error: 'JSON inválido.' }, { status: 400 });
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: 'O campo messages deve ser um array não-vazio.' }, { status: 400 });
  }

  if (messages.length > MAX_MESSAGES) {
    return NextResponse.json({ error: `Máximo de ${MAX_MESSAGES} mensagens por requisição.` }, { status: 400 });
  }

  for (const msg of messages) {
    if (
      typeof msg !== 'object' ||
      msg === null ||
      !VALID_ROLES.has((msg as Record<string, unknown>).role as string) ||
      typeof (msg as Record<string, unknown>).content !== 'string' ||
      ((msg as Record<string, unknown>).content as string).trim().length === 0 ||
      ((msg as Record<string, unknown>).content as string).length > MAX_CONTENT_LENGTH
    ) {
      return NextResponse.json(
        { error: 'Mensagem inválida. Verifique o formato e o tamanho do conteúdo.' },
        { status: 400 }
      );
    }
  }

  try {
    const provider = getProvider();
    const reply = await provider.chat(messages as ChatMessage[]);
    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Erro ao chamar LLM provider:', error);
    return NextResponse.json({ error: 'Erro interno do servidor.' }, { status: 500 });
  }
}
