<template>
  <nuxt-link
    v-if="to"
    v-slot="{ href, isActive, isExactActive, navigate, route }"
    custom
    :to="to"
  >
    <slot
      name="default"
      v-bind="{
        href,
        isActive: exact ? isExactActive : isActive,
        navigate,
        route,
      }"
    />
  </nuxt-link>
  <div v-else>
    <slot
      name="default"
      v-bind="{
        href: undefined,
        isActive: false,
        navigate: () => {},
        route: undefined,
      }"
    />
  </div>
</template>

<script>
export default {
  props: {
    exact: {
      type: Boolean,
      default: false,
    },
    to: {
      type: [Object, String],
      default: undefined,
    },
  },
};
</script>
