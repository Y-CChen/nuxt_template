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
      default: undefined,
      validator: () => {
        return true;
      },
    },
    to: {
      type: [Object, String],
      default: undefined,
    },
    value: {
      default: undefined,
      validator: () => {
        return true;
      },
    },
  },
};
</script>
