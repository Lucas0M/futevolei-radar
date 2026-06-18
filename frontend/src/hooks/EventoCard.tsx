import type { Evento } from "./../types/evento";

export function EventoCard({ evento }: { evento: Evento }) {
  return (
    <div>
      <h2>{evento.torneio}</h2>
      <p>{evento.etapa ?? "-"}</p>
      <p>
        {evento.cidade} {evento.estado}
      </p>
      <p>{new Date(evento.dataInicio).toLocaleDateString("pt-BR")}</p>
      <p>{evento.status}</p>
    </div>
  );
}
