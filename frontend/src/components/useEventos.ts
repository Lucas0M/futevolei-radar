import { useEffect, useState } from "react";
import { api } from "../services/api";
import type { Evento } from "../types/evento";
import type { Meta } from "../types/meta";

interface Filters {
  status: string;
  cidade: string;
}

export function useEventos() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<Filters>({ status: "", cidade: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventos = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await api.get("/eventos", {
          params: {
            page,
            limit: 10,
            ...(filters.status && { status: filters.status }),
            ...(filters.cidade && { cidade: filters.cidade }),
          },
        });
        setEventos(data.data);
        setMeta(data.meta);
      } catch (error) {
        setError("Error on loading events. Verify if backend is running!");
      } finally {
        setLoading(false);
      }
    };
    fetchEventos();
  }, [page, filters]);

  const updateFitlers = (newFilters: Partial<Filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setPage(1);
  };

  return {
    eventos,
    meta,
    page,
    setPage,
    filters,
    updateFitlers,
    loading,
    error,
  };
}
