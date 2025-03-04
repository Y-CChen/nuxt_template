export const haveSlot = (app, slotName) => {
  return !!app.$slots[slotName] || !!app.$scopedSlots[slotName];
};
