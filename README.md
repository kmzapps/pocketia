# PocketIA

Aplicação financeira em Next.js para acompanhar despesas, visualizar resumo mensal e evoluir para um assistente financeiro inteligente.

## Requisitos

- Node.js 20+
- npm 10+

## Configuração

1. Instala dependências:

```bash
npm install
```

2. Cria o ficheiro `.env.local` com base no exemplo:

```bash
cp .env.example .env.local
```

3. Preenche as variáveis de ambiente do Supabase em `.env.local` (obrigatório para as páginas de dados).

## Variáveis de ambiente

A aplicação usa as variáveis públicas abaixo:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Scripts

```bash
npm run dev    # ambiente de desenvolvimento
npm run lint   # validação de lint
npm run build  # build de produção
npm run start  # arranque em produção
```

## Funcionalidades atuais

- Dashboard com resumo de despesas do mês e atividade recente.
- Página de despesas com:
  - parse de texto livre (ex.: `12,50€ almoço`),
  - gravação no Supabase,
  - carregamento inicial da lista,
  - feedback visual de erro e estados vazios/carregamento.
