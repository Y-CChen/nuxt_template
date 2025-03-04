<template>
  <v-form @submit.prevent="$emit('submit', $event)">
    <slot name="default" />
  </v-form>
</template>

<script>
export default {};
</script>
