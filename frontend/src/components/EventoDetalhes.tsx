import type { Evento } from "../types/evento";

const statusConfig = {
  AGENDADO: { label: "Agendado", key: "agendado" },
  EM_ANDAMENTO: { label: "Em andamento", key: "andamento" },
  FINALIZADO: { label: "Finalizado", key: "finalizado" },
  CANCELADO: { label: "Cancelado", key: "cancelado" },
} as const;

interface EventoDetalhesProps {
  evento: Evento;
  onClose: () => void;
}

function formatarData(data: string | null | undefined) {
  if (!data) return null;
  return new Date(data).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

function Campo({
  label,
  valor,
}: {
  label: string;
  valor: string | null | undefined;
}) {
  if (!valor) return null;
  return (
    <div>
      <p
        className="text-[11px] font-semibold uppercase tracking-wide mb-1"
        style={{ color: "var(--ink-faint)" }}
      >
        {label}
      </p>
      <p className="text-[14px]" style={{ color: "var(--ink)" }}>
        {valor}
      </p>
    </div>
  );
}

export function EventoDetalhes({ evento, onClose }: EventoDetalhesProps) {
  const status = statusConfig[evento.status];
  const localizacao = [evento.local, evento.cidade, evento.estado]
    .filter(Boolean)
    .join(", ");
  const dataInicio = formatarData(evento.dataInicio);
  const dataFim = formatarData(evento.dataFim);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4 z-50"
      style={{ background: "rgba(5, 5, 8, 0.75)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="rounded-[14px] p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        style={{
          background:
            "linear-gradient(155deg, var(--bg-raised), var(--bg-sand))",
          border: `1px solid var(--st-${status.key})`,
          boxShadow: `0 8px 40px -8px var(--st-${status.key}-glow)`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 mb-5">
          <div>
            <h2
              className="text-[20px] font-bold leading-tight"
              style={{ color: "var(--ink)" }}
            >
              {evento.torneio}
            </h2>
            {evento.etapa && (
              <p
                className="text-[13px] mt-1"
                style={{ color: "var(--ink-faint)" }}
              >
                {evento.etapa}
                {evento.categoria ? ` · ${evento.categoria}` : ""}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-[20px] leading-none shrink-0"
            style={{ color: "var(--ink-faint)" }}
          >
            ×
          </button>
        </div>

        <span
          className="inline-block text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full mb-5"
          style={{
            background: `var(--st-${status.key}-bg)`,
            color: `var(--st-${status.key})`,
          }}
        >
          {status.label}
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          <Campo label="Data de início" valor={dataInicio} />
          <Campo label="Data de fim" valor={dataFim} />
          <Campo label="Local" valor={localizacao || null} />
          <Campo label="Resultado" valor={evento.resultado} />
        </div>

        {evento.observacoes && (
          <div className="mb-5">
            <p
              className="text-[11px] font-semibold uppercase tracking-wide mb-1"
              style={{ color: "var(--ink-faint)" }}
            >
              Observações
            </p>
            <p
              className="text-[13px] leading-relaxed"
              style={{ color: "var(--ink-soft)" }}
            >
              {evento.observacoes}
            </p>
          </div>
        )}

        {evento.fonteUrl && (
          <a
            href={evento.fonteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-[13px] font-medium"
            style={{ color: "var(--accent-2)" }}
          >
            Ver fonte original →
          </a>
        )}
      </div>
    </div>
  );
}
