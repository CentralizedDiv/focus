export function subtractDates(ts1: number, ts2: number) {
  const diff = Math.abs(ts1 - ts2);
  return diff / 86400000;
}

export function deepReadObject(obj: any, deepKey: string) {
  const keys = deepKey.split(".");
  const deepValue = keys.reduce((currObj, currKey) => (currObj ? currObj[currKey] : undefined), obj);
  return deepValue;
}
