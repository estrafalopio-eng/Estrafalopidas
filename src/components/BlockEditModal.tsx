import React, { useState, useEffect } from 'react';
import { BlockItem, DAYS_OF_WEEK, PERIODS, SUBJECT_COLORS } from '../types/schedule';
import { TARGET_GROUPS } from '../data/initialBlocks';
import { X, Trash2, Check } from 'lucide-react';

interface BlockEditModalProps {
  isOpen: boolean;
  block?: BlockItem | null;
  defaultDay?: string;
  defaultPeriod?: string;
  targetGroup: string;
  onClose: () => void;
  onSave: (blockData: Partial<BlockItem>) => void;
  onDelete?: (id: string) => void;
}

const COMMON_TEACHERS = [
  'Lic. Carlos Restrepo',
  'Mg. Patricia Londoño',
  'Lic. Jorge Iván Gómez',
  'Dra. Claudia Ramírez',
  'Lic. Andrés Felipe Henao',
  'Lic. Marta Lucía Vélez',
  'Ing. David Morales',
  'Lic. Sofía Agudelo',
  'Lic. Fernando Quintero',
  'Mg. Diana Marcela Ríos',
  'Lic. Gabriel Jaramillo',
  'Lic. Marcela Botero',
  'Ing. Juan Pablo Muñoz',
  'Lic. Beatriz Posada',
  'Lic. Héctor Fabio Zapata',
  'Lic. Gloria Patricia Mejía',
];

export const BlockEditModal: React.FC<BlockEditModalProps> = ({
  isOpen,
  block,
  defaultDay,
  defaultPeriod,
  targetGroup,
  onClose,
  onSave,
  onDelete,
}) => {
  const [subject, setSubject] = useState('');
  const [teacher, setTeacher] = useState('');
  const [classroom, setClassroom] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState(DAYS_OF_WEEK[0]);
  const [period, setPeriod] = useState(PERIODS[0].id);

  useEffect(() => {
    if (block) {
      setSubject(block.subject);
      setTeacher(block.teacher);
      setClassroom(block.classroom || 'Aula 101');
      setDayOfWeek(block.dayOfWeek as any);
      setPeriod(block.period);
    } else {
      setSubject('Matemáticas');
      setTeacher(COMMON_TEACHERS[0]);
      setClassroom('Aula 101');
      if (defaultDay) setDayOfWeek(defaultDay as any);
      if (defaultPeriod) setPeriod(defaultPeriod);
    }
  }, [block, defaultDay, defaultPeriod, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      subject,
      teacher,
      classroom,
      dayOfWeek,
      period,
      targetGroup: block ? block.targetGroup : targetGroup,
    });
    onClose();
  };

  const isEditing = !!block;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="bg-slate-50 px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              {isEditing ? 'Editar Bloque Institucional' : 'Asignar Nuevo Bloque'}
            </h3>
            <p className="text-xs text-slate-500">
              Grado: <span className="font-semibold text-indigo-600">{targetGroup}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded p-1 text-slate-400 hover:text-slate-600 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Asignatura
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
            >
              {Object.keys(SUBJECT_COLORS).map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Docente Asignado
            </label>
            <select
              value={teacher}
              onChange={(e) => setTeacher(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
            >
              {COMMON_TEACHERS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Día
              </label>
              <select
                value={dayOfWeek}
                onChange={(e) => setDayOfWeek(e.target.value as any)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
              >
                {DAYS_OF_WEEK.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Periodo / Franja
              </label>
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
              >
                {PERIODS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.startTime})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Aula / Espacio Físico
            </label>
            <input
              type="text"
              value={classroom}
              onChange={(e) => setClassroom(e.target.value)}
              placeholder="Ej. Aula 104, Lab. Química"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-slate-100">
            {isEditing && onDelete ? (
              <button
                type="button"
                onClick={() => {
                  onDelete(block.id);
                  onClose();
                }}
                className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 transition cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Eliminar Bloque</span>
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 transition cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1 rounded-lg bg-indigo-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700 transition cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Guardar</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
