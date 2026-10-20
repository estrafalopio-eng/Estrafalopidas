import React, { useState, useEffect } from 'react';
import { HeaderVillaFlora } from './components/HeaderVillaFlora';
import { SidebarVillaFlora, ActiveNavTab } from './components/SidebarVillaFlora';
import { ParrillaView } from './components/ParrillaView';
import { HorariosView } from './components/HorariosView';
import { NovedadesView } from './components/NovedadesView';
import { DocentesDisponiblesDrawer } from './components/DocentesDisponiblesDrawer';
import { RegistrarDocenteModal } from './components/RegistrarDocenteModal';
import { EditarDocenteModal } from './components/EditarDocenteModal';
import { HardConfirmModal } from './components/HardConfirmModal';
import { BlockEditModal } from './components/BlockEditModal';
import { OfflineIndicator } from './components/OfflineIndicator';

import {
  TeacherProfile,
  AcademicBlock,
  NovedadItem,
} from './types/villaflora';
import {
  INITIAL_TEACHERS,
  generateVillaFlora914Blocks,
  INITIAL_NOVEDADES,
} from './data/mockVillaFlora';
import {
  ACADEMIC_WEEKS_2026,
  getAutomatedCurrentAcademicWeek,
} from './utils/academicCalendar';

const STORAGE_KEYS = {
  BLOCKS: 'vf_academic_blocks_v2',
  TEACHERS: 'vf_teachers_v2',
  NOVEDADES: 'vf_novedades_v2',
};

export default function App() {
  // Navigation & Level State
  const [activeTab, setActiveTab] = useState<ActiveNavTab>('parrilla');
  const [currentLevel, setCurrentLevel] = useState<'Bachillerato' | 'Primaria'>('Bachillerato');
  const currentAcademicWeek = getAutomatedCurrentAcademicWeek();

  // Teachers State
  const [teachers, setTeachers] = useState<TeacherProfile[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.TEACHERS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return INITIAL_TEACHERS;
  });

  // Academic Blocks State (914 institutional blocks)
  const [blocks, setBlocks] = useState<AcademicBlock[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.BLOCKS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return generateVillaFlora914Blocks();
  });

  // Novedades State
  const [novedades, setNovedades] = useState<NovedadItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.NOVEDADES);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return INITIAL_NOVEDADES;
  });

  // Modals Visibility
  const [isRegisterDocenteOpen, setIsRegisterDocenteOpen] = useState(false);
  const [isEditDocenteOpen, setIsEditDocenteOpen] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [editDocenteTargetId, setEditDocenteTargetId] = useState<string | undefined>();

  const [editingBlock, setEditingBlock] = useState<AcademicBlock | null>(null);
  const [newSlotTarget, setNewSlotTarget] = useState<{ day: string; period: string; group: string } | null>(null);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);

  // Sync with LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BLOCKS, JSON.stringify(blocks));
    } catch (e) {
      console.error(e);
    }
  }, [blocks]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TEACHERS, JSON.stringify(teachers));
    } catch (e) {
      console.error(e);
    }
  }, [teachers]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.NOVEDADES, JSON.stringify(novedades));
    } catch (e) {
      console.error(e);
    }
  }, [novedades]);

  // Block Move / Swap in 2D Matrix
  const handleMoveOrSwapBlock = (
    activeId: string,
    targetDay: string,
    targetPeriod: string,
    targetGroup: string
  ) => {
    setBlocks((prev) => {
      const active = prev.find((b) => b.id === activeId);
      if (!active) return prev;

      if (
        active.dayOfWeek === targetDay &&
        active.period === targetPeriod &&
        active.targetGroup === targetGroup
      ) {
        return prev;
      }

      // Check for target occupant
      const existing = prev.find(
        (b) =>
          b.dayOfWeek === targetDay &&
          b.period === targetPeriod &&
          b.targetGroup === targetGroup &&
          b.id !== activeId
      );

      const oldDay = active.dayOfWeek;
      const oldPeriod = active.period;
      const oldGroup = active.targetGroup;

      return prev.map((b) => {
        if (b.id === activeId) {
          return {
            ...b,
            dayOfWeek: targetDay,
            period: targetPeriod,
            targetGroup: targetGroup,
          };
        }
        if (existing && b.id === existing.id) {
          return {
            ...b,
            dayOfWeek: oldDay,
            period: oldPeriod,
            targetGroup: oldGroup,
          };
        }
        return b;
      });
    });
  };

  // Add Teacher
  const handleSaveNewTeacher = (
    teacherData: Omit<TeacherProfile, 'id' | 'activeGroupsCount' | 'status'>
  ) => {
    const id = `T-${Date.now().toString().slice(-4)}`;
    const newT: TeacherProfile = {
      ...teacherData,
      id,
      activeGroupsCount: 0,
      status: 'Activo',
    };
    setTeachers((prev) => [newT, ...prev]);
  };

  // Update Teacher
  const handleUpdateTeacher = (id: string, updates: Partial<TeacherProfile>) => {
    setTeachers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
    // If color or name changed, update corresponding academic blocks
    if (updates.color || updates.name) {
      setBlocks((prev) =>
        prev.map((b) => {
          const teacher = teachers.find((t) => t.id === id);
          if (teacher && b.teacher === teacher.name) {
            return {
              ...b,
              teacher: updates.name || b.teacher,
              teacherColor: updates.color || b.teacherColor,
              teacherInitials: (updates.name || b.teacher)
                .split(' ')
                .map((n) => n[0])
                .slice(0, 2)
                .join('')
                .toUpperCase(),
            };
          }
          return b;
        })
      );
    }
  };

  // Add / Delete Novedades
  const handleAddNovedad = (item: Omit<NovedadItem, 'id'>) => {
    const id = `NOV-${Date.now().toString().slice(-4)}`;
    setNovedades((prev) => [{ ...item, id }, ...prev]);
  };

  const handleDeleteNovedad = (id: string) => {
    setNovedades((prev) => prev.filter((n) => n.id !== id));
  };

  // Factory Reset (Requires CONFIRMAR modal)
  const handleFactoryReset = () => {
    localStorage.clear();
    setBlocks(generateVillaFlora914Blocks());
    setTeachers(INITIAL_TEACHERS);
    setNovedades(INITIAL_NOVEDADES);
  };

  const handleClearAll = () => {
    localStorage.clear();
    setBlocks([]);
  };

  // Block Modal Handlers
  const handleEditBlock = (block: AcademicBlock) => {
    setEditingBlock(block);
    setNewSlotTarget(null);
    setIsBlockModalOpen(true);
  };

  const handleAddBlockToSlot = (day: string, period: string, group: string) => {
    setEditingBlock(null);
    setNewSlotTarget({ day, period, group });
    setIsBlockModalOpen(true);
  };

  const handleSaveBlockModal = (data: any) => {
    const teacherObj = teachers.find((t) => t.name === data.teacher) || teachers[0];

    if (editingBlock) {
      setBlocks((prev) =>
        prev.map((b) =>
          b.id === editingBlock.id
            ? {
                ...b,
                subject: data.subject,
                teacher: data.teacher,
                classroom: data.classroom,
                teacherColor: teacherObj?.color || b.teacherColor,
                teacherInitials: data.teacher
                  .split(' ')
                  .map((n: string) => n[0])
                  .slice(0, 2)
                  .join('')
                  .toUpperCase(),
              }
            : b
        )
      );
    } else if (newSlotTarget) {
      const id = `VF-BLK-${Date.now().toString().slice(-4)}`;
      const newBlock: AcademicBlock = {
        id,
        dayOfWeek: newSlotTarget.day,
        period: newSlotTarget.period,
        targetGroup: newSlotTarget.group,
        subject: data.subject || 'Matemáticas',
        teacher: data.teacher || teachers[0].name,
        classroom: data.classroom || 'Aula 101',
        teacherColor: teacherObj?.color || '#1E3A8A',
        teacherInitials: (data.teacher || teachers[0].name)
          .split(' ')
          .map((n: string) => n[0])
          .slice(0, 2)
          .join('')
          .toUpperCase(),
      };
      setBlocks((prev) => [...prev, newBlock]);
    }
  };

  const handleDeleteBlock = (id: string) => {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
  };

  const handleDeleteMultipleBlocks = (ids: string[]) => {
    const idSet = new Set(ids);
    setBlocks((prev) => prev.filter((b) => !idSet.has(b.id)));
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#f8fafc] text-slate-800 font-sans select-none">
      {/* Left Sidebar spanning the full height of the application screen */}
      <SidebarVillaFlora
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenRegisterDocente={() => setIsRegisterDocenteOpen(true)}
        onOpenEditDocentes={() => {
          setEditDocenteTargetId(undefined);
          setIsEditDocenteOpen(true);
        }}
        onOpenResetFactory={() => setIsResetConfirmOpen(true)}
        teachersCount={teachers.length}
        novedadesCount={novedades.filter((n) => n.status === 'Vigente').length}
        totalHours={121}
        uncoveredHours={40}
        coveredHours={81}
        currentWeek={currentAcademicWeek}
      />

      {/* Main Workspace Area: Top Header + Scrollable Content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <HeaderVillaFlora
          currentLevel={currentLevel}
          onSelectLevel={setCurrentLevel}
          onOpenDeleteModal={() => setIsResetConfirmOpen(true)}
          onUndo={() => {}}
          onRedo={() => {}}
          onPublish={() => alert('¡Parrilla horaria publicada exitosamente!')}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-5 lg:p-6 bg-[#f8fafc]">
          {activeTab === 'parrilla' && (
            <ParrillaView
              blocks={blocks}
              onMoveOrSwapBlock={handleMoveOrSwapBlock}
              onEditBlock={handleEditBlock}
              onAddBlockToSlot={handleAddBlockToSlot}
              onDeleteBlock={handleDeleteBlock}
              onDeleteMultipleBlocks={handleDeleteMultipleBlocks}
            />
          )}

          {activeTab === 'horarios' && (
            <HorariosView
              teachers={teachers}
              onOpenRegisterModal={() => setIsRegisterDocenteOpen(true)}
              onOpenEditModal={(id) => {
                setEditDocenteTargetId(id);
                setIsEditDocenteOpen(true);
              }}
              onGoToMatrix={() => setActiveTab('parrilla')}
            />
          )}

          {activeTab === 'novedades' && (
            <NovedadesView
              novedades={novedades}
              onAddNovedad={handleAddNovedad}
              onDeleteNovedad={handleDeleteNovedad}
            />
          )}
        </main>
      </div>

      {/* Yellow Slide-over Tab: Docentes Disponibles (matching Image 1) */}
      <DocentesDisponiblesDrawer teachers={teachers} />

      {/* Hard-Confirm Security Modal (Requires writing "CONFIRMAR") */}
      <HardConfirmModal
        isOpen={isResetConfirmOpen}
        onClose={() => setIsResetConfirmOpen(false)}
        onConfirmFactoryReset={handleFactoryReset}
        onConfirmClearAll={handleClearAll}
        totalBlocks={blocks.length}
      />

      {/* Registrar Docente Modal (Image 3) */}
      <RegistrarDocenteModal
        isOpen={isRegisterDocenteOpen}
        onClose={() => setIsRegisterDocenteOpen(false)}
        onSaveTeacher={handleSaveNewTeacher}
        existingTeachers={teachers}
      />

      {/* Editar Docente Modal (Image 4) */}
      <EditarDocenteModal
        isOpen={isEditDocenteOpen}
        onClose={() => setIsEditDocenteOpen(false)}
        teachers={teachers}
        initialTeacherId={editDocenteTargetId}
        onUpdateTeacher={handleUpdateTeacher}
      />

      {/* Block Edit / Add Modal */}
      <BlockEditModal
        isOpen={isBlockModalOpen}
        block={editingBlock ? (editingBlock as any) : null}
        defaultDay={newSlotTarget?.day}
        defaultPeriod={newSlotTarget?.period}
        targetGroup={editingBlock?.targetGroup || newSlotTarget?.group || '6°1'}
        onClose={() => setIsBlockModalOpen(false)}
        onSave={handleSaveBlockModal}
        onDelete={handleDeleteBlock}
      />

      {/* PWA Offline indicator */}
      <OfflineIndicator />
    </div>
  );
}
