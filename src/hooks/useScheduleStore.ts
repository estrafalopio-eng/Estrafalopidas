import { useState, useEffect, useCallback, useMemo } from 'react';
import { BlockItem } from '../types/schedule';
import { INITIAL_INSTITUTIONAL_BLOCKS } from '../data/initialBlocks';

const STORAGE_KEY = 'ie_villa_flora_schedule_blocks_v1';

export interface TeacherConflict {
  teacher: string;
  dayOfWeek: string;
  period: string;
  blockIds: string[];
  groups: string[];
}

export function useScheduleStore() {
  const [blocks, setBlocks] = useState<BlockItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // fallback to initial
    }
    return INITIAL_INSTITUTIONAL_BLOCKS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(blocks));
    } catch (e) {
      console.error('Error guardando en localStorage:', e);
    }
  }, [blocks]);

  const moveOrSwapBlock = useCallback((activeBlockId: string, targetDay: string, targetPeriod: string) => {
    setBlocks((prev) => {
      const activeBlock = prev.find((b) => b.id === activeBlockId);
      if (!activeBlock) return prev;

      if (activeBlock.dayOfWeek === targetDay && activeBlock.period === targetPeriod) {
        return prev;
      }

      // Check if there is an existing block in the same group at the target slot
      const existingTargetBlock = prev.find(
        (b) =>
          b.targetGroup === activeBlock.targetGroup &&
          b.dayOfWeek === targetDay &&
          b.period === targetPeriod &&
          b.id !== activeBlockId
      );

      const oldDay = activeBlock.dayOfWeek;
      const oldPeriod = activeBlock.period;

      return prev.map((b) => {
        if (b.id === activeBlockId) {
          return {
            ...b,
            dayOfWeek: targetDay,
            period: targetPeriod,
          };
        }
        if (existingTargetBlock && b.id === existingTargetBlock.id) {
          // Swap positions
          return {
            ...b,
            dayOfWeek: oldDay,
            period: oldPeriod,
          };
        }
        return b;
      });
    });
  }, []);

  const updateBlock = useCallback((id: string, updates: Partial<BlockItem>) => {
    setBlocks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updates } : b))
    );
  }, []);

  const deleteBlock = useCallback((id: string) => {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
  }, []);

  const addBlock = useCallback((newBlock: Omit<BlockItem, 'id'>) => {
    const id = `VF-BLK-${Date.now().toString().slice(-4)}${Math.floor(Math.random() * 90 + 10)}`;
    setBlocks((prev) => [...prev, { ...newBlock, id }]);
  }, []);

  // Hard Reset to initial 914 factory blocks
  const resetToFactory = useCallback(() => {
    localStorage.clear();
    setBlocks(INITIAL_INSTITUTIONAL_BLOCKS);
  }, []);

  // Clear all blocks to blank canvas
  const clearScheduleCompletely = useCallback(() => {
    localStorage.clear();
    setBlocks([]);
  }, []);

  // Calculate teacher conflicts in real-time
  const teacherConflicts = useMemo(() => {
    const map = new Map<string, BlockItem[]>();

    for (const b of blocks) {
      if (!b.teacher || !b.dayOfWeek || !b.period) continue;
      const key = `${b.teacher}___${b.dayOfWeek}___${b.period}`;
      const list = map.get(key) || [];
      list.push(b);
      map.set(key, list);
    }

    const conflicts: TeacherConflict[] = [];
    for (const [key, items] of map.entries()) {
      if (items.length > 1) {
        const [teacher, dayOfWeek, period] = key.split('___');
        conflicts.push({
          teacher,
          dayOfWeek,
          period,
          blockIds: items.map((i) => i.id),
          groups: items.map((i) => i.targetGroup),
        });
      }
    }
    return conflicts;
  }, [blocks]);

  // Total unique teachers
  const totalTeachers = useMemo(() => {
    const set = new Set<string>();
    blocks.forEach((b) => {
      if (b.teacher) set.add(b.teacher);
    });
    return set.size;
  }, [blocks]);

  // Total unique groups
  const totalGroups = useMemo(() => {
    const set = new Set<string>();
    blocks.forEach((b) => {
      if (b.targetGroup) set.add(b.targetGroup);
    });
    return set.size;
  }, [blocks]);

  return {
    blocks,
    moveOrSwapBlock,
    updateBlock,
    deleteBlock,
    addBlock,
    resetToFactory,
    clearScheduleCompletely,
    teacherConflicts,
    totalTeachers,
    totalGroups,
  };
}
