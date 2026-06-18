import { useAdminAuth } from "../hooks/useAdminAuth";
import { LoginForm } from "../components/LoginForm";
import { EventoForm } from "../components/EventoForm";

export function AdminPage() {
  const { autenticado, erro, login, logout } = useAdminAuth();

  if (!autenticado) return <LoginForm onLogin={login} erro={erro} />;

  return (
    <div className="min-h-screen bg-[#0A1628]">
      {/* Topbar */}
      <div className="border-b border-blue-400/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
            <line
              x1="4"
              y1="20"
              x2="36"
              y2="20"
              stroke="#E8C547"
              strokeWidth="2.5"
            />
            <circle cx="14" cy="13" r="5" stroke="#64B5F6" strokeWidth="2" />
            <line
              x1="14"
              y1="18"
              x2="20"
              y2="20"
              stroke="#64B5F6"
              strokeWidth="1.5"
            />
            <line
              x1="20"
              y1="20"
              x2="26"
              y2="13"
              stroke="#F5F0E8"
              strokeWidth="1.5"
              strokeDasharray="2 2"
            />
          </svg>
          <div>
            <span className="text-[#F5F0E8] font-bold tracking-wide">
              Futevôlei <span className="text-yellow-400">Radar</span>
            </span>
            <span className="text-[#8A9BB5] text-xs ml-2 uppercase tracking-widest">
              Admin
            </span>
          </div>
        </div>

        <button
          onClick={logout}
          className="text-xs text-[#8A9BB5] hover:text-red-400 border border-blue-400/15 hover:border-red-400/30 px-4 py-2 rounded-lg transition-colors"
        >
          Sair
        </button>
      </div>

      {/* Conteúdo */}
      <div className="max-w-2xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-[#F5F0E8]">Cadastrar evento</h1>
          <p className="text-[#8A9BB5] text-sm mt-1">
            Preencha os campos abaixo para adicionar um novo torneio.
          </p>
        </div>

        <EventoForm />
      </div>
    </div>
  );
}
