export interface Evento {
  id: string;
  torneio: string;
  etapa: string | null;
  categoria: string | null;
  dataInicio: Date;
  dataFim: Date | null;
  local: string | null;
  cidade: string | null;
  estado: string | null;
  status: "AGENDADO" | "EM_ANDAMENTO" | "FINALIZADO" | "CANCELADO";
  resultado: string | null;
  fonteUrl: string | null;
  observacoes: string | null;
  criadoEm: Date;
  atualizadoEm: Date;
}
