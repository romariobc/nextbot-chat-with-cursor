export async function searchGoogle(query: string) {
  try {
    const response = await fetch('https://google.serper.dev/search', {
      method: 'POST',
      headers: {
        'X-API-KEY': process.env.NEXT_PUBLIC_SERPER_API_KEY || '',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        q: query,
        num: 3 // Número de resultados que queremos
      })
    });

    if (!response.ok) {
      throw new Error('Erro na busca');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar no Google:', error);
    throw error;
  }
} 