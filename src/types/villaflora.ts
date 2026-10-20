export interface TeacherProfile {
  id: string;
  name: string;
  email: string;
  documentId: string;
  phone: string;
  maxHours: number;
  color: string;
  level: 'Bachillerato' | 'Primaria';
  subjects: string[];
  activeGroupsCount: number;
  status: 'Activo' | 'Inactivo';
}

export interface AcademicBlock {
  id: string;
  dayOfWeek: string;
  period: string;
  targetGroup: string;
  subject: string;
  teacher: string;
  classroom: string;
  teacherColor: string;
  teacherInitials: string;
}

export interface NovedadItem {
  id: string;
  type: 'Urgencia' | 'Incapacidad' | 'Permiso' | 'Aviso Oficial';
  title: string;
  content: string;
  recipient: string;
  emissionDate: string;
  expirationDate: string;
  status: 'Vigente' | 'Vencida';
}

export interface PeriodDefinition {
  id: string;
  name: string;
  timeRange: string;
  startTime: string;
  endTime: string;
  isRecess?: boolean;
}

export const ACADEMIC_PERIODS: PeriodDefinition[] = [
  { id: 'H1', name: '1ª Hora', timeRange: 'de 06:10 a 07:05', startTime: '06:10', endTime: '07:05' },
  { id: 'H2', name: '2ª Hora', timeRange: 'de 07:05 a 08:00', startTime: '07:05', endTime: '08:00' },
  { id: 'H3', name: '3ª Hora', timeRange: 'de 08:00 a 08:55', startTime: '08:00', endTime: '08:55' },
  { id: 'REC', name: 'Receso', timeRange: 'de 08:55 a 09:25', startTime: '08:55', endTime: '09:25', isRecess: true },
  { id: 'H4', name: '4ª Hora', timeRange: 'de 09:25 a 10:20', startTime: '09:25', endTime: '10:20' },
  { id: 'H5', name: '5ª Hora', timeRange: 'de 10:20 a 11:15', startTime: '10:20', endTime: '11:15' },
  { id: 'H6', name: '6ª Hora', timeRange: 'de 11:15 a 12:10', startTime: '11:15', endTime: '12:10' },
];

export const ACADEMIC_DAYS = [
  { id: 'Lunes', label: 'Lunes 19 de oct', isHoliday: false },
  { id: 'Martes', label: 'Martes 20 de oct', isHoliday: false },
  { id: 'Miércoles', label: 'Miércoles 21 de oct', isHoliday: false },
  { id: 'Jueves', label: 'Jueves 22 de oct', isHoliday: false },
  { id: 'Viernes', label: 'Viernes 23 de oct', isHoliday: false },
];

export interface ClassroomGroup {
  id: string;
  name: string;
  grade: string;
  classroom: string;
}

export const CLASSROOM_GROUPS: ClassroomGroup[] = [
  { id: '6°1', name: '6°1', grade: '6', classroom: 'Aula 303' },
  { id: '6°2', name: '6°2', grade: '6', classroom: 'Aula 402' },
  { id: '7°1', name: '7°1', grade: '7', classroom: 'Aula 202' },
  { id: '7°2', name: '7°2', grade: '7', classroom: 'Aula 304' },
  { id: '8°1', name: '8°1', grade: '8', classroom: 'Aula 401' },
  { id: '8°2', name: '8°2', grade: '8', classroom: 'Aula 302' },
  { id: '9°1', name: '9°1', grade: '9', classroom: 'Aula ROTA' },
  { id: '9°2', name: '9°2', grade: '9', classroom: 'Aula 301' },
  { id: '10°1', name: '10°1', grade: '10', classroom: 'Aula 201' },
  { id: '10°2', name: '10°2', grade: '10', classroom: 'Aula 102' },
  { id: '11°1', name: '11°1', grade: '11', classroom: 'Aula 103' },
  { id: '11°2', name: '11°2', grade: '11', classroom: 'Aula 305' },
];

export interface OfficialSubject {
  id: string;
  officialName: string;
  shortName: string;
}

export const OFFICIAL_SUBJECTS: OfficialSubject[] = [
  { id: 'MAT', officialName: 'Matemáticas', shortName: 'Matemáticas' },
  { id: 'CAS', officialName: 'Humanidades y Lengua Castellana', shortName: 'Castellano' },
  { id: 'ING', officialName: 'Idioma Extranjero Inglés', shortName: 'Inglés' },
  { id: 'NAT', officialName: 'Ciencias Naturales y Educación Ambiental', shortName: 'C. Naturales' },
  { id: 'SOC', officialName: 'Ciencias Sociales, Historia y Geografía', shortName: 'C. Sociales' },
  { id: 'FIL', officialName: 'Filosofía', shortName: 'Filosofía' },
  { id: 'ART', officialName: 'Educación Artística', shortName: 'Artes' },
  { id: 'EFI', officialName: 'Educación Física, Recreación y Deportes', shortName: 'Ed. Física' },
  { id: 'ETI', officialName: 'Educación Ética y en Valores', shortName: 'Ética' },
  { id: 'TEC', officialName: 'Tecnología e Informática', shortName: 'Tecnología' },
  { id: 'MTA', officialName: 'Media Técnica: Edición Audiovisual', shortName: 'Audiovisuales' },
  { id: 'MTB', officialName: 'Media Técnica: Bases de Datos', shortName: 'Bases de Datos' },
];

export const MEN_SUBJECTS = OFFICIAL_SUBJECTS.map((s) => s.officialName);


export const CURATED_PALETTE = [
  '#007DC5', // Cyan institucional C=100 M=40 Y=0 K=0
  '#034EA2', // Azul marino institucional C=100 M=80 Y=0 K=0
  '#ED145B', // Magenta institucional C=0 M=100 Y=50 K=0
  '#231F20', // Negro institucional C=0 M=0 Y=0 K=100
  '#939598', // Gris institucional C=0 M=0 Y=0 K=50
  '#059669', '#15803D', '#D97706', '#6D28D9', '#4338CA',
];
