<template>
  <v-divider
    :class="{
      [color]: true,
    }"
  />
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'text--grey',
    },
  },
};
</script>
