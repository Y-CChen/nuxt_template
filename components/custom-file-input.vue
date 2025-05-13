<template>
  <custom-field
    v-slot="{ errors, invalid }"
    :custom-messages="customMessages"
    :immediate="immediate"
    :name="name"
    :rules="rules"
    :vid="vid"
    :label="label"
    :label-class="labelClass"
  >
    <v-file-input
      ref="fileInput"
      :value="value"
      :accept="accept"
      :dense="dense"
      :error-messages="errors"
      :messages="hint"
      :outlined="outlined"
      @input="$emit('input', $event)"
    >
      <template #message="{ message }">
        <custom-field-message :invalid="invalid" :message="message" />
      </template>
    </v-file-input>
  </custom-field>
</template>

<script>
import { MimeTypes } from '~/utils/constant';

export default {
  props: {
    value: {
      type: null,
      required: true,
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
      type: String,
      default: undefined,
    },
    accept: {
      type: String,
      default: undefined,
      validator: (value) => {
        return (
          value === undefined ||
          value.split(',').every((mimeType) => {
            return Object.values(MimeTypes).includes(mimeType);
          })
        );
      },
    },
    dense: {
      type: Boolean,
      default: true,
    },
    hint: {
      type: [String, Array],
      default: undefined,
    },
    outlined: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    input() {
      return this.$refs.fileInput?.$refs?.input ?? {};
    },
  },
  methods: {
    click() {
      return this.input.click?.();
    },
  },
};
</script>
