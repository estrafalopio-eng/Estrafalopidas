import React, { useState } from 'react';
import { TeacherProfile } from '../types/villaflora';
import { ChevronRight, ChevronLeft, Search, UserCheck, Clock, BookOpen } from 'lucide-react';

interface DocentesDisponiblesDrawerProps {
  teachers: TeacherProfile[];
  onSelectTeacherForSlot?: (teacher: TeacherProfile) => void;
}

export const DocentesDisponiblesDrawer: React.FC<DocentesDisponiblesDrawerProps> = ({
  teachers,
  onSelectTeacherForSlot,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = teachers.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.subjects.some((s) => s.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <aside aria-label="Docentes disponibles" className="fixed right-0 top-24 bottom-6 z-40 flex items-start pointer-events-none select-none">
      {/* Yellow Vertical Tab matching Image 1 */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto bg-[#FBBF24] hover:bg-[#F59E0B] text-slate-900 font-bold text-xs py-3 px-1.5 rounded-l-xl shadow-lg border-y border-l border-amber-400 flex flex-col items-center gap-2 cursor-pointer transition transform active:scale-95 [writing-mode:vertical-rl] rotate-180"
        title="Ver docentes disponibles"
      >
        <span>Docentes disponibles...</span>
        {isOpen ? <ChevronLeft className="w-3.5 h-3.5 rotate-90" /> : <ChevronRight className="w-3.5 h-3.5 rotate-90" />}
      </button>

      {/* Drawer Panel */}
      {isOpen && (
        <div className="pointer-events-auto w-80 h-full bg-white border-l border-slate-200 shadow-2xl flex flex-col rounded-l-2xl overflow-hidden animate-in slide-in-from-right duration-200">
          <div className="bg-[#1E293B] text-white p-4 flex items-center justify-between shrink-0">
            <div>
              <h3 className="text-sm font-bold flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-amber-400" />
                <span>Docentes Disponibles</span>
              </h3>
              <p className="text-[11px] text-slate-400">
                {teachers.length} docentes registrados en el sistema
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded p-1 text-slate-400 hover:text-white"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="p-3 border-b border-slate-100 bg-slate-50 shrink-0">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Filtrar por nombre o materia..."
                className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="p-3 overflow-y-auto space-y-2 flex-1 divide-y divide-slate-100">
            {filtered.map((teacher) => (
              <div
                key={teacher.id}
                onClick={() => onSelectTeacherForSlot && onSelectTeacherForSlot(teacher)}
                className="pt-2 pb-1 hover:bg-slate-50 rounded-lg p-2 transition cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-3.5 w-3.5 rounded-full shrink-0 border border-black/10"
                      style={{ backgroundColor: teacher.color }}
                    />
                    <span className="font-bold text-xs text-slate-900">{teacher.name}</span>
                  </div>
                  <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded font-semibold">
                    {teacher.status}
                  </span>
                </div>

                <div className="text-[11px] text-slate-500 truncate flex items-center gap-1">
                  <BookOpen className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="truncate">{teacher.subjects.join(', ')}</span>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Máx: {teacher.maxHours}h</span>
                  </div>
                  <span>{teacher.activeGroupsCount} grupos activos</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
};
