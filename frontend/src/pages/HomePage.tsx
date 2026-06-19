import { useEventos } from "../hooks/useEventos";
import { Filters } from "../components/Filters";
import { EventoList } from "../components/EventoList";
import { Pagination } from "../components/Pagination";
import type { Evento } from "../types/evento";
import { useState } from "react";
import { EventoForm } from "../components/EventoForm";

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
    <div className="min-h-screen bg-[#0A1628] text-[#F5F0E8]">
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8 pb-6 border-b border-blue-400/15">
          <div className="flex items-end gap-3 mb-5">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <line
                x1="4"
                y1="20"
                x2="36"
                y2="20"
                stroke="#E8C547"
                strokeWidth="2.5"
              />
              <circle cx="14" cy="13" r="5" stroke="#64B5F6" strokeWidth="2" />
              <line
                x1="14"
                y1="18"
                x2="20"
                y2="20"
                stroke="#64B5F6"
                strokeWidth="1.5"
              />
              <line
                x1="20"
                y1="20"
                x2="26"
                y2="13"
                stroke="#F5F0E8"
                strokeWidth="1.5"
                strokeDasharray="2 2"
              />
            </svg>
            <div>
              <h1 className="text-3xl font-bold tracking-wide leading-none">
                Futevôlei <span className="text-yellow-400">Radar</span>
              </h1>
              <p className="text-[11px] text-[#8A9BB5] uppercase tracking-[3px] mt-1">
                Calendário de torneios
              </p>
            </div>
          </div>

          <Filters filters={filters} updateFilters={updateFilters} />
        </div>

        {loading && (
          <p className="text-center text-[#8A9BB5] text-xs uppercase tracking-widest py-16">
            Carregando...
          </p>
        )}

        {error && (
          <p className="text-center text-red-400 text-sm py-16">{error}</p>
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
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-[#0A1628] border border-blue-400/20 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[#F5F0E8]">
                Editar evento
              </h2>
              <button
                onClick={() => setEventoEditando(null)}
                className="text-[#8A9BB5] hover:text-[#F5F0E8]"
              >
                ✕
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
