<template>
  <v-list-item
    :input-value="inputValue"
    :to="to"
    :value="value"
    @click="$emit('click', $event)"
  >
    <slot name="default" />
  </v-list-item>
</template>

<script>
export default {
  props: {
    inputValue: {
      type: null,
      default: undefined,
    },
    to: {
      type: [Object, String],
      default: undefined,
    },
    value: {
      type: null,
      default: undefined,
    },
  },
};
</script>
