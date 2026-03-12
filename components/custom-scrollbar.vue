<!-- <cSpell: ignore simplebar -->
<template>
  <simplebar
    :data-simplebar-auto-hide="autoHide ? 'true' : 'false'"
    @scroll="$emit('scroll', $event)"
  >
    <slot name="default" />
  </simplebar>
</template>

<script>
import simplebar from 'simplebar-vue';
import 'simplebar-vue/dist/simplebar.min.css';

export default {
  components: {
    simplebar,
  },
  props: {
    autoHide: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
