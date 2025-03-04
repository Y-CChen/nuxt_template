<template>
  <span class="grey--text">
    {{ `${value?.length || 0}/${maxLength}` }}{{ suffix }}
  </span>
</template>

<script>
export default {
  props: {
    value: {
      type: [Array, String],
      required: true,
    },
    maxLength: {
      type: Number,
      default: 0,
    },
    suffix: {
      type: String,
      default: '',
    },
  },
};
</script>
