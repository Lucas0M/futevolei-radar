import { useState } from "react";
import { api } from "../services/api";

type Feedback = "sucesso" | "erro" | null;

const inputClass =
  "w-full bg-[#0A1628] border border-blue-400/15 text-[#F5F0E8] text-sm px-3 py-2.5 rounded-lg outline-none focus:border-yellow-400 transition-colors placeholder:text-[#8A9BB5]";
const labelClass =
  "block text-xs text-[#8A9BB5] uppercase tracking-widest mb-1.5";
const labelRequired =
  "block text-xs text-[#F5F0E8] uppercase tracking-widest mb-1.5";

export function EventoForm() {
  const [form, setForm] = useState({
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
    } catch {
      setFeedback("erro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Obrigatórios */}
      <div className="bg-[#1E3A5F] border border-blue-400/10 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-1 h-5 bg-yellow-400 rounded-full" />
          <h2 className="text-sm font-semibold text-[#F5F0E8] uppercase tracking-widest">
            Informações obrigatórias
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className={labelRequired}>Torneio *</label>
            <input
              name="torneio"
              value={form.torneio}
              onChange={handleChange}
              placeholder="Nome do torneio"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelRequired}>Data de início *</label>
            <input
              name="dataInicio"
              type="date"
              value={form.dataInicio}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelRequired}>Status *</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="AGENDADO">Agendado</option>
              <option value="EM_ANDAMENTO">Em andamento</option>
              <option value="FINALIZADO">Finalizado</option>
              <option value="CANCELADO">Cancelado</option>
            </select>
          </div>
        </div>
      </div>

      {/* Opcionais */}
      <div className="bg-[#1E3A5F] border border-blue-400/10 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-1 h-5 bg-blue-400/50 rounded-full" />
          <h2 className="text-sm font-semibold text-[#8A9BB5] uppercase tracking-widest">
            Informações opcionais
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Etapa</label>
            <input
              name="etapa"
              value={form.etapa}
              onChange={handleChange}
              placeholder="Ex: Etapa 1"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Categoria</label>
            <input
              name="categoria"
              value={form.categoria}
              onChange={handleChange}
              placeholder="Ex: Masculino A"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Data de fim</label>
            <input
              name="dataFim"
              type="date"
              value={form.dataFim}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Local</label>
            <input
              name="local"
              value={form.local}
              onChange={handleChange}
              placeholder="Ex: Arena Beach"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Cidade</label>
            <input
              name="cidade"
              value={form.cidade}
              onChange={handleChange}
              placeholder="Ex: Curitiba"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Estado</label>
            <input
              name="estado"
              value={form.estado}
              onChange={handleChange}
              placeholder="Ex: PR"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Resultado</label>
            <input
              name="resultado"
              value={form.resultado}
              onChange={handleChange}
              placeholder="Ex: 1º Lucas / 2º João"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>URL da fonte</label>
            <input
              name="fonteUrl"
              value={form.fonteUrl}
              onChange={handleChange}
              placeholder="https://..."
              className={inputClass}
            />
          </div>

          <div className="sm:col-span-2">
            <label className={labelClass}>Observações</label>
            <textarea
              name="observacoes"
              value={form.observacoes}
              onChange={handleChange}
              placeholder="Informações adicionais..."
              rows={3}
              className={`${inputClass} resize-none`}
            />
          </div>
        </div>
      </div>

      {/* Feedback + botão */}
      {feedback === "sucesso" && (
        <div className="bg-green-400/10 border border-green-400/25 text-green-400 text-sm px-4 py-3 rounded-lg">
          ✓ Evento cadastrado com sucesso!
        </div>
      )}
      {feedback === "erro" && (
        <div className="bg-red-400/10 border border-red-400/20 text-red-400 text-sm px-4 py-3 rounded-lg">
          ⚠ Erro ao cadastrar. Verifique os campos e tente novamente.
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-yellow-400 hover:bg-yellow-300 disabled:opacity-50 text-[#0A1628] font-bold text-sm py-3 rounded-lg transition-colors duration-150"
      >
        {loading ? "Cadastrando..." : "Cadastrar Evento"}
      </button>
    </div>
  );
}
