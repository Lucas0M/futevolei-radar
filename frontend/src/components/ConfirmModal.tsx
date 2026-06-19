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
    <div className="relative bg-[#1E3A5F] border border-blue-400/10 rounded-xl p-4 overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:border-yellow-400/35 group">
      <h2 className="font-bold text-[17px] text-[#F5F0E8] leading-tight mb-1 tracking-wide">
        {mensagem}
      </h2>
      <button
        onClick={onConfirm}
        className="bg-[#1e5f27] border border-green-400/20 text-[#F5F0E8] text-sm px-5 py-2 rounded-lg transition-all duration-150 hover:border-yellow-400 hover:text-yellow-400 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Confirmar
      </button>
      <button
        onClick={onCancel}
        className="bg-[#5f1e1e] border border-red-400/20 text-[#F5F0E8] text-sm px-5 py-2 rounded-lg transition-all duration-150 hover:border-yellow-400 hover:text-yellow-400 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Cancelar
      </button>
    </div>
  );
}
