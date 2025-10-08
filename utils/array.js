export function chunk(array, { chunkSize = 1, horizontal = false } = {}) {
  if (!Array.isArray(array) || chunkSize < 1) {
    return [];
  }
  const tmp = [...array];
  const result = [];
  if (horizontal) {
    while (tmp.length) {
      const horizontalChunkSize = Math.ceil(tmp.length / chunkSize);
      chunkSize -= 1;
      result.push(tmp.splice(0, horizontalChunkSize));
    }
  } else {
    while (tmp.length) {
      result.push(tmp.splice(0, chunkSize));
    }
  }
  return result;
}

export function fillEmpty(array, { desiredSize = 1, emptyValue = null } = {}) {
  const emptySize = desiredSize - array?.length;
  if (!Array.isArray(array) || !(emptySize > 0)) {
    return array;
  }
  return [...array, ...Array(emptySize).fill(emptyValue)];
}
