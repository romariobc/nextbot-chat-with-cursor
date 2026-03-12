# NextBot Chat — Guia para Claude

## Sobre o projeto

NextBot Chat é uma aplicação de chat com IA construída com Next.js 15 (App Router) e TypeScript. Usa OpenAI GPT-3.5-turbo como modelo de linguagem. A interface é estilizada com Tailwind CSS.

## Stack

- **Framework:** Next.js 15 (App Router)
- **Linguagem:** TypeScript (strict mode)
- **Estilos:** Tailwind CSS
- **IA:** OpenAI API (GPT-3.5-turbo)
- **Runtime:** Node.js 20+

## Configuração

1. Copie `.env.example` para `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Adicione sua chave da OpenAI em `.env.local`:
   ```
   OPENAI_API_KEY=sk-...
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```

## Comandos

```bash
npm run dev      # Servidor de desenvolvimento (Turbopack)
npm run build    # Build de produção
npm run start    # Servidor de produção
npm run lint     # Lint com ESLint
```

## Arquitetura de pastas

```
src/
├── app/
│   ├── page.tsx           # Página inicial (landing + chat toggle)
│   ├── layout.tsx         # Layout raiz (metadata, fontes)
│   ├── globals.css        # Estilos globais
│   └── api/
│       └── chat/route.ts  # Endpoint POST /api/chat (server-side)
├── components/
│   ├── Chat.tsx           # Componente principal do chat
│   └── ActionButton.tsx   # Botão de CTA da landing page
├── services/
│   └── openai.ts          # Cliente fetch para /api/chat
└── lib/
    └── rateLimit.ts       # Rate limiter em memória
```

## Convenções de código

- Componentes React em **PascalCase** (ex: `Chat.tsx`, `ActionButton.tsx`)
- Funções e variáveis em **camelCase**
- Arquivos de utilitários/lib em **camelCase** (ex: `rateLimit.ts`)
- Usar `'use client'` apenas quando necessário (hooks, eventos)
- Preferir Server Components por padrão no App Router

## Regras de segurança — CRÍTICO

- **NUNCA** prefixar variáveis de ambiente sensíveis com `NEXT_PUBLIC_`
- A chave `OPENAI_API_KEY` deve ser acessada **apenas** em código server-side (`/api/` routes)
- Toda validação de input deve ocorrer no servidor, não no cliente
- A API `/api/chat` possui rate limiting — respeitar nos testes

## Fluxo de dados

```
Usuário digita mensagem
    → Chat.tsx (cliente) → sendMessage() em services/openai.ts
    → POST /api/chat (servidor)
    → rate limit check → validação de input
    → fetch OpenAI API com OPENAI_API_KEY
    → retorna resposta ao cliente
    → Chat.tsx renderiza a resposta
```

## Boas práticas para contribuições

- Sempre rodar `npm run lint` antes de commitar
- IDs de mensagens devem ser gerados com `crypto.randomUUID()`
- Erros de API devem retornar status HTTP semânticos (400, 429, 500)
- Novos componentes client-side devem ter `'use client'` na primeira linha
- Manter o handler da rota `/api/chat` simples — lógica de negócio vai em `src/lib/`
