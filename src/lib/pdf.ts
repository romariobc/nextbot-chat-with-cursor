import * as pdfjs from 'pdfjs-dist';

// Configurar o worker do PDF.js
// Em Next.js, é comum usar o worker da rede ou copiar para a pasta public.
// Para simplicidade inicial, usaremos o worker do unpkg.
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export async function extractTextFromPDF(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
  
  try {
    const pdf = await loadingTask.promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item) => ('str' in item ? item.str : ''))
        .join(' ');
      fullText += pageText + '\n';
    }

    return fullText.trim();
  } catch (error) {
    console.error('Erro ao extrair texto do PDF:', error);
    throw new Error('Falha ao ler o arquivo PDF. Verifique se o arquivo está íntegro.');
  }
}
