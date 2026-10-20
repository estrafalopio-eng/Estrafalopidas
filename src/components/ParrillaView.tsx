import React, { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  useDraggable,
  useDroppable,
} from '@dnd-kit/core';
import {
  AcademicBlock,
  ACADEMIC_PERIODS,
  ACADEMIC_DAYS,
  CLASSROOM_GROUPS,
  ClassroomGroup,
} from '../types/villaflora';
import {
  Clock,
  Search,
  Minus,
  Plus,
  Trash2,
  GripVertical,
  Check,
  Layers,
  X,
  AlertCircle,
} from 'lucide-react';

interface ParrillaViewProps {
  blocks: AcademicBlock[];
  onMoveOrSwapBlock: (activeId: string, targetDay: string, targetPeriod: string, targetGroup: string) => void;
  onEditBlock: (block: AcademicBlock) => void;
  onAddBlockToSlot: (day: string, period: string, group: string) => void;
  onDeleteBlock?: (id: string) => void;
  onDeleteMultipleBlocks?: (ids: string[]) => void;
}

export const ParrillaView: React.FC<ParrillaViewProps> = ({
  blocks,
  onMoveOrSwapBlock,
  onEditBlock,
  onAddBlockToSlot,
  onDeleteBlock,
  onDeleteMultipleBlocks,
}) => {
  const [selectedDay, setSelectedDay] = useState<string>('Lunes');
  const [isHoliday, setIsHoliday] = useState<boolean>(false);
  const [isParentMeeting, setIsParentMeeting] = useState<boolean>(false);
  const [selectedGradeFilter, setSelectedGradeFilter] = useState<string>('todos');
  const [groupSearch, setGroupSearch] = useState<string>('');
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  // Drag and drop state
  const [activeDragBlock, setActiveDragBlock] = useState<AcademicBlock | null>(null);

  // Checkbox selection state for bulk elimination ("check para eliminar")
  const [selectedBlockIds, setSelectedBlockIds] = useState<Set<string>>(new Set());

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 5,
      },
    })
  );

  // Filter groups
  const filteredGroups = CLASSROOM_GROUPS.filter((g) => {
    if (selectedGradeFilter !== 'todos' && g.grade !== selectedGradeFilter) {
      return false;
    }
    if (groupSearch.trim()) {
      const q = groupSearch.toLowerCase();
      return g.name.toLowerCase().includes(q) || g.classroom.toLowerCase().includes(q);
    }
    return true;
  });

  // Current day blocks
  const dayBlocks = blocks.filter((b) => b.dayOfWeek === selectedDay);

  // Build lookup map: `${group}___${period}` -> AcademicBlock
  const blockMap = new Map<string, AcademicBlock>();
  dayBlocks.forEach((b) => {
    blockMap.set(`${b.targetGroup}___${b.period}`, b);
  });

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const b = blocks.find((item) => item.id === active.id);
    if (b) setActiveDragBlock(b);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveDragBlock(null);

    if (!over) return;
    const overId = String(over.id);
    const activeId = String(active.id);

    if (overId.includes('___')) {
      const [targetGroup, targetPeriod] = overId.split('___');
      onMoveOrSwapBlock(activeId, selectedDay, targetPeriod, targetGroup);
    } else {
      const targetBlock = blocks.find((b) => b.id === overId);
      if (targetBlock) {
        onMoveOrSwapBlock(activeId, selectedDay, targetBlock.period, targetBlock.targetGroup);
      }
    }
  };

  const handleDaySelect = (dayId: string) => {
    setSelectedDay(dayId);
  };

  // Toggle single block selection for elimination
  const handleToggleSelect = (id: string) => {
    setSelectedBlockIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Delete single block immediately
  const handleDeleteSingle = (id: string) => {
    if (onDeleteBlock) {
      onDeleteBlock(id);
      setSelectedBlockIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  // Delete all selected blocks
  const handleDeleteSelected = () => {
    if (selectedBlockIds.size === 0) return;
    const idsToDelete = Array.from(selectedBlockIds);
    if (onDeleteMultipleBlocks) {
      onDeleteMultipleBlocks(idsToDelete);
    } else if (onDeleteBlock) {
      idsToDelete.forEach((id) => onDeleteBlock(id));
    }
    setSelectedBlockIds(new Set());
  };

  const handleClearSelection = () => {
    setSelectedBlockIds(new Set());
  };

  const currentDayConfig = ACADEMIC_DAYS.find((d) => d.id === selectedDay) || ACADEMIC_DAYS[0];

  return (
    <div className="space-y-4 select-none relative">
      {/* Top Filter Bar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-xs flex flex-wrap items-center justify-between gap-3">
        {/* Left Filter elements */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Grade Dropdown */}
          <div className="flex items-center gap-1.5 border border-slate-200 rounded-xl px-3 py-1.5 bg-slate-50 text-xs font-semibold text-slate-700">
            <Layers className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedGradeFilter}
              onChange={(e) => setSelectedGradeFilter(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="todos">Todos los Grados</option>
              <option value="6">Grado 6°</option>
              <option value="7">Grado 7°</option>
              <option value="8">Grado 8°</option>
              <option value="9">Grado 9°</option>
              <option value="10">Grado 10°</option>
              <option value="11">Grado 11°</option>
            </select>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={groupSearch}
              onChange={(e) => setGroupSearch(e.target.value)}
              placeholder="Buscar grupo..."
              className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 w-32 sm:w-40"
            />
          </div>

          {/* Day Selector Buttons */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-[#939598]/30 text-xs">
            {ACADEMIC_DAYS.map((day) => {
              const isSelected = selectedDay === day.id;
              const isLunesRed = isSelected && day.id === 'Lunes' && isHoliday;

              return (
                <button
                  key={day.id}
                  type="button"
                  onClick={() => handleDaySelect(day.id)}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer text-xs ${
                    isLunesRed
                      ? 'bg-[#ED145B] text-white shadow-xs'
                      : isSelected
                      ? 'bg-[#034EA2] text-white shadow-xs'
                      : 'text-[#231F20] hover:text-[#007DC5] hover:bg-slate-200/60'
                  }`}
                >
                  {day.label}
                </button>
              );
            })}
          </div>

          {/* Checkboxes: Día festivo & Atención a padres */}
          <label className="flex items-center gap-1.5 text-xs font-semibold text-[#231F20] cursor-pointer bg-slate-50 px-2.5 py-1.5 rounded-xl border border-[#939598]/30">
            <input
              type="checkbox"
              checked={isHoliday}
              onChange={(e) => setIsHoliday(e.target.checked)}
              className="rounded accent-[#ED145B] h-4 w-4 cursor-pointer"
            />
            <span className={isHoliday ? 'text-[#ED145B] font-bold' : 'text-[#231F20]'}>Día festivo</span>
          </label>

          <label className="flex items-center gap-1.5 text-xs font-semibold text-[#231F20] cursor-pointer bg-slate-50 px-2.5 py-1.5 rounded-xl border border-[#939598]/30">
            <input
              type="checkbox"
              checked={isParentMeeting}
              onChange={(e) => setIsParentMeeting(e.target.checked)}
              className="rounded accent-[#007DC5] h-4 w-4 cursor-pointer"
            />
            <span>Atención a padres</span>
          </label>
        </div>

        {/* Right Zoom Controls */}
        <div className="flex items-center gap-2 text-xs font-medium text-[#231F20] bg-slate-50 border border-[#939598]/30 rounded-xl px-3 py-1.5">
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.max(70, z - 10))}
            className="hover:text-[#007DC5] p-0.5 cursor-pointer"
            title="Reducir zoom"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>

          <input
            type="range"
            min={70}
            max={130}
            step={5}
            value={zoomLevel}
            onChange={(e) => setZoomLevel(Number(e.target.value))}
            className="w-20 accent-[#007DC5] cursor-pointer"
          />

          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.min(130, z + 10))}
            className="hover:text-[#007DC5] p-0.5 cursor-pointer"
            title="Aumentar zoom"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>

          <span className="font-mono text-xs font-bold text-[#034EA2] w-10 text-right">
            {zoomLevel}%
          </span>
        </div>
      </div>

      {/* Floating Action Banner for Batch Deletion ("check para eliminar") */}
      {selectedBlockIds.size > 0 && (
        <div className="sticky top-2 z-40 bg-white border border-red-200 text-slate-800 rounded-xl p-3 shadow-lg flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold">
              {selectedBlockIds.size}
            </div>
            <span>
              {selectedBlockIds.size === 1
                ? '1 celda marcada para eliminar'
                : `${selectedBlockIds.size} celdas marcadas para eliminar`}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleClearSelection}
              className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition cursor-pointer font-medium"
            >
              Deseleccionar
            </button>
            <button
              type="button"
              onClick={handleDeleteSelected}
              className="inline-flex items-center gap-1.5 text-xs px-3.5 py-1.5 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700 transition cursor-pointer shadow-xs"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Eliminar seleccionadas ({selectedBlockIds.size})</span>
            </button>
          </div>
        </div>
      )}

      {/* Matrix Table with DnD-kit */}
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div
          className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs transition-all"
          style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top left' }}
        >
          <table className="w-full border-collapse text-left min-w-[1100px]">
            {/* Table Header matching Screenshot */}
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-xs font-bold text-slate-800">
                {/* 1st Column: Header matching Screenshot */}
                <th className="p-3 w-48 border-r border-slate-200 align-top">
                  {isHoliday ? (
                    <div className="rounded-xl bg-[#ED145B] text-white p-2.5 shadow-xs text-center">
                      <div className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wide">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Día Festivo</span>
                      </div>
                      <div className="text-[11px] font-medium mt-0.5">
                        {currentDayConfig.label}
                      </div>
                      <span className="inline-block mt-1 bg-black/30 text-white rounded px-2 py-0.5 text-[10px] font-mono tracking-widest uppercase">
                        BLOQUEADO
                      </span>
                    </div>
                  ) : (
                    <div className="rounded-xl bg-[#F1F5F9] border border-slate-200/80 p-2.5 shadow-2xs text-left">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                        <Clock className="w-3.5 h-3.5 text-[#034EA2]" />
                        <span>Bachillerato</span>
                      </div>
                      <div className="text-xs font-extrabold text-[#034EA2] mt-0.5">
                        {currentDayConfig.label}
                      </div>
                      <div className="text-[10px] font-bold tracking-wider uppercase text-slate-400 mt-1">
                        6 FRANJAS (55M)
                      </div>
                    </div>
                  )}
                </th>

                {/* Grade Group Columns */}
                {filteredGroups.map((grp: ClassroomGroup) => (
                  <th
                    key={grp.id}
                    className="p-3 text-center border-r border-slate-200 last:border-r-0 min-w-[115px]"
                  >
                    <div className="text-sm font-extrabold text-slate-800 tracking-tight">
                      {grp.name}
                    </div>
                    <div className="text-[11px] font-medium text-slate-400 mt-0.5 font-mono">
                      {grp.classroom}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Matrix Body Rows */}
            <tbody className="divide-y divide-slate-100 text-xs">
              {ACADEMIC_PERIODS.map((period) => {
                // Recess Row across the whole table
                if (period.isRecess) {
                  return (
                    <tr
                      key={period.id}
                      className="bg-[#FEF9C3] border-y border-amber-200/80 text-slate-800 font-semibold"
                    >
                      <td className="p-3 border-r border-amber-200 bg-[#FEF08A]/60 font-bold">
                        <div className="text-xs text-amber-950 font-bold">{period.name}</div>
                        <div className="text-[11px] text-amber-800 font-mono mt-0.5">
                          {period.timeRange}
                        </div>
                      </td>
                      <td
                        colSpan={filteredGroups.length}
                        className="p-3 text-center text-xs font-medium tracking-wide text-amber-900 bg-[#FEF9C3]"
                      >
                        Descanso Pedagógico y Alimentación Escolar ({period.timeRange})
                      </td>
                    </tr>
                  );
                }

                // Regular Class Row
                return (
                  <tr key={period.id} className="hover:bg-slate-50/40 transition-colors">
                    {/* Time Slot column matching Screenshot */}
                    <td className="p-3 border-r border-slate-200 bg-slate-50/60 align-middle">
                      <div className="font-extrabold text-slate-800 text-sm">{period.name}</div>
                      <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                        {period.timeRange}
                      </div>
                    </td>

                    {/* Cells for each group */}
                    {filteredGroups.map((grp) => {
                      const block = blockMap.get(`${grp.name}___${period.id}`);
                      const cellId = `${grp.name}___${period.id}`;
                      const isSelected = block ? selectedBlockIds.has(block.id) : false;

                      return (
                        <td
                          key={cellId}
                          className="p-1.5 border-r border-slate-200 last:border-r-0 align-middle text-center"
                        >
                          {isHoliday ? (
                            <div className="h-20 rounded-xl bg-slate-100/80 border border-slate-200/80 p-2 flex flex-col items-center justify-center text-center shadow-2xs">
                              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                                FESTIVO
                              </span>
                              <span className="text-[10px] text-slate-400 mt-1 leading-tight">
                                Sin actividad académica
                              </span>
                            </div>
                          ) : (
                            /* Exact Cell Design matching User Screenshot */
                            <MatrixCell
                              cellId={cellId}
                              block={block}
                              group={grp.name}
                              period={period.id}
                              day={selectedDay}
                              isSelected={isSelected}
                              onEditBlock={onEditBlock}
                              onAddBlockToSlot={onAddBlockToSlot}
                              onDeleteBlock={handleDeleteSingle}
                              onToggleSelect={handleToggleSelect}
                            />
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Drag Overlay matching exact card design */}
        <DragOverlay>
          {activeDragBlock ? (
            <div className="w-[125px] rounded-xl border border-slate-200 shadow-2xl overflow-hidden bg-white ring-2 ring-[#007DC5] scale-105 opacity-95">
              <div className="p-2 flex flex-col items-center justify-center text-center min-h-[58px]">
                <span className="text-[12px] font-bold text-slate-900 truncate max-w-full">
                  {activeDragBlock.subject}
                </span>
                <span className="text-[10px] text-slate-400 font-mono mt-0.5">
                  {activeDragBlock.classroom}
                </span>
              </div>
              <div
                className="w-full h-[26px] flex items-center justify-between px-2 text-white text-[11px] font-bold"
                style={{ backgroundColor: activeDragBlock.teacherColor }}
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="bg-black/25 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-xs font-mono">
                    {activeDragBlock.teacherInitials}
                  </span>
                  <span className="truncate">{activeDragBlock.teacher}</span>
                </div>
                <div className="w-3.5 h-3.5 rounded-full border border-white/70 bg-white/20" />
              </div>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

interface MatrixCellProps {
  cellId: string;
  block?: AcademicBlock;
  group: string;
  period: string;
  day: string;
  isSelected: boolean;
  onEditBlock: (block: AcademicBlock) => void;
  onAddBlockToSlot: (day: string, period: string, group: string) => void;
  onDeleteBlock: (id: string) => void;
  onToggleSelect: (id: string) => void;
}

const MatrixCell: React.FC<MatrixCellProps> = ({
  cellId,
  block,
  group,
  period,
  day,
  isSelected,
  onEditBlock,
  onAddBlockToSlot,
  onDeleteBlock,
  onToggleSelect,
}) => {
  const { setNodeRef: setDroppableRef, isOver } = useDroppable({
    id: cellId,
  });

  return (
    <div
      ref={setDroppableRef}
      className={`min-h-[92px] rounded-xl transition-all flex flex-col justify-center ${
        isOver
          ? 'bg-blue-100/70 border-2 border-dashed border-[#007DC5]'
          : 'bg-transparent'
      }`}
    >
      {block ? (
        <DraggableMatrixBlock
          block={block}
          isSelected={isSelected}
          onEdit={onEditBlock}
          onDelete={onDeleteBlock}
          onToggleSelect={onToggleSelect}
        />
      ) : (
        <button
          type="button"
          onClick={() => onAddBlockToSlot(day, period, group)}
          className="h-full min-h-[82px] w-full rounded-xl border border-dashed border-slate-200 hover:border-[#007DC5] hover:bg-blue-50/40 text-slate-300 hover:text-[#007DC5] flex flex-col items-center justify-center gap-1 text-[11px] font-semibold transition cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Libre</span>
        </button>
      )}
    </div>
  );
};

interface DraggableMatrixBlockProps {
  block: AcademicBlock;
  isSelected: boolean;
  onEdit: (block: AcademicBlock) => void;
  onDelete: (id: string) => void;
  onToggleSelect: (id: string) => void;
}

const DraggableMatrixBlock: React.FC<DraggableMatrixBlockProps> = ({
  block,
  isSelected,
  onEdit,
  onDelete,
  onToggleSelect,
}) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: block.id,
    data: block,
  });

  return (
    <div
      ref={setNodeRef}
      className={`group relative rounded-xl border transition-all select-none overflow-hidden bg-white text-left shadow-2xs hover:shadow-md ${
        isSelected
          ? 'ring-2 ring-red-500 border-red-400 bg-red-50/20 shadow-sm'
          : 'border-slate-200/90'
      } ${isDragging ? 'opacity-30 scale-95 border-dashed border-blue-400' : ''}`}
    >
      {/* Top Section (White): Delete option on left, Subject + Classroom in center, Drag handle on right */}
      <div className="p-2 pt-1.5 flex flex-col justify-between min-h-[58px]">
        {/* Top Control Bar: Trash icon on left, Drag handle on right */}
        <div className="flex items-center justify-between w-full">
          {/* Opción de eliminar */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(block.id);
            }}
            className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded p-1 transition cursor-pointer"
            title="Eliminar este bloque"
          >
            <Trash2 className="w-3.5 h-3.5 stroke-[2.2]" />
          </button>

          {/* Drag & Drop Handle */}
          <div
            {...listeners}
            {...attributes}
            className="cursor-grab active:cursor-grabbing text-slate-300 hover:text-slate-600 transition p-1"
            title="Arrastrar y soltar (Drag and drop)"
          >
            <GripVertical className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Center: Subject name and Classroom */}
        <div
          onClick={() => onEdit(block)}
          className="flex flex-col items-center justify-center text-center px-1 my-0.5 cursor-pointer hover:opacity-85 transition"
          title="Clic para editar"
        >
          <span className="text-[12px] font-bold text-slate-800 leading-tight truncate max-w-full">
            {block.subject}
          </span>
          <span className="text-[10px] font-medium text-slate-400 font-mono mt-0.5 leading-none truncate max-w-full">
            {block.classroom || 'Aula'}
          </span>
        </div>
      </div>

      {/* Bottom Section: Colored Teacher Strip matching Screenshot */}
      <div
        className="w-full h-[26px] flex items-center justify-between px-2 text-white select-none"
        style={{ backgroundColor: block.teacherColor }}
      >
        {/* Left: Initials badge + Teacher name */}
        <div className="flex items-center gap-1.5 min-w-0 mr-1 overflow-hidden">
          <span className="bg-black/25 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-xs tracking-wider shrink-0 font-mono leading-none">
            {block.teacherInitials}
          </span>
          <span className="truncate text-[11px] font-bold text-white leading-none">
            {block.teacher}
          </span>
        </div>

        {/* Right: Check para eliminar */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleSelect(block.id);
          }}
          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border transition flex items-center justify-center shrink-0 cursor-pointer ${
            isSelected
              ? 'bg-white text-red-600 border-white shadow-xs'
              : 'border-white/70 bg-white/20 hover:bg-white/40'
          }`}
          title={isSelected ? 'Deseleccionar' : 'Marcar para eliminar'}
        >
          {isSelected ? (
            <Check className="w-2.5 h-2.5 stroke-[3.5]" />
          ) : (
            <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
          )}
        </button>
      </div>
    </div>
  );
};
