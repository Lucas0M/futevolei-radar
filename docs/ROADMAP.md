# Roadmap

O projeto está dividido em fases. Cada fase entrega algo útil sozinha — não tem fase que só faz sentido se a próxima existir.

---

## ✅ Fase 0 — Documentação (você está aqui)

- [x] README com visão geral e stack
- [x] Modelo de dados inicial (`docs/DATA-MODEL.md`)
- [x] Este roadmap

---

## Fase 1 — Fundação: dados + admin via Prisma Studio

**Objetivo:** conseguir cadastrar e visualizar eventos de torneios de futevôlei, sem nenhuma UI customizada.

- [ ] Inicializar projeto Node + TypeScript + Express
- [ ] Configurar Prisma + conexão com PostgreSQL (local ou free tier)
- [ ] Criar `schema.prisma` com a entidade `Evento` (conforme `DATA-MODEL.md`)
- [ ] Rodar primeira migration (`prisma migrate dev`)
- [ ] Validar cadastro/edição manual via `prisma studio`
- [ ] Subir o projeto pro GitHub

**Entregável:** repositório com schema funcionando + você conseguindo cadastrar torneios manualmente pelo Prisma Studio.

---

## Fase 2 — Painel Admin em React

**Objetivo:** ter uma telinha sua, mais agradável que o Prisma Studio, pra cadastrar/editar eventos.

- [ ] Criar API REST básica no Express (rotas: listar, criar, editar, deletar evento)
- [ ] Criar frontend React simples (lista de eventos + formulário de criar/editar)
- [ ] (Opcional) autenticação simples — já que é uso pessoal, pode ser algo bem básico (senha única, por exemplo)
- [ ] Filtros básicos: próximos eventos, finalizados, por torneio

**Entregável:** painel web onde você acessa, vê os próximos torneios e cadastra novos sem precisar abrir o Prisma Studio.

---

## Fase 3 — Automação de avisos

**Objetivo:** receber uma notificação automática quando um evento cadastrado estiver chegando.

- [ ] Criar bot no Telegram (via `@BotFather`) e guardar token/chat ID
- [ ] Criar serviço de envio de mensagem (`services/telegram.ts`)
- [ ] Criar job agendado (`node-cron`) que roda, por exemplo, 1x por dia:
  - busca eventos com `dataInicio` dentro da janela definida (ex: próximas 24-48h)
  - envia aviso no Telegram
  - marca `avisoEnviado = true` pra não duplicar
- [ ] (Opcional) comando no bot pra listar próximos eventos on-demand

**Entregável:** sistema que avisa automaticamente sobre os torneios que você já cadastrou.

---

## Fase 4 — Exploratório / futuro (sem compromisso)

Ideias pra depois que o sistema básico estiver redondo — nenhuma delas é pré-requisito pra nada acima:

- Buscar fontes de dados que permitam reduzir o cadastro manual (RSS de federações, páginas que liberem scraping, etc.)
- Usar IA pra ler textos soltos (posts, notícias) e sugerir o preenchimento do formulário de evento
- Estruturar resultados/placares de forma mais rica
- Abrir o sistema pra outras pessoas acompanharem além de você
