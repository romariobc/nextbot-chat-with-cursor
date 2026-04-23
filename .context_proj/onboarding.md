# Onboarding - NextBot Chat

Bem-vindo ao projeto NextBot Chat! Este guia ajudará você a configurar o ambiente e entender a arquitetura básica.

## Stack Tecnológica

- **Framework**: Next.js 15 (App Router)
- **UI**: React 19 + Tailwind CSS
- **IA**: Google Gemini API (Configurável via Provider)
- **Markdown**: React Markdown para exibição de mensagens.

## Configuração do Ambiente

1. **Instale as dependências**:
   ```bash
   npm install
   ```

2. **Variáveis de Ambiente**:
   Crie um arquivo `.env.local` na raiz baseado no `.env.example`:
   ```bash
   cp .env.example .env.local
   ```
   Configure as chaves necessárias:
   - `LLM_PROVIDER`: `gemini` (ou seu preferido)
   - `GEMINI_API_KEY`: Sua chave do Google AI Studio.

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Cria o bundle de produção.
- `npm run start`: Inicia o servidor de produção.
- `npm run lint`: Executa a verificação de linting.

## Estrutura de Pastas Principal

- `src/app/`: Rotas e páginas da aplicação.
- `src/components/`: Componentes React reutilizáveis.
- `src/lib/`: Utilitários e configurações (ex: interfaces dos providers).
- `.context_proj/`: Documentação de contexto e tarefas.
