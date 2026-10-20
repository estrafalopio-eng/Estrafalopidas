import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { BlockItem } from '../types/schedule';
import { BlockCard } from './BlockCard';
import { Plus } from 'lucide-react';

interface GridCellProps {
  dayOfWeek: string;
  periodId: string;
  block?: BlockItem;
  hasConflict?: boolean;
  onEditBlock: (block: BlockItem) => void;
  onAddBlockToSlot: (day: string, period: string) => void;
}

export const GridCell: React.FC<GridCellProps> = ({
  dayOfWeek,
  periodId,
  block,
  hasConflict = false,
  onEditBlock,
  onAddBlockToSlot,
}) => {
  const cellId = `${dayOfWeek}___${periodId}`;
  const { setNodeRef, isOver } = useDroppable({
    id: cellId,
    data: { dayOfWeek, periodId },
  });

  return (
    <div
      ref={setNodeRef}
      className={`relative min-h-[96px] rounded-xl border p-1.5 transition-all flex flex-col justify-center ${
        isOver
          ? 'border-indigo-500 bg-indigo-50/80 ring-2 ring-indigo-400 ring-offset-1'
          : 'border-slate-200/80 bg-white hover:border-slate-300'
      }`}
    >
      {block ? (
        <BlockCard
          block={block}
          hasConflict={hasConflict}
          onEdit={onEditBlock}
        />
      ) : (
        <button
          type="button"
          onClick={() => onAddBlockToSlot(dayOfWeek, periodId)}
          className={`h-full min-h-[82px] w-full rounded-lg border border-dashed flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer group ${
            isOver
              ? 'border-indigo-400 bg-indigo-100/50 text-indigo-700'
              : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50/70 text-slate-400 hover:text-indigo-600'
          }`}
        >
          <div className="rounded-full bg-slate-100 p-1 group-hover:bg-indigo-100 transition">
            <Plus className="w-3.5 h-3.5" />
          </div>
          <span className="text-[11px] font-medium">Espacio libre</span>
        </button>
      )}
    </div>
  );
};
