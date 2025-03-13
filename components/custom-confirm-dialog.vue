<template>
  <custom-dialog
    v-model="dialog.visible"
    :hide-close-btn="dialog.hideCancelBtn"
    :loading="dialog.handling"
    max-width="480px"
    :title="dialog.title"
    @click:close.stop="cancel()"
  >
    <template v-if="dialog.text" #text>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <span v-if="dialog.textHtml" v-html="dialog.text" />
      <template v-else>{{ dialog.text }}</template>
    </template>
    <template #actions>
      <div class="mx-auto" />
      <custom-btn
        v-if="!dialog.hideCancelBtn"
        :color="dialog.btnColor"
        outlined
        @click.stop="cancel()"
      >
        {{ dialog.cancelBtnLabel || $t('cancel') }}
      </custom-btn>
      <custom-btn :color="dialog.btnColor" @click.stop="confirm()">
        {{ dialog.confirmBtnLabel || $t('confirm') }}
      </custom-btn>
    </template>
  </custom-dialog>
</template>

<script>
const makeDialog = ({
  visible,
  title,
  text,
  textHtml,
  btnColor,
  confirmBtnLabel,
  cancelBtnLabel,
  hideCancelBtn,
  handler,
  cancelHandler,
}) => {
  return {
    visible: !!visible,
    title: title || '',
    text: text || '',
    textHtml: !!textHtml,
    btnColor: btnColor || 'red white--text',
    confirmBtnLabel: confirmBtnLabel || '',
    cancelBtnLabel: cancelBtnLabel || '',
    hideCancelBtn: !!hideCancelBtn,
    handler: handler ?? null,
    cancelHandler: cancelHandler ?? null,
    handling: false,
  };
};

export default {
  data() {
    return {
      dialog: makeDialog({ visible: false }),
    };
  },
  methods: {
    showDialog({
      title,
      text,
      textHtml,
      btnColor,
      confirmBtnLabel,
      cancelBtnLabel,
      hideCancelBtn,
      handler,
      cancelHandler,
    }) {
      this.dialog = makeDialog({
        visible: true,
        title,
        text,
        textHtml,
        btnColor,
        confirmBtnLabel,
        cancelBtnLabel,
        hideCancelBtn,
        handler,
        cancelHandler,
      });
    },
    hideDialog() {
      this.dialog = makeDialog({
        ...this.dialog,
        visible: false,
        handler: null,
        cancelHandler: null,
      });
    },
    async confirm() {
      this.dialog.handling = true;
      await this.dialog.handler?.();
      this.dialog.handling = false;
      this.hideDialog();
    },
    async cancel() {
      this.dialog.handling = true;
      await this.dialog.cancelHandler?.();
      this.dialog.handling = false;
      this.hideDialog();
    },
  },
};
</script>
