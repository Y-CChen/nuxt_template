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

export function makeAbsolutePosition({ y, x, y2, x2, height, width } = {}) {
  if (y !== undefined) {
    y = typeof y === 'number' ? `${y}px` : y;
  }
  if (x !== undefined) {
    x = typeof x === 'number' ? `${x}px` : x;
  }
  if (y2 !== undefined) {
    y2 = typeof y2 === 'number' ? `${y2}px` : y2;
  }
  if (x2 !== undefined) {
    x2 = typeof x2 === 'number' ? `${x2}px` : x2;
  }
  const fixedHeighWidth = makeFixedHeightWidth({ height, width });
  return {
    position: 'absolute',
    top: y,
    left: x,
    bottom: y2,
    right: x2,
    ...fixedHeighWidth,
  };
}
