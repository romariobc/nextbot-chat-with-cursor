'use client'

import { useState } from 'react'
import { sendMessage, ChatMessage } from '@/services/chat'
import ReactMarkdown from 'react-markdown'
import PDFUpload from './PDFUpload'

type Message = {
  id: string;
  content: string;
  isBot: boolean;
}

type ChatProps = {
  onEndChat?: () => void;
}

export default function Chat({ onEndChat }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: crypto.randomUUID(),
      content: "Olá! Como posso ajudar você hoje?",
      isBot: true
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pdfContext, setPdfContext] = useState<string | null>(null);
  const [attachedFileName, setAttachedFileName] = useState<string | null>(null);

  const handleEndChat = async () => {
    setIsLoading(true);
    
    try {
      const farewellMessage: Message = {
        id: crypto.randomUUID(),
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
      id: crypto.randomUUID(),
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

      if (pdfContext) {
        messageHistory.push({
          role: 'system',
          content: `Contexto do arquivo PDF "${attachedFileName}":\n\n${pdfContext.substring(0, 45000)}`
        });
      }

      messageHistory.push({
        role: 'user',
        content: inputMessage
      });

      const response = await sendMessage(messageHistory);
      
      // Limpa o contexto do PDF após o envio bem-sucedido (conforme solicitado: "apenas na mensagem atual")
      setPdfContext(null);
      setAttachedFileName(null);

      const botResponse: Message = {
        id: crypto.randomUUID(),
        content: response,
        isBot: true
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Erro ao processar mensagem:', error);
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        content: "Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente.",
        isBot: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 relative overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-white font-semibold">NextBot Assistant</h2>
            <p className="text-white/80 text-sm">Online</p>
          </div>
        </div>

        <button
          onClick={handleEndChat}
          disabled={isLoading}
          className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all disabled:opacity-50"
          title="Finalizar chat"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
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
      </div>

      {/* Área de mensagens */}
      <div
        className="h-[500px] overflow-y-auto p-6 space-y-4 bg-gray-50 dark:bg-gray-900"
        ref={(el) => {
          if (el) {
            el.scrollTop = el.scrollHeight;
          }
        }}
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} animate-fade-in`}
          >
            <div className={`flex items-end gap-2 max-w-[85%] ${message.isBot ? 'flex-row' : 'flex-row-reverse'}`}>
              {message.isBot && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              )}
              <div
                className={`p-4 rounded-2xl shadow-sm ${
                  message.isBot
                    ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-sm'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-sm'
                }`}
              >
                {message.isBot ? (
                  <div className="prose prose-sm dark:prose-invert max-w-none break-words leading-relaxed text-gray-900 dark:text-gray-100">
                    <ReactMarkdown>
                      {message.content}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <div className="whitespace-pre-wrap break-words">{message.content}</div>
                )}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start animate-fade-in">
            <div className="flex items-end gap-2 max-w-[80%]">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="p-4 rounded-2xl rounded-bl-sm bg-white dark:bg-gray-800 shadow-sm">
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-purple-600 animate-bounce [animation-delay:-.3s]" />
                  <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:-.5s]" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Área de input */}
      <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        {attachedFileName && (
          <div className="flex items-center gap-2 mb-3 bg-blue-50 dark:bg-blue-900/30 px-3 py-2 rounded-lg border border-blue-100 dark:border-blue-800 animate-fade-in text-sm text-blue-700 dark:text-blue-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            <span className="font-medium truncate max-w-[200px]">{attachedFileName}</span>
            <button 
              type="button"
              onClick={() => { setPdfContext(null); setAttachedFileName(null); }}
              className="ml-auto hover:text-blue-800 dark:hover:text-blue-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        <form onSubmit={handleSendMessage} className="flex gap-3 items-center">
          <PDFUpload 
            onLoading={setIsLoading}
            onTextExtracted={(text, name) => {
              setPdfContext(text);
              setAttachedFileName(name);
            }}
            disabled={isLoading}
          />
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={attachedFileName ? "Diga algo sobre o PDF..." : "Digite sua mensagem..."}
            disabled={isLoading}
            className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 transition-all"
          />
          <button
            type="submit"
            disabled={isLoading || !inputMessage.trim()}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg transform hover:scale-105"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
} 