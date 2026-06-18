import { useState } from "react";

const SENHA_CORRETA = import.meta.env.VITE_ADMIN_PASSWORD;

export function useAdminAuth() {
  const [autenticado, setAutenticado] = useState(
    () => sessionStorage.getItem("admin") === "ok",
  );
  const [erro, setErro] = useState(false);

  const login = (senha: string) => {
    if (senha === SENHA_CORRETA) {
      sessionStorage.setItem("admin", "ok");
      setAutenticado(true);
      setErro(false);
    } else {
      setErro(true);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("admin");
    setAutenticado(false);
  };

  return { autenticado, erro, login, logout };
}
