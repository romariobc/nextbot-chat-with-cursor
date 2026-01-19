'use client'

import { useState } from "react";
import ActionButton from "@/components/ActionButton";
import Chat from "@/components/Chat";

export default function Home() {
  const [showChat, setShowChat] = useState(false);

  const handleEndChat = () => {
    setShowChat(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="max-w-5xl mx-auto px-4 py-12 sm:py-20">
        {!showChat ? (
          <main className="space-y-16">
            {/* Hero Section */}
            <div className="text-center space-y-6 animate-fade-in">
              <div className="inline-block">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-white"
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
              </div>

              <h1 className="text-5xl font-bold text-gray-900 dark:text-white sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                NextBot Chat
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Converse com inteligência artificial avançada.
                Obtenha respostas precisas, rápidas e relevantes para suas perguntas.
              </p>
            </div>

            {/* Features Section */}
            <div className="max-w-3xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-8 sm:p-10">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-blue-600 dark:text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
                        IA Avançada Powered by OpenAI
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        Utilize o poder do GPT-3.5-turbo para ter conversas naturais,
                        obter explicações detalhadas, resolver problemas e muito mais.
                        Nossa IA está sempre pronta para ajudar.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">24/7</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Disponível sempre</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">∞</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Respostas ilimitadas</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 dark:text-green-400">⚡</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Respostas rápidas</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <ActionButton onStartChat={() => setShowChat(true)} />
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                Clique para iniciar uma conversa agora
              </p>
            </div>
          </main>
        ) : (
          <Chat onEndChat={handleEndChat} />
        )}

        {/* Footer */}
        <footer className="mt-20 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© 2024 NextBot Chat. Desenvolvido com Next.js e OpenAI</p>
        </footer>
      </div>
    </div>
  );
}
