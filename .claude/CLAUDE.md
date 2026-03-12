# NextBot Chat — Guia para Claude

## Sobre o projeto

NextBot Chat é uma aplicação de chat com IA construída com Next.js 15 (App Router) e TypeScript. Suporta múltiplos providers de LLM (OpenAI, Google Gemini, Anthropic) configuráveis via variável de ambiente. A interface é estilizada com Tailwind CSS.

## Stack

- **Framework:** Next.js 15 (App Router)
- **Linguagem:** TypeScript (strict mode)
- **Estilos:** Tailwind CSS
- **IA:** Abstração multi-provider (OpenAI, Gemini, Anthropic) — sem SDKs, apenas `fetch`
- **Runtime:** Node.js 20+

## Configuração

1. Copie `.env.example` para `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Defina o provider e a chave correspondente em `.env.local`:
   ```
   LLM_PROVIDER=openai          # openai | gemini | anthropic
   LLM_MODEL=                   # opcional — sobrescreve modelo padrão
   OPENAI_API_KEY=sk-...
   GEMINI_API_KEY=...
   ANTHROPIC_API_KEY=sk-ant-...
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
│   └── chat.ts            # Cliente fetch para /api/chat (agnóstico de provider)
└── lib/
    ├── rateLimit.ts       # Rate limiter em memória
    └── llm/
        ├── types.ts       # Interface LLMProvider + tipo ChatMessage (server-only)
        ├── index.ts       # Factory: getProvider() — lê LLM_PROVIDER e instancia
        └── providers/
            ├── openai.ts      # Implementação OpenAI
            ├── gemini.ts      # Implementação Google Gemini
            └── anthropic.ts   # Implementação Anthropic
```

## Convenções de código

- Componentes React em **PascalCase** (ex: `Chat.tsx`, `ActionButton.tsx`)
- Funções e variáveis em **camelCase**
- Arquivos de utilitários/lib em **camelCase** (ex: `rateLimit.ts`)
- Usar `'use client'` apenas quando necessário (hooks, eventos)
- Preferir Server Components por padrão no App Router

## Regras de segurança — CRÍTICO

- **NUNCA** prefixar variáveis de ambiente sensíveis com `NEXT_PUBLIC_`
- Todas as chaves de API (`OPENAI_API_KEY`, `GEMINI_API_KEY`, `ANTHROPIC_API_KEY`) devem ser acessadas **apenas** em código server-side
- `src/lib/llm/` é **server-only** — nunca importar de componentes client
- `src/services/chat.ts` é client-safe — apenas faz `fetch('/api/chat')`
- O tipo `ChatMessage` é definido nos dois lados (lib e services) para manter a separação client/server
- Toda validação de input ocorre no servidor, não no cliente
- A API `/api/chat` possui rate limiting — respeitar nos testes

## Fluxo de dados

```
Usuário digita mensagem
    → Chat.tsx (cliente) → sendMessage() em services/chat.ts
    → POST /api/chat (servidor)
    → rate limit check → validação de input
    → getProvider() seleciona provider via LLM_PROVIDER
    → provider.chat(messages) chama a API do provider com a chave correspondente
    → retorna { reply: string } ao cliente
    → Chat.tsx renderiza a resposta
```

## Como adicionar um novo provider

1. Criar `src/lib/llm/providers/seuprovider.ts` implementando `LLMProvider`
2. Adicionar `case 'seuprovider': return new SeuProvider();` no `switch` em `src/lib/llm/index.ts`
3. Adicionar `SEUPROVIDER_API_KEY` no `.env.example`

Nenhum outro arquivo precisa mudar.

## Variáveis de ambiente

| Variável | Obrigatória | Padrão | Descrição |
|---|---|---|---|
| `LLM_PROVIDER` | Não | `openai` | Qual provider usar (`openai`, `gemini`, `anthropic`) |
| `LLM_MODEL` | Não | (por provider) | Sobrescreve o modelo padrão do provider |
| `OPENAI_API_KEY` | Se `openai` | — | Chave da API OpenAI |
| `GEMINI_API_KEY` | Se `gemini` | — | Chave da API Google Gemini |
| `ANTHROPIC_API_KEY` | Se `anthropic` | — | Chave da API Anthropic |

## Boas práticas para contribuições

- Sempre rodar `npm run lint` antes de commitar
- IDs de mensagens devem ser gerados com `crypto.randomUUID()`
- Erros de API devem retornar status HTTP semânticos (400, 429, 500)
- Novos componentes client-side devem ter `'use client'` na primeira linha
- Manter o handler da rota `/api/chat` simples — lógica de negócio vai em `src/lib/`
- Providers LLM usam `fetch` direto (sem SDKs) para manter zero dependências extras
