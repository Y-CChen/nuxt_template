<template>
  <div>
    <v-app-bar app :clipped-left="clippedLeft" flat>
      <custom-btn icon @click.stop="mainDrawer = !mainDrawer">
        <v-icon>mdi-menu</v-icon>
      </custom-btn>
      <div class="mx-auto" />
      <custom-btn text @click.stop="languageDrawer = !languageDrawer">
        {{ $t('language') }}
      </custom-btn>
    </v-app-bar>
    <v-navigation-drawer
      v-model="mainDrawer"
      app
      :clipped="clippedLeft"
      fixed
      floating
    >
      <custom-list>
        <custom-list-item
          v-for="(item, itemIndex) in mainDrawerItems"
          :key="itemIndex"
          :to="item.to"
        >
          <custom-list-item-icon>{{ item.icon }}</custom-list-item-icon>
          <custom-list-item-title class="text-capitalize">{{
            item.title
          }}</custom-list-item-title>
        </custom-list-item>
      </custom-list>
    </v-navigation-drawer>
    <v-navigation-drawer
      v-model="languageDrawer"
      app
      fixed
      :right="languageDrawerRight"
      floating
      temporary
    >
      <custom-list @click="languageDrawer = false">
        <custom-list-item
          @click.stop="languageDrawerRight = !languageDrawerRight"
        >
          <custom-list-item-icon>mdi-repeat</custom-list-item-icon>
          <custom-list-item-title class="text-capitalize">{{
            languageDrawerRight ? $t('switch-to-left') : $t('switch-to-right')
          }}</custom-list-item-title>
        </custom-list-item>
        <custom-list-item
          v-for="{ code, name } in $i18n.$availableLocales(false)"
          :key="code"
          :input-value="$i18n.locale === code"
          :value="code"
          @click="$i18n.$switchLocale(code)"
        >
          <custom-list-item-title>{{ name }}</custom-list-item-title>
        </custom-list-item>
      </custom-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mainDrawer: !this.$vuetify.breakpoint.mobile,
      languageDrawer: false,
      languageDrawerRight: true,
    };
  },
  computed: {
    clippedLeft() {
      return true;
    },
    mainDrawerItems() {
      return [
        {
          icon: 'mdi-home',
          title: this.$t('homepage'),
          to: '/',
        },
        {
          icon: 'mdi-lock',
          title: this.$t('authentication-demo'),
          to: '/authentication-demo',
        },
        {
          icon: 'mdi-note-edit',
          title: this.$t('editor-demo'),
          to: '/editor-demo',
        },
      ];
    },
  },
};
</script>
