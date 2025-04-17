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
    <div class="d-flex">
      <v-checkbox
        v-for="(item, itemIndex) in items"
        :key="itemIndex"
        v-model="computedValue"
        class="mr-4 mt-1"
        :disabled="item.disabled"
        :label="item.label"
        :value="item.value"
      />
    </div>
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
    // payMethodItems() {
    //   return Object.values(payMethodTypes)
    //     .filter((payMethodType) =>
    //       this.availablePayMethods.includes(payMethodType),
    //     )
    //     .map((payMethodType) => ({
    //       value: payMethodType,
    //       label: this.$backendHelpers.translatePayMethod(payMethodType),
    //       disabled: !this.availablePayMethods.includes(payMethodType),
    //     }));
    // },
  },
};
</script>
