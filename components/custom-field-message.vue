<template>
  <div
    :class="{
      'v-messages': true,
      'red--text': invalid,
      'grey--text': !invalid,
      'pl-2': padding,
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
    padding: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
