import { useState } from "react";
import type { Evento } from "../types/evento";
import { ConfirmModal } from "./ConfirmModal";
import { api } from "../services/api";

const statusConfig = {
  AGENDADO: { label: "Agendado", var: "laranja" },
  EM_ANDAMENTO: { label: "Em andamento", var: "verde" },
  FINALIZADO: { label: "Finalizado", var: "azul" },
  CANCELADO: { label: "Cancelado", var: "vermelho" },
} as const;

interface EventoCardProps {
  evento: Evento;
  onEditar: (evento: Evento) => void;
  onDeletado: () => void;
}

export function EventoCard({ evento, onEditar, onDeletado }: EventoCardProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const status = statusConfig[evento.status];
  const localizacao = [evento.cidade, evento.estado].filter(Boolean).join(", ");
  const dataFormatada = new Date(evento.dataInicio).toLocaleDateString(
    "pt-BR",
    {
      day: "2-digit",
      month: "short",
    },
  );
  const isAdmin = sessionStorage.getItem("admin") === "ok";

  const handleDeletar = async () => {
    try {
      await api.delete(`/eventos/${evento.id}`);
      setShowConfirm(false);
      onDeletado();
    } catch {
      alert("Erro ao deletar evento.");
    }
  };

  return (
    <div
      className="group relative border rounded-[14px] p-5 transition-all duration-200 hover:-translate-y-[2px]"
      style={{ borderColor: "var(--border)", background: "var(--bg-raised)" }}
    >
      {/* linha de saque — assinatura visual, referência à quadra */}
      <div
        className="absolute top-0 left-5 right-5 h-px"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right, var(--border-strong) 0, var(--border-strong) 4px, transparent 4px, transparent 9px)",
        }}
      />

      <div className="flex items-start justify-between gap-3 mb-3 pt-2">
        <div className="min-w-0">
          <h2
            className="text-[19px] leading-tight truncate"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--ink)",
              fontWeight: 600,
            }}
          >
            {evento.torneio}
          </h2>
          {evento.etapa && (
            <p
              className="text-[12px] mt-0.5"
              style={{ color: "var(--ink-soft)" }}
            >
              {evento.etapa}
              {evento.categoria ? ` · ${evento.categoria}` : ""}
            </p>
          )}
        </div>

        <span
          className="shrink-0 text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full"
          style={{
            background: `var(--${status.var}-bg)`,
            color: `var(--${status.var}-ink)`,
          }}
        >
          {status.label}
        </span>
      </div>

      <div className="flex items-center gap-4 mb-1">
        <span
          className="text-[13px] tabular-nums"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ink)" }}
        >
          {dataFormatada}
        </span>
        {localizacao && (
          <span className="text-[13px]" style={{ color: "var(--ink-soft)" }}>
            {localizacao}
          </span>
        )}
      </div>

      {isAdmin && (
        <div
          className="flex gap-2 mt-4 pt-3 border-t"
          style={{ borderColor: "var(--border)" }}
        >
          <button
            onClick={() => onEditar(evento)}
            className="flex-1 text-[12px] font-medium py-1.5 rounded-[8px] transition-colors"
            style={{ color: "var(--ink-soft)", background: "var(--bg-sand)" }}
          >
            Editar
          </button>
          <button
            onClick={() => setShowConfirm(true)}
            className="flex-1 text-[12px] font-medium py-1.5 rounded-[8px] transition-colors"
            style={{
              color: "var(--vermelho-ink)",
              background: "var(--vermelho-bg)",
            }}
          >
            Deletar
          </button>
        </div>
      )}

      {showConfirm && (
        <ConfirmModal
          mensagem={`Deletar "${evento.torneio}"?`}
          onConfirm={handleDeletar}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}
