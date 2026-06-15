# Modelo de Dados

Esta é a primeira versão do modelo de dados. A ideia é começar com **uma entidade só** (`Evento`), pra não travar o início do projeto em modelagem excessiva — dá pra normalizar (separar `Torneio`, `Local`, `Dupla`, etc.) depois, quando a automação entrar em cena.

## Entidade: `Evento`

Representa uma etapa/jogo de um torneio de futevôlei.

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | `String` (cuid/uuid) | identificador único |
| `torneio` | `String` | nome do torneio/circuito (ex: "Circuito Brasileiro de Futevôlei") |
| `etapa` | `String?` | identificação da etapa (ex: "3ª Etapa", "Final") |
| `categoria` | `String?` | categoria/divisão (ex: "Profissional Masculino", "Sub-21") |
| `dataInicio` | `DateTime` | data/hora de início do evento |
| `dataFim` | `DateTime?` | data/hora de término (opcional, eventos podem durar dias) |
| `local` | `String?` | nome da arena/quadra/praia |
| `cidade` | `String?` | cidade |
| `estado` | `String?` | UF |
| `status` | `StatusEvento` (enum) | ver abaixo |
| `resultado` | `String?` | texto livre com resultado/placar (estruturar depois se fizer sentido) |
| `fonteUrl` | `String?` | link da fonte (post, site, etc.) — útil pra rastrear de onde veio a info |
| `observacoes` | `String?` | qualquer nota livre sua |
| `criadoEm` | `DateTime` | timestamp de criação (`@default(now())`) |
| `atualizadoEm` | `DateTime` | timestamp de atualização (`@updatedAt`) |

## Enum: `StatusEvento`

```
AGENDADO       // evento confirmado, ainda não começou
EM_ANDAMENTO   // rolando agora
FINALIZADO     // já aconteceu, resultado pode estar preenchido
CANCELADO      // cancelado/adiado
```

## Esboço do `schema.prisma`

> Apenas referência — será criado de fato na Fase 1 do roadmap.

```prisma
model Evento {
  id            String       @id @default(cuid())
  torneio       String
  etapa         String?
  categoria     String?
  dataInicio    DateTime
  dataFim       DateTime?
  local         String?
  cidade        String?
  estado        String?
  status        StatusEvento @default(AGENDADO)
  resultado     String?
  fonteUrl      String?
  observacoes   String?
  criadoEm      DateTime     @default(now())
  atualizadoEm  DateTime     @updatedAt
}

enum StatusEvento {
  AGENDADO
  EM_ANDAMENTO
  FINALIZADO
  CANCELADO
}
```

## Campos para "avisos" (Fase 3)

Quando a automação de avisos entrar (Fase 3), provavelmente vai precisar de mais um campo de controle, por exemplo:

| Campo | Tipo | Descrição |
|---|---|---|
| `avisoEnviado` | `Boolean` | marca se o aviso já foi disparado pra esse evento, evitando notificação duplicada |

Esse campo não entra agora de propósito — só some à medida que a necessidade aparece, pra não inflar o modelo antes da hora.

## Possíveis evoluções futuras (não fazer agora)

- Separar `Torneio` (1:N com `Evento`/etapas)
- Separar `Local` (endereço, coordenadas — útil se um dia tiver mapa)
- Estruturar `resultado` (placar por set, duplas, etc.) em vez de texto livre
- Entidade `Dupla`/`Atleta` se quiser acompanhar jogadores específicos
