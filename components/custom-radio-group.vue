<template>
  <custom-field
    :custom-messages="customMessages"
    :immediate="immediate"
    :name="name"
    :rules="rules"
    :vid="vid"
    :label="label"
    :label-class="labelClass"
  >
    <v-radio-group
      v-model="computedValue"
      :class="radioGroupClass"
      :error-messages="errors"
      :hide-details="hideDetails && !errors?.length && !hint?.length"
      :messages="hint"
      :row="row"
    >
      <v-radio
        v-for="(item, itemIndex) in items"
        :key="itemIndex"
        :value="item.value"
        :class="radioClass"
        :color="color"
      >
        <template #label>
          <slot
            name="radio-label"
            v-bind="{ item, attrs: { class: radioLabelClass } }"
          >
            <span :class="radioLabelClass">
              {{ item.label }}
            </span>
          </slot>
        </template>
      </v-radio>
      <template #message="{ message }">
        <custom-field-message :invalid="invalid" :message="message" />
      </template>
    </v-radio-group>
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
    items: {
      type: [Array],
      default: () => [],
    },
    color: {
      type: String,
      default: undefined,
    },
    hideDetails: {
      type: Boolean,
      default: false,
    },
    hint: {
      type: [Array, String],
      default: undefined,
    },
    radioClass: {
      type: [Object, String],
      default: undefined,
    },
    radioLabelClass: {
      type: [Object, String],
      default: undefined,
    },
    radioGroupClass: {
      type: [Object, String],
      default: undefined,
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
