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
      style={{ background: "rgba(26, 20, 16, 0.45)" }}
      onClick={onCancel}
    >
      <div
        className="rounded-[14px] p-6 max-w-sm w-full"
        style={{
          border: "1px solid var(--border)",
          background: "var(--bg-raised)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <p
          className="text-[16px] mb-5"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--ink)",
            fontWeight: 600,
          }}
        >
          {mensagem}
        </p>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="flex-1 text-[13px] font-medium py-2.5 rounded-[8px] transition-colors"
            style={{ color: "var(--ink-soft)", background: "var(--bg-sand)" }}
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 text-[13px] font-medium py-2.5 rounded-[8px] transition-colors"
            style={{ color: "#fff", background: "var(--vermelho)" }}
          >
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
}
