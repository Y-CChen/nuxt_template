import Vue from 'vue';

export default function (_ignore, inject) {
  const windowScroll = Vue.observable({
    y: 0,

    set() {
      const { scrollY } = window;
      if (this.y !== scrollY) {
        this.y = scrollY || 0;
      }
    },
  });

  // ~/components/custom-confirm-dialog.vue
  const confirmDialog = Vue.observable({
    dialog: {},

    set(dialog) {
      this.dialog = dialog;
    },
  });

  inject('ui', {
    windowScroll,
    confirmDialog,
  });
}
