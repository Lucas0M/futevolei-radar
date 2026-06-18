interface PaginationProps {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

export function Pagination({ page, totalPages, setPage }: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-4 py-6">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="bg-[#1E3A5F] border border-blue-400/20 text-[#F5F0E8] text-sm px-5 py-2 rounded-lg transition-all duration-150 hover:border-yellow-400 hover:text-yellow-400 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        ← Anterior
      </button>

      <span className="text-sm tracking-widest text-[#8A9BB5]">
        Página <strong className="text-yellow-400">{page}</strong> de{" "}
        <strong className="text-yellow-400">{totalPages}</strong>
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className="bg-[#1E3A5F] border border-blue-400/20 text-[#F5F0E8] text-sm px-5 py-2 rounded-lg transition-all duration-150 hover:border-yellow-400 hover:text-yellow-400 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Próximo →
      </button>
    </div>
  );
}
