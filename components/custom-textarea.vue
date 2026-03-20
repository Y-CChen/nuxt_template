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
    <v-textarea
      ref="textarea"
      :value="value"
      :class="textFieldClass"
      :auto-grow="autoGrow"
      :background-color="backgroundColor"
      dense
      :disabled="disabled"
      :error-messages="errors"
      flat
      :hide-details="hideDetails && !errors?.length && !hint?.length"
      :maxlength="maxLength"
      :messages="hint"
      :no-resize="noResize"
      :outlined="!readonly && outlined"
      persistent-placeholder
      :placeholder="placeholder"
      :readonly="readonly"
      :reverse="reverse"
      :rows="rows"
      :role="role"
      :solo="readonly || solo"
      @change="$emit('change', $event || '')"
      @click="$emit('click', $event)"
      @focus="$emit('focus', $event)"
      @input="$emit('input', $event || '')"
      @keydown="$emit('keydown', $event)"
    >
      <template #append>
        <slot name="append">
          <div class="pt-1 pb-2 d-inline-flex gap-2">
            <span v-if="append">{{ append }}</span>
            <custom-max-length-indicator
              v-if="maxLength"
              :value="value"
              :max-length="maxLength"
            />
          </div>
        </slot>
      </template>
      <template v-if="haveSlot('append-outer')" #append-outer>
        <slot name="append-outer" />
      </template>
      <template #message="{ message }">
        <custom-field-message :invalid="invalid" :message="message" />
      </template>
    </v-textarea>
  </custom-field>
</template>

<script>
import { mixinHaveSlot } from '~/mixins/have-slot';

export default {
  mixins: [mixinHaveSlot],
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
    append: {
      type: String,
      default: undefined,
    },
    autoGrow: {
      type: Boolean,
      default: false,
    },
    backgroundColor: {
      type: String,
      default: undefined,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    forceHideDetails: {
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
    noResize: {
      type: Boolean,
      default: false,
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
    rows: {
      type: [Number, String],
      default: undefined,
    },
    solo: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    textarea: {
      get() {
        return this.$refs.textarea?.$el?.querySelector?.('textarea') ?? {};
      },
    },
    maxLength() {
      const maxLength = parseInt(
        this.rules?.[this.$validate.Rules.maxTextLength],
      );
      return maxLength > 0 ? maxLength : undefined;
    },
  },
};
</script>
