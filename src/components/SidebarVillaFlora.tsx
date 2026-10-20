import React from 'react';
import {
  LayoutGrid,
  CalendarDays,
  UserPlus,
  UserCheck,
  Bell,
  Trash,
  Calendar,
} from 'lucide-react';
import { AcademicWeek } from '../utils/academicCalendar';

export type ActiveNavTab = 'parrilla' | 'horarios' | 'novedades';

interface SidebarVillaFloraProps {
  activeTab: ActiveNavTab;
  onSelectTab: (tab: ActiveNavTab) => void;
  onOpenRegisterDocente: () => void;
  onOpenEditDocentes: () => void;
  onOpenResetFactory: () => void;
  teachersCount: number;
  novedadesCount: number;
  totalHours: number;
  uncoveredHours: number;
  coveredHours: number;
  currentWeek: AcademicWeek;
}

export const SidebarVillaFlora: React.FC<SidebarVillaFloraProps> = ({
  activeTab,
  onSelectTab,
  onOpenRegisterDocente,
  onOpenEditDocentes,
  onOpenResetFactory,
  teachersCount,
  novedadesCount,
  totalHours,
  uncoveredHours,
  coveredHours,
  currentWeek,
}) => {
  const renderPeriodOrdinal = (period: number) => {
    switch (period) {
      case 1:
        return (
          <>
            1<sup className="lowercase text-[10px] font-medium">er</sup>
          </>
        );
      case 2:
        return (
          <>
            2<sup className="lowercase text-[10px] font-medium">do</sup>
          </>
        );
      case 3:
      default:
        return (
          <>
            3<sup className="lowercase text-[10px] font-medium">er</sup>
          </>
        );
    }
  };

  return (
    <aside className="w-64 bg-white border-r border-[#939598]/20 flex flex-col justify-between select-none shrink-0 h-screen overflow-y-auto z-30">
      <div>
        {/* Cabecera del menú lateral con altura h-[85px] sincronizada con el Navbar (+15%) */}
        <div className="h-[85px] px-3 border-b border-[#939598]/20 flex items-center">
          <div className="flex items-center gap-2.5 w-full">
            <div className="rounded-xl bg-[#007DC5]/10 p-2 text-[#034EA2] shrink-0 shadow-2xs">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[17px] font-medium text-[#034EA2] tracking-tight flex items-baseline gap-1.5 leading-none">
                <span>{renderPeriodOrdinal(currentWeek.period)}</span>
                <span>PERÍODO</span>
              </div>
              <div className="text-xs font-bold text-[#231F20] mt-1 leading-tight">
                <div className="truncate">Semana del {currentWeek.startDate}</div>
                <div className="truncate">al {currentWeek.endDate}</div>
              </div>
              <div className="text-[10px] text-[#939598] font-medium mt-0.5 truncate leading-tight">
                {currentWeek.summary}
              </div>
            </div>
          </div>
        </div>

        {/* Navegación Principal: Reposo en gris claro y colores asignados a los botones */}
        <div className="p-3 space-y-1.5">
          {/* Botón: Parrilla académica */}
          <button
            type="button"
            onClick={() => onSelectTab('parrilla')}
            title="Ir a la Parrilla Académica Drag & Drop"
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007DC5] select-none ${
              activeTab === 'parrilla'
                ? 'bg-[#007DC5] text-white font-semibold shadow-xs'
                : 'bg-slate-100/90 text-[#231F20] font-medium hover:bg-[#007DC5]/10 hover:text-[#034EA2] active:scale-[0.98]'
            }`}
          >
            <div className="flex items-center gap-2">
              <LayoutGrid className="w-4 h-4 shrink-0" />
              <span>Parrilla académica</span>
            </div>
            {activeTab === 'parrilla' && (
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            )}
          </button>

          {/* Botón: Horarios (Reposo en gris claro con acento azul institucional) */}
          <button
            type="button"
            onClick={() => onSelectTab('horarios')}
            title="Ver distribución de horarios institucionales"
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007DC5] select-none ${
              activeTab === 'horarios'
                ? 'bg-[#007DC5] text-white font-semibold shadow-xs'
                : 'bg-slate-100 hover:bg-[#007DC5]/15 text-slate-800 hover:text-[#034EA2] active:scale-[0.98] border border-slate-200/60'
            }`}
          >
            <div className="flex items-center gap-2">
              <CalendarDays className={`w-4 h-4 shrink-0 ${activeTab === 'horarios' ? 'text-white' : 'text-[#007DC5]'}`} />
              <span className="font-medium">Horarios</span>
            </div>
            {activeTab === 'horarios' && (
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            )}
          </button>

          {/* Botón: Registrar docente (Reposo en gris claro con acento azul marino institucional) */}
          <button
            type="button"
            onClick={onOpenRegisterDocente}
            title="Abrir formulario para registrar un nuevo docente"
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-[#034EA2] text-slate-800 hover:text-white border border-slate-200/60 active:scale-[0.98] transition-all duration-150 cursor-pointer shadow-2xs group select-none"
          >
            <UserPlus className="w-4 h-4 text-[#034EA2] group-hover:text-white shrink-0 transition-colors" />
            <span>Registrar docente</span>
          </button>

          {/* Botón: Editar docentes (Reposo en gris claro con acento verde/cian) */}
          <button
            type="button"
            onClick={onOpenEditDocentes}
            title="Gestionar y editar docentes existentes"
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium bg-slate-100 hover:bg-slate-200/80 text-slate-800 hover:text-[#034EA2] border border-slate-200/60 active:scale-[0.98] transition-all duration-150 cursor-pointer select-none group"
          >
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-[#008A52] group-hover:text-[#034EA2] shrink-0 transition-colors" />
              <span>Editar docentes</span>
            </div>
            <span className="bg-white text-[#231F20] font-mono rounded-full px-2 py-0.5 text-[10px] font-bold border border-slate-200 shadow-2xs">
              {teachersCount}
            </span>
          </button>

          {/* Botón: Novedades (Reposo en gris claro con acento magenta institucional) */}
          <button
            type="button"
            onClick={() => onSelectTab('novedades')}
            title="Gestionar novedades y permisos de docentes"
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ED145B] select-none ${
              activeTab === 'novedades'
                ? 'bg-[#ED145B] text-white font-semibold shadow-xs'
                : 'bg-slate-100 hover:bg-[#ED145B]/10 text-slate-800 hover:text-[#ED145B] active:scale-[0.98] border border-slate-200/60'
            }`}
          >
            <div className="flex items-center gap-2">
              <Bell className={`w-4 h-4 shrink-0 ${activeTab === 'novedades' ? 'text-white' : 'text-[#ED145B]'}`} />
              <span className="font-medium">Novedades</span>
            </div>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-bold font-mono transition-transform duration-150 ${
                activeTab === 'novedades'
                  ? 'bg-white text-[#ED145B] shadow-2xs'
                  : 'bg-[#ED145B] text-white'
              }`}
            >
              {novedadesCount}
            </span>
          </button>
        </div>

        {/* Métricas de Cobertura */}
        <div className="pt-4">
          <div className="rounded-xl border border-[#939598]/20 bg-slate-50/60 p-2.5 space-y-2 text-xs">
            <div className="flex items-center justify-between font-semibold text-[#231F20] px-1">
              <span>Total:</span>
              <span className="font-mono font-bold text-[#231F20]">{totalHours}</span>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-[#ED145B]/10 border border-[#ED145B]/20 px-2.5 py-1.5 font-semibold text-[#ED145B]">
              <span>Sin Cobertura:</span>
              <span className="font-mono text-base font-bold text-[#ED145B]">{uncoveredHours}</span>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-[#007DC5]/10 border border-[#007DC5]/20 px-2.5 py-1.5 font-semibold text-[#007DC5]">
              <span>Cubiertos:</span>
              <span className="font-mono text-base font-bold text-[#007DC5]">{coveredHours}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pie del menú lateral */}
      <div className="p-3 space-y-3 border-t border-[#939598]/20 text-center">
        <button
          type="button"
          onClick={onOpenResetFactory}
          title="Restaurar parámetros originales de fábrica"
          className="w-full flex items-center justify-center gap-2 px-2.5 py-2 text-xs font-medium text-[#939598] hover:text-[#ED145B] hover:bg-[#ED145B]/10 active:bg-[#ED145B]/20 active:scale-[0.98] rounded-xl transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ED145B]"
        >
          <Trash className="w-3.5 h-3.5" />
          <span>Reset de fábrica</span>
        </button>

        <div className="text-[10px] text-[#939598] leading-tight">
          © 2026 Desarrollado y diseñado por <strong className="font-bold text-[#231F20]/80">Reakta Group</strong>
        </div>
      </div>
    </aside>
  );
};
