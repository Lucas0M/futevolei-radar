import type { Evento } from "../types/evento";
import { EventoCard } from "./EventoCard";

interface EventoListProps {
  eventos: Evento[];
}

export function EventoList({ eventos }: EventoListProps) {
  return (
    <div>
      {eventos.map((evento) => (
        <EventoCard key={evento.id} evento={evento} />
      ))}
    </div>
  );
}
