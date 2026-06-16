import z from "zod";

export const createEventoSchema = z.object({
  toenio: z.string(),
  etapa: z.string().optional(),
  categoria: z.string().optional(),
  dataInicio: z.coerce.date(),
  dataFim: z.coerce.date().optional(),
  local: z.string().optional(),
  cidade: z.string().optional(),
  estado: z.string().optional(),
  status: z.enum(["AGENDADO", "EM_ANDAMENTO", "FINALIZADO", "CANCELADO"]),
  resultado: z.string().optional(),
  fonteUrl: z.string().optional(),
  observacoes: z.string().optional(),
});

export const updateEventoSchema = createEventoSchema.partial();
