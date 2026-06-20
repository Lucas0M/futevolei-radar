import { useAdminAuth } from "../hooks/useAdminAuth";
import { LoginForm } from "../components/LoginForm";
import { EventoForm } from "../components/EventoForm";

export function AdminPage() {
  const { autenticado, erro, login, logout } = useAdminAuth();

  if (!autenticado) return <LoginForm onLogin={login} erro={erro} />;

  return (
    <div className="min-h-screen">
      <div
        className="px-6 py-4 flex items-center justify-between"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[8px] overflow-hidden">
            <img
              src="/logo.png"
              alt="Futevôlei Radar"
              className="w-full h-full object-cover"
            />
          </div>
          <span
            className="text-[14px] font-bold"
            style={{ color: "var(--ink)" }}
          >
            Futevôlei{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, var(--accent), var(--accent-2))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Radar
            </span>
          </span>
          <span
            className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full"
            style={{ background: "var(--accent-bg)", color: "var(--accent-2)" }}
          >
            Admin
          </span>
        </div>

        <button
          onClick={logout}
          className="text-[12px] font-semibold px-3.5 py-1.5 rounded-[8px] transition-colors"
          style={{ color: "var(--ink-soft)", background: "var(--bg-sand)" }}
        >
          Sair
        </button>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="mb-6">
          <h1 className="text-[20px] font-bold" style={{ color: "var(--ink)" }}>
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
