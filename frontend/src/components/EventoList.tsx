import type { Evento } from "../types/evento";
import { EventoCard } from "./EventoCard";

interface EventoListProps {
  eventos: Evento[];
  onEditar: (evento: Evento) => void;
  onDeletado: () => void;
}

export function EventoList({ eventos, onEditar, onDeletado }: EventoListProps) {
  if (!eventos.length) {
    return (
      <div className="text-center py-20">
        <p
          className="text-[17px] font-bold mb-1"
          style={{ color: "var(--ink)" }}
        >
          Nenhum torneio por aqui
        </p>
        <p className="text-[13px]" style={{ color: "var(--ink-faint)" }}>
          Ajuste os filtros ou cadastre um novo evento.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {eventos.map((evento) => (
        <EventoCard
          key={evento.id}
          evento={evento}
          onEditar={onEditar}
          onDeletado={onDeletado}
        />
      ))}
    </div>
  );
}
