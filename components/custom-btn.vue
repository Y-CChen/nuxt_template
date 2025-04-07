<template>
  <v-btn
    :style="{
      pointerEvents: readonly ? 'none' : undefined,
    }"
    :block="block"
    :color="computedColor"
    :depressed="depressed"
    :disabled="disabled"
    :elevation="elevation"
    :exact="exact"
    :fab="fab"
    :filled="filled"
    :height="height"
    :href="href"
    :icon="icon"
    :large="large"
    :loading="loading"
    :min-height="minHeight"
    :min-width="minWidth"
    :outlined="outlined"
    :replace="replace"
    :rounded="rounded"
    :small="small"
    :text="text"
    :to="to"
    :target="target"
    :type="type"
    :value="value"
    :width="width"
    :x-large="xLarge"
    :x-small="xSmall"
    @click="$emit('click', $event)"
    @mouseenter="$emit('mouseenter', $event)"
    @mouseleave="$emit('mouseleave', $event)"
  >
    <slot name="default" />
  </v-btn>
</template>

<script>
export default {
  props: {
    block: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: undefined,
    },
    depressed: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    elevation: {
      type: [Number, String],
      default: undefined,
    },
    exact: {
      type: Boolean,
      default: true,
    },
    fab: {
      type: Boolean,
      default: false,
    },
    filled: {
      type: Boolean,
      default: true,
    },
    height: {
      type: [Number, String],
      default: undefined,
    },
    href: {
      type: [Object, String],
      default: undefined,
    },
    icon: {
      type: Boolean,
      default: false,
    },
    large: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
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
    readonly: {
      type: Boolean,
      default: false,
    },
    replace: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
    text: {
      type: Boolean,
      default: false,
    },
    to: {
      type: [Object, String],
      default: undefined,
    },
    target: {
      type: String,
      default: undefined,
    },
    type: {
      type: String,
      default: 'button',
    },
    value: {
      type: null,
      default: undefined,
    },
    width: {
      type: [Number, String],
      default: undefined,
    },
    xLarge: {
      type: Boolean,
      default: false,
    },
    xSmall: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    computedColor() {
      if (this.color || this.color === null || this.icon || this.text) {
        return this.color;
      }
      return 'primary';
    },
  },
};
</script>
