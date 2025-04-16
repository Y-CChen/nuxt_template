<template>
  <client-only>
    <div>
      <v-pagination
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
            @input="$emit('update:itemsPerPage', $event)"
          />
        </template>
      </i18n>
    </div>
  </client-only>
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
      return Math.min(Math.max(this.value, 1), this.computedPagesLength);
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
      return Math.ceil(this.itemsLength / this.itemsPerPage) || 1;
    },
  },
  watch: {
    computedValue: {
      handler(v) {
        if (v !== this.value) {
          this.$emit('input', v);
        }
      },
      immediate: true,
    },
  },
};
</script>
