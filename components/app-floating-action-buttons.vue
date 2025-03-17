<template>
  <client-only>
    <div v-show="$ui.windowScroll.y > 0">
      <div class="app-floating-action-buttons">
        <custom-btn color="primary" fab @click="$vuetify.goTo(0)">
          <v-icon>mdi-chevron-up</v-icon>
        </custom-btn>
      </div>
    </div>
  </client-only>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.app-floating-action-buttons {
  position: fixed;
  z-index: 4;
  bottom: 0px;
  width: 100%;
  padding: 0 12px 12px 0;
  display: flex;
  justify-content: flex-end;
}
</style>
