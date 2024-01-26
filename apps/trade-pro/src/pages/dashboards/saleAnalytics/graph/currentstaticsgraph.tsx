// import React, { useEffect } from 'react';
// import * as echarts from 'echarts';

// const MyChartComponent = () => {
//   useEffect(() => {
//     const chartDom = document.getElementById('main');
//     const myChart = echarts.init(chartDom);
//     const option = {
//       title: {
//         // text: 'Stacked Area Chart',
//       },
//       tooltip: {
//         trigger: 'axis',
//         axisPointer: {
//           //   type: 'cross',
//           label: {
//             backgroundColor: 'blue',
//           },
//         },
//       },
//       //   legend: {
//       //     data: ['Today', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
//       //   },
//       //   toolbox: {
//       //     feature: {
//       //       saveAsImage: {},
//       //     },
//       //   },
//       grid: {
//         top: '5%',
//         left: '-7%',
//         right: '4%',
//         bottom: '0%',
//         containLabel: true,
//       },
//       xAxis: [
//         {
//           type: 'category',
//           boundaryGap: false,
//           data: ['26', '26'],

//           splitLine: { show: false },
//         },
//       ],
//       yAxis: [
//         {
//           type: 'value',
//         },
//       ],
//       series: [
//         {
//           name: 'Today',
//           type: 'line',
//           stack: 'Total',
//           lineStyle: {
//             color: 'blue',
//           },
//           areaStyle: {
//             color: '#1313f7cb',
//           },
//           emphasis: {
//             focus: 'series',
//           },
//           data: [120, 132, 134, 90, 210],
//         },
//         // {
//         //   name: 'Union Ads',
//         //   type: 'line',
//         //   stack: 'Total',
//         //   areaStyle: {},
//         //   emphasis: {
//         //     focus: 'series',
//         //   },
//         //   data: [220, 182, 191, 234, 290, 330, 310],
//         // },
//         // {
//         //   name: 'Video Ads',
//         //   type: 'line',
//         //   stack: 'Total',
//         //   areaStyle: {},
//         //   emphasis: {
//         //     focus: 'series',
//         //   },
//         //   data: [150, 232, 201, 154, 190, 330, 410],
//         // },
//         // {
//         //   name: 'Direct',
//         //   type: 'line',
//         //   stack: 'Total',
//         //   areaStyle: {},
//         //   emphasis: {
//         //     focus: 'series',
//         //   },
//         //   data: [320, 332, 301, 334, 390, 330, 320],
//         // },
//         // {
//         //   name: 'Search Engine',
//         //   type: 'line',
//         //   stack: 'Total',
//         //   label: {
//         //     show: true,
//         //     position: 'top',
//         //   },
//         //   areaStyle: {},
//         //   emphasis: {
//         //     focus: 'series',
//         //   },
//         //   data: [0, 100],
//         // },
//       ],
//     };

//     myChart.setOption(option);

//     return () => {
//       // Clean up ECharts instance
//       myChart.dispose();
//     };
//   }, []);

//   return <div id="main" style={{ width: '100%', height: '100px' }} />;
// };

// export default MyChartComponent;
import React from 'react';
import ReactECharts from 'echarts-for-react';
import { formateDate } from '@tradePro/utils/formateDate';

const MyChartComponent = ({ filteredCurrentStaticsforTitles, cardBackgroundColors }: any) => {
  // Extracting data for the chart
  //   const dates = data.map((item) => item.StartDate); // Assuming you have an array of objects with StartDate
  //   const netAmounts = data.map((item) => item.NetAmount); // Assuming you have an array of objects with NetAmount

  // Chart options
  const lineColor = cardBackgroundColors;
  const amount = filteredCurrentStaticsforTitles?.[0]?.NetAmount;
  console.log(filteredCurrentStaticsforTitles?.[0]?.NetAmount);
  const option = {
    title: {
      //   text: 'Net Amount Over Time',
      //   left: 'center',
    },
    tooltip: {
      trigger: 'axis',
    },
    // legend: {
    //   data: ['Today', 'This Week', 'This Month', 'This Quarter', 'This Year'],
    // },
    grid: {
      top: '10%',
      left: '0%',
      right: '5%',
      bottom: '1%',
      containLabel: true,
    },
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
        smooth: true,
        lineStyle: {
          color: lineColor,
        },
        areaStyle: {
          color: lineColor,
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
