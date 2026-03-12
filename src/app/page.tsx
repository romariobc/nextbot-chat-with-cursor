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
    <div className="min-h-[100dvh] flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="flex-1 flex flex-col w-full max-w-5xl mx-auto px-4 py-6 sm:py-8 justify-between">
        {!showChat ? (
          <main className="flex-1 flex flex-col justify-center space-y-8 sm:space-y-10">
            {/* Hero Section */}
            <div className="text-center space-y-4 animate-fade-in">
              <div className="inline-block">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg flex items-center justify-center">
                  <svg
                    className="w-8 h-8 sm:w-10 sm:h-10 text-white"
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

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                NextBot Chat
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Converse com inteligência artificial avançada.
                Obtenha respostas precisas rapidamente.
              </p>
            </div>

            {/* Features Section */}
            <div className="max-w-3xl mx-auto w-full">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-5 sm:p-8">
                  <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                      <svg
                         className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400"
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
                      <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900 dark:text-white">
                        Inteligência Artificial Avançada
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                        Experimente interações naturais e fluidas. Nossa plataforma de IA está
                        pronta para fornecer explicações detalhadas e auxiliar em diversas tarefas.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 sm:gap-6 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-center">
                      <div className="text-xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">24/7</div>
                      <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">Sempre</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400">∞</div>
                      <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">Ilimitado</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl sm:text-3xl font-bold text-green-600 dark:text-green-400">⚡</div>
                      <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">Rápido</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <ActionButton onStartChat={() => setShowChat(true)} />
            </div>
          </main>
        ) : (
          <div className="flex-1 flex flex-col h-[calc(100dvh-5rem)]">
             <Chat onEndChat={handleEndChat} />
          </div>
        )}

        {/* Footer */}
        {!showChat && (
          <footer className="mt-6 text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            <p>© 2026 NextBot Chat. Seu assistente virtual inteligente.</p>
          </footer>
        )}
      </div>
    </div>
  );
}
