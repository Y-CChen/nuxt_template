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
      v-model="computedValue"
      :accept="accept?.join?.(',')"
      :dense="dense"
      :error-messages="errors"
      :messages="hint"
      :outlined="outlined"
    >
      <template #message="{ message }">
        <custom-field-message :invalid="invalid" :message="message" />
      </template>
    </v-file-input>
  </custom-field>
</template>

<script>
import { MimeTypes } from '~/utils/constant';

const MimeTypesSet = new Set(Object.values(MimeTypes));

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
      type: Array,
      default: undefined,
      validator: (value) => {
        return (
          value === undefined ||
          value.every?.((mimeType) => {
            return MimeTypesSet.has(mimeType);
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
    computedValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
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
