import { Col, Row } from 'antd';
import ReactECharts from 'echarts-for-react';
import { SaleReportbyQuarter } from '../tables';
import { map } from 'lodash';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

function QuarterlySaleGraph({ getMonthandQuarter, isSuccess, isLoading, isError, isFetching, refetch }: any) {
  const quarterlySaleGraph = getMonthandQuarter?.data?.Data?.Result?.Table1 || [];
  const { t } = useTranslation();
  const barColors = ['#5A54F9', '#FF5733', '#00A148', '#FFC300', '#900C3F'];

  // Generate data for pie chart
  const pieData = map(quarterlySaleGraph, (quarter: any, index: number) => {
    const startMonth = dayjs(quarter.QuarterStartDate).format('MMM');
    const endMonth = dayjs(quarter.QuarterEndDate).format('MMM');
    const year = dayjs(quarter.QuarterEndDate).format('YYYY');
    const name = `${startMonth} To ${endMonth} ${year}`;

    return {
      value: quarter.CurrSaleAmount,
      name: name,
      itemStyle: {
        color: barColors[index % barColors.length],
      },
    };
  });

  const chartOptions = {
    title: {
      // text: t('sales_by_quarter'),
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        // name: t('sales_by_quarter'),
        type: 'pie',
        radius: '50%',
        data: pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
    color: barColors,
  };

  return (
    <Row gutter={[10, 10]} justify="space-evenly">
      <Col xl={13} xxl={12} lg={14} md={17} sm={24} xs={24}>
        <SaleReportbyQuarter
          getMonthandQuarter={getMonthandQuarter}
          refetch={refetch}
          isError={isError}
          isFetching={isFetching}
          isLoading={isLoading}
          isSuccess={isSuccess}
        />
      </Col>
      <Col xl={12} xxl={11} lg={14} md={17} sm={24} xs={24}>
        <ReactECharts option={chartOptions} style={{ height: '300px' }} />
      </Col>
    </Row>
  );
}

export default QuarterlySaleGraph;
