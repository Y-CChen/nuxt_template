export function parseNaturalNumber(value, defaultValue = 0) {
  const n = Math.max(0, parseInt(value));
  return isNaN(n) ? defaultValue : n;
}
