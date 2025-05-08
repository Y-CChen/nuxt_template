<template>
  <v-app>
    <v-main v-scroll="onScroll" class="default-layout-main">
      <div
        :class="{
          'flex-grow-1': true,
          'overflow-x-auto': !$vuetify.breakpoint.mobile,
        }"
      >
        <div
          :class="{
            'fill-height py-5 mx-auto': true,
            'fixed-width-1024px px-5': !$vuetify.breakpoint.mobile,
          }"
        >
          <nuxt />
        </div>
      </div>
      <app-footer />
    </v-main>
    <custom-slim-container client-only>
      <template #content>
        <app-header />
      </template>
    </custom-slim-container>
    <app-floating-action-buttons />
    <custom-slim-container client-only>
      <template #content>
        <custom-confirm-dialog ref="confirmDialog" />
      </template>
    </custom-slim-container>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  head() {
    const i18nHead = this.$nuxtI18nHead({
      addDirAttribute: true,
      addSeoAttributes: true,
    });
    return {
      htmlAttrs: {
        ...i18nHead.htmlAttrs,
      },
      meta: [...i18nHead.meta],
      link: [...i18nHead.link],
    };
  },
  watch: {
    '$ui.confirmDialog.dialog': {
      handler(dialog) {
        if (!this.$refs.confirmDialog) {
          return;
        }
        if (dialog?.visible) {
          this.$refs.confirmDialog.showDialog(dialog);
        } else {
          this.$refs.confirmDialog.hideDialog();
        }
      },
    },
  },
  mounted() {
    this.onScroll();
  },
  methods: {
    onScroll() {
      this.$ui.windowScroll.set();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/main.scss';

.default-layout-main {
  :deep(.v-main__wrap) {
    display: flex;
    flex-direction: column;
  }
}

.fixed-width-1024px {
  @include fixed-width(1024px);
}
</style>
