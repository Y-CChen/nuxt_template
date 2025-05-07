<template>
  <div
    :class="{
      'v-messages v-messages__message': true,
      'red--text': invalid,
      'grey--text': !invalid,
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
