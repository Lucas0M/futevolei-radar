import { useState } from "react";

interface LoginFormProps {
  onLogin: (senha: string) => void;
  erro: boolean;
}

export function LoginForm({ onLogin, erro }: LoginFormProps) {
  const [senha, setSenha] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div
            className="w-14 h-14 rounded-[14px] overflow-hidden mb-4"
            style={{ boxShadow: "0 6px 24px -4px var(--accent-glow)" }}
          >
            <img
              src="/logo.png"
              alt="Futevôlei Radar"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-[18px] font-bold" style={{ color: "var(--ink)" }}>
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
          </h1>
          <p className="text-[11px] mt-1" style={{ color: "var(--ink-faint)" }}>
            Admin
          </p>
        </div>

        <div
          className="rounded-[14px] p-7"
          style={{
            background:
              "linear-gradient(155deg, var(--bg-raised), var(--bg-sand))",
            border: "1px solid var(--border)",
          }}
        >
          <p
            className="text-[14px] font-semibold mb-1"
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
            className="w-full text-[14px] px-3.5 py-3 rounded-[10px] outline-none transition-all mb-3 focus:border-[var(--accent)]"
            style={{
              background: "var(--bg-sand)",
              border: "1px solid var(--border)",
              color: "var(--ink)",
            }}
          />

          {erro && (
            <p
              className="text-[12px] mb-3"
              style={{ color: "var(--st-cancelado)" }}
            >
              Senha incorreta. Tente novamente.
            </p>
          )}

          <button
            onClick={() => onLogin(senha)}
            className="w-full text-[14px] font-bold py-3 rounded-[10px] transition-all hover:brightness-110"
            style={{
              background:
                "linear-gradient(135deg, var(--accent), var(--accent-2))",
              color: "#fff",
              boxShadow: "0 4px 20px -4px var(--accent-glow)",
            }}
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
}
