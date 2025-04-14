<template>
  <v-list-item
    :input-value="inputValue"
    :dense="dense"
    :exact="exact"
    :tag="tag"
    :to="to"
    :value="value"
    @click="$emit('click', $event)"
    @input="$emit('input', $event)"
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
    dense: {
      type: Boolean,
      default: false,
    },
    exact: {
      type: Boolean,
      default: true,
    },
    tag: {
      type: String,
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
