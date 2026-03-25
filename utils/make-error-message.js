export function makeErrorMessage(error) {
  return `${error.response?.data?.message || ''}`.toLowerCase();
}
