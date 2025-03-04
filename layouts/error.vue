<template>
  <v-app>
    <span class="text-h1 pa-5">
      {{ computedError }}
    </span>
    <custom-btn to="/">{{ $t('back-to-homepage') }}</custom-btn>
  </v-app>
</template>

<script>
import CustomBtn from '~/components/custom-btn.vue';

export default {
  name: 'EmptyLayout',
  components: { CustomBtn },
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  head() {
    return {
      title: this.computedError,
    };
  },
  computed: {
    computedError() {
      const { statusCode } = this.error || {};
      return statusCode === 404 ? '404 Not Found' : 'An error occurred';
    },
  },
};
</script>
