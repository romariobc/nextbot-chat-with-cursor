'use client'

type ActionButtonProps = {
  onStartChat: () => void;
}

export default function ActionButton({ onStartChat }: ActionButtonProps) {
  return (
    <button 
      onClick={onStartChat}
      className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-colors duration-200"
    >
      Começar Agora
    </button>
  );
} 