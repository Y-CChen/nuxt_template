<template>
  <svg
    class="custom-svg"
    fill="none"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:svg="http://www.w3.org/2000/svg"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot name="default" />
  </svg>
</template>

<script>
export default {};
</script>
