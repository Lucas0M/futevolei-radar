import prisma from "../prisma";
import type { Prisma } from "../../generated/prisma/client";

export const eventoRepository = {
  findAllEvents: async () => {
    return prisma.evento.findMany({
      orderBy: { dataInicio: "asc" },
    });
  },

  createEvent: async (data: Prisma.EventoCreateInput) => {
    return prisma.evento.create({ data });
  },
};
