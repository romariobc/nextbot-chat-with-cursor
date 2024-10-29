import { searchGoogle } from './serper';
import { API_URL, OPENAI_API_KEY } from '@/config/api';

export type ChatMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export async function sendMessage(messages: ChatMessage[]) {
  try {
    // Extrai a última mensagem do usuário
    const lastUserMessage = messages[messages.length - 1].content;

    // Faz a busca no Google
    let searchContext = '';
    try {
      const searchResults = await searchGoogle(lastUserMessage);
      if (searchResults.organic) {
        searchContext = searchResults.organic
          .map((result: any) => `${result.title}: ${result.snippet}`)
          .join('\n\n');
      }
    } catch (error) {
      console.error('Erro na busca do Google:', error);
      // Continua mesmo se a busca falhar
    }

    // Adiciona o contexto da busca como uma mensagem do sistema
    if (searchContext) {
      messages = [
        {
          role: 'system',
          content: `Contexto da web:\n${searchContext}\n\nUse estas informações quando relevante para responder.`
        },
        ...messages
      ];
    }

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    throw error;
  }
} 