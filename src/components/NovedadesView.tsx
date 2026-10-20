import React, { useState } from 'react';
import { NovedadItem } from '../types/villaflora';
import {
  Bell,
  Plus,
  AlertTriangle,
  CheckCircle2,
  Archive,
  Search,
  Filter,
  Eye,
  Trash2,
  Smartphone,
  Users,
  FileText,
  X,
  Check,
} from 'lucide-react';

interface NovedadesViewProps {
  novedades: NovedadItem[];
  onAddNovedad: (item: Omit<NovedadItem, 'id'>) => void;
  onDeleteNovedad: (id: string) => void;
}

export const NovedadesView: React.FC<NovedadesViewProps> = ({
  novedades,
  onAddNovedad,
  onDeleteNovedad,
}) => {
  const [activeTab, setActiveTab] = useState<'activas' | 'vencidas' | 'todas'>('activas');
  const [selectedType, setSelectedType] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  // Form state
  const [newType, setNewType] = useState<NovedadItem['type']>('Urgencia');
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newRecipient, setNewRecipient] = useState('Todos');
  const [newExpirationDate, setNewExpirationDate] = useState('2026-10-25');

  const totalCount = novedades.length;
  const activeCount = novedades.filter((n) => n.status === 'Vigente').length;
  const expiredCount = novedades.filter((n) => n.status === 'Vencida').length;
  const urgencyCount = novedades.filter((n) => n.type === 'Urgencia' && n.status === 'Vigente').length;

  const filteredNovedades = novedades.filter((n) => {
    if (activeTab === 'activas' && n.status !== 'Vigente') return false;
    if (activeTab === 'vencidas' && n.status !== 'Vencida') return false;
    if (selectedType !== 'todos' && n.type !== selectedType) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const matchTitle = n.title.toLowerCase().includes(q);
      const matchContent = n.content.toLowerCase().includes(q);
      const matchRecipient = n.recipient.toLowerCase().includes(q);
      if (!matchTitle && !matchContent && !matchRecipient) return false;
    }
    return true;
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onAddNovedad({
      type: newType,
      title: newTitle.trim(),
      content: newContent.trim() || 'Aviso oficial emitido por Coordinación Académica.',
      recipient: newRecipient.trim(),
      emissionDate: '2026-10-18',
      expirationDate: newExpirationDate,
      status: 'Vigente',
    });

    setNewTitle('');
    setNewContent('');
    setIsNewModalOpen(false);
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-150">
      {/* Top Header Card matching Image 5 */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="rounded-md border border-slate-300 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-slate-600 bg-slate-50">
              CANAL OFICIAL UNIDIRECCIONAL
            </span>
            <span className="inline-flex items-center gap-1 rounded-md border border-emerald-300 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
              <Smartphone className="w-3 h-3" />
              <span>Preparado para App Móvil</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-slate-800" />
            <h1 className="text-lg font-bold text-slate-900 tracking-tight">
              Tablero de Novedades e Incidencias
            </h1>
          </div>

          <p className="text-xs text-slate-500 mt-1 max-w-3xl">
            Tablero de control y difusión de incidencias, incapacidades, permisos y avisos oficiales emitidos desde Coordinación Académica hacia el cuerpo docente institucional.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsNewModalOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-[#231F20] hover:bg-black px-4 py-2.5 text-xs font-bold text-white shadow-xs transition active:scale-95 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 text-[#007DC5]" />
          <span>Registrar Novedad</span>
        </button>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-[#939598]/20 bg-white p-4 shadow-xs">
          <div className="text-xs font-semibold text-[#939598]">Total Novedades</div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold font-mono text-[#231F20]">{totalCount}</span>
            <span className="text-[11px] text-[#939598]">Histórico completo</span>
          </div>
        </div>

        <div className="rounded-2xl border border-[#939598]/20 bg-white p-4 shadow-xs">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#231F20]">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Activas (Vigentes)</span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold font-mono text-[#231F20]">{activeCount}</span>
            <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
              Auto-Purge Activo
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-[#ED145B]/30 bg-white p-4 shadow-xs">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#ED145B]">
            <AlertTriangle className="w-3.5 h-3.5 text-[#ED145B]" />
            <span>Urgencias Activas</span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold font-mono text-[#ED145B]">{urgencyCount}</span>
            <span className="text-[10px] text-[#ED145B] font-bold bg-[#ED145B]/10 px-1.5 py-0.5 rounded">
              Prioridad Inmediata
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-[#939598]/20 bg-white p-4 shadow-xs">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#939598]">
            <Archive className="w-3.5 h-3.5 text-[#939598]" />
            <span>Histórico (Vencidas)</span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold font-mono text-[#231F20]">{expiredCount}</span>
            <span className="text-[11px] text-[#939598]">Archivadas</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Toolbar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('activas')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
                activeTab === 'activas'
                  ? 'bg-emerald-50 border border-emerald-300 text-emerald-800 shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Activas (Vigentes)</span>
              <span className="font-mono bg-white px-1.5 py-0.2 rounded text-[10px] font-bold">
                {activeCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('vencidas')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
                activeTab === 'vencidas'
                  ? 'bg-slate-800 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
              }`}
            >
              <Archive className="w-3.5 h-3.5" />
              <span>Histórico (Vencidas)</span>
              <span className="font-mono bg-slate-200/60 text-slate-800 px-1.5 py-0.2 rounded text-[10px] font-bold">
                {expiredCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('todas')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
                activeTab === 'todas'
                  ? 'bg-slate-800 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
              }`}
            >
              <span>Todas</span>
              <span className="font-mono bg-slate-200/60 text-slate-800 px-1.5 py-0.2 rounded text-[10px] font-bold">
                {totalCount}
              </span>
            </button>
          </div>

          {/* Filter Dropdown & Search */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 border border-slate-200 rounded-lg px-2.5 py-1.5 bg-slate-50 text-xs">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="bg-transparent text-slate-700 font-medium focus:outline-none cursor-pointer"
              >
                <option value="todos">Todos los tipos</option>
                <option value="Urgencia">Urgencias</option>
                <option value="Incapacidad">Incapacidades</option>
                <option value="Permiso">Permisos</option>
                <option value="Aviso Oficial">Avisos Oficiales</option>
              </select>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por título, contenido o c..."
                className="pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 w-56"
              />
            </div>
          </div>
        </div>

        {/* Notice text matching Image 5 */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
          <span>
            Mostrando únicamente novedades con vencimiento igual o posterior a hoy (<strong>2026-10-18</strong>).
          </span>
          <button
            type="button"
            onClick={() => setActiveTab('vencidas')}
            className="text-blue-600 hover:underline font-semibold cursor-pointer"
          >
            Consultar novedades pasadas en el Histórico →
          </button>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-200 mt-2">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-[11px] font-bold text-slate-600 uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">TIPO</th>
                <th className="py-3 px-4">TÍTULO Y CONTENIDO</th>
                <th className="py-3 px-4">DESTINATARIO</th>
                <th className="py-3 px-4">EMISIÓN</th>
                <th className="py-3 px-4">VENCIMIENTO</th>
                <th className="py-3 px-4">VIGENCIA</th>
                <th className="py-3 px-4 text-center">ACCIONES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredNovedades.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No se encontraron novedades en este filtro.
                  </td>
                </tr>
              ) : (
                filteredNovedades.map((item) => {
                  const isUrgent = item.type === 'Urgencia';
                  const isIncapacity = item.type === 'Incapacidad';

                  return (
                    <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 px-4 align-top">
                        <span
                          className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-semibold border ${
                            isUrgent
                              ? 'border-red-200 bg-red-50 text-red-700'
                              : isIncapacity
                              ? 'border-purple-200 bg-purple-50 text-purple-700'
                              : 'border-slate-200 bg-slate-50 text-slate-700'
                          }`}
                        >
                          {isUrgent ? (
                            <AlertTriangle className="w-3 h-3 text-red-600" />
                          ) : (
                            <FileText className="w-3 h-3" />
                          )}
                          <span>{item.type}</span>
                        </span>
                      </td>

                      <td className="py-3 px-4 align-top max-w-sm">
                        <div className="font-bold text-slate-900">{item.title}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                          {item.content}
                        </div>
                      </td>

                      <td className="py-3 px-4 align-top">
                        <div className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-700">
                          <Users className="w-3 h-3 text-slate-400" />
                          <span>{item.recipient}</span>
                        </div>
                      </td>

                      <td className="py-3 px-4 align-top font-mono text-[11px] text-slate-500">
                        {item.emissionDate}
                      </td>

                      <td className="py-3 px-4 align-top font-mono text-[11px] font-bold text-slate-900">
                        {item.expirationDate}
                      </td>

                      <td className="py-3 px-4 align-top">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            item.status === 'Vigente'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              item.status === 'Vigente' ? 'bg-emerald-600' : 'bg-slate-500'
                            }`}
                          />
                          <span>{item.status}</span>
                        </span>
                      </td>

                      <td className="py-3 px-4 align-top text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            type="button"
                            className="rounded p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                            title="Ver detalles"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onDeleteNovedad(item.id)}
                            className="rounded p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                            title="Eliminar"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Nueva Novedad */}
      {isNewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs select-none">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-slate-900 px-5 py-4 text-white flex items-center justify-between">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <Bell className="w-4 h-4 text-indigo-400" />
                <span>Registrar Nueva Incidencia / Novedad</span>
              </h3>
              <button
                onClick={() => setIsNewModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Tipo de Novedad</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as any)}
                  className="w-full rounded-lg border border-slate-300 p-2 bg-white"
                >
                  <option value="Urgencia">Urgencia (Prioridad Inmediata)</option>
                  <option value="Incapacidad">Incapacidad Médica</option>
                  <option value="Permiso">Permiso Sindical / Pedagógico</option>
                  <option value="Aviso Oficial">Aviso Oficial de Rectoría</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Título del Comunicado</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ej. Cambio de horario jornada pedagógica"
                  className="w-full rounded-lg border border-slate-300 p-2"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Contenido / Descripción</label>
                <textarea
                  rows={3}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Detalles de la incidencia..."
                  className="w-full rounded-lg border border-slate-300 p-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Destinatario</label>
                  <input
                    type="text"
                    value={newRecipient}
                    onChange={(e) => setNewRecipient(e.target.value)}
                    placeholder="Todos / Docente"
                    className="w-full rounded-lg border border-slate-300 p-2"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Fecha Vencimiento</label>
                  <input
                    type="date"
                    value={newExpirationDate}
                    onChange={(e) => setNewExpirationDate(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 p-2"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsNewModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-slate-900 text-white font-bold hover:bg-slate-800 flex items-center gap-1"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Publicar Novedad</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
