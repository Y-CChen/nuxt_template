<template>
  <v-list @click="$emit('click', $event)">
    <slot name="default" />
  </v-list>
</template>

<script>
export default {};
</script>
