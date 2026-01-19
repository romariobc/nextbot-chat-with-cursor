# Integração Vercel MCP com Claude Code

## O que é MCP?

**MCP (Model Context Protocol)** é um protocolo criado pela Anthropic que permite ao Claude Code se conectar a ferramentas e serviços externos, estendendo suas capacidades além de ler e escrever código.

## Configuração Instalada

Foi configurado o **Vercel MCP Server** oficial que permite:

### Funcionalidades Disponíveis

1. **Visualizar Logs de Deployment** - Ver logs em tempo real dos seus deployments
2. **Buscar Documentação** - Pesquisar na documentação oficial da Vercel
3. **Gerenciar Projetos** - Listar e consultar informações sobre seus projetos
4. **Ver Status de Deployments** - Verificar status e detalhes dos deployments

## Como Usar

### Autenticação

Na primeira vez que usar o MCP da Vercel, você precisará autenticar via OAuth. O Claude Code irá:

1. Detectar que você quer usar ferramentas da Vercel
2. Solicitar autenticação
3. Abrir um navegador para você fazer login na Vercel
4. Salvar o token de autenticação

### Exemplos de Comandos

Agora você pode pedir ao Claude Code coisas como:

```
"Mostre os logs do último deployment"
"Liste todos os meus projetos na Vercel"
"Qual o status do deployment do projeto nextbot-chat-with-cursor?"
"Busque na documentação da Vercel como configurar variáveis de ambiente"
```

## Localização da Configuração

O MCP foi configurado em: `~/.claude/settings.local.json`

```json
{
  "mcpServers": {
    "vercel": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "vercel-mcp"]
    }
  }
}
```

## Recursos Adicionais

- **MCP é Read-Only**: Por segurança, o servidor MCP da Vercel é apenas leitura, não faz alterações nos projetos
- **OAuth Seguro**: Usa autenticação OAuth oficial da Vercel
- **Sem Chaves API**: Não precisa configurar API keys manualmente

## Próximos Passos

1. **Reinicie o Claude Code** - Para que a configuração seja carregada
2. **Teste a Integração** - Peça para listar seus projetos Vercel
3. **Autentique** - Na primeira vez, faça login quando solicitado

## Troubleshooting

### MCP não está funcionando?

1. Verifique se o arquivo `~/.claude/settings.local.json` existe
2. Reinicie completamente o Claude Code
3. Tente executar: `npx -y vercel-mcp` manualmente para verificar se funciona

### Erro de autenticação?

1. Delete o token salvo (se houver)
2. Tente autenticar novamente
3. Verifique se está logado na Vercel no navegador

## Referências

- [Vercel MCP Official Docs](https://vercel.com/docs/mcp/vercel-mcp)
- [Model Context Protocol](https://vercel.com/docs/mcp)
- [Claude Code MCP Guide](https://code.claude.com/docs/en/settings)
