export const daysOverlap = (days1, days2) =>
  days1?.split('').some(day => days2?.includes(day));

export const hoursOverlap = (hours1, hours2) =>
  hours1 && hours2 &&
  Math.max(hours1.start, hours2.start) <
  Math.min(hours1.end, hours2.end);

export const timeConflict = (course1, course2) =>
  daysOverlap(course1.days, course2.days) &&
  hoursOverlap(course1.hours, course2.hours);

export const hasConflict = (course, selected) =>
  selected.some(selection =>
    selection !== course &&
    timeConflict(course, selection)
  );