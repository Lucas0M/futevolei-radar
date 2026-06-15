# FuteVôlei Radar

> Sistema pessoal para acompanhar torneios oficiais de futevôlei e receber avisos quando houver jogos/etapas marcados.

## Motivação

Diferente do futebol, o futevôlei não tem APIs públicas de calendário/resultados (ex: API-Futebol, etc.). A ideia aqui é começar simples: um lugar pra cadastrar manualmente os torneios/etapas que você acompanha (Circuito Brasileiro de Futevôlei, etapas estaduais, etc.) e, mais pra frente, automatizar o aviso de "tem evento chegando".

## Status atual

🚧 **Fase de planejamento** — este repositório por enquanto contém só documentação. Nenhum código ainda.

Veja o [Roadmap completo](docs/ROADMAP.md) e o [Modelo de Dados](docs/DATA-MODEL.md).

## Stack escolhida

| Camada          | Tecnologia                     | Por quê                                          |
| --------------- | ------------------------------ | ------------------------------------------------ |
| Linguagem       | TypeScript                     | já é o que o dev usa no dia a dia                |
| Backend         | Node.js + Express              | simples, leve, conhecido                         |
| ORM             | Prisma                         | já é o que o dev usa                             |
| Banco de dados  | PostgreSQL (Neon)              | free tier sem instalar nada local, scale-to-zero |
| Admin (Fase 1)  | Prisma Studio                  | painel CRUD instantâneo, zero UI pra escrever    |
| Admin (Fase 2)  | React                          | UI customizada quando fizer sentido              |
| Avisos (Fase 3) | Telegram Bot API + `node-cron` | grátis, simples, sem precisar de app             |

## Estrutura planejada do projeto

Monorepo: backend e frontend convivem no mesmo repositório, em pastas separadas.

```
.
├── backend/
│   ├── prisma/
│   │   └── schema.prisma     # modelo de dados (ver docs/DATA-MODEL.md)
│   ├── src/
│   │   ├── server.ts         # entrypoint do Express
│   │   ├── routes/           # rotas da API (CRUD de eventos)
│   │   ├── jobs/              # jobs agendados (fase 3 — avisos)
│   │   └── services/          # integração com Telegram, etc.
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
├── frontend/                  # chega na Fase 2 (painel React)
├── docs/
│   ├── DATA-MODEL.md
│   └── ROADMAP.md
├── .gitignore
└── README.md
```

## Como rodar (placeholder)

> Será preenchido quando o código base existir (Fase 1 do roadmap).

```bash
# clonar o repo
git clone <url-do-repo>
cd futevolei-radar/backend

# instalar dependências
npm install

# configurar variáveis de ambiente
cp .env.example .env
# cole a connection string do Neon em DATABASE_URL

# rodar migrations
npx prisma migrate dev

# abrir o painel administrativo (Prisma Studio)
npx prisma studio

# rodar a API
npm run dev
```

## Próximos passos

1. Criar a pasta `backend/` e inicializar o projeto (Node + TS + Express + Prisma)
2. Colocar o `schema.prisma` com a entidade `Evento` (ver [DATA-MODEL.md](docs/DATA-MODEL.md))
3. Conectar no banco Neon e rodar a primeira migration
4. Validar o cadastro via Prisma Studio
5. Só então seguir pra Fase 2 (painel React em `frontend/`) e Fase 3 (bot do Telegram)
