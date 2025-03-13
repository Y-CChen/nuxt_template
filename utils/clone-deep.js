export function cloneDeep(value) {
  if (typeof value !== 'object' || value === null) {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map(cloneDeep);
  }
  const result = {};
  for (const key in value) {
    result[key] = cloneDeep(value[key]);
  }
  return result;
}
