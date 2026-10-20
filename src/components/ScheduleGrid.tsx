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
} from '@dnd-kit/core';
import { BlockItem, DAYS_OF_WEEK, PERIODS, PeriodSlot } from '../types/schedule';
import { GridCell } from './GridCell';
import { BlockCard } from './BlockCard';
import { Clock, Calendar } from 'lucide-react';
import { TeacherConflict } from '../hooks/useScheduleStore';

interface ScheduleGridProps {
  selectedGroup: string;
  blocks: BlockItem[];
  teacherConflicts: TeacherConflict[];
  onMoveOrSwapBlock: (activeId: string, targetDay: string, targetPeriod: string) => void;
  onEditBlock: (block: BlockItem) => void;
  onAddBlockToSlot: (day: string, period: string) => void;
}

export const ScheduleGrid: React.FC<ScheduleGridProps> = ({
  selectedGroup,
  blocks,
  teacherConflicts,
  onMoveOrSwapBlock,
  onEditBlock,
  onAddBlockToSlot,
}) => {
  const [activeDragBlock, setActiveDragBlock] = useState<BlockItem | null>(null);

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

  // Filter blocks strictly for the current targetGroup
  const currentGroupBlocks = blocks.filter((b) => b.targetGroup === selectedGroup);

  // Create quick lookup map: "Day___Period" -> BlockItem
  const blockMap = new Map<string, BlockItem>();
  currentGroupBlocks.forEach((b) => {
    blockMap.set(`${b.dayOfWeek}___${b.period}`, b);
  });

  // Conflicted block IDs set
  const conflictBlockIds = new Set<string>();
  teacherConflicts.forEach((c) => {
    c.blockIds.forEach((id) => conflictBlockIds.add(id));
  });

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const block = blocks.find((b) => b.id === active.id);
    if (block) {
      setActiveDragBlock(block);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveDragBlock(null);

    if (!over) return;

    const overId = String(over.id);
    const activeId = String(active.id);

    if (overId.includes('___')) {
      // Dropped onto a cell (e.g., "Lunes___P1")
      const [targetDay, targetPeriod] = overId.split('___');
      onMoveOrSwapBlock(activeId, targetDay, targetPeriod);
    } else {
      // Dropped onto another block card
      const targetBlock = blocks.find((b) => b.id === overId);
      if (targetBlock) {
        onMoveOrSwapBlock(activeId, targetBlock.dayOfWeek, targetBlock.period);
      }
    }
  };

  const renderBreakRow = (label: string, time: string) => (
    <tr key={label} className="bg-slate-100/60 border-y border-slate-200">
      <td className="py-1 px-3 text-[11px] font-semibold text-slate-500 whitespace-nowrap">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3 h-3 text-slate-400" />
          <span>{time}</span>
        </div>
      </td>
      <td
        colSpan={5}
        className="py-1 px-4 text-center text-[11px] font-medium tracking-wide text-slate-500 uppercase bg-slate-50/70"
      >
        ✦ {label} ✦
      </td>
    </tr>
  );

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
        <table className="w-full min-w-[850px] border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/90 text-xs font-semibold text-slate-700">
              <th className="py-3 px-4 w-[160px] border-r border-slate-200">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-indigo-600" />
                  <span>Franja / Periodo</span>
                </div>
              </th>
              {DAYS_OF_WEEK.map((day) => (
                <th key={day} className="py-3 px-4 border-r border-slate-200 last:border-r-0">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{day}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {PERIODS.map((period: PeriodSlot, index: number) => {
              const rows = [];

              // Insert recess after 2nd period
              if (index === 2) {
                rows.push(renderBreakRow('Receso General / Descanso', '08:20 - 08:40'));
              }
              // Insert pedagogical break after 4th period
              if (index === 4) {
                rows.push(renderBreakRow('Pausa Activa / Nutrición', '10:30 - 10:50'));
              }

              rows.push(
                <tr key={period.id} className="hover:bg-slate-50/30 transition-colors">
                  <td className="py-3 px-4 border-r border-slate-200 bg-slate-50/50 align-top">
                    <div className="font-semibold text-slate-900">{period.name}</div>
                    <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                      {period.startTime} - {period.endTime}
                    </div>
                    <div className="text-[10px] text-indigo-600 font-medium mt-1">
                      55 min lectivos
                    </div>
                  </td>

                  {DAYS_OF_WEEK.map((day) => {
                    const block = blockMap.get(`${day}___${period.id}`);
                    const hasConflict = block ? conflictBlockIds.has(block.id) : false;

                    return (
                      <td
                        key={`${day}-${period.id}`}
                        className="p-2 border-r border-slate-200 last:border-r-0 align-top w-[16.5%]"
                      >
                        <GridCell
                          dayOfWeek={day}
                          periodId={period.id}
                          block={block}
                          hasConflict={hasConflict}
                          onEditBlock={onEditBlock}
                          onAddBlockToSlot={onAddBlockToSlot}
                        />
                      </td>
                    );
                  })}
                </tr>
              );

              return rows;
            })}
          </tbody>
        </table>
      </div>

      <DragOverlay dropAnimation={{ duration: 150, easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)' }}>
        {activeDragBlock ? (
          <div className="w-[180px] pointer-events-none">
            <BlockCard block={activeDragBlock} isOverlay={true} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
