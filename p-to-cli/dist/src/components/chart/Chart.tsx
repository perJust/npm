// import React from 'react';
// import the core library.
import ReactEChartsCore from 'echarts-for-react/lib/core';
import { EChartsReactProps } from 'echarts-for-react/lib';
// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from 'echarts/core';
// Import charts, all with Chart suffix
import {
  LineChart,
  BarChart,
  PieChart,
  // ScatterChart,
  RadarChart,
  MapChart,
  // TreeChart,
  // TreemapChart,
  // GraphChart,
  // GaugeChart,
  // FunnelChart,
  // ParallelChart,
  // SankeyChart,
  // BoxplotChart,
  // CandlestickChart,
  EffectScatterChart,
  LinesChart,
  HeatmapChart,
  // PictorialBarChart,
  // ThemeRiverChart,
  // SunburstChart,
  // CustomChart,
} from 'echarts/charts';
// import components, all suffixed with Component
import {
  // GridSimpleComponent,
  GridComponent,
  // PolarComponent,
  RadarComponent,
  GeoComponent,
  // SingleAxisComponent,
  // ParallelComponent,
  // CalendarComponent,
  // GraphicComponent,
  // ToolboxComponent,
  TooltipComponent,
  // AxisPointerComponent,
  // BrushComponent,
  TitleComponent,
  // TimelineComponent,
  MarkPointComponent,
  // MarkLineComponent,
  // MarkAreaComponent,
  LegendComponent,
  // LegendScrollComponent,
  // LegendPlainComponent,
  // DataZoomComponent,
  // DataZoomInsideComponent,
  // DataZoomSliderComponent,
  VisualMapComponent,
  // VisualMapContinuousComponent,
  // VisualMapPiecewiseComponent,
  // AriaComponent,
  // TransformComponent,
  // DatasetComponent,
} from 'echarts/components';
// Import renderer, note that introducing the CanvasRenderer or SVGRenderer is a required step
import {
  CanvasRenderer,
  // SVGRenderer,
} from 'echarts/renderers';
import { useLayoutEffect, useRef } from 'react';
import { debounce } from '@/utils';

require('echarts-wordcloud');

// Register the required components
echarts.use([
  MapChart,
  BarChart,
  LineChart,
  LinesChart,
  HeatmapChart,
  PieChart,
  RadarChart,
  RadarComponent,
  EffectScatterChart,
  VisualMapComponent,
  GeoComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  CanvasRenderer,
  MarkPointComponent,
]);

echarts.registerMap('chengdu', require('./mapJson/chengdu.json'));

export const Echarts = echarts;

export default (props: EChartsReactProps) => {
  const chartRef = useRef<ReactEChartsCore>(null);
  useLayoutEffect(() => {
    function chartResizeFn() {
      if (chartRef.current) {
        let chart = chartRef.current.getEchartsInstance();
        chart && chart.resize();
      }
    }
    (window as any).addEventListener('resize', debounce(chartResizeFn, 500));
    return () => {
      window.removeEventListener('resize', chartResizeFn);
    };
  }, [chartRef]);
  const defaultProps = {
    style: {
      width: '300px',
      height: '300px',
    },
  };
  return (
    <ReactEChartsCore
      ref={chartRef}
      echarts={echarts}
      {...defaultProps}
      {...props}
    />
  );
};
