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
    :detect-input="detectInput"
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
    value: {
      type: undefined,
      default: null,
    },
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
    detectInput: {
      type: Boolean,
      default: true,
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
    value() {
      if (!this.detectInput) {
        this.validate();
      }
    },
    name() {
      this.$nextTick(() => {
        if (this.$refs.validated) {
          this.$refs.provider.reset();
          this.validate();
        }
      });
    },
  },
  mounted() {
    if (this.immediate && !this.detectInput) {
      this.validate();
    }
  },
  methods: {
    validate() {
      this.$nextTick(() => {
        if (this.detectInput) {
          this.$refs.provider.validate();
        } else {
          this.$refs.provider.validate(this.value);
        }
      });
    },
  },
};
</script>
