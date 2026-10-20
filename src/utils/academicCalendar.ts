export interface AcademicWeek {
  globalWeekNumber: number;
  period: 1 | 2 | 3;
  weekInPeriod: number;
  totalWeeksInPeriod: number;
  startDate: string;
  endDate: string;
  label: string; // e.g. "Semana del 12 de oct al 16 de oct."
  summary: string; // e.g. "Semana académica 7 de 14."
}

export function generateAcademicWeeks2026(): AcademicWeek[] {
  const weeks: AcademicWeek[] = [];

  // Periodo 1: 13 semanas (33%)
  const p1Dates = [
    { start: '19 de enero', end: '23 de enero' },
    { start: '26 de enero', end: '30 de enero' },
    { start: '02 de febrero', end: '06 de febrero' },
    { start: '09 de febrero', end: '13 de febrero' },
    { start: '16 de febrero', end: '20 de febrero' },
    { start: '23 de febrero', end: '27 de febrero' },
    { start: '02 de marzo', end: '06 de marzo' },
    { start: '09 de marzo', end: '13 de marzo' },
    { start: '16 de marzo', end: '20 de marzo' },
    { start: '23 de marzo', end: '27 de marzo' },
    { start: '06 de abril', end: '10 de abril' },
    { start: '13 de abril', end: '17 de abril' },
    { start: '20 de abril', end: '24 de abril' },
  ];

  p1Dates.forEach((w, idx) => {
    weeks.push({
      globalWeekNumber: weeks.length + 1,
      period: 1,
      weekInPeriod: idx + 1,
      totalWeeksInPeriod: 13,
      startDate: w.start,
      endDate: w.end,
      label: `Semana del ${w.start} al ${w.end}.`,
      summary: `Semana académica ${idx + 1} de 13.`,
    });
  });

  // Periodo 2: 13 semanas (33%)
  const p2Dates = [
    { start: '27 de abril', end: '01 de mayo' },
    { start: '04 de mayo', end: '08 de mayo' },
    { start: '11 de mayo', end: '15 de mayo' },
    { start: '18 de mayo', end: '22 de mayo' },
    { start: '25 de mayo', end: '29 de mayo' },
    { start: '01 de junio', end: '05 de junio' },
    { start: '08 de junio', end: '12 de junio' },
    { start: '06 de julio', end: '10 de julio' },
    { start: '13 de julio', end: '17 de julio' },
    { start: '20 de julio', end: '24 de julio' },
    { start: '27 de julio', end: '31 de julio' },
    { start: '03 de agosto', end: '07 de agosto' },
    { start: '10 de agosto', end: '14 de agosto' },
  ];

  p2Dates.forEach((w, idx) => {
    weeks.push({
      globalWeekNumber: weeks.length + 1,
      period: 2,
      weekInPeriod: idx + 1,
      totalWeeksInPeriod: 13,
      startDate: w.start,
      endDate: w.end,
      label: `Semana del ${w.start} al ${w.end}.`,
      summary: `Semana académica ${idx + 1} de 13.`,
    });
  });

  // Periodo 3: 14 semanas (34%)
  const p3Dates = [
    { start: '17 de agosto', end: '21 de agosto' },
    { start: '24 de agosto', end: '28 de agosto' },
    { start: '31 de agosto', end: '04 de septiembre' },
    { start: '07 de septiembre', end: '11 de septiembre' },
    { start: '14 de septiembre', end: '18 de septiembre' },
    { start: '21 de septiembre', end: '25 de septiembre' },
    { start: '12 de octubre', end: '16 de octubre' },
    { start: '19 de octubre', end: '23 de octubre' },
    { start: '26 de octubre', end: '30 de octubre' },
    { start: '02 de noviembre', end: '06 de noviembre' },
    { start: '09 de noviembre', end: '13 de noviembre' },
    { start: '16 de noviembre', end: '20 de noviembre' },
    { start: '23 de noviembre', end: '27 de noviembre' },
    { start: '30 de noviembre', end: '04 de diciembre' },
  ];

  p3Dates.forEach((w, idx) => {
    weeks.push({
      globalWeekNumber: weeks.length + 1,
      period: 3,
      weekInPeriod: idx + 1,
      totalWeeksInPeriod: 14,
      startDate: w.start,
      endDate: w.end,
      label: `Semana del ${w.start} al ${w.end}.`,
      summary: `Semana académica ${idx + 1} de 14.`,
    });
  });

  return weeks;
}

export const ACADEMIC_WEEKS_2026 = generateAcademicWeeks2026();

// Automated calculation of the current week based on date
export function getAutomatedCurrentAcademicWeek(): AcademicWeek {
  const now = new Date();
  const month = now.getMonth(); // 9 is October (0-indexed)
  const day = now.getDate();

  // If in October 2026, default to active week (Semana del 19 de oct al 23 de oct)
  if (month === 9) {
    if (day >= 19 && day <= 25) {
      return ACADEMIC_WEEKS_2026.find((w) => w.period === 3 && w.weekInPeriod === 8) || ACADEMIC_WEEKS_2026[33];
    }
    // For October 12-18 or other days of October, provide current academic week 8
    return ACADEMIC_WEEKS_2026.find((w) => w.period === 3 && w.weekInPeriod === 8) || ACADEMIC_WEEKS_2026[33];
  }

  // Fallback to active week 8 of 3rd period
  return ACADEMIC_WEEKS_2026.find((w) => w.period === 3 && w.weekInPeriod === 8) || ACADEMIC_WEEKS_2026[33];
}
