<template>
  <v-dialog
    v-model="computedValue"
    :max-width="maxWidth"
    :persistent="persistent"
    :scrollable="scrollable"
  >
    <custom-field-group v-slot="{ invalid, handleSubmit }">
      <custom-card :disabled="loading" :loading="loading">
        <custom-card-title class="flex-nowrap align-start">
          <span>
            {{ title }}
          </span>
          <span class="mx-auto" />
          <custom-btn
            v-if="!hideCloseBtn"
            icon
            small
            @click="$emit('click:close', $event)"
          >
            <v-icon>mdi-close</v-icon>
          </custom-btn>
        </custom-card-title>
        <custom-card-text v-if="haveSlot('text')">
          <slot name="text" />
        </custom-card-text>
        <custom-card-actions v-if="haveSlot('actions')">
          <slot name="actions" v-bind="{ invalid, handleSubmit }" />
        </custom-card-actions>
      </custom-card>
    </custom-field-group>
  </v-dialog>
</template>

<script>
import { mixinHaveSlot } from '~/mixins/have-slot';

export default {
  mixins: [mixinHaveSlot],
  props: {
    value: {
      default: undefined,
      validator() {
        return true;
      },
    },
    hideCloseBtn: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    maxWidth: {
      type: [Number, String],
      default: undefined,
    },
    persistent: {
      type: Boolean,
      default: true,
    },
    scrollable: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: '',
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
  },
};
</script>
