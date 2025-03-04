<template>
  <v-app>
    <v-main class="default-layout-main">
      <div
        :class="{
          'flex-grow-1': true,
          'overflow-x-auto': !$vuetify.breakpoint.mobile,
        }"
      >
        <div
          :class="{
            'py-5 mx-auto': true,
            'fixed-width-1024px px-5': !$vuetify.breakpoint.mobile,
          }"
        >
          <nuxt />
        </div>
      </div>
      <app-footer />
    </v-main>
    <client-only>
      <app-header />
      <custom-confirm-dialog ref="confirmDialog" />
    </client-only>
  </v-app>
</template>

<script>
import AppHeader from '~/components/app-header.vue';
import AppFooter from '~/components/app-footer.vue';
import CustomConfirmDialog from '~/components/custom-confirm-dialog.vue';

export default {
  name: 'DefaultLayout',
  components: {
    AppHeader,
    AppFooter,
    CustomConfirmDialog,
  },
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
};
</script>

<style lang="scss">
@import '~/assets/main.scss';

.default-layout-main {
  .v-main__wrap {
    display: flex;
    flex-direction: column;
  }
}

.fixed-width-1024px {
  @include fixed-width(1024px);
}
</style>
