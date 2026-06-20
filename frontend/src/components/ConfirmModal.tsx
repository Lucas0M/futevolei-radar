interface ConfirmModalProps {
  mensagem: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({
  mensagem,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4 z-50"
      style={{ background: "rgba(5, 5, 8, 0.75)", backdropFilter: "blur(4px)" }}
      onClick={onCancel}
    >
      <div
        className="rounded-[14px] p-6 max-w-sm w-full"
        style={{
          background:
            "linear-gradient(155deg, var(--bg-raised), var(--bg-sand))",
          border: "1px solid var(--st-cancelado)",
          boxShadow: "0 8px 30px -8px var(--st-cancelado-glow)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <p
          className="text-[15px] font-semibold mb-5"
          style={{ color: "var(--ink)" }}
        >
          {mensagem}
        </p>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="flex-1 text-[13px] font-semibold py-2.5 rounded-[8px] transition-colors"
            style={{ color: "var(--ink-soft)", background: "var(--bg-sand)" }}
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 text-[13px] font-semibold py-2.5 rounded-[8px] transition-all hover:brightness-110"
            style={{ background: "var(--st-cancelado)", color: "#fff" }}
          >
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
}
