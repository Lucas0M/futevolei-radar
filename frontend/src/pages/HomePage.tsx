import { useEventos } from "../components/useEventos";
import { EventoList } from "../hooks/EventoList";
import { Pagination } from "../hooks/Pagination";
import { Filters } from "./../hooks/Filters";

export function HomePage() {
  const {
    eventos,
    meta,
    page,
    setPage,
    filters,
    updateFitlers,
    loading,
    error,
  } = useEventos();

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Futevôlei Radar</h1>
      <Filters filters={filters} updateFilters={updateFitlers} />
      <EventoList eventos={eventos} />
      <Pagination
        page={page}
        totalPages={meta?.totalPages ?? 1}
        setPage={setPage}
      />
    </div>
  );
}
