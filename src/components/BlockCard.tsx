import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { BlockItem, SUBJECT_COLORS } from '../types/schedule';
import { GripVertical, User, MapPin, AlertCircle, Edit2 } from 'lucide-react';

interface BlockCardProps {
  block: BlockItem;
  hasConflict?: boolean;
  onEdit?: (block: BlockItem) => void;
  isOverlay?: boolean;
}

export const BlockCard: React.FC<BlockCardProps> = ({
  block,
  hasConflict = false,
  onEdit,
  isOverlay = false,
}) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: block.id,
    data: block,
    disabled: isOverlay,
  });

  const colorScheme = SUBJECT_COLORS[block.subject] || {
    bg: 'bg-slate-50',
    border: 'border-slate-200',
    text: 'text-slate-800',
    badge: 'bg-slate-100 text-slate-700',
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`group relative rounded-xl border p-2.5 transition-all select-none text-left ${
        colorScheme.bg
      } ${
        hasConflict
          ? 'border-red-400 ring-2 ring-red-200'
          : `${colorScheme.border} hover:border-indigo-300 hover:shadow-md`
      } ${
        isDragging
          ? 'opacity-30 scale-95 border-dashed border-indigo-400'
          : 'shadow-xs'
      } ${
        isOverlay ? 'shadow-2xl ring-2 ring-indigo-500 scale-105 cursor-grabbing opacity-95' : 'cursor-grab active:cursor-grabbing'
      }`}
    >
      <div className="flex items-start justify-between gap-1 mb-1.5">
        <span
          className={`inline-block px-2 py-0.5 rounded-md text-[11px] font-semibold tracking-tight truncate max-w-[130px] ${colorScheme.badge}`}
          title={block.subject}
        >
          {block.subject}
        </span>
        <div className="flex items-center gap-1 shrink-0">
          {hasConflict && (
            <span
              className="text-red-600 animate-pulse"
              title="¡Alerta de colisión! El docente tiene otro grupo en este periodo."
            >
              <AlertCircle className="w-3.5 h-3.5" />
            </span>
          )}
          {onEdit && !isOverlay && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(block);
              }}
              className="opacity-0 group-hover:opacity-100 transition rounded p-0.5 text-slate-400 hover:text-slate-700 hover:bg-white/80 cursor-pointer"
              title="Editar bloque"
            >
              <Edit2 className="w-3 h-3" />
            </button>
          )}
          <GripVertical className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600" />
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-800 truncate" title={block.teacher}>
          <User className="w-3 h-3 text-slate-400 shrink-0" />
          <span className="truncate">{block.teacher}</span>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5 border-t border-black/5">
          <div className="flex items-center gap-1">
            <MapPin className="w-2.5 h-2.5 text-slate-400" />
            <span>{block.classroom || 'Aula estándar'}</span>
          </div>
          <span className="font-mono text-[10px] text-slate-400">{block.id.split('-').pop()}</span>
        </div>
      </div>
    </div>
  );
};
