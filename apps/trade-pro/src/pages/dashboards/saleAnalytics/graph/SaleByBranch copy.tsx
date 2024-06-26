import { Col } from 'antd';
import React from 'react';
import ReactECharts from 'echarts-for-react';
import { usePostSalesAnalyticsDashboard } from '../queries';
const SaleByBranchChart = ({ data }: any) => {
  const SaleBranch = data?.data?.Data?.Result?.Table4?.map((item: any) => item.Branch);
  const SaleBranchNetAmount = data?.data?.Data?.Result?.Table4?.map((item: any) => item.NetAmount);

  const barColors = [
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
    <Col span={24}>
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
            top: '15%',
            left: '25%',
            right: '10%',
            bottom: '15%',
            containLabel: true,
          },

          yAxis: {
            type: 'value',
          },
          xAxis: {
            type: 'category',
            data: SaleBranch,
            axisLabel: {
              show: true,
              interval: 0,
              // rotate: 45,
            },
          },

          series: [
            {
              name: '',
              type: 'bar',
              data: SaleBranchNetAmount,

              itemStyle: {
                color: (params: any) => {
                  return barColors[params.dataIndex];
                },
              },
            },
          ],
        }}
        style={{ width: '80%', height: '280px' }}
      />
    </Col>
  );
};

export default SaleByBranchChart;
