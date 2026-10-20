import React from 'react';
import { TeacherConflict } from '../hooks/useScheduleStore';
import { PERIODS } from '../types/schedule';
import { AlertCircle, X, ArrowRight } from 'lucide-react';

interface ConflictsModalProps {
  isOpen: boolean;
  conflicts: TeacherConflict[];
  onClose: () => void;
  onSelectGroup: (group: string) => void;
}

export const ConflictsModal: React.FC<ConflictsModalProps> = ({
  isOpen,
  conflicts,
  onClose,
  onSelectGroup,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
        <div className="bg-red-50 p-4 border-b border-red-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="rounded-lg bg-red-100 p-1.5 text-red-600">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-red-950">
                Auditoría de Colisiones Docentes
              </h3>
              <p className="text-xs text-red-700">
                {conflicts.length === 0
                  ? 'No se detectaron cruces de horario.'
                  : `${conflicts.length} conflicto(s) de superposición detectado(s).`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded p-1 text-slate-400 hover:text-slate-600 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto space-y-3 flex-1 text-xs">
          {conflicts.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <p className="font-medium text-emerald-700">¡Matriz institucional en armonía!</p>
              <p className="mt-1 text-slate-400">Ningún docente tiene asignaciones simultáneas.</p>
            </div>
          ) : (
            conflicts.map((conf, idx) => {
              const periodInfo = PERIODS.find((p) => p.id === conf.period);
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-red-200 bg-red-50/40 p-3 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900">{conf.teacher}</span>
                    <span className="font-mono text-[11px] bg-red-100 text-red-800 px-2 py-0.5 rounded-full font-medium">
                      {conf.dayOfWeek} — {periodInfo ? periodInfo.name : conf.period}
                    </span>
                  </div>

                  <p className="text-slate-600 text-[11px]">
                    El docente fue asignado simultáneamente en {conf.groups.length} grupos:
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {conf.groups.map((grp) => (
                      <button
                        key={grp}
                        type="button"
                        onClick={() => {
                          onSelectGroup(grp);
                          onClose();
                        }}
                        className="inline-flex items-center gap-1 rounded-md bg-white border border-red-200 px-2 py-1 text-[11px] font-medium text-red-700 hover:bg-red-100 transition cursor-pointer"
                        title={`Ir al horario de ${grp}`}
                      >
                        <span>Grupo {grp}</span>
                        <ArrowRight className="w-2.5 h-2.5" />
                      </button>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="bg-slate-50 p-3 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-slate-800 px-4 py-1.5 text-xs font-semibold text-white hover:bg-slate-900 transition cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
