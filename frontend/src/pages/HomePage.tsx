import { useState } from "react";
import { useEventos } from "../hooks/useEventos";
import { Filters } from "../components/Filters";
import { EventoList } from "../components/EventoList";
import { Pagination } from "../components/Pagination";
import { EventoForm } from "../components/EventoForm";
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

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-end gap-3 mb-6">
            <svg width="34" height="34" viewBox="0 0 40 40" fill="none">
              <line
                x1="4"
                y1="20"
                x2="36"
                y2="20"
                stroke="var(--laranja)"
                strokeWidth="2.5"
              />
              <circle
                cx="14"
                cy="13"
                r="5"
                stroke="var(--verde)"
                strokeWidth="2"
              />
              <line
                x1="14"
                y1="18"
                x2="20"
                y2="20"
                stroke="var(--verde)"
                strokeWidth="1.5"
              />
              <line
                x1="20"
                y1="20"
                x2="26"
                y2="13"
                stroke="var(--ink)"
                strokeWidth="1.5"
                strokeDasharray="2 2"
              />
            </svg>
            <div>
              <h1
                className="text-[30px] leading-none"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--ink)",
                  fontWeight: 600,
                }}
              >
                Futevôlei <span style={{ color: "var(--laranja)" }}>Radar</span>
              </h1>
              <p
                className="text-[12px] mt-1.5"
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
            style={{ color: "var(--vermelho)" }}
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
          style={{ background: "rgba(26, 20, 16, 0.45)" }}
        >
          <div
            className="rounded-[14px] p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            style={{
              background: "var(--bg)",
              border: "1px solid var(--border)",
            }}
          >
            <div className="flex items-center justify-between mb-5">
              <h2
                className="text-[18px]"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--ink)",
                  fontWeight: 600,
                }}
              >
                Editar evento
              </h2>
              <button
                onClick={() => setEventoEditando(null)}
                className="text-[20px] leading-none transition-colors"
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
    </div>
  );
}
