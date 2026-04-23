'use client'

import React, { useState, useRef } from 'react';
import { extractTextFromPDF } from '@/lib/pdf';

interface PDFUploadProps {
  onTextExtracted: (text: string, fileName: string) => void;
  onLoading: (isLoading: boolean) => void;
  disabled?: boolean;
}

export default function PDFUpload({ onTextExtracted, onLoading, disabled }: PDFUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setError('Por favor, selecione um arquivo PDF.');
      return;
    }

    setError(null);
    onLoading(true);

    try {
      const text = await extractTextFromPDF(file);
      onTextExtracted(text, file.name);
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Reset input
      }
    } catch (err) {
      setError('Erro ao ler PDF. Tente outro arquivo.');
      console.error(err);
    } finally {
      onLoading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-1">
      <button
        type="button"
        onClick={triggerFileInput}
        disabled={disabled}
        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg transition-all disabled:opacity-50 group relative"
        title="Anexar PDF"
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
            d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.5l-10.94 10.94a1.5 1.5 0 11-2.122-2.122l7.693-7.693"
          />
        </svg>
        <span className="sr-only">Anexar PDF</span>
      </button>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf"
        className="hidden"
      />

      {error && (
        <div className="absolute bottom-full mb-2 left-0 bg-red-100 text-red-600 text-xs py-1 px-2 rounded shadow-lg whitespace-nowrap">
          {error}
        </div>
      )}
    </div>
  );
}
