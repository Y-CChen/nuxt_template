<template>
  <div class="d-flex justify-center">
    <custom-card class="flex-grow-1" max-width="400px">
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
import CustomCard from '~/components/custom-card.vue';
import CustomImg from '~/components/custom-img.vue';

export default {
  name: 'IndexPage',
  auth: false,
  components: {
    CustomCard,
    CustomImg,
  },
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
