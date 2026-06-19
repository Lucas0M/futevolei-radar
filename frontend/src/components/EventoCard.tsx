import { useState } from "react";
import type { Evento } from "../types/evento";
import { ConfirmModal } from "./ConfirmModal";
import { api } from "../services/api";

const statusConfig = {
  AGENDADO: {
    label: "Agendado",
    classes: "bg-blue-400/10 text-blue-300 border border-blue-400/25",
  },
  EM_ANDAMENTO: {
    label: "Em andamento",
    classes: "bg-yellow-400/10 text-yellow-300 border border-yellow-400/30",
  },
  FINALIZADO: {
    label: "Finalizado",
    classes: "bg-green-400/10 text-green-400 border border-green-400/25",
  },
  CANCELADO: {
    label: "Cancelado",
    classes: "bg-red-400/10 text-red-400 border border-red-400/20",
  },
};

interface EventoCardProps {
  evento: Evento;
  onEditar: (evento: Evento) => void;
  onDeletado: () => void;
}

export function EventoCard({ evento, onEditar, onDeletado }: EventoCardProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const badge = statusConfig[evento.status];
  const localizacao =
    [evento.cidade, evento.estado].filter(Boolean).join(", ") || "—";
  const dataFormatada = new Date(evento.dataInicio).toLocaleDateString("pt-BR");
  const isAdmin = sessionStorage.getItem("admin") === "ok";

  const handleDeletar = async (id: string) => {
    try {
      await api.delete(`/eventos/${id}`);
      setShowConfirm(false);
      onDeletado();
    } catch (error) {
      alert("Erro ao deletar o evento. Tente novamente.");
    }
  };

  return (
    <div className="relative bg-[#1E3A5F] border border-blue-400/10 rounded-xl p-4 overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:border-yellow-400/35 group">
      <div className="absolute top-0 right-0 w-0 h-0 border-solid border-t-32 border-r-32 border-t-transparent border-r-yellow-400/20" />
      <div className="absolute left-0 top-0 w-0.75 h-full bg-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-l-xl" />

      <h2 className="font-bold text-[17px] text-[#F5F0E8] leading-tight mb-1 tracking-wide">
        {evento.torneio}
      </h2>

      <p className="text-[11px] text-yellow-400 uppercase tracking-widest mb-3">
        {evento.etapa ?? "—"}
      </p>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2 text-[12px]">
          <span>📍</span>
          <span className="text-[#B8B0A0]">{localizacao}</span>
        </div>
        <div className="flex items-center gap-2 text-[12px]">
          <span>📅</span>
          <span className="text-[#B8B0A0]">{dataFormatada}</span>
        </div>
      </div>

      <span
        className={`inline-block mt-3 text-[10px] font-medium uppercase tracking-widest px-3 py-1 rounded-full ${badge.classes}`}
      >
        {badge.label}
      </span>

      {isAdmin && (
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => onEditar(evento)}
            className="flex-1 text-xs bg-blue-400/10 hover:bg-blue-400/20 text-blue-300 border border-blue-400/25 py-1.5 rounded-lg transition-colors"
          >
            Editar
          </button>
          <button
            onClick={() => setShowConfirm(true)}
            className="flex-1 text-xs bg-red-400/10 hover:bg-red-400/20 text-red-400 border border-red-400/20 py-1.5 rounded-lg transition-colors"
          >
            Deletar
          </button>
        </div>
      )}

      {showConfirm && (
        <ConfirmModal
          mensagem={`Deletar "${evento.torneio}"?`}
          onConfirm={() => handleDeletar(evento.id)}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}
