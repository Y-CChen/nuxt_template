<template>
  <div>
    <div
      v-if="!disabled && !alwaysActive && !activeIntersectResetting"
      v-intersect="activeIntersect"
    />
    <div ref="container">
      <div
        ref="content"
        :class="{
          'custom-floating': true,
          'custom-floating--active': active,
          'custom-floating--bottom': active && bottom,
        }"
        :style="{ width: width ? `${width}px` : undefined }"
      >
        <slot name="default" v-bind="{ active }" />
      </div>
    </div>
    <div
      v-if="active"
      :style="{ height: height ? `${height}px` : undefined }"
    />
  </div>
</template>

<script>
export default {
  props: {
    alwaysActive: {
      type: Boolean,
      default: false,
    },
    bottom: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      activeStore: false,
      intersecting: false,
      height: undefined,
      width: undefined,
      containerResizeObserver: undefined,
      activeIntersectResetting: false,
    };
  },
  computed: {
    activeIntersect() {
      const { top } = this.$vuetify.application;
      return {
        handler: (onVisibleIntersect, observer, isIntersecting) => {
          this.activeStore = !isIntersecting;
        },
        options: {
          rootMargin: `-${top}px 0px 0px 0px`,
        },
      };
    },
    active() {
      if (this.disabled) {
        return false;
      }
      return this.alwaysActive || this.activeStore;
    },
  },
  watch: {
    activeIntersect: {
      handler() {
        this.activeIntersectResetting = true;
        this.$nextTick(() => {
          this.activeIntersectResetting = false;
        });
      },
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (!this.containerResizeObserver) {
        this.containerResizeObserver = new ResizeObserver(this.resize);
      }
      this.containerResizeObserver?.disconnect();
      this.containerResizeObserver.observe(this.$refs.container);
    });
  },
  beforeDestroy() {
    this.containerResizeObserver?.disconnect();
  },
  methods: {
    resize() {
      const { width } = this.$refs.container?.getBoundingClientRect?.() || {};
      const { height } = this.$refs.content?.getBoundingClientRect?.() || {};
      this.height = height;
      this.width = width;
    },
  },
};
</script>

<style lang="scss" scoped>
.custom-floating {
  &--active {
    position: fixed;
    z-index: 4;
  }

  &--bottom {
    bottom: 0px;
  }
}
</style>
