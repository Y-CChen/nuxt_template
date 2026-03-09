<template>
  <div ref="chart" class="fill-height" />
</template>

<script>
import * as echarts from 'echarts/core';
import { LineChart, PieChart, SankeyChart } from 'echarts/charts';
import {
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
} from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { CustomChartTypes } from '~/utils/custom-chart';

echarts.use([
  CanvasRenderer,
  DatasetComponent,
  GridComponent,
  LabelLayout,
  LegendComponent,
  LineChart,
  PieChart,
  SankeyChart,
  TitleComponent,
  TooltipComponent,
  TransformComponent,
  UniversalTransition,
]);

const CustomChartTypeValues = Object.values(CustomChartTypes);

export default {
  props: {
    option: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  watch: {
    option: {
      handler() {
        this.setOption();
      },
      deep: true,
    },
  },
  mounted() {
    this.chart = echarts.init(this.$refs.chart);
    this.setOption();
  },
  methods: {
    setOption() {
      if (
        !this.chart ||
        (!CustomChartTypeValues.includes(this.option?.series?.type) &&
          !this.option?.series?.some?.((s) =>
            CustomChartTypeValues.includes(s.type),
          ))
      ) {
        return;
      }
      this.chart.setOption(this.option);
    },
  },
};
</script>
