<template>
  <custom-card
    class="d-flex align-center justify-center"
    flat
    height="100%"
    :min-height="size"
    :min-width="size"
    tile
    width="100%"
  >
    <v-img
      v-if="src"
      :src="src"
      contain
      :height="size"
      :max-height="size"
      :max-width="size"
      :width="size"
    />
    <v-icon v-else color="grey" :size="size">
      mdi-image-size-select-actual
    </v-icon>
  </custom-card>
</template>

<script>
import CustomCard from '~/components/custom-card.vue';

export default {
  components: { CustomCard },
  props: {
    src: {
      type: String,
      default: undefined,
    },
    size: {
      type: [Number, String],
      default: '60px',
    },
  },
};
</script>
