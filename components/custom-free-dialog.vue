<template>
  <v-dialog
    v-model="computedValue"
    class="fill-height"
    content-class="elevation-0 rounded-0 ma-0 custom-fill-height"
    width="100%"
    :transition="transition"
  >
    <div
      class="fill-height"
      :class="contentClass"
      @click="$emit('click:outside', $event)"
    >
      <slot name="default" />
    </div>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: {
      default: undefined,
      validator() {
        return true;
      },
    },
    contentClass: {
      type: [Object, String],
      default: undefined,
    },
    transition: {
      type: [Boolean, String],
      default: undefined,
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
