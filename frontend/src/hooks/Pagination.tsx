interface PaginationProps {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

export function Pagination({ page, totalPages, setPage }: PaginationProps) {
  return (
    <div>
      <button disabled={page === 1} onClick={() => setPage(page - 1)}>
        Anterior
      </button>

      <h2>
        Pagina: {page} de {totalPages}
      </h2>

      <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
        Proximo
      </button>
    </div>
  );
}
