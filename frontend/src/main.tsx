import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css"; // ← adiciona essa linha (tem que vir ANTES do tokens)
import "./tokens.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
