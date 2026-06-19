interface FiltersProps {
  filters: { status: string; cidade: string };
  updateFilters: (filtro: { status?: string; cidade?: string }) => void;
}

export function Filters({ filters, updateFilters }: FiltersProps) {
  return (
    <div className="flex flex-wrap gap-2.5">
      <select
        value={filters.status}
        onChange={(e) => updateFilters({ status: e.target.value })}
        className="text-[13px] px-3.5 py-2.5 rounded-[10px] outline-none transition-colors min-w-[150px] cursor-pointer"
        style={{
          background: "var(--bg-raised)",
          border: "1px solid var(--border)",
          color: "var(--ink)",
        }}
      >
        <option value="">Todos os status</option>
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
        className="text-[13px] px-3.5 py-2.5 rounded-[10px] outline-none transition-colors flex-1 min-w-[180px]"
        style={{
          background: "var(--bg-raised)",
          border: "1px solid var(--border)",
          color: "var(--ink)",
        }}
      />
    </div>
  );
}
