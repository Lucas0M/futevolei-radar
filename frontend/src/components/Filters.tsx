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
        className="text-[13px] font-medium px-3.5 py-2.5 rounded-[10px] outline-none transition-all min-w-[160px] cursor-pointer focus:border-[var(--accent)]"
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
        className="text-[13px] px-3.5 py-2.5 rounded-[10px] outline-none transition-all flex-1 min-w-[180px] focus:border-[var(--accent)]"
        style={{
          background: "var(--bg-raised)",
          border: "1px solid var(--border)",
          color: "var(--ink)",
        }}
      />
    </div>
  );
}
