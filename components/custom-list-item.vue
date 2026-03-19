<template>
  <v-list-item
    :input-value="inputValue"
    :dense="dense"
    :exact="exact"
    :exact-path="exactPath"
    :tag="tag"
    :to="to"
    :value="value"
    v-on="on"
  >
    <slot name="default" />
  </v-list-item>
</template>

<script>
export default {
  props: {
    inputValue: {
      type: null,
      default: undefined,
    },
    dense: {
      type: Boolean,
      default: false,
    },
    exact: {
      type: Boolean,
      default: false,
    },
    exactPath: {
      type: Boolean,
      default: true,
    },
    tag: {
      type: String,
      default: undefined,
    },
    to: {
      type: [Object, String],
      default: undefined,
    },
    value: {
      type: null,
      default: undefined,
    },
  },
  computed: {
    on() {
      const on = {};
      ['click', 'input', 'mouseenter', 'mouseleave'].forEach((event) => {
        if (this.$listeners[event]) {
          on[event] = (e) => {
            this.$emit(event, e);
          };
        }
      });
      return on;
    },
  },
};
</script>
