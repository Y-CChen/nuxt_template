<template>
  <v-img
    :alt="alt"
    :aspect-ratio="aspectRatio"
    :contain="contain"
    :height="height"
    :src="src"
    :width="width"
  >
    <template #placeholder>
      <custom-img-placeholder :src="placeholderSrc" :size="placeholderSize" />
    </template>
    <template v-if="haveSlot('default')" #default>
      <slot name="default" />
    </template>
  </v-img>
</template>

<script>
import { mixinHaveSlot } from '~/mixins/have-slot';

export default {
  mixins: [mixinHaveSlot],
  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      default: undefined,
    },
    aspectRatio: {
      type: [Number, String],
      default: undefined,
    },
    contain: {
      type: Boolean,
      default: true,
    },
    height: {
      type: [Number, String],
      default: undefined,
    },
    width: {
      type: [Number, String],
      default: undefined,
    },
    placeholderSrc: {
      type: String,
      default: undefined,
    },
    placeholderSize: {
      type: [Number, String],
      default: undefined,
    },
  },
};
</script>
