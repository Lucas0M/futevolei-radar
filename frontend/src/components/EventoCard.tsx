import { useState } from "react";
import type { Evento } from "../types/evento";
import { ConfirmModal } from "./ConfirmModal";
import { api } from "../services/api";

const statusConfig = {
  AGENDADO: { label: "Agendado", key: "agendado" },
  EM_ANDAMENTO: { label: "Em andamento", key: "andamento" },
  FINALIZADO: { label: "Finalizado", key: "finalizado" },
  CANCELADO: { label: "Cancelado", key: "cancelado" },
} as const;

interface EventoCardProps {
  evento: Evento;
  onEditar: (evento: Evento) => void;
  onDeletado: () => void;
}

export function EventoCard({ evento, onEditar, onDeletado }: EventoCardProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [hover, setHover] = useState(false);
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
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative rounded-[14px] p-5 transition-all duration-300"
      style={{
        background: "linear-gradient(155deg, var(--bg-raised), var(--bg-sand))",
        border: `1px solid ${hover ? `var(--st-${status.key})` : "var(--border)"}`,
        boxShadow: hover
          ? `0 8px 30px -8px var(--st-${status.key}-glow)`
          : "none",
        transform: hover ? "translateY(-3px)" : "none",
      }}
    >
      {/* glow line no topo, cor do status */}
      <div
        className="absolute top-0 left-5 right-5 h-[2px] rounded-full transition-opacity duration-300"
        style={{
          background: `var(--st-${status.key})`,
          opacity: hover ? 1 : 0.5,
          boxShadow: `0 0 12px var(--st-${status.key}-glow)`,
        }}
      />

      <div className="flex items-start justify-between gap-3 mb-3 pt-1">
        <div className="min-w-0">
          <h2
            className="text-[16px] font-semibold leading-tight truncate"
            style={{ color: "var(--ink)" }}
          >
            {evento.torneio}
          </h2>
          {evento.etapa && (
            <p
              className="text-[12px] mt-0.5"
              style={{ color: "var(--ink-faint)" }}
            >
              {evento.etapa}
              {evento.categoria ? ` · ${evento.categoria}` : ""}
            </p>
          )}
        </div>

        <span
          className="shrink-0 text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full"
          style={{
            background: `var(--st-${status.key}-bg)`,
            color: `var(--st-${status.key})`,
          }}
        >
          {status.label}
        </span>
      </div>

      <div
        className="flex items-center gap-3 text-[12px]"
        style={{ color: "var(--ink-soft)" }}
      >
        <span
          className="font-medium"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ink)" }}
        >
          {dataFormatada}
        </span>
        {localizacao && (
          <>
            <span style={{ color: "var(--border-strong)" }}>·</span>
            <span>{localizacao}</span>
          </>
        )}
      </div>

      {isAdmin && (
        <div
          className="flex gap-2 mt-4 pt-3"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <button
            onClick={() => onEditar(evento)}
            className="flex-1 text-[12px] font-semibold py-2 rounded-[8px] transition-all hover:brightness-125"
            style={{ color: "var(--accent-2)", background: "var(--accent-bg)" }}
          >
            Editar
          </button>
          <button
            onClick={() => setShowConfirm(true)}
            className="flex-1 text-[12px] font-semibold py-2 rounded-[8px] transition-all hover:brightness-125"
            style={{
              color: "var(--st-cancelado)",
              background: "var(--st-cancelado-bg)",
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
