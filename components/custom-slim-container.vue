<template>
  <validation-observer :tag="tag" :slim="slim">
    <slot v-if="(clientOnly && !client) || loading" name="placeholder">
      <div />
    </slot>
    <slot v-else name="content" />
  </validation-observer>
</template>

<script>
import { ValidationObserver } from 'vee-validate';
import { mixinHaveSlot } from '~/mixins/have-slot';

export default {
  components: {
    ValidationObserver,
  },
  mixins: [mixinHaveSlot],
  props: {
    tag: {
      type: String,
      default: 'span',
    },
    slim: {
      type: Boolean,
      default: true,
    },
    clientOnly: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      client: false,
    };
  },
  mounted() {
    this.client = true;
    this.$nextTick(() => {
      this.$emit('mounted-next-tick');
    });
  },
};
</script>
