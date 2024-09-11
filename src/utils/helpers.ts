// dd/mm/yyyy
export function formatNormalDate(date: string | Date) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
// dd/M/yyyy
export function formatDateShortMonth(date: string | Date) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function convertToStartOfDay(date: Date | string) {
  const dateObj = new Date(date);
  dateObj.setHours(0, 0, 0, 0);
  return dateObj.toString();
}

export function convertToEndOfDay(date: Date | string) {
  const dateObj = new Date(date);
  dateObj.setHours(23, 59, 59, 999);
  return dateObj.toString();
}

export function formatSingleConstantValue<T extends string>(
  id: T | null,
  objectType: {
    [key in T]: { id: T; name: string };
  }
) {
  return id ? { id, name: objectType[id].name } : null;
}
