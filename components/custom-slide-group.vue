<template>
  <div class="custom-slide-group-container">
    <div
      ref="customSlideGroup"
      v-mutate="resetMaxScrollStart"
      v-resize="resetMaxScrollStart"
      v-scroll.self="onScroll"
      class="overflow-x-auto hide-scrollbar"
      @wheel="onMousewheel"
    >
      <slot name="default" />
    </div>
    <template v-if="computedShowArrows">
      <div
        v-if="!isScrollAtStart"
        v-bind="chevronAttrs.card"
        class="custom-slide-group-prev"
        @click.stop="onPrev"
      >
        <v-icon v-bind="chevronAttrs.icon">mdi-chevron-left</v-icon>
      </div>
      <div
        v-if="!isScrollAtEnd"
        v-bind="chevronAttrs.card"
        class="custom-slide-group-next"
        @click.stop="onNext"
      >
        <v-icon v-bind="chevronAttrs.icon">mdi-chevron-right</v-icon>
      </div>
    </template>
    <div
      v-if="computedShowScrollbar"
      class="pt-3 d-flex justify-center"
      :class="scrollbarClass"
    >
      <div class="custom-slide-group-scrollbar">
        <div class="custom-slide-group-scrollbar-container" />
        <div
          class="custom-slide-group-scrollbar-bar"
          :style="scrollbarDimensions"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    disableMouseWheel: {
      type: Boolean,
      default: false,
    },
    showArrows: {
      type: Boolean,
      default: undefined,
    },
    scrollbarClass: {
      type: [Object],
      default: undefined,
    },
    showScrollbar: {
      type: Boolean,
      default: undefined,
    },
  },
  data() {
    return {
      scrollbarRatio: 0.4,
      scrollStart: 0,
      maxScrollStart: 0,
      pageScrollSize: 0,
    };
  },
  computed: {
    chevronAttrs() {
      return {
        card: {
          class: 'd-flex align-center',
        },
        icon: {
          size: '40px',
        },
      };
    },
    computedShowArrows() {
      return !!(this.showArrows ?? !this.$vuetify.breakpoint.mobile);
    },
    computedShowScrollbar() {
      return !!(this.showScrollbar ?? this.scrollbarRatio < 1);
    },
    isScrollAtStart() {
      return this.scrollStart <= 0;
    },
    isScrollAtEnd() {
      return this.scrollStart >= this.maxScrollStart;
    },
    isOverflow() {
      return !this.isScrollAtStart || !this.isScrollAtEnd;
    },
    scrollbarDimensions() {
      if (this.maxScrollStart <= 0) {
        return {
          height: '100%',
          left: '0%',
          right: '0%',
        };
      }
      const width = Math.min(Math.max(this.scrollbarRatio, 0.2), 0.8) * 100;
      const left = (this.scrollStart / this.maxScrollStart) * (100 - width);
      const right = 100 - left - width;
      return {
        height: '100%',
        left: `${left}%`,
        right: `${right}%`,
      };
    },
  },
  watch: {
    isOverflow: {
      handler() {
        this.$emit('update:is-overflow', this.isOverflow);
      },
      immediate: true,
    },
  },
  methods: {
    resetMaxScrollStart() {
      try {
        const customSlideGroup = this.$refs.customSlideGroup || {};
        const [clientSize, scrollSize] = [
          customSlideGroup.clientWidth,
          customSlideGroup.scrollWidth,
        ];
        this.scrollbarRatio = clientSize / scrollSize;
        this.maxScrollStart = scrollSize - clientSize;
        this.pageScrollSize = clientSize;
      } catch (error) {
        this.$logger.error(error);
      }
    },
    onMousewheel($event) {
      try {
        if (this.disableMouseWheel) {
          return;
        }
        const { deltaY } = $event;
        const customSlideGroup = this.$refs.customSlideGroup || {};
        const prevScrollLeft = customSlideGroup.scrollLeft;
        customSlideGroup.scrollLeft += deltaY;
        if (prevScrollLeft !== customSlideGroup.scrollLeft) {
          $event.preventDefault();
        }
      } catch (error) {
        this.$logger.error(error);
      }
    },
    onScroll($event) {
      try {
        this.scrollStart = this.$refs.customSlideGroup?.scrollLeft;
      } catch (error) {
        this.$logger.error(error);
      }
    },
    onPrev($event) {
      const { customSlideGroup } = this.$refs || {};
      const scrollTo = {
        left: customSlideGroup.scrollLeft - this.pageScrollSize,
      };
      customSlideGroup.scrollTo?.({
        ...scrollTo,
        behavior: 'smooth',
      });
    },
    onNext($event) {
      const { customSlideGroup } = this.$refs || {};
      const scrollTo = {
        left: customSlideGroup.scrollLeft + this.pageScrollSize,
      };
      customSlideGroup.scrollTo?.({
        ...scrollTo,
        behavior: 'smooth',
      });
    },
    centerTo(value) {
      const { customSlideGroup } = this.$refs || {};
      const scrollTo = { left: value - customSlideGroup.clientWidth / 2 };
      customSlideGroup.scrollTo?.({
        ...scrollTo,
        behavior: 'smooth',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.custom-slide-group-container {
  position: relative;
}

.custom-slide-group-prev,
.custom-slide-group-next {
  position: absolute;
}

.custom-slide-group-prev {
  top: 0px;
  right: auto;
  bottom: 0px;
  left: 0px;
  background: linear-gradient(to left, transparent, white);
}

.custom-slide-group-next {
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: auto;
  background: linear-gradient(to right, transparent, white);
}

.custom-slide-group-scrollbar {
  width: 90px;
  max-width: 100%;
  height: 4px;
  position: relative;
  border-radius: 100px;
  .custom-slide-group-scrollbar-container {
    position: absolute;
    width: 100%;
    height: 100%;
    background: var(--v-primary-lighten1);
    opacity: 0.4;
    border-radius: 100px;
  }
  .custom-slide-group-scrollbar-bar {
    position: absolute;
    background: var(--v-primary-base);
    border-radius: 100px;
  }
}
</style>
