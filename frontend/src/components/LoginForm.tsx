import { useState } from "react";

interface LoginFormProps {
  onLogin: (senha: string) => void;
  erro: boolean;
}

export function LoginForm({ onLogin, erro }: LoginFormProps) {
  const [senha, setSenha] = useState("");

  return (
    <div className="min-h-screen bg-[#0A1628] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <svg
            width="48"
            height="48"
            viewBox="0 0 40 40"
            fill="none"
            className="mb-4"
          >
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
          <h1 className="text-2xl font-bold text-[#F5F0E8] tracking-wide">
            Futevôlei <span className="text-yellow-400">Radar</span>
          </h1>
          <p className="text-[11px] text-[#8A9BB5] uppercase tracking-[3px] mt-1">
            Admin Panel
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#1E3A5F] border border-blue-400/10 rounded-2xl p-8">
          <p className="text-[#F5F0E8] text-sm font-medium mb-1">
            Senha de acesso
          </p>
          <p className="text-[#8A9BB5] text-xs mb-5">
            Apenas administradores autorizados.
          </p>

          <input
            type="password"
            placeholder="••••••••"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onLogin(senha)}
            className="w-full bg-[#0A1628] border border-blue-400/20 text-[#F5F0E8] text-sm px-4 py-3 rounded-lg outline-none focus:border-yellow-400 transition-colors placeholder:text-[#8A9BB5] mb-3"
          />

          {erro && (
            <p className="text-red-400 text-xs mb-3 flex items-center gap-1">
              <span>⚠</span> Senha incorreta. Tente novamente.
            </p>
          )}

          <button
            onClick={() => onLogin(senha)}
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-[#0A1628] font-bold text-sm py-3 rounded-lg transition-colors duration-150"
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
}
