<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
      <v-menu open-on-hover offset-y>
        <template #activator="{ on, attrs }">
          <v-btn text v-bind="attrs" v-on="on">
            {{ $t('language') }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="{ code, name } in $i18n.$availableLocales(false)"
            :key="code"
            :value="code"
            @click="$i18n.$switchLocale(code)"
          >
            <v-list-item-title>{{ name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      <span>{{ copyright }}</span>
    </v-footer>
    <client-only>
      <custom-confirm-dialog ref="confirmDialog" />
    </client-only>
  </v-app>
</template>

<script>
import CustomConfirmDialog from '~/components/custom-confirm-dialog.vue';

export default {
  name: 'DefaultLayout',
  components: {
    CustomConfirmDialog,
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
        {
          icon: 'mdi-lock',
          title: 'Secret',
          to: '/secret',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    };
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
  computed: {
    copyright() {
      return `© ${this.$i18n.$dayjs.format(Date.now(), 'YYYY')}`;
    },
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
