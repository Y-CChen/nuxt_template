export const mixinHaveSlot = {
  methods: {
    haveSlot(slotName) {
      return !!this.$slots[slotName] || !!this.$scopedSlots[slotName];
    },
  },
};
