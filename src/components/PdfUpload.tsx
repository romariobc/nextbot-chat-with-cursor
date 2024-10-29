'use client'

import { useState } from 'react'

type PdfUploadProps = {
  onPdfContent: (content: string) => void;
}

export default function PdfUpload({ onPdfContent }: PdfUploadProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.includes('pdf')) {
      alert('Por favor, selecione um arquivo PDF válido');
      return;
    }

    setFileName(file.name);
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('pdf', file);

      // Aqui você enviaria o PDF para seu backend processar
      // Por enquanto, vamos simular uma resposta
      const response = await fetch('/api/pdf', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Erro ao processar o PDF');
      }

      const data = await response.json();
      onPdfContent(data.content);
    } catch (error) {
      console.error('Erro ao fazer upload do PDF:', error);
      alert('Erro ao processar o PDF. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full p-4 border-b dark:border-gray-700">
      <div className="flex items-center gap-4">
        <label className="flex-1">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileUpload}
            className="hidden"
            disabled={isLoading}
          />
          <div className="flex items-center gap-2 cursor-pointer">
            <span className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              {isLoading ? 'Processando...' : 'Upload PDF'}
            </span>
            {fileName && (
              <span className="text-sm text-gray-600 dark:text-gray-300 truncate">
                {fileName}
              </span>
            )}
          </div>
        </label>
      </div>
    </div>
  );
} 