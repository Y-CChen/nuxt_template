<template>
  <custom-field
    v-slot="{ errors, invalid }"
    :value="computedValue"
    :custom-messages="customMessages"
    :immediate="immediate"
    :name="name"
    :rules="rules"
    :vid="vid"
    :detect-input="false"
    :label="label"
    :label-class="labelClass"
  >
    <div
      class="d-flex"
      :class="{
        'flex-wrap': row,
        'flex-column': !row,
      }"
    >
      <v-checkbox
        v-for="(item, itemIndex) in items"
        :key="itemIndex"
        v-model="computedValue"
        class="mr-4 mt-0 pt-0"
        :disabled="item.disabled"
        hide-details
        :label="item[itemLabel]"
        :value="item[itemValue]"
      />
    </div>
    <custom-field-message
      v-if="!hideDetails || errors?.length || hint?.length"
      class="mb-2 px-3"
      :invalid="invalid"
      :message="errors?.[0] || (Array.isArray(hint) ? hint?.[0] : hint)"
    />
  </custom-field>
</template>

<script>
export default {
  props: {
    value: {
      type: undefined,
      default: null,
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
    hint: {
      type: [Array, String],
      default: undefined,
    },
    hideDetails: {
      type: Boolean,
      default: false,
    },
    items: {
      type: [Array],
      default: () => [],
    },
    itemLabel: {
      type: String,
      default: 'label',
    },
    itemValue: {
      type: String,
      default: 'value',
    },
    row: {
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
  },
};
</script>
