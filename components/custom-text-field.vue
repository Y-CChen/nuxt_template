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
    <v-text-field
      ref="textField"
      :value="value"
      :class="textFieldClass"
      :autocomplete="type"
      :background-color="backgroundColor"
      :clearable="clearable"
      dense
      :disabled="disabled"
      :error-messages="errors"
      flat
      :hide-details="hideDetails && !errors?.length && !hint?.length"
      :maxlength="maxLength"
      :messages="hint"
      :outlined="!readonly && outlined"
      persistent-placeholder
      :placeholder="placeholder"
      :readonly="readonly"
      :reverse="reverse"
      :role="role"
      :solo="readonly || solo"
      :type="type"
      @change="$emit('change', $event)"
      @click="$emit('click', $event)"
      @click:clear="$emit('click:clear', $event)"
      @focus="$emit('focus', $event)"
      @input="$emit('input', $event)"
      @keydown="$emit('keydown', $event)"
    >
      <template v-if="haveSlot('prepend')" #prepend>
        <slot name="prepend" />
      </template>
      <template #append>
        <slot name="append">
          <custom-max-length-indicator
            v-if="maxLength"
            class="pt-1 pb-2"
            :value="value"
            :max-length="maxLength"
          />
        </slot>
      </template>
      <template v-if="haveSlot('append-outer')" #append-outer>
        <slot name="append-outer" />
      </template>
      <template #message="{ message }">
        <custom-field-message :invalid="invalid" :message="message" />
      </template>
    </v-text-field>
  </custom-field>
</template>

<script>
import { haveSlot } from '~/utils/have-slot';

export default {
  props: {
    value: {
      type: String,
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
    textFieldClass: {
      type: [Object, String],
      default: undefined,
    },
    backgroundColor: {
      type: String,
      default: undefined,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    hideDetails: {
      type: Boolean,
      default: false,
    },
    hint: {
      type: [Array, String],
      default: undefined,
    },
    outlined: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: undefined,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    reverse: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: undefined,
    },
    solo: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'text',
    },
  },
  computed: {
    input() {
      return this.$refs.textField?.$el?.querySelector?.('input') ?? {};
    },
    maxLength() {
      const maxLength = parseInt(
        this.rules?.[this.$validate.Rules.maxTextLength],
      );
      return maxLength > 0 ? maxLength : undefined;
    },
  },
  methods: {
    haveSlot(name) {
      return haveSlot(this, name);
    },
  },
};
</script>
