import prisma from "../prisma";
import { Prisma } from "../../generated/prisma/client";
import type { EnumStatusEventoFilter } from "../../generated/prisma/commonInputTypes";

export const eventoRepository = {
  findAllEvents: async (
    page: number,
    limit: number,
    status?: EnumStatusEventoFilter,
    cidade?: string,
  ) => {
    const skip = (page - 1) * limit;

    const where = {
      ...(status && { status }),
      ...(cidade && {
        cidade: {
          contains: cidade,
          mode: Prisma.QueryMode.insensitive,
        },
      }),
    };

    const [data, total] = await Promise.all([
      prisma.evento.findMany({
        skip,
        take: limit,
        orderBy: { dataInicio: "asc" },
        where,
      }),
      prisma.evento.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
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
