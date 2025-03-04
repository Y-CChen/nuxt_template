<template>
  <v-footer>
    <span>{{ copyright }}</span>
  </v-footer>
</template>

<script>
export default {
  computed: {
    copyright() {
      return `© ${this.$i18n.$dayjs.format(Date.now(), 'YYYY')}`;
    },
  },
};
</script>
