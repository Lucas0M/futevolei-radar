interface FiltersProps {
  filters: { status: string; cidade: string };
  updateFilters: (filtro: { status?: string; cidade?: string }) => void;
}

export function Filters({ filters, updateFilters }: FiltersProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <select
        value={filters.status}
        onChange={(e) => updateFilters({ status: e.target.value })}
        className="bg-[#1E3A5F] border border-blue-400/20 text-[#F5F0E8] text-sm px-3 py-2 rounded-lg outline-none focus:border-yellow-400 transition-colors min-w-[160px] cursor-pointer"
      >
        <option value="">Todos os status</option>
        <option value="AGENDADO">Agendado</option>
        <option value="EM_ANDAMENTO">Em andamento</option>
        <option value="FINALIZADO">Finalizado</option>
        <option value="CANCELADO">Cancelado</option>
      </select>

      <input
        type="text"
        placeholder="Filtrar por cidade..."
        value={filters.cidade}
        onChange={(e) => updateFilters({ cidade: e.target.value })}
        className="bg-[#1E3A5F] border border-blue-400/20 text-[#F5F0E8] text-sm px-3 py-2 rounded-lg outline-none focus:border-yellow-400 transition-colors placeholder:text-[#8A9BB5] flex-1 min-w-[180px]"
      />
    </div>
  );
}
