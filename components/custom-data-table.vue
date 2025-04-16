<template>
  <v-data-table
    :items="items"
    :headers="headers"
    :disable-filtering="disableFiltering"
    :disable-pagination="disablePagination"
    :disable-sort="disableSort"
    :hide-default-footer="hideDefaultFooter"
    :loading="loading"
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
import { haveSlot } from '~/utils/have-slot';

export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    headers: {
      type: Array,
      default: () => [],
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
    hideDefaultFooter: {
      type: Boolean,
      default: true,
    },
    hideHeader: {
      type: Boolean,
      default: undefined,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    haveSlot(name) {
      return haveSlot(this, name);
    },
  },
};
</script>
