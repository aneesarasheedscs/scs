import React from 'react';
import ReactECharts from 'echarts-for-react';
import { formateDate } from '@tradePro/utils/formateDate';
import * as echarts from 'echarts';

const MyChartComponent = ({ filteredCurrentStaticsforTitles, cardBackgroundColors }: any) => {
  const amount = filteredCurrentStaticsforTitles?.[0]?.NetAmount;
  const lineColor = cardBackgroundColors;

  const option = {
    title: {},
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      top: '10%',
      left: '1%',
      right: '1%',
      bottom: '1%',
      containLabel: false,
    },
    visualMap: [
      {
        show: false,
        type: 'continuous',
        seriesIndex: 0,
        min: 0,
        max: 400,
      },
      {
        show: false,
        type: 'continuous',
        seriesIndex: 1,
        dimension: 0,
        min: 0,
        max: filteredCurrentStaticsforTitles.length - 1,
      },
    ],
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: [
        formateDate(filteredCurrentStaticsforTitles?.[0]?.StartDate),
        formateDate(filteredCurrentStaticsforTitles?.[0]?.EndDate),
      ],
      splitLine: { show: false },
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: filteredCurrentStaticsforTitles?.[0]?.DescriptionTitle,
        data: [0, amount === 0 ? 100 : amount],
        type: 'line',
        // smooth: true,
        lineStyle: {
          //   color: lineColor,
          color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
            { offset: 1, color: lineColor }, // Start color
            { offset: 0, color: '#fff' }, // End color (transparent)
          ]),
        },
        areaStyle: {
          // Add gradient to the area
          //   color: '#fff',
          color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
            { offset: 1, color: lineColor }, // Start color
            { offset: 0, color: '#fff' }, // End color (transparent)
          ]),
        },
        emphasis: {
          focus: 'series',
        },
      },
    ],
  };

  return <ReactECharts option={option} style={{ width: '100%', height: '100px' }} />;
};

export default MyChartComponent;
