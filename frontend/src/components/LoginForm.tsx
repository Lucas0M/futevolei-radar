import { useState } from "react";

interface LoginFormProps {
  onLogin: (senha: string) => void;
  erro: boolean;
}

export function LoginForm({ onLogin, erro }: LoginFormProps) {
  const [senha, setSenha] = useState("");

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "var(--bg)" }}
    >
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            className="mb-4"
          >
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
          <h1
            className="text-[24px]"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--ink)",
              fontWeight: 600,
            }}
          >
            Futevôlei <span style={{ color: "var(--laranja)" }}>Radar</span>
          </h1>
          <p
            className="text-[11px] uppercase tracking-[2px] mt-1"
            style={{ color: "var(--ink-faint)" }}
          >
            Admin
          </p>
        </div>

        <div
          className="rounded-[14px] p-7"
          style={{
            background: "var(--bg-raised)",
            border: "1px solid var(--border)",
          }}
        >
          <p
            className="text-[14px] font-medium mb-1"
            style={{ color: "var(--ink)" }}
          >
            Senha de acesso
          </p>
          <p className="text-[12px] mb-4" style={{ color: "var(--ink-faint)" }}>
            Apenas administradores autorizados.
          </p>

          <input
            type="password"
            placeholder="••••••••"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onLogin(senha)}
            className="w-full text-[14px] px-3.5 py-3 rounded-[10px] outline-none transition-colors mb-3"
            style={{
              background: "var(--bg-sand)",
              border: "1px solid var(--border)",
              color: "var(--ink)",
            }}
          />

          {erro && (
            <p
              className="text-[12px] mb-3"
              style={{ color: "var(--vermelho)" }}
            >
              Senha incorreta. Tente novamente.
            </p>
          )}

          <button
            onClick={() => onLogin(senha)}
            className="w-full text-[14px] font-semibold py-3 rounded-[10px] transition-colors"
            style={{ background: "var(--laranja)", color: "#fff" }}
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
}
