<template>
  <custom-slim-container client-only>
    <template #content>
      <v-dialog
        :value="value"
        content-class="fill-height elevation-0"
        persistent
      >
        <div class="fill-height d-flex">
          <v-progress-circular
            class="ma-auto"
            :size="$vuetify.breakpoint.mobile ? 72 : 80"
            color="primary"
            indeterminate
          />
        </div>
      </v-dialog>
    </template>
  </custom-slim-container>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
