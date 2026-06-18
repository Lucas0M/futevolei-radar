interface FilterProps {
  filters: { status: string; cidade: string };
  updateFilters: (filter: { status?: string; cidade?: string }) => void;
}

export function Filters({ filters, updateFilters }: FilterProps) {
  return (
    <div>
      <select
        value={filters.status}
        onChange={(e) => updateFilters({ status: e.target.value })}
      >
        <option value="">Todos</option>
        <option value="AGENDADO">Agendado</option>
        <option value="EM_ANDAMENTO">Em andamento</option>
        <option value="FINALIZADO">Finalizado</option>
        <option value="CANCELADO">Cancelado</option>
      </select>

      <input
        type="text"
        placeholder="Filtrar por cidade"
        value={filters.cidade}
        onChange={(e) => updateFilters({ cidade: e.target.value })}
      />
    </div>
  );
}
