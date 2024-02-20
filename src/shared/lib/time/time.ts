export const translateDate = (date: Date, time: boolean = false): string => {
  return new Date(date || null).toLocaleDateString('ru', {
    year: 'numeric',
    day: '2-digit',
    month: '2-digit',
    hour: time ? '2-digit' : undefined,
    minute: time ? '2-digit' : undefined,
    second: time ? '2-digit' : undefined
  });
};
