<template>
  <v-menu
    :open-on-hover="openOnHover"
    :offset-y="offsetY"
    @input="$emit('input', $event)"
  >
    <template v-if="haveSlot('activator')" #activator="{ attrs, on }">
      <slot name="activator" v-bind="{ attrs, on }" />
    </template>
    <slot name="default" />
  </v-menu>
</template>

<script>
import { haveSlot } from '~/utils/have-slot';

export default {
  props: {
    openOnHover: {
      type: Boolean,
      default: false,
    },
    offsetY: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    haveSlot(name) {
      return haveSlot(this, name);
    },
  },
};
</script>
