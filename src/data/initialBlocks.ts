import { BlockItem, DAYS_OF_WEEK, PERIODS } from '../types/schedule';

export const TARGET_GROUPS = [
  '6-1', '6-2', '6-3', '6-4', '6-5',
  '7-1', '7-2', '7-3', '7-4', '7-5',
  '8-1', '8-2', '8-3', '8-4', '8-5',
  '9-1', '9-2', '9-3', '9-4', '9-5',
  '10-1', '10-2', '10-3', '10-4',
  '11-1', '11-2', '11-3', '11-4',
  'MT-Sistemas', 'MT-Diseño', 'MT-Gestión'
] as const;

export type TargetGroup = typeof TARGET_GROUPS[number];

const TEACHERS = [
  'Lic. Carlos Restrepo',
  'Mg. Patricia Londoño',
  'Lic. Jorge Iván Gómez',
  'Dra. Claudia Ramírez',
  'Lic. Andrés Felipe Henao',
  'Lic. Marta Lucía Vélez',
  'Ing. David Morales',
  'Lic. Sofía Agudelo',
  'Lic. Fernando Quintero',
  'Mg. Diana Marcela Ríos',
  'Lic. Gabriel Jaramillo',
  'Lic. Marcela Botero',
  'Ing. Juan Pablo Muñoz',
  'Lic. Beatriz Posada',
  'Lic. Héctor Fabio Zapata',
  'Lic. Gloria Patricia Mejía',
];

const SUBJECTS_BASIC = [
  'Matemáticas',
  'Lengua Castellana',
  'Ciencias Naturales',
  'Ciencias Sociales',
  'Inglés',
  'Educación Física',
  'Tecnología e Informática',
  'Educación Artística',
  'Ética y Valores',
];

const SUBJECTS_UPPER = [
  'Matemáticas',
  'Lengua Castellana',
  'Filosofía',
  'Química',
  'Física',
  'Inglés',
  'Educación Física',
  'Tecnología e Informática',
  'Ciencias Sociales',
];

export function generateInitialBlocks(): BlockItem[] {
  const blocks: BlockItem[] = [];
  let blockCounter = 1;

  for (let gIdx = 0; gIdx < TARGET_GROUPS.length; gIdx++) {
    const group = TARGET_GROUPS[gIdx];
    const isUpper = group.startsWith('10') || group.startsWith('11') || group.startsWith('MT');
    const subjectsPool = isUpper ? SUBJECTS_UPPER : SUBJECTS_BASIC;

    for (let dIdx = 0; dIdx < DAYS_OF_WEEK.length; dIdx++) {
      const day = DAYS_OF_WEEK[dIdx];

      for (let pIdx = 0; pIdx < PERIODS.length; pIdx++) {
        const period = PERIODS[pIdx];

        if (blocks.length >= 914) {
          return blocks;
        }

        const subjectIdx = (gIdx * 7 + dIdx * 3 + pIdx) % subjectsPool.length;
        const subject = subjectsPool[subjectIdx];
        const teacherIdx = (subjectIdx * 3 + gIdx) % TEACHERS.length;
        const teacher = TEACHERS[teacherIdx];
        const roomNum = 101 + ((gIdx * 2 + dIdx) % 24);

        blocks.push({
          id: `VF-BLK-${String(blockCounter).padStart(4, '0')}`,
          dayOfWeek: day,
          period: period.id,
          targetGroup: group,
          subject,
          teacher,
          classroom: `Aula ${roomNum}`,
        });

        blockCounter++;
      }
    }
  }

  return blocks;
}

export const INITIAL_INSTITUTIONAL_BLOCKS: BlockItem[] = generateInitialBlocks();
