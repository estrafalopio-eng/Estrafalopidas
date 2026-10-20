export interface BlockItem {
  id: string;
  dayOfWeek: string;
  period: string;
  targetGroup: string;
  subject: string;
  teacher: string;
  classroom?: string;
  color?: string;
}

export type DayOfWeek = 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes';

export interface PeriodSlot {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
}

export const DAYS_OF_WEEK: DayOfWeek[] = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
];

export const PERIODS: PeriodSlot[] = [
  { id: 'P1', name: '1° Periodo', startTime: '06:30', endTime: '07:25' },
  { id: 'P2', name: '2° Periodo', startTime: '07:25', endTime: '08:20' },
  { id: 'P3', name: '3° Periodo', startTime: '08:40', endTime: '09:35' },
  { id: 'P4', name: '4° Periodo', startTime: '09:35', endTime: '10:30' },
  { id: 'P5', name: '5° Periodo', startTime: '10:50', endTime: '11:45' },
  { id: 'P6', name: '6° Periodo', startTime: '11:45', endTime: '12:40' },
];

export const SUBJECT_COLORS: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  'Matemáticas': { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-900', badge: 'bg-blue-100 text-blue-700' },
  'Lengua Castellana': { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-900', badge: 'bg-amber-100 text-amber-700' },
  'Ciencias Naturales': { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-900', badge: 'bg-emerald-100 text-emerald-700' },
  'Ciencias Sociales': { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-900', badge: 'bg-orange-100 text-orange-700' },
  'Inglés': { bg: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-900', badge: 'bg-violet-100 text-violet-700' },
  'Educación Física': { bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-900', badge: 'bg-rose-100 text-rose-700' },
  'Tecnología e Informática': { bg: 'bg-cyan-50', border: 'border-cyan-200', text: 'text-cyan-900', badge: 'bg-cyan-100 text-cyan-700' },
  'Educación Artística': { bg: 'bg-fuchsia-50', border: 'border-fuchsia-200', text: 'text-fuchsia-900', badge: 'bg-fuchsia-100 text-fuchsia-700' },
  'Ética y Valores': { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-900', badge: 'bg-teal-100 text-teal-700' },
  'Filosofía': { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-900', badge: 'bg-indigo-100 text-indigo-700' },
  'Química': { bg: 'bg-lime-50', border: 'border-lime-200', text: 'text-lime-900', badge: 'bg-lime-100 text-lime-700' },
  'Física': { bg: 'bg-sky-50', border: 'border-sky-200', text: 'text-sky-900', badge: 'bg-sky-100 text-sky-700' },
};
