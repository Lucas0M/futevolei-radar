import prisma from "../prisma";
import type { Prisma } from "../../generated/prisma/client";

export const eventoRepository = {
  findAllEvents: async () => {
    return prisma.evento.findMany({
      orderBy: { dataInicio: "asc" },
    });
  },

  findEventById: async (id: string) => {
    return prisma.evento.findUnique({ where: { id } });
  },

  createEvent: async (data: Prisma.EventoCreateInput) => {
    return prisma.evento.create({ data });
  },

  updateEvent: async (id: string, data: Prisma.EventoUpdateInput) => {
    return prisma.evento.update({
      where: { id },
      data,
    });
  },

  deleteEvent: async (id: string) => {
    return prisma.evento.delete({
      where: { id },
    });
  },
};
