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
    <v-select
      :value="value"
      :class="selectClass"
      :background-color="backgroundColor"
      :clearable="clearable"
      :color="color"
      dense
      :disabled="disabled"
      :error-messages="errors"
      flat
      :hide-details="hideDetails && !errors?.length && !hint?.length"
      :item-color="itemColor"
      :item-text="itemText"
      :item-value="itemValue"
      :items="items"
      :label="placeholder"
      :messages="hint"
      :no-data-text="noDataText"
      :outlined="outlined"
      :readonly="readonly"
      :return-object="returnObject"
      :rounded="rounded"
      :single-line="singleLine"
      :solo="solo"
      @change="$emit('change', $event)"
      @input="$emit('input', $event)"
    >
      <template
        v-if="haveSlot('selection')"
        #selection="{
          parent,
          item,
          index,
          select,
          selected,
          disabled: selectionDisabled,
        }"
      >
        <slot
          name="selection"
          v-bind="{
            parent,
            item,
            index,
            select,
            selected,
            disabled: selectionDisabled,
          }"
        />
      </template>
      <template v-if="haveSlot('item')" #item="{ parent, item, on, attrs }">
        <slot name="item" v-bind="{ parent, item, on, attrs }" />
      </template>
      <template v-if="haveSlot('append-item')" #append-item>
        <slot name="append-item" />
      </template>
      <template v-if="haveSlot('prepend')" #prepend>
        <slot name="prepend" />
      </template>
      <template v-if="haveSlot('append-outer')" #append-outer>
        <slot name="append-outer" />
      </template>
      <template #message="{ message }">
        <custom-field-message :invalid="invalid" :message="message" />
      </template>
    </v-select>
  </custom-field>
</template>

<script>
import { mixinHaveSlot } from '~/mixins/have-slot';

export default {
  mixins: [mixinHaveSlot],
  props: {
    value: {
      type: null,
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
    selectClass: {
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
    color: {
      type: String,
      default: undefined,
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
      type: String,
      default: undefined,
    },
    itemColor: {
      type: String,
      default: undefined,
    },
    itemText: {
      type: String,
      default: 'text',
    },
    itemValue: {
      type: String,
      default: 'value',
    },
    items: {
      type: Array,
      default: () => [],
    },
    noDataText: {
      type: String,
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
    returnObject: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    singleLine: {
      type: Boolean,
      default: false,
    },
    solo: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
