export function makeFormatNumber(fractionDigits, roundingMode = 'halfExpand') {
  return (number) => {
    return `${(number || 0).toLocaleString('en', {
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
      roundingMode,
    })}`;
  };
}
