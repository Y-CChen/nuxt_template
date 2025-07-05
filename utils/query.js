export function arrayToQuery(array) {
  if (!Array.isArray(array) || array.length === 0) {
    return undefined;
  }
  return (
    array?.map?.((item) => encodeURIComponent(item)).join(',') || undefined
  );
}

export function queryToArray(query) {
  return query?.split?.(',').map((item) => decodeURIComponent(item)) || [];
}

export function booleanToQuery(boolean) {
  return boolean ? 'true' : 'false';
}

export function queryToBoolean(query) {
  switch (typeof query) {
    case 'boolean':
      return query;
    case 'string':
      return query.toLowerCase() === 'true';
    default:
      return !!query;
  }
}
