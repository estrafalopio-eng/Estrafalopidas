import React from 'react';
import { PWAInstallButton } from './PWAInstallButton';
import { RotateCcw, AlertTriangle, CheckCircle2, School, Shield } from 'lucide-react';
import { TeacherConflict } from '../hooks/useScheduleStore';

interface NavbarProps {
  totalBlocks: number;
  conflicts: TeacherConflict[];
  onOpenResetModal: () => void;
  onOpenConflictsModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  totalBlocks,
  conflicts,
  onOpenResetModal,
  onOpenConflictsModal,
}) => {
  const hasConflicts = conflicts.length > 0;

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-xs">
              <School className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900 tracking-tight">
                  I.E. Villa Flora
                </span>
                <span className="rounded bg-indigo-50 px-1.5 py-0.5 text-[10px] font-semibold text-indigo-700 border border-indigo-200">
                  Medellín
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Motor de Agendamiento Escolar B2B
              </p>
            </div>
          </div>

          {/* Actions & Metrics */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Conflict auditor button */}
            <button
              type="button"
              onClick={onOpenConflictsModal}
              className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition cursor-pointer ${
                hasConflicts
                  ? 'border-red-200 bg-red-50 text-red-700 hover:bg-red-100 animate-pulse'
                  : 'border-emerald-200 bg-emerald-50/70 text-emerald-800 hover:bg-emerald-100'
              }`}
            >
              {hasConflicts ? (
                <>
                  <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                  <span>{conflicts.length} conflicto(s)</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>0 colisiones</span>
                </>
              )}
            </button>

            {/* PWA Install Button */}
            <PWAInstallButton />

            {/* Hard-Confirm Reset / Clean */}
            <button
              type="button"
              onClick={onOpenResetModal}
              className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 transition active:scale-95 cursor-pointer shadow-xs"
              title="Restaurar Fábrica o Limpiar Horario"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Restaurar / Purgar</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
