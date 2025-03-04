<template>
  <validation-provider
    ref="provider"
    v-slot="{ errors, invalid, validated }"
    :tag="tag"
    :custom-messages="customMessages"
    :immediate="immediate"
    :name="name"
    :rules="rules"
    :vid="vid"
  >
    <div v-if="validated" ref="validated" />
    <slot name="label">
      <span v-if="label" :class="labelClass">{{ label }}</span>
    </slot>
    <slot name="default" v-bind="{ errors, invalid }" />
  </validation-provider>
</template>

<script>
import { ValidationProvider } from 'vee-validate';

export default {
  components: {
    ValidationProvider,
  },
  props: {
    tag: {
      type: String,
      default: 'span',
    },
    customMessages: {
      type: [Object],
      default: undefined,
    },
    immediate: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: undefined,
    },
    vid: {
      type: String,
      default: undefined,
    },
    rules: {
      type: [Object],
      default: undefined,
    },
    label: {
      type: String,
      default: undefined,
    },
    labelClass: {
      type: [Object, String],
      default: undefined,
    },
  },
  watch: {
    name() {
      this.$nextTick(() => {
        if (this.$refs.validated) {
          this.$refs.provider.reset();
          this.$refs.provider.validate();
        }
      });
    },
  },
};
</script>
