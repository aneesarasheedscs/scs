import { Col } from 'antd';
import React from 'react';
import ReactECharts from 'echarts-for-react';
import { useGetMonthlySalesDashboard } from '../queries';
const SaleByDateChart = ({ data }: any) => {
  // const { data } = useGetMonthlySalesDashboard();

  const SaleByDate = data?.data?.Data?.Result.Table4.map((item: any) => {
    // Convert the date string to a JavaScript Date object
    const date = new Date(item.DocDate);

    // Extract the date portion (YYYY-MM-DD)
    return date.toISOString().split('T')[0];
  });
  const SaleByDateByNetAmount = data?.data?.Data?.Result.Table4.map((item: any) => item.NetAmount);

  const barColors = [
    '#FF3366',
    '#33FF57',
    '#3C91E6',
    '#A133FF',
    '#FFC300',
    '#33FF57',
    '#00FFAA',
    '#65A214',
    '#3F51B5',
    '#00BCD4',
    '#F47373',
    '#B8E986',
    '#8ED1FC',
    '#F78DA7',
    '#009688',
  ];

  return (
    <Col xxl={24}>
      <ReactECharts
        option={{
          title: {},
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
            },
          },
          legend: {
            textStyle: {
              color: '#666',
            },
            top: 10,
            right: 'center',
          },
          grid: {
            top: '10%',
            left: '10%',
            right: '10%',
            bottom: '15%',
            containLabel: true,
          },
          yAxis: {
            type: 'value',
          },
          xAxis: {
            type: 'category',
            data: SaleByDate, // Use the SaleByDate array as x-axis labels
            axisLabel: {
              show: true,
              interval: 0,
              rotate: 45,
            },
          },
          series: [
            {
              name: '',
              type: 'bar',
              data: SaleByDateByNetAmount,
              itemStyle: {
                color: (params: any) => {
                  return barColors[params.dataIndex];
                },
              },
              // label: {
              //   show: true, // Enable data labels
              //   position: 'top', // You can change the position to 'top', 'inside', or other valid values
              //   formatter: '{c}', // Format of the label, {c} represents the data value
              // },
            },
          ],
        }}
        style={{ height: '280px' }}
      />
    </Col>
  );
};

export default SaleByDateChart;
