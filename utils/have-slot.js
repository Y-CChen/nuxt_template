export function haveSlot(app, slotName) {
  return !!app.$slots[slotName] || !!app.$scopedSlots[slotName];
}
