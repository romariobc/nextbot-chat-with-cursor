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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24">
        {!showChat ? (
          <main className="space-y-12">
            {/* Cabeçalho */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
                NextBot Chat
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Uma experiência de chat inteligente e minimalista
              </p>
            </div>

            {/* Cards de Recursos */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mt-12">
              <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                  Chat Inteligente
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Interaja com nossa IA avançada para obter respostas precisas e relevantes
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                  Respostas Rápidas
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Obtenha respostas instantâneas para suas perguntas em tempo real
                </p>
              </div>
            </div>

            {/* Botão de Ação */}
            <div className="text-center mt-12">
              <ActionButton onStartChat={() => setShowChat(true)} />
            </div>
          </main>
        ) : (
          <Chat onEndChat={handleEndChat} />
        )}

        {/* Footer */}
        <footer className="mt-24 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© 2024 NextBot Chat. Todos os direitos reservados.</p>
        </footer>
      </div>
    </div>
  );
}
