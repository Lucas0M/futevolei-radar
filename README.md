# FuteVôlei Radar

> Sistema pessoal para acompanhar torneios oficiais de futevôlei e receber avisos quando houver jogos/etapas marcados.

## Motivação

Diferente do futebol, o futevôlei não tem APIs públicas de calendário/resultados (ex: API-Futebol, etc.). A ideia aqui é começar simples: um lugar pra cadastrar manualmente os torneios/etapas que você acompanha (Circuito Brasileiro de Futevôlei, etapas estaduais, etc.) e, mais pra frente, automatizar o aviso de "tem evento chegando".

## Status atual

✅ **Fase 1 concluída** — backend rodando, conectado ao Postgres (Neon) via Prisma, com cadastro/edição validados.

🚧 **Fase 2 em andamento** — API REST de eventos:
- `GET /eventos` — lista todos os eventos
- `POST /eventos` — cria um novo evento

Próximo: rotas de editar/deletar evento, depois painel admin em React.

Veja o [Roadmap completo](docs/ROADMAP.md) e o [Modelo de Dados](docs/DATA-MODEL.md).

## Stack escolhida

| Camada | Tecnologia | Por quê |
|---|---|---|
| Linguagem | TypeScript | já é o que o dev usa no dia a dia |
| Backend | Node.js + Express | simples, leve, conhecido |
| ORM | Prisma | já é o que o dev usa |
| Banco de dados | PostgreSQL (Neon) | free tier sem instalar nada local, scale-to-zero |
| Admin (Fase 1) | Prisma Studio | painel CRUD instantâneo, zero UI pra escrever |
| Admin (Fase 2) | React | UI customizada quando fizer sentido |
| Avisos (Fase 3) | Telegram Bot API + `node-cron` | grátis, simples, sem precisar de app |

## Estrutura do projeto

Monorepo: backend e frontend convivem no mesmo repositório, em pastas separadas.

```
.
├── backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma      # modelo de dados (ver docs/DATA-MODEL.md)
│   ├── generated/prisma/       # client do Prisma gerado
│   ├── src/
│   │   ├── app.ts              # configuração do Express (rotas, middlewares)
│   │   ├── server.ts           # entrypoint — sobe o servidor
│   │   ├── prisma.ts           # instância singleton do Prisma Client
│   │   ├── repositories/       # acesso ao banco (ex: eventoRepository.ts)
│   │   └── routes/             # rotas da API (ex: eventos.ts)
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

## Como rodar

```bash
# clonar o repo
git clone https://github.com/Lucas0M/futevolei-radar.git
cd futevolei-radar/backend

# instalar dependências
npm install

# configurar variáveis de ambiente
cp .env.example .env
# cole a connection string do Neon em DATABASE_URL

# rodar migrations
npx prisma migrate dev

# (opcional) abrir o painel administrativo do banco
npx prisma studio

# rodar a API em modo dev
npm run dev
```

A API sobe em `http://localhost:3000`.

## Próximos passos

1. Criar a pasta `backend/` e inicializar o projeto (Node + TS + Express + Prisma)
2. Colocar o `schema.prisma` com a entidade `Evento` (ver [DATA-MODEL.md](docs/DATA-MODEL.md))
3. Conectar no banco Neon e rodar a primeira migration
4. Validar o cadastro via Prisma Studio
5. Só então seguir pra Fase 2 (painel React em `frontend/`) e Fase 3 (bot do Telegram)
