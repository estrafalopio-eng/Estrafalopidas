import React, { useState } from 'react';
import { Palette, X, User, Mail, CreditCard, Phone, Clock, BookOpen, UserPlus } from 'lucide-react';
import { TeacherProfile, MEN_SUBJECTS, CURATED_PALETTE } from '../types/villaflora';

interface RegistrarDocenteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveTeacher: (teacher: Omit<TeacherProfile, 'id' | 'activeGroupsCount' | 'status'>) => void;
  existingTeachers: TeacherProfile[];
}

export const RegistrarDocenteModal: React.FC<RegistrarDocenteModalProps> = ({
  isOpen,
  onClose,
  onSaveTeacher,
  existingTeachers,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [documentId, setDocumentId] = useState('');
  const [phone, setPhone] = useState('');
  const [maxHours, setMaxHours] = useState(22);
  const [selectedColor, setSelectedColor] = useState('#991B1B');
  const [level, setLevel] = useState<'Bachillerato' | 'Primaria'>('Bachillerato');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(['Matemáticas']);
  const [subjectSearch, setSubjectSearch] = useState('');

  if (!isOpen) return null;

  const initials = name.trim()
    ? name.trim().split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()
    : 'DO';

  const usedColors = existingTeachers.map((t) => t.color);

  const toggleSubject = (sub: string) => {
    if (selectedSubjects.includes(sub)) {
      if (selectedSubjects.length > 1) {
        setSelectedSubjects(selectedSubjects.filter((s) => s !== sub));
      }
    } else {
      setSelectedSubjects([...selectedSubjects, sub]);
    }
  };

  const filteredSubjects = MEN_SUBJECTS.filter((s) =>
    s.toLowerCase().includes(subjectSearch.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSaveTeacher({
      name: name.trim(),
      email: email.trim() || `${name.trim().toLowerCase().replace(/\s+/g, '.')}@ievillaflora.edu.co`,
      documentId: documentId.trim() || '71234999',
      phone: phone.trim() || '3001234567',
      maxHours,
      color: selectedColor,
      level,
      subjects: selectedSubjects,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs select-none">
      <div className="w-full max-w-xl rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Header matching Image 3 */}
        <div className="bg-[#111827] px-5 py-4 flex items-center justify-between text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-red-800 flex items-center justify-center text-white shadow-xs">
              <Palette className="w-5 h-5 text-red-100" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Registrar Nuevo Docente
              </h2>
              <p className="text-xs text-slate-400">
                Alta curricular y configuración de firma cromática
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700 flex-1">
          {/* Row 1: Nombre & Correo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-slate-800 flex items-center gap-1.5 mb-1.5">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>Nombre Completo *</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Alejandro Restrepo"
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-800 flex items-center gap-1.5 mb-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>Correo Institucional *</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="docente@ievillaflora.edu.co"
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Row 2: Cédula, Celular, Horas Máximas */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="font-semibold text-slate-800 flex items-center gap-1 mb-1.5 truncate">
                <CreditCard className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Cédula *</span>
              </label>
              <input
                type="text"
                required
                value={documentId}
                onChange={(e) => setDocumentId(e.target.value)}
                placeholder="Ej. 70889900"
                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-xs focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-800 flex items-center gap-1 mb-1.5 truncate">
                <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Celular</span>
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Ej. 3107771122"
                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-xs focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="font-semibold text-slate-800 flex items-center gap-1 truncate">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Horas Máximas *</span>
                </label>
                <span className="text-[10px] text-blue-600 font-bold">Legal: 22h</span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  min={1}
                  max={40}
                  value={maxHours}
                  onChange={(e) => setMaxHours(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-xs font-bold text-slate-900 focus:border-indigo-500 focus:outline-none pr-12"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[11px]">
                  hrs/sem
                </span>
              </div>
            </div>
          </div>

          {/* Section: Firma Cromática (Color Picker) */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Palette className="w-4 h-4 text-slate-600" />
                <span>Firma Cromática (Color Picker)</span>
              </div>
              <span className="font-mono text-[11px] bg-slate-100 border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md font-semibold">
                {selectedColor.toUpperCase()}
              </span>
            </div>

            {/* Matrix Cell Live Preview */}
            <div className="flex items-center gap-3">
              <div
                className="h-10 w-16 rounded-lg border border-black/10 shrink-0 shadow-2xs"
                style={{ backgroundColor: selectedColor }}
              />
              <div className="flex-1">
                <span className="text-[11px] text-slate-400 block mb-1">
                  Vista previa en la celda de la matriz:
                </span>
                <div
                  className="rounded-lg px-3 py-2 text-white font-bold flex items-center gap-2 shadow-xs transition-colors"
                  style={{ backgroundColor: selectedColor }}
                >
                  <span className="bg-black/30 text-white rounded px-1.5 py-0.5 text-[10px] font-mono">
                    {initials}
                  </span>
                  <span className="truncate">{name || 'Nombre del Docente'}</span>
                </div>
              </div>
            </div>

            {/* Colors in use */}
            <div>
              <span className="text-[11px] text-slate-500 font-medium block mb-1.5">
                Colores en uso por otros docentes ({usedColors.length}):
              </span>
              <div className="flex flex-wrap gap-1.5 max-h-16 overflow-y-auto p-1 bg-white rounded-xl border border-slate-200">
                {usedColors.map((col, idx) => (
                  <span
                    key={idx}
                    className="h-3.5 w-3.5 rounded-full shrink-0 border border-black/10"
                    style={{ backgroundColor: col }}
                    title={`Color en uso: ${col}`}
                  />
                ))}
              </div>
            </div>

            {/* Curated Suggested Colors (sin colisión) */}
            <div>
              <span className="text-[11px] text-slate-500 font-medium block mb-1.5">
                Tonos curados sugeridos (sin colisión):
              </span>
              <div className="flex flex-wrap gap-2">
                {CURATED_PALETTE.map((col) => (
                  <button
                    key={col}
                    type="button"
                    onClick={() => setSelectedColor(col)}
                    className={`h-7 w-7 rounded-lg transition transform cursor-pointer border ${
                      selectedColor === col
                        ? 'ring-2 ring-indigo-600 scale-110 shadow-md border-white'
                        : 'border-black/10 hover:scale-105'
                    }`}
                    style={{ backgroundColor: col }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Nivel Académico */}
          <div>
            <label className="font-semibold text-slate-800 block mb-1.5">
              Nivel Académico *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setLevel('Bachillerato')}
                className={`py-2 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                  level === 'Bachillerato'
                    ? 'border-indigo-600 bg-indigo-50/70 text-indigo-700'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                Bachillerato
              </button>
              <button
                type="button"
                onClick={() => setLevel('Primaria')}
                className={`py-2 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                  level === 'Primaria'
                    ? 'border-indigo-600 bg-indigo-50/70 text-indigo-700'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                Primaria
              </button>
            </div>
          </div>

          {/* Catálogo de Asignaturas Autorizadas (MEN) */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/40 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <BookOpen className="w-4 h-4 text-slate-600" />
                <span>Catálogo de Asignaturas Autorizadas (MEN) *</span>
              </div>
              <span className="text-[11px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-bold">
                {selectedSubjects.length} materia{selectedSubjects.length > 1 ? 's' : ''}
              </span>
            </div>

            <input
              type="text"
              value={subjectSearch}
              onChange={(e) => setSubjectSearch(e.target.value)}
              placeholder="Buscar asignatura oficial (ej. Matemáticas, Física, Biología)..."
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs bg-white focus:outline-none focus:border-indigo-500"
            />

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
                ASIGNATURAS HABILITADAS EN EL PERFIL ({selectedSubjects.length}):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedSubjects.map((sub) => (
                  <span
                    key={sub}
                    onClick={() => toggleSubject(sub)}
                    className="inline-flex items-center gap-1 rounded-lg bg-indigo-100 text-indigo-800 border border-indigo-200 px-2.5 py-1 text-xs font-semibold cursor-pointer hover:bg-red-100 hover:text-red-800 transition"
                    title="Click para quitar"
                  >
                    <span>{sub}</span>
                    <X className="w-3 h-3" />
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <span className="text-[10px] text-slate-400 font-semibold block mb-1">
                Haz click para agregar:
              </span>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                {filteredSubjects
                  .filter((s) => !selectedSubjects.includes(s))
                  .map((sub) => (
                    <button
                      key={sub}
                      type="button"
                      onClick={() => toggleSubject(sub)}
                      className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] text-slate-600 hover:border-indigo-400 hover:text-indigo-700 transition cursor-pointer"
                    >
                      + {sub}
                    </button>
                  ))}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#007DC5] hover:bg-[#034EA2] text-white shadow-sm transition active:scale-95 cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>Registrar Docente</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
