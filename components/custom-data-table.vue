<template>
  <v-data-table
    v-model="computedValue"
    :items="items"
    :headers="headers"
    :checkbox-color="checkboxColor"
    :disable-filtering="disableFiltering"
    :disable-pagination="disablePagination"
    :disable-sort="disableSort"
    :fixed-header="fixedHeader"
    :height="height"
    :hide-default-footer="hideDefaultFooter"
    :item-class="itemClass"
    :item-key="itemKey"
    :loading="loading"
    :show-select="showSelect"
    @click:row="$emit('click:row', ...arguments)"
  >
    <template #loading>
      <slot name="loading">
        <div class="flex-grow-1 flex-shrink-1 py-4 d-flex">
          <v-progress-circular class="mx-auto" color="primary" indeterminate />
        </div>
      </slot>
    </template>
    <template #no-data>
      <slot name="no-data">
        <div class="flex-grow-1 flex-shrink-1 text-center py-4">
          {{ $t('no-data') }}
        </div>
      </slot>
    </template>
    <template v-if="haveSlot('top')" #top>
      <slot name="top" />
    </template>
    <template #header.data-table-select="{ props, on }">
      <v-checkbox
        class="ma-0 pa-0"
        :color="props.color"
        hide-details
        :input-value="props.value"
        :indeterminate="props.indeterminate"
        @change="on.input"
      >
        <template v-if="selectAllLabel" #label>
          <span class="text-caption font-weight-bold text-no-wrap">{{
            selectAllLabel
          }}</span>
        </template>
      </v-checkbox>
    </template>
    <template
      v-for="headerTemplateName in headers
        .map((header) => `header.${header.value}`)
        .filter((name) => haveSlot(name))"
      #[headerTemplateName]
    >
      <slot :name="headerTemplateName" />
    </template>
    <template
      v-for="itemTemplateName in headers
        .map((header) => `item.${header.value}`)
        .filter((name) => haveSlot(name))"
      #[itemTemplateName]="{ item }"
    >
      <slot :name="itemTemplateName" v-bind="{ item }" />
    </template>
    <template v-if="haveSlot('footer')" #footer>
      <slot name="footer" />
    </template>
  </v-data-table>
</template>

<script>
import { mixinHaveSlot } from '~/mixins/have-slot';

export default {
  mixins: [mixinHaveSlot],
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    items: {
      type: Array,
      default: () => [],
    },
    headers: {
      type: Array,
      default: () => [],
    },
    checkboxColor: {
      type: String,
      default: 'primary',
    },
    disableFiltering: {
      type: Boolean,
      default: true,
    },
    disablePagination: {
      type: Boolean,
      default: true,
    },
    disableSort: {
      type: Boolean,
      default: true,
    },
    fixedHeader: {
      type: Boolean,
      default: false,
    },
    height: {
      type: [Number, String],
      default: undefined,
    },
    hideDefaultFooter: {
      type: Boolean,
      default: true,
    },
    hideHeader: {
      type: Boolean,
      default: undefined,
    },
    itemClass: {
      type: [Function, String],
      default: undefined,
    },
    itemKey: {
      type: String,
      default: undefined,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    selectAllLabel: {
      type: String,
      default: undefined,
    },
    showSelect: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    computedValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
</script>
