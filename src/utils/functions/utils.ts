export function subtractDates(ts1: number, ts2: number) {
  const diff = Math.abs(ts1 - ts2);
  return diff / 86400000;
}
