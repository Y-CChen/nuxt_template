<template>
  <custom-slim-container tag="div" client-only>
    <template #content>
      <v-pagination
        class="custom-pagination"
        :value="computedValue"
        :circle="circle"
        :length="computedPagesLength"
        :total-visible="totalVisible"
        @input="$emit('input', $event)"
        @next="$emit('next')"
        @previous="$emit('previous')"
      />
      <i18n
        v-if="showItemsPerPageOptions && itemsPerPageOptions.length"
        path="display-records-per-page"
        tag="div"
        class="text-no-wrap mt-2 d-flex align-center justify-center"
      >
        <template #number>
          <custom-select
            :value="itemsPerPage"
            class="mx-2"
            style="width: 100px"
            :items="computedItemsPerPageOptions"
            :name="`items-per-page`"
            dense
            hide-details
            @input="$emit('update:items-per-page', $event)"
          />
        </template>
      </i18n>
    </template>
  </custom-slim-container>
</template>

<script>
import { defaultItemsPerPageOptions } from '~/utils/constant';

export default {
  props: {
    value: {
      type: Number,
      default: 1,
    },
    circle: { type: Boolean, default: false },
    itemsLength: { type: Number, default: 0 },
    itemsPerPage: { type: Number, default: defaultItemsPerPageOptions[0] },
    itemsPerPageOptions: {
      type: Array,
      default: () => defaultItemsPerPageOptions,
    },
    showItemsPerPageOptions: {
      type: Boolean,
      default: false,
    },
    totalVisible: { type: Number, default: 10 },
  },
  computed: {
    computedValue() {
      return Math.min(Math.max(this.value, 0), this.computedPagesLength) || 1;
    },
    computedItemsPerPageOptions() {
      return [...this.itemsPerPageOptions].sort((a, b) => {
        if (a > b) {
          return 1;
        }
        if (a < b) {
          return -1;
        }
        return 0;
      });
    },
    computedPagesLength() {
      return Math.max(Math.ceil(this.itemsLength / this.itemsPerPage), 0) || 1;
    },
  },
  watch: {
    computedValue: {
      handler(v) {
        if (this.itemsLength > 0 && this.itemsPerPage > 0 && v !== this.value) {
          this.$emit('input', v);
        }
      },
      immediate: true,
    },
  },
};
</script>
