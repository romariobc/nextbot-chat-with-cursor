'use client'

import { useState } from 'react'
import { sendMessage, ChatMessage } from '@/services/openai'

type Message = {
  id: number;
  content: string;
  isBot: boolean;
}

type ChatProps = {
  onEndChat?: () => void;
}

export default function Chat({ onEndChat }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Olá! Como posso ajudar você hoje?",
      isBot: true
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEndChat = async () => {
    setIsLoading(true);
    
    try {
      const farewellMessage: Message = {
        id: messages.length + 1,
        content: "Obrigado por utilizar nossos serviços! Espero ter ajudado. Até a próxima! 👋",
        isBot: true
      };
      
      setMessages(prev => [...prev, farewellMessage]);
      
      // Aguarda um momento para mostrar a mensagem antes de fechar
      setTimeout(() => {
        onEndChat?.();
      }, 2000);
      
    } catch (error) {
      console.error('Erro ao finalizar chat:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const newMessage: Message = {
      id: messages.length + 1,
      content: inputMessage,
      isBot: false
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const messageHistory: ChatMessage[] = messages.map(msg => ({
        role: msg.isBot ? 'assistant' : 'user',
        content: msg.content
      }));

      messageHistory.push({
        role: 'user',
        content: inputMessage
      });

      const response = await sendMessage(messageHistory);

      const botResponse: Message = {
        id: messages.length + 2,
        content: response,
        isBot: true
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Erro ao processar mensagem:', error);
      const errorMessage: Message = {
        id: messages.length + 2,
        content: "Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente.",
        isBot: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg relative">
      {/* Botão de finalizar chat */}
      <button
        onClick={handleEndChat}
        disabled={isLoading}
        className="absolute top-4 right-4 p-2 text-gray-500 hover:text-red-500 transition-colors disabled:opacity-50"
        title="Finalizar chat"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Área de mensagens */}
      <div 
        className="h-[500px] overflow-y-auto p-6 space-y-4"
        ref={(el) => {
          if (el) {
            el.scrollTop = el.scrollHeight;
          }
        }}
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-[85%] p-4 rounded-lg ${
                message.isBot
                  ? 'bg-gray-100 dark:bg-gray-700'
                  : 'bg-blue-600 text-white'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-.3s]" />
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-.5s]" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Área de input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t dark:border-gray-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Digite sua mensagem..."
            disabled={isLoading}
            className="flex-1 p-2 rounded-lg border dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
} 