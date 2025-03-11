<template>
  <v-card
    :disabled="disabled"
    :flat="flat"
    :height="height"
    :loading="loading"
    :max-height="maxHeight"
    :max-width="maxWidth"
    :min-height="minHeight"
    :min-width="minWidth"
    :outlined="outlined"
    :tile="tile"
    :width="width"
  >
    <slot name="default" />
  </v-card>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    flat: {
      type: Boolean,
      default: false,
    },
    height: {
      type: [Number, String],
      default: undefined,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    maxHeight: {
      type: [Number, String],
      default: undefined,
    },
    maxWidth: {
      type: [Number, String],
      default: undefined,
    },
    minHeight: {
      type: [Number, String],
      default: undefined,
    },
    minWidth: {
      type: [Number, String],
      default: undefined,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    tile: {
      type: Boolean,
      default: false,
    },
    width: {
      type: [Number, String],
      default: undefined,
    },
  },
};
</script>
