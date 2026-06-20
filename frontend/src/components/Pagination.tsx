interface PaginationProps {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

export function Pagination({ page, totalPages, setPage }: PaginationProps) {
  const paginasReais = Math.max(totalPages, 1);

  return (
    <div className="flex items-center justify-center gap-3 py-8">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="text-[13px] font-semibold px-4 py-2 rounded-[8px] transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:brightness-125"
        style={{
          background: "var(--bg-raised)",
          border: "1px solid var(--border)",
          color: "var(--ink)",
        }}
      >
        ← Anterior
      </button>
      <span
        className="text-[12px] font-bold px-3 py-1 rounded-full"
        style={{
          fontFamily: "var(--font-mono)",
          color: "var(--accent-2)",
          background: "var(--accent-bg)",
        }}
      >
        {page} / {paginasReais}
      </span>
      <button
        disabled={page >= paginasReais}
        onClick={() => setPage(page + 1)}
        className="text-[13px] font-semibold px-4 py-2 rounded-[8px] transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:brightness-125"
        style={{
          background: "var(--bg-raised)",
          border: "1px solid var(--border)",
          color: "var(--ink)",
        }}
      >
        Próximo →
      </button>
    </div>
  );
}
