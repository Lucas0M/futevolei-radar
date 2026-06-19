interface PaginationProps {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

export function Pagination({ page, totalPages, setPage }: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-3 py-8">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="text-[13px] font-medium px-4 py-2 rounded-[8px] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        style={{ background: "var(--bg-sand)", color: "var(--ink)" }}
      >
        ← Anterior
      </button>

      <span
        className="text-[12px] tabular-nums"
        style={{ fontFamily: "var(--font-mono)", color: "var(--ink-soft)" }}
      >
        {page} / {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className="text-[13px] font-medium px-4 py-2 rounded-[8px] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        style={{ background: "var(--bg-sand)", color: "var(--ink)" }}
      >
        Próximo →
      </button>
    </div>
  );
}
