<template>
  <div class="fill-height d-flex align-center justify-center">
    <custom-card
      class="flex-grow-1"
      :flat="$vuetify.breakpoint.mobile"
      max-width="400px"
    >
      <custom-img
        class="index-page-logo"
        :src="$router.$makePublicPath('/logo.svg')"
        alt="logo"
        aspect-ratio="1"
      />
    </custom-card>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  auth: false,
};
</script>

<style lang="scss" scoped>
.index-page-logo {
  transform: rotateY(560deg);
  animation: turn 3.5s ease-out forwards 1s;
}

@keyframes turn {
  100% {
    transform: rotateY(0deg);
  }
}
</style>
