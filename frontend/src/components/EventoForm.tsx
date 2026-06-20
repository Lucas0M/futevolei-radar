import { useState } from "react";
import { api } from "../services/api";
import type { Evento } from "../types/evento";

type Feedback = "sucesso" | "erro" | null;

interface EventoFormProps {
  eventoParaEditar?: Evento;
  onSucesso?: () => void;
}

const inputStyle = {
  background: "var(--bg-sand)",
  border: "1px solid var(--border)",
  color: "var(--ink)",
};
const inputClass =
  "w-full text-[13px] px-3.5 py-2.5 rounded-[10px] outline-none transition-all focus:border-[var(--accent)]";
const labelClass =
  "block text-[11px] mb-1.5 font-semibold uppercase tracking-wide";

export function EventoForm({ eventoParaEditar, onSucesso }: EventoFormProps) {
  const [form, setForm] = useState({
    torneio: eventoParaEditar?.torneio ?? "",
    etapa: eventoParaEditar?.etapa ?? "",
    categoria: eventoParaEditar?.categoria ?? "",
    dataInicio: eventoParaEditar?.dataInicio?.slice(0, 10) ?? "",
    dataFim: eventoParaEditar?.dataFim?.slice(0, 10) ?? "",
    local: eventoParaEditar?.local ?? "",
    cidade: eventoParaEditar?.cidade ?? "",
    estado: eventoParaEditar?.estado ?? "",
    status: eventoParaEditar?.status ?? "AGENDADO",
    resultado: eventoParaEditar?.resultado ?? "",
    fonteUrl: eventoParaEditar?.fonteUrl ?? "",
    observacoes: eventoParaEditar?.observacoes ?? "",
  });

  const [feedback, setFeedback] = useState<Feedback>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setFeedback(null);
    try {
      if (eventoParaEditar) {
        await api.patch(`/eventos/${eventoParaEditar.id}`, form);
        setFeedback("sucesso");
        onSucesso?.();
      } else {
        await api.post("/eventos", form);
        setFeedback("sucesso");
        setForm({
          torneio: "",
          etapa: "",
          categoria: "",
          dataInicio: "",
          dataFim: "",
          local: "",
          cidade: "",
          estado: "",
          status: "AGENDADO",
          resultado: "",
          fonteUrl: "",
          observacoes: "",
        });
      }
    } catch {
      setFeedback("erro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div
        className="rounded-[14px] p-5"
        style={{
          background: "var(--accent-bg)",
          border: "1px solid rgba(255,107,44,0.25)",
        }}
      >
        <h3
          className="text-[11px] font-bold uppercase tracking-wide mb-4"
          style={{ color: "var(--accent-2)" }}
        >
          Obrigatório
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="sm:col-span-2">
            <label className={labelClass} style={{ color: "var(--ink-soft)" }}>
              Torneio
            </label>
            <input
              name="torneio"
              value={form.torneio}
              onChange={handleChange}
              placeholder="Nome do torneio"
              className={inputClass}
              style={inputStyle}
            />
          </div>
          <div>
            <label className={labelClass} style={{ color: "var(--ink-soft)" }}>
              Data de início
            </label>
            <input
              name="dataInicio"
              type="date"
              value={form.dataInicio}
              onChange={handleChange}
              className={inputClass}
              style={inputStyle}
            />
          </div>
          <div>
            <label className={labelClass} style={{ color: "var(--ink-soft)" }}>
              Status
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className={inputClass}
              style={inputStyle}
            >
              <option value="AGENDADO">Agendado</option>
              <option value="EM_ANDAMENTO">Em andamento</option>
              <option value="FINALIZADO">Finalizado</option>
              <option value="CANCELADO">Cancelado</option>
            </select>
          </div>
        </div>
      </div>

      <div
        className="rounded-[14px] p-5"
        style={{ border: "1px solid var(--border)" }}
      >
        <h3
          className="text-[11px] font-bold uppercase tracking-wide mb-4"
          style={{ color: "var(--ink-faint)" }}
        >
          Opcional
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className={labelClass} style={{ color: "var(--ink-soft)" }}>
              Etapa
            </label>
            <input
              name="etapa"
              value={form.etapa}
              onChange={handleChange}
              placeholder="Etapa 1"
              className={inputClass}
              style={inputStyle}
            />
          </div>
          <div>
            <label className={labelClass} style={{ color: "var(--ink-soft)" }}>
              Categoria
            </label>
            <input
              name="categoria"
              value={form.categoria}
              onChange={handleChange}
              placeholder="Masculino A"
              className={inputClass}
              style={inputStyle}
            />
          </div>
          <div>
            <label className={labelClass} style={{ color: "var(--ink-soft)" }}>
              Data de fim
            </label>
            <input
              name="dataFim"
              type="date"
              value={form.dataFim}
              onChange={handleChange}
              className={inputClass}
              style={inputStyle}
            />
          </div>
          <div>
            <label className={labelClass} style={{ color: "var(--ink-soft)" }}>
              Local
            </label>
            <input
              name="local"
              value={form.local}
              onChange={handleChange}
              placeholder="Arena Beach"
              className={inputClass}
              style={inputStyle}
            />
          </div>
          <div>
            <label className={labelClass} style={{ color: "var(--ink-soft)" }}>
              Cidade
            </label>
            <input
              name="cidade"
              value={form.cidade}
              onChange={handleChange}
              placeholder="Curitiba"
              className={inputClass}
              style={inputStyle}
            />
          </div>
          <div>
            <label className={labelClass} style={{ color: "var(--ink-soft)" }}>
              Estado
            </label>
            <input
              name="estado"
              value={form.estado}
              onChange={handleChange}
              placeholder="PR"
              className={inputClass}
              style={inputStyle}
            />
          </div>
          <div>
            <label className={labelClass} style={{ color: "var(--ink-soft)" }}>
              Resultado
            </label>
            <input
              name="resultado"
              value={form.resultado}
              onChange={handleChange}
              placeholder="1º Lucas / 2º João"
              className={inputClass}
              style={inputStyle}
            />
          </div>
          <div>
            <label className={labelClass} style={{ color: "var(--ink-soft)" }}>
              URL da fonte
            </label>
            <input
              name="fonteUrl"
              value={form.fonteUrl}
              onChange={handleChange}
              placeholder="https://..."
              className={inputClass}
              style={inputStyle}
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass} style={{ color: "var(--ink-soft)" }}>
              Observações
            </label>
            <textarea
              name="observacoes"
              value={form.observacoes}
              onChange={handleChange}
              placeholder="Informações adicionais"
              rows={3}
              className={`${inputClass} resize-none`}
              style={inputStyle}
            />
          </div>
        </div>
      </div>

      {feedback === "sucesso" && (
        <div
          className="text-[13px] font-medium px-4 py-3 rounded-[10px]"
          style={{
            background: "var(--st-andamento-bg)",
            color: "var(--st-andamento)",
          }}
        >
          Evento {eventoParaEditar ? "atualizado" : "cadastrado"} com sucesso.
        </div>
      )}
      {feedback === "erro" && (
        <div
          className="text-[13px] font-medium px-4 py-3 rounded-[10px]"
          style={{
            background: "var(--st-cancelado-bg)",
            color: "var(--st-cancelado)",
          }}
        >
          Erro ao salvar. Verifique os campos e tente novamente.
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full text-[14px] font-bold py-3 rounded-[10px] transition-all disabled:opacity-50 hover:brightness-110"
        style={{
          background: "linear-gradient(135deg, var(--accent), var(--accent-2))",
          color: "#fff",
          boxShadow: "0 4px 20px -4px var(--accent-glow)",
        }}
      >
        {loading
          ? eventoParaEditar
            ? "Salvando..."
            : "Cadastrando..."
          : eventoParaEditar
            ? "Salvar alterações"
            : "Cadastrar evento"}
      </button>
    </div>
  );
}
