<template>
  <validation-observer
    ref="observer"
    v-slot="{
      errors,
      invalid,
      validate,
      validateWithInfo,
      handleSubmit,
      reset,
    }"
    :tag="tag"
    :slim="slim"
    :disabled="disabled"
    :vid="vid"
  >
    <slot
      name="default"
      v-bind="{
        errors,
        invalid,
        validate,
        validateWithInfo,
        handleSubmit,
        reset,
      }"
    />
  </validation-observer>
</template>

<script>
import { ValidationObserver } from 'vee-validate';

export default {
  components: {
    ValidationObserver,
  },
  props: {
    tag: {
      type: String,
      default: 'span',
    },
    slim: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    vid: {
      type: String,
      default: undefined,
    },
  },
};
</script>
