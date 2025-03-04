import Vue from 'vue';

export default function (_ignore, inject) {
  // ~/components/custom-confirm-dialog.vue
  const confirmDialog = Vue.observable({
    dialog: {},

    set(dialog) {
      this.dialog = dialog;
    },
  });

  inject('ui', {
    confirmDialog,
  });
}
