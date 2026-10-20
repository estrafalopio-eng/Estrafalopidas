import React, { useState } from 'react';
import { TARGET_GROUPS, TargetGroup } from '../data/initialBlocks';
import { Layers, Search, Users, BookOpen } from 'lucide-react';

interface GroupSelectorBarProps {
  selectedGroup: string;
  onSelectGroup: (group: string) => void;
  groupBlockCount: number;
  totalBlocks: number;
}

const GRADE_LEVELS = [
  { id: '6', label: '6° Grado' },
  { id: '7', label: '7° Grado' },
  { id: '8', label: '8° Grado' },
  { id: '9', label: '9° Grado' },
  { id: '10', label: '10° Grado' },
  { id: '11', label: '11° Grado' },
  { id: 'MT', label: 'Media Técnica' },
];

export const GroupSelectorBar: React.FC<GroupSelectorBarProps> = ({
  selectedGroup,
  onSelectGroup,
  groupBlockCount,
  totalBlocks,
}) => {
  const currentGradePrefix = selectedGroup.startsWith('MT')
    ? 'MT'
    : selectedGroup.split('-')[0];

  const [activeGradeTab, setActiveGradeTab] = useState(currentGradePrefix);
  const [searchTerm, setSearchTerm] = useState('');

  // Update tab if selectedGroup changes externally
  React.useEffect(() => {
    const prefix = selectedGroup.startsWith('MT') ? 'MT' : selectedGroup.split('-')[0];
    setActiveGradeTab(prefix);
  }, [selectedGroup]);

  // Filter groups in active tab
  const subGroups = TARGET_GROUPS.filter((g) => {
    if (activeGradeTab === 'MT') return g.startsWith('MT');
    return g.startsWith(`${activeGradeTab}-`);
  });

  const filteredGroupsBySearch = searchTerm
    ? TARGET_GROUPS.filter((g) => g.toLowerCase().includes(searchTerm.toLowerCase()))
    : null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3.5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Gestor de Cuadrícula por Grado (targetGroup)
            </h2>
            <p className="text-xs text-slate-500">
              Filtrado bidimensional activo para evitar colisiones visuales y de estado.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar grupo (ej. 8-2, MT)..."
              className="pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 w-48 sm:w-56"
            />
          </div>

          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-lg text-xs">
            <span className="text-slate-500">Total Global:</span>
            <span className="font-bold text-indigo-700 font-mono">{totalBlocks} bloques</span>
          </div>
        </div>
      </div>

      {/* Grade Level Tabs */}
      {!filteredGroupsBySearch ? (
        <div className="flex flex-wrap items-center gap-1.5">
          {GRADE_LEVELS.map((level) => {
            const isActive = activeGradeTab === level.id;
            return (
              <button
                key={level.id}
                type="button"
                onClick={() => {
                  setActiveGradeTab(level.id);
                  // pick first group of that level
                  const first = TARGET_GROUPS.find((g) =>
                    level.id === 'MT' ? g.startsWith('MT') : g.startsWith(`${level.id}-`)
                  );
                  if (first) onSelectGroup(first);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
                }`}
              >
                {level.label}
              </button>
            );
          })}
        </div>
      ) : null}

      {/* Subgroup Pill Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            Grupos disponibles:
          </span>

          {(filteredGroupsBySearch || subGroups).map((group) => {
            const isCurrent = selectedGroup === group;
            return (
              <button
                key={group}
                type="button"
                onClick={() => onSelectGroup(group)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  isCurrent
                    ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-300 ring-offset-1'
                    : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                Grupo {group}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-slate-600 bg-indigo-50/60 border border-indigo-100 rounded-lg px-3 py-1.5">
          <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
          <span>
            Grupo <strong className="text-indigo-900">{selectedGroup}</strong>:{' '}
            <strong className="text-indigo-700 font-mono">{groupBlockCount}</strong> bloques semanales
          </span>
        </div>
      </div>
    </div>
  );
};
