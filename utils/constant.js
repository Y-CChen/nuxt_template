export const Layouts = {
  default: 'default',
};

export const MimeTypes = {
  csv: 'text/csv',
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  // cSpell: disable-next-line
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
};

export const defaultApiDebounceMs = 200;

export const defaultItemsPerPageOptions = [10, 20, 50, 100];

export function makeFilename(mimeType, filename) {
  switch (mimeType) {
    case MimeTypes.csv:
      return `${filename}.csv`;
    case MimeTypes.pdf:
      return `${filename}.pdf`;
    case MimeTypes.xls:
      return `${filename}.xls`;
    case MimeTypes.xlsx:
      return `${filename}.xlsx`;
    default:
      return `${filename}`;
  }
}
