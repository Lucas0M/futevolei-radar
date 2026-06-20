import prisma from "../prisma";
import type { Evento } from "../types/evento";

export async function buscarTorneioProximoFimDeSemana(): Promise<Evento | null> {
  const hoje = new Date();
  const diaSemana = hoje.getUTCDay();

  const diasAteSabado = (6 - diaSemana + 7) % 7;

  // monta as datas já em UTC, sem depender do fuso da máquina
  const proximoSabado = new Date(
    Date.UTC(
      hoje.getUTCFullYear(),
      hoje.getUTCMonth(),
      hoje.getUTCDate() + diasAteSabado,
      0,
      0,
      0,
      0,
    ),
  );

  const proximoDomingo = new Date(
    Date.UTC(
      proximoSabado.getUTCFullYear(),
      proximoSabado.getUTCMonth(),
      proximoSabado.getUTCDate() + 1,
      23,
      59,
      59,
      999,
    ),
  );

  return await prisma.evento.findFirst({
    where: {
      status: "AGENDADO",
      dataInicio: {
        gte: proximoSabado,
        lte: proximoDomingo,
      },
    },
    orderBy: {
      dataInicio: "asc",
    },
  });
}
