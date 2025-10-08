<template>
  <v-tabs-items v-model="computedValue" class="transparent">
    <v-tab-item v-for="(item, itemIndex) in items" :key="itemIndex">
      <slot name="default" v-bind="{ item }" />
    </v-tab-item>
  </v-tabs-items>
</template>

<script>
export default {
  props: {
    value: {
      type: null,
      default: undefined,
    },
    items: {
      type: Array,
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
  },
};
</script>
