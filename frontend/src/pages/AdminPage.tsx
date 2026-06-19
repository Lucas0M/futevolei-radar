import { useAdminAuth } from "../hooks/useAdminAuth";
import { LoginForm } from "../components/LoginForm";
import { EventoForm } from "../components/EventoForm";

export function AdminPage() {
  const { autenticado, erro, login, logout } = useAdminAuth();

  if (!autenticado) return <LoginForm onLogin={login} erro={erro} />;

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <div
        className="px-6 py-4 flex items-center justify-between"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div className="flex items-center gap-3">
          <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
            <line
              x1="4"
              y1="20"
              x2="36"
              y2="20"
              stroke="var(--laranja)"
              strokeWidth="2.5"
            />
            <circle
              cx="14"
              cy="13"
              r="5"
              stroke="var(--verde)"
              strokeWidth="2"
            />
            <line
              x1="14"
              y1="18"
              x2="20"
              y2="20"
              stroke="var(--verde)"
              strokeWidth="1.5"
            />
            <line
              x1="20"
              y1="20"
              x2="26"
              y2="13"
              stroke="var(--ink)"
              strokeWidth="1.5"
              strokeDasharray="2 2"
            />
          </svg>
          <span
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--ink)",
              fontWeight: 600,
            }}
            className="text-[16px]"
          >
            Futevôlei <span style={{ color: "var(--laranja)" }}>Radar</span>
          </span>
          <span
            className="text-[11px] uppercase tracking-wide"
            style={{ color: "var(--ink-faint)" }}
          >
            Admin
          </span>
        </div>

        <button
          onClick={logout}
          className="text-[12px] font-medium px-4 py-2 rounded-[8px] transition-colors"
          style={{ color: "var(--ink-soft)", background: "var(--bg-sand)" }}
        >
          Sair
        </button>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="mb-6">
          <h1
            className="text-[22px]"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--ink)",
              fontWeight: 600,
            }}
          >
            Cadastrar evento
          </h1>
          <p className="text-[13px] mt-1" style={{ color: "var(--ink-faint)" }}>
            Preencha os campos abaixo para adicionar um novo torneio.
          </p>
        </div>

        <EventoForm />
      </div>
    </div>
  );
}
