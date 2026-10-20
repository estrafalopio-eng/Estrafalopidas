import React, { useState } from 'react';
import { TeacherProfile } from '../types/villaflora';
import {
  Users,
  CheckCircle2,
  ExternalLink,
  Plus,
  Edit,
  GraduationCap,
  Calendar,
  Layers,
  Clock,
  BookOpen,
} from 'lucide-react';

interface HorariosViewProps {
  teachers: TeacherProfile[];
  onOpenRegisterModal: () => void;
  onOpenEditModal: (teacherId: string) => void;
  onGoToMatrix: () => void;
}

export const HorariosView: React.FC<HorariosViewProps> = ({
  teachers,
  onOpenRegisterModal,
  onOpenEditModal,
  onGoToMatrix,
}) => {
  const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(null);

  const selectedTeacher = teachers.find((t) => t.id === selectedTeacherId);

  return (
    <div className="space-y-5 animate-in fade-in duration-150">
      {/* Top Banner Header matching Image 2 */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-lg font-bold text-slate-900 tracking-tight">
              Bandeja de Asignación de Carga Académica
            </h1>
            <span className="rounded-md bg-blue-50 border border-blue-200 px-2 py-0.5 text-xs font-semibold text-blue-700">
              Coordinación B2B
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Revisión de docentes registrados y vinculación explícita de grados a la colección de horarios ('time_blocks').
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onOpenRegisterModal}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-2xs transition cursor-pointer"
          >
            <Plus className="w-4 h-4 text-slate-500" />
            <span>Simular Registro Docente</span>
          </button>

          <button
            type="button"
            onClick={onGoToMatrix}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#007DC5] hover:bg-[#034EA2] px-4 py-2 text-xs font-bold text-white shadow-xs transition active:scale-95 cursor-pointer"
          >
            <span>Ver Matriz Horaria</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Grid 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Docentes Pendientes por Asignar */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                <Users className="w-4 h-4 text-slate-500" />
                <span>Docentes Pendientes por Asignar</span>
              </div>
              <span className="bg-amber-100 text-amber-800 rounded-full px-2 py-0.5 text-[10px] font-bold">
                0 en espera
              </span>
            </div>

            <div className="py-6 flex flex-col items-center justify-center text-center px-4">
              <div className="h-10 w-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold text-slate-800">
                Todos los docentes tienen carga asignada
              </div>
              <div className="text-[11px] text-slate-500 mt-1 max-w-xs">
                Usa "Simular Registro Docente" para probar el onboarding de nuevos perfiles.
              </div>
            </div>
          </div>

          {/* Docentes con Carga Activa (35) */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs flex flex-col max-h-[560px]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 shrink-0">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
                <span>DOCENTES CON CARGA ACTIVA ({teachers.length})</span>
              </div>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>

            <div className="divide-y divide-slate-100 overflow-y-auto mt-2 flex-1">
              {teachers.map((t) => {
                const isSelected = selectedTeacherId === t.id;
                return (
                  <div
                    key={t.id}
                    onClick={() => setSelectedTeacherId(t.id)}
                    className={`p-3 transition-colors cursor-pointer rounded-xl my-1 flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-blue-50/80 border border-blue-200'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className="h-8 w-8 rounded-lg shrink-0 flex items-center justify-center text-white text-xs font-bold shadow-2xs"
                        style={{ backgroundColor: t.color }}
                      >
                        {t.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 truncate">
                          {t.name}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate">
                          {t.subjects.join(', ')}
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-[11px] font-bold text-emerald-600">
                        {t.status}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {t.activeGroupsCount} grupos
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (7 cols): Selected Teacher Detail or Placeholder */}
        <div className="lg:col-span-7">
          {selectedTeacher ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-5 animate-in fade-in duration-150">
              <div className="flex items-start justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3.5">
                  <div
                    className="h-12 w-12 rounded-xl flex items-center justify-center text-white text-base font-bold shadow-xs"
                    style={{ backgroundColor: selectedTeacher.color }}
                  >
                    {selectedTeacher.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-bold text-slate-900">
                        {selectedTeacher.name}
                      </h2>
                      <span className="bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded text-[10px]">
                        {selectedTeacher.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {selectedTeacher.email} · CC: {selectedTeacher.documentId}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenEditModal(selectedTeacher.id)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-2xs transition cursor-pointer"
                >
                  <Edit className="w-3.5 h-3.5 text-slate-500" />
                  <span>Modificar Perfil</span>
                </button>
              </div>

              {/* Workload Stats */}
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3">
                  <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Carga Semanal</span>
                  </div>
                  <div className="font-bold text-slate-900 text-sm">
                    {selectedTeacher.maxHours} hrs / sem
                  </div>
                  <div className="text-[10px] text-blue-600 font-medium">Tope Legal MEN</div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3">
                  <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Grupos Asignados</span>
                  </div>
                  <div className="font-bold text-slate-900 text-sm">
                    {selectedTeacher.activeGroupsCount} grupos
                  </div>
                  <div className="text-[10px] text-slate-400">Jornada Mañana</div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3">
                  <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Nivel Académico</span>
                  </div>
                  <div className="font-bold text-slate-900 text-sm">
                    {selectedTeacher.level}
                  </div>
                  <div className="text-[10px] text-emerald-600 font-medium">Docente Titular</div>
                </div>
              </div>

              {/* Chromatic Signature Display */}
              <div>
                <span className="text-xs font-semibold text-slate-700 block mb-2">
                  Firma Cromática en Matriz Horaria:
                </span>
                <div
                  className="rounded-xl p-3 text-white flex items-center justify-between shadow-xs font-bold text-xs"
                  style={{ backgroundColor: selectedTeacher.color }}
                >
                  <div className="flex items-center gap-2">
                    <span className="bg-black/30 rounded px-2 py-0.5 font-mono text-[11px]">
                      {selectedTeacher.name.slice(0, 2).toUpperCase()}
                    </span>
                    <span>{selectedTeacher.name}</span>
                  </div>
                  <span className="font-mono text-[10px] bg-white/20 px-2 py-0.5 rounded">
                    {selectedTeacher.color}
                  </span>
                </div>
              </div>

              {/* Authorized Subjects */}
              <div>
                <span className="text-xs font-semibold text-slate-700 block mb-2">
                  Asignaturas Autorizadas (MEN):
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedTeacher.subjects.map((sub) => (
                    <span
                      key={sub}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-200 bg-indigo-50/60 px-3 py-1.5 text-xs font-semibold text-indigo-900"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                      <span>{sub}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-2 border-t border-slate-100 flex justify-end">
                <button
                  type="button"
                  onClick={onGoToMatrix}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 text-xs font-bold shadow-xs transition cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Ver Horario en la Matriz</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[380px] rounded-2xl border border-dashed border-slate-200 bg-white p-8 flex flex-col items-center justify-center text-center text-slate-400">
              <Users className="w-10 h-10 mb-3 text-slate-300" />
              <p className="text-xs text-slate-500 max-w-sm">
                Selecciona un docente de la lista para gestionar su asignación de carga académica.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
