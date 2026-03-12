export type ChatMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

interface ChatAPIResponse {
  reply: string;
}

export async function sendMessage(messages: ChatMessage[]): Promise<string> {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json() as ChatAPIResponse;
    return data.reply;
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    throw error;
  }
}
