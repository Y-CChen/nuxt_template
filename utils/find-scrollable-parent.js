export function findScrollableParentY(node) {
  if (!process.client && !node) {
    return null;
  }
  const isElement = node instanceof HTMLElement;
  const overflowY = isElement && window.getComputedStyle(node).overflowY;
  const isScrollable = overflowY !== 'visible' && overflowY !== 'hidden';
  if (isScrollable && node.scrollHeight >= node.clientHeight) {
    return node;
  }
  return findScrollableParentY(node.parentNode) || null;
}
