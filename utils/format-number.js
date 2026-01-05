export function makeFormatNumber(fractionDigits, roundingMode = 'halfExpand') {
  return (number) => {
    number = parseFloat(number);
    if (isNaN(number)) {
      return '';
    }
    return `${(number || 0).toLocaleString('en', {
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
      roundingMode,
    })}`;
  };
}
