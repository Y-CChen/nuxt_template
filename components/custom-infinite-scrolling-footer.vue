<template>
  <custom-card v-if="!pageContinuable && !loading" flat tile v-on="on">
    <slot v-if="labelVisible" name="label">
      <div class="d-flex align-center">
        <span v-if="label" class="text-caption">{{ label }}</span>
        <v-icon small>mdi-chevron-up</v-icon>
      </div>
    </slot>
  </custom-card>
  <div v-else>
    <slot name="loading">
      <v-progress-circular color="primary" indeterminate size="16" />
    </slot>
    <div v-if="!loading" v-intersect="intersectHandler" />
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: '',
    },
    labelVisible: {
      type: Boolean,
      default: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    pageContinuable: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    on() {
      const on = {};
      if (this.$listeners.click) {
        on.click = (e) => {
          this.$emit('click', e);
        };
      }
      return on;
    },
  },
  methods: {
    intersectHandler(...args) {
      this.$emit('intersect', ...args);
    },
  },
};
</script>
