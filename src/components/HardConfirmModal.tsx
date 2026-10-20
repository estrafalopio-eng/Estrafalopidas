import React, { useState } from 'react';
import { AlertTriangle, ShieldAlert, X } from 'lucide-react';

interface HardConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmFactoryReset: () => void;
  onConfirmClearAll: () => void;
  totalBlocks: number;
}

export const HardConfirmModal: React.FC<HardConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirmFactoryReset,
  onConfirmClearAll,
  totalBlocks,
}) => {
  const [inputText, setInputText] = useState('');
  const [actionType, setActionType] = useState<'factory' | 'clear'>('factory');

  if (!isOpen) return null;

  const isConfirmed = inputText.trim() === 'CONFIRMAR';

  const handleExecute = () => {
    if (!isConfirmed) return;
    if (actionType === 'factory') {
      onConfirmFactoryReset();
    } else {
      onConfirmClearAll();
    }
    setInputText('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl border border-red-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-red-50 p-5 border-b border-red-100 flex items-start gap-4">
          <div className="rounded-xl bg-red-100 p-2.5 text-red-600 shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-bold text-red-950">
              Operación Crítica de Seguridad
            </h3>
            <p className="text-xs text-red-700 mt-1">
              Esta acción purgará el almacenamiento local (<code>localStorage</code>) y afectará los{' '}
              <strong>{totalBlocks} bloques</strong> institucionales registrados.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:text-slate-600 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-2">
              Selecciona el tipo de restauración:
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setActionType('factory')}
                className={`p-3 rounded-lg border text-left transition cursor-pointer ${
                  actionType === 'factory'
                    ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 font-medium'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="font-semibold">Restaurar Fábrica</div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Restablece los 914 bloques originales.
                </div>
              </button>

              <button
                type="button"
                onClick={() => setActionType('clear')}
                className={`p-3 rounded-lg border text-left transition cursor-pointer ${
                  actionType === 'clear'
                    ? 'border-red-600 bg-red-50/70 text-red-950 font-medium'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="font-semibold">Limpiar Todo</div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Vacía la matriz completamente.
                </div>
              </button>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
            <span>
              Para autorizar esta purga, escribe con mayúsculas exactas la palabra{' '}
              <strong className="font-mono bg-amber-100 px-1 py-0.5 rounded text-amber-950">
                CONFIRMAR
              </strong>{' '}
              a continuación.
            </span>
          </div>

          <div>
            <label
              htmlFor="confirm-code"
              className="text-xs font-medium text-slate-700 block mb-1.5"
            >
              Código de Confirmación Requerido
            </label>
            <input
              id="confirm-code"
              type="text"
              autoFocus
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Escribe CONFIRMAR aquí..."
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#ED145B] focus:outline-none focus:ring-2 focus:ring-[#ED145B]/20 font-mono"
            />
          </div>
        </div>

        <div className="bg-slate-50 px-5 py-3.5 border-t border-slate-100 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-xs font-medium text-[#231F20] hover:bg-slate-200/80 transition cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleExecute}
            disabled={!isConfirmed}
            className={`rounded-lg px-4 py-2 text-xs font-semibold shadow-sm transition flex items-center gap-1.5 cursor-pointer ${
              isConfirmed
                ? 'bg-[#ED145B] text-white hover:bg-[#c90f4c] active:scale-95'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {actionType === 'factory' ? 'Ejecutar Restauración' : 'Purgar y Limpiar'}
          </button>
        </div>
      </div>
    </div>
  );
};
