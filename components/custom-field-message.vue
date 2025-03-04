<template>
  <div
    :class="{
      ['red--text']: invalid,
      ['grey--text']: !invalid,
    }"
  >
    {{ message }}
  </div>
</template>

<script>
export default {
  props: {
    invalid: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      default: '',
    },
  },
};
</script>
