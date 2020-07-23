export function subtractDates(d1: Date, d2: Date) {
  const diff = Math.abs(d1.getTime() - d2.getTime());
  return diff / 86400000;
}

export function deepReadObject(obj: any, deepKey: string) {
  const keys = deepKey.split(".");
  const deepValue = keys.reduce((currObj, currKey) => (currObj ? currObj[currKey] : undefined), obj);
  return deepValue;
}
