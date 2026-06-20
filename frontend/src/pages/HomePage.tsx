import { useState } from "react";
import { useEventos } from "../hooks/useEventos";
import { Filters } from "../components/Filters";
import { EventoList } from "../components/EventoList";
import { Pagination } from "../components/Pagination";
import { EventoForm } from "../components/EventoForm";
import { EventoDetalhes } from "../components/EventoDetalhes";
import type { Evento } from "../types/evento";

export function HomePage() {
  const {
    eventos,
    meta,
    page,
    setPage,
    filters,
    updateFilters,
    loading,
    error,
    refetch,
  } = useEventos();
  const [eventoEditando, setEventoEditando] = useState<Evento | null>(null);
  const [eventoVisualizando, setEventoVisualizando] = useState<Evento | null>(
    null,
  );

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-10 h-10 rounded-[10px] overflow-hidden"
              style={{ boxShadow: "0 4px 16px -2px var(--accent-glow)" }}
            >
              <img
                src="/logo.png"
                alt="Futevôlei Radar"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1
                className="text-[19px] font-bold leading-none"
                style={{ color: "var(--ink)" }}
              >
                Futevôlei{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, var(--accent), var(--accent-2))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Radar
                </span>
              </h1>
              <p
                className="text-[12px] mt-1"
                style={{ color: "var(--ink-faint)" }}
              >
                Calendário de torneios
              </p>
            </div>
          </div>

          <Filters filters={filters} updateFilters={updateFilters} />
        </div>

        {loading && (
          <p
            className="text-center text-[13px] py-20"
            style={{ color: "var(--ink-faint)" }}
          >
            Carregando...
          </p>
        )}
        {error && (
          <p
            className="text-center text-[13px] py-20"
            style={{ color: "var(--st-cancelado)" }}
          >
            {error}
          </p>
        )}

        {!loading && !error && (
          <>
            <EventoList
              eventos={eventos}
              onEditar={setEventoEditando}
              onDeletado={refetch}
              onVerDetalhes={setEventoVisualizando}
            />
            <Pagination
              page={page}
              totalPages={meta?.totalPages ?? 1}
              setPage={setPage}
            />
          </>
        )}
      </div>

      {eventoEditando && (
        <div
          className="fixed inset-0 flex items-center justify-center p-4 z-50"
          style={{
            background: "rgba(5, 5, 8, 0.75)",
            backdropFilter: "blur(4px)",
          }}
        >
          <div
            className="rounded-[14px] p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            style={{
              background:
                "linear-gradient(155deg, var(--bg-raised), var(--bg-sand))",
              border: "1px solid var(--accent)",
              boxShadow: "0 8px 40px -8px var(--accent-glow)",
            }}
          >
            <div className="flex items-center justify-between mb-5">
              <h2
                className="text-[17px] font-bold"
                style={{ color: "var(--ink)" }}
              >
                Editar evento
              </h2>
              <button
                onClick={() => setEventoEditando(null)}
                className="text-[20px] leading-none"
                style={{ color: "var(--ink-faint)" }}
              >
                ×
              </button>
            </div>
            <EventoForm
              eventoParaEditar={eventoEditando}
              onSucesso={() => {
                setEventoEditando(null);
                refetch();
              }}
            />
          </div>
        </div>
      )}

      {eventoVisualizando && (
        <EventoDetalhes
          evento={eventoVisualizando}
          onClose={() => setEventoVisualizando(null)}
        />
      )}
    </div>
  );
}
