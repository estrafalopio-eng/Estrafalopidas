import { TeacherProfile, AcademicBlock, NovedadItem, CLASSROOM_GROUPS, ACADEMIC_PERIODS, ACADEMIC_DAYS } from '../types/villaflora';

export const INITIAL_TEACHERS: TeacherProfile[] = [
  {
    id: 'T-001',
    name: 'Alejandro',
    email: 'alejandro@ievillaflora.edu.co',
    documentId: '71234001',
    phone: '3001001001',
    maxHours: 22,
    color: '#133E87',
    level: 'Bachillerato',
    subjects: ['Inglés', 'Laboratorio de Inglés'],
    activeGroupsCount: 6,
    status: 'Activo',
  },
  {
    id: 'T-002',
    name: 'Jairo Andrés',
    email: 'jairo.andres@ievillaflora.edu.co',
    documentId: '71234002',
    phone: '3001001002',
    maxHours: 22,
    color: '#EA580C',
    level: 'Bachillerato',
    subjects: ['C. Naturales', 'Ciencias Naturales'],
    activeGroupsCount: 6,
    status: 'Activo',
  },
  {
    id: 'T-003',
    name: 'Laura',
    email: 'laura@ievillaflora.edu.co',
    documentId: '71234003',
    phone: '3001001003',
    maxHours: 22,
    color: '#3B82F6',
    level: 'Bachillerato',
    subjects: ['Ética', 'Ética y Valores'],
    activeGroupsCount: 12,
    status: 'Activo',
  },
  {
    id: 'T-004',
    name: 'Claudia',
    email: 'claudia@ievillaflora.edu.co',
    documentId: '71234004',
    phone: '3001001004',
    maxHours: 22,
    color: '#10B981',
    level: 'Bachillerato',
    subjects: ['Estadística', 'Matemáticas'],
    activeGroupsCount: 8,
    status: 'Activo',
  },
  {
    id: 'T-005',
    name: 'Betty',
    email: 'betty@ievillaflora.edu.co',
    documentId: '71234005',
    phone: '3001001005',
    maxHours: 22,
    color: '#166534',
    level: 'Bachillerato',
    subjects: ['Lengua Castellana', 'Comprensión Lectora'],
    activeGroupsCount: 7,
    status: 'Activo',
  },
  {
    id: 'T-006',
    name: 'Diego',
    email: 'diego@ievillaflora.edu.co',
    documentId: '71234006',
    phone: '3001001006',
    maxHours: 22,
    color: '#7F1D1D',
    level: 'Bachillerato',
    subjects: ['Tecnología', 'Tecnología e Informática'],
    activeGroupsCount: 6,
    status: 'Activo',
  },
  {
    id: 'T-007',
    name: 'Linda',
    email: 'linda@ievillaflora.edu.co',
    documentId: '71234007',
    phone: '3001001007',
    maxHours: 22,
    color: '#F43F5E',
    level: 'Bachillerato',
    subjects: ['Artística', 'Educación Artística'],
    activeGroupsCount: 5,
    status: 'Activo',
  },
  {
    id: 'T-008',
    name: 'M Isabel',
    email: 'misabel@ievillaflora.edu.co',
    documentId: '71234008',
    phone: '3001001008',
    maxHours: 22,
    color: '#4C1D95',
    level: 'Bachillerato',
    subjects: ['Literatura', 'Lengua Castellana'],
    activeGroupsCount: 6,
    status: 'Activo',
  },
  {
    id: 'T-009',
    name: 'Lorena L',
    email: 'lorenal@ievillaflora.edu.co',
    documentId: '71234009',
    phone: '3001001009',
    maxHours: 22,
    color: '#8B5CF6',
    level: 'Bachillerato',
    subjects: ['Estadística', 'Geometría'],
    activeGroupsCount: 8,
    status: 'Activo',
  },
  {
    id: 'T-010',
    name: 'Natalia',
    email: 'natalia@ievillaflora.edu.co',
    documentId: '71234010',
    phone: '3001001010',
    maxHours: 22,
    color: '#78350F',
    level: 'Bachillerato',
    subjects: ['Inglés', 'Francés'],
    activeGroupsCount: 7,
    status: 'Activo',
  },
  {
    id: 'T-011',
    name: 'Lorena M',
    email: 'lorenam@ievillaflora.edu.co',
    documentId: '71234011',
    phone: '3001001011',
    maxHours: 22,
    color: '#D97706',
    level: 'Bachillerato',
    subjects: ['Matemáticas', 'Cálculo'],
    activeGroupsCount: 10,
    status: 'Activo',
  },
  {
    id: 'T-012',
    name: 'Katia',
    email: 'katia@ievillaflora.edu.co',
    documentId: '71234012',
    phone: '3001001012',
    maxHours: 22,
    color: '#0891B2',
    level: 'Bachillerato',
    subjects: ['Economía y Pol.', 'Ciencias Sociales'],
    activeGroupsCount: 4,
    status: 'Activo',
  },
  {
    id: 'T-013',
    name: 'Gabriel Jaramillo',
    email: 'gabriel.jaramillo@ievillaflora.edu.co',
    documentId: '71234013',
    phone: '3001001013',
    maxHours: 22,
    color: '#15803D',
    level: 'Bachillerato',
    subjects: ['Matemáticas', 'Estadística'],
    activeGroupsCount: 6,
    status: 'Activo',
  },
  {
    id: 'T-014',
    name: 'Marcela Botero',
    email: 'marcela.botero@ievillaflora.edu.co',
    documentId: '71234014',
    phone: '3001001014',
    maxHours: 22,
    color: '#64748B',
    level: 'Bachillerato',
    subjects: ['Lengua Castellana'],
    activeGroupsCount: 5,
    status: 'Activo',
  },
  {
    id: 'T-015',
    name: 'Juan Pablo Muñoz',
    email: 'juanpablo.munoz@ievillaflora.edu.co',
    documentId: '71234015',
    phone: '3001001015',
    maxHours: 22,
    color: '#0369A1',
    level: 'Bachillerato',
    subjects: ['Inglés'],
    activeGroupsCount: 7,
    status: 'Activo',
  },
];

// Complete 35 teachers list to match the "(35)" badge from screenshots
for (let i = 16; i <= 35; i++) {
  const pal = [
    '#991B1B', '#E11D48', '#BE185D', '#6D28D9', '#4338CA',
    '#1E3A8A', '#0284C7', '#0D9488', '#059669', '#15803D',
    '#B45309', '#D97706', '#7C2D12', '#475569', '#1E293B'
  ];
  const names = ['Andrés Felipe', 'Beatriz', 'Héctor Fabio', 'Gloria Patricia', 'Mauricio', 'Luz Marina', 'Gustavo', 'Liliana', 'Oscar', 'Sandra', 'Hernán', 'Yolanda', 'Rodrigo', 'Esperanza', 'Guillermo', 'Paula', 'Esteban', 'Paola', 'Santiago', 'Daniela'];
  const name = names[i - 16] || `Docente ${i}`;
  INITIAL_TEACHERS.push({
    id: `T-${String(i).padStart(3, '0')}`,
    name,
    email: `${name.toLowerCase().replace(/\s+/g, '.')}@ievillaflora.edu.co`,
    documentId: `71234${String(i).padStart(3, '0')}`,
    phone: `3001001${String(i).padStart(3, '0')}`,
    maxHours: 22,
    color: pal[i % pal.length],
    level: i > 30 ? 'Primaria' : 'Bachillerato',
    subjects: ['Matemáticas', 'Ciencias Sociales'],
    activeGroupsCount: 5,
    status: 'Activo',
  });
}

export function generateVillaFlora914Blocks(): AcademicBlock[] {
  const blocks: AcademicBlock[] = [];
  const periods = ACADEMIC_PERIODS.filter((p) => !p.isRecess);
  const days = ACADEMIC_DAYS.map((d) => d.id);
  let idCounter = 1;

  // Exact 12 cells from the user's screenshot for Lunes 1a Hora (H1)
  const mondayH1Exact = [
    { group: '6°1', subject: 'Inglés', teacherIndex: 0, room: 'Aula 303' },
    { group: '6°2', subject: 'C. Naturales', teacherIndex: 1, room: 'Aula 402' },
    { group: '7°1', subject: 'Ética', teacherIndex: 2, room: 'Aula 202' },
    { group: '7°2', subject: 'Estadística', teacherIndex: 3, room: 'Aula 304' },
    { group: '8°1', subject: 'Lengua Castellana', teacherIndex: 4, room: 'Aula 401' },
    { group: '8°2', subject: 'Tecnología', teacherIndex: 5, room: 'Aula 302' },
    { group: '9°1', subject: 'Artística', teacherIndex: 6, room: 'Aula ROTA' },
    { group: '9°2', subject: 'Literatura', teacherIndex: 7, room: 'Aula 301' },
    { group: '10°1', subject: 'Estadística', teacherIndex: 8, room: 'Aula 201' },
    { group: '10°2', subject: 'Inglés', teacherIndex: 9, room: 'Aula 102' },
    { group: '11°1', subject: 'Matemáticas', teacherIndex: 10, room: 'Aula 103' },
    { group: '11°2', subject: 'Economía y Pol.', teacherIndex: 11, room: 'Aula 305' },
  ];

  for (const item of mondayH1Exact) {
    const teacher = INITIAL_TEACHERS[item.teacherIndex];
    blocks.push({
      id: `VF-BLK-${String(idCounter).padStart(4, '0')}`,
      dayOfWeek: 'Lunes',
      period: 'H1',
      targetGroup: item.group,
      subject: item.subject,
      teacher: teacher.name,
      classroom: item.room,
      teacherColor: teacher.color,
      teacherInitials: teacher.name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase(),
    });
    idCounter++;
  }

  // Generate blocks across all groups and periods up to 914
  for (let g = 0; g < 31; g++) {
    const group = CLASSROOM_GROUPS[g % CLASSROOM_GROUPS.length];
    const groupName = g < CLASSROOM_GROUPS.length ? group.name : `G-${g + 1}`;
    const groupRoom = g < CLASSROOM_GROUPS.length ? group.classroom : `Aula ${200 + g}`;

    for (let d = 0; d < days.length; d++) {
      const day = days[d];
      for (let p = 0; p < periods.length; p++) {
        if (blocks.length >= 914) return blocks;

        // Skip if already inserted in mondayH1Exact
        if (day === 'Lunes' && periods[p].id === 'H1' && g < mondayH1Exact.length) {
          continue;
        }

        const teacher = INITIAL_TEACHERS[(g * 3 + d * 2 + p) % INITIAL_TEACHERS.length];
        const subject = teacher.subjects[p % teacher.subjects.length] || 'Área Fundamental';
        const initials = teacher.name
          .split(' ')
          .map((n) => n[0])
          .slice(0, 2)
          .join('')
          .toUpperCase();

        blocks.push({
          id: `VF-BLK-${String(idCounter).padStart(4, '0')}`,
          dayOfWeek: day,
          period: periods[p].id,
          targetGroup: groupName,
          subject,
          teacher: teacher.name,
          classroom: groupRoom,
          teacherColor: teacher.color,
          teacherInitials: initials,
        });

        idCounter++;
      }
    }
  }

  return blocks;
}

export const INITIAL_NOVEDADES: NovedadItem[] = [
  {
    id: 'NOV-001',
    type: 'Urgencia',
    title: 'Comité de Convivencia Extraordinario - Grado 9°',
    content: 'Reunión urgente en sala de profesores a las 10:15 am para tratar situación de...',
    recipient: 'Todos',
    emissionDate: '2026-10-18',
    expirationDate: '2026-10-22',
    status: 'Vigente',
  },
  {
    id: 'NOV-002',
    type: 'Incapacidad',
    title: 'Reporte de Incapacidad Médica (3 Días)',
    content: 'Incapacidad certificada por EPS para docente de área fundamental. Requiere...',
    recipient: 'CARLOS MARIO RAMIREZ',
    emissionDate: '2026-10-17',
    expirationDate: '2026-10-23',
    status: 'Vigente',
  },
  {
    id: 'NOV-003',
    type: 'Permiso',
    title: 'Permiso Sindical Autorizado',
    content: 'Comisión oficial de capacitación pedagógica convocada por Secretaría de Educación.',
    recipient: 'Alejandro',
    emissionDate: '2026-10-10',
    expirationDate: '2026-10-14',
    status: 'Vencida',
  },
  {
    id: 'NOV-004',
    type: 'Aviso Oficial',
    title: 'Entrega de Informes Parciales del 3er Periodo',
    content: 'Fecha límite de cargue en plataforma institucional según directiva de Rectoría.',
    recipient: 'Todos',
    emissionDate: '2026-10-05',
    expirationDate: '2026-10-12',
    status: 'Vencida',
  },
];
