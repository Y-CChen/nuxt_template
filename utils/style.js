export function makeFixedHeightWidth({ height, width } = {}) {
  if (height !== undefined) {
    height = typeof height === 'number' ? `${height}px` : height;
  }
  if (width !== undefined) {
    width = typeof width === 'number' ? `${width}px` : width;
  }
  return {
    height,
    width,
    minHeight: height,
    minWidth: width,
    maxHeight: height,
    maxWidth: width,
  };
}

export function makeAbsolutePosition({ y, x, height, width } = {}) {
  if (y !== undefined) {
    y = typeof y === 'number' ? `${y}px` : y;
  }
  if (x !== undefined) {
    x = typeof x === 'number' ? `${x}px` : x;
  }
  const fixedHeighWidth = makeFixedHeightWidth({ height, width });
  return {
    position: 'absolute',
    top: y,
    left: x,
    ...fixedHeighWidth,
  };
}
