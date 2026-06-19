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
      <p className="text-center text-muted text-sm py-12 tracking-widest uppercase">
        Nenhum torneio encontrado.
      </p>
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
