import { Card, Col, Form, Row, Skeleton } from 'antd';
import ReactECharts from 'echarts-for-react';
import { SaleReportbyQuarter } from '../tables';
import { map } from 'lodash';
import { useTranslation } from 'react-i18next';

function QuarterlySaleGraph({ getMonthandQuarter, isSuccess, isLoading, isError, isFetching, refetch }: any) {
  const quarterlySaleGraph = getMonthandQuarter?.data?.Data?.Result?.Table1 || [];
  const barColors = ['#5A54F9', '#FF5733', '#00A148', '#FFC300', '#900C3F'];
  const { t } = useTranslation();
  const chartOptions = {
    title: {
      // text: quarterlySaleGraph.map((card: any) => card.ActivityDescription) || [],
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    legend: {
      textStyle: {
        color: '#666',
      },
      // data: data?.data?.Data?.Result?.Table.map((card: any) => card.ActivityDescription) || [],
      top: 0,
      right: 'center',
    },
    series: [
      {
        name: 'Sales by Quarter',
        type: 'pie',
        radius: '60%',
        center: ['50%', '45%'],

        data: map(quarterlySaleGraph, (activity: any, activityIndex: number) => ({
          value: activity.CurrSaleAmount,
          name: `July to September ${activity.YearNo}`,
          itemStyle: {
            color: barColors[activityIndex % barColors.length],
          },
        })),

        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  return (
    <>
      <Card style={{ height: '40%' }}>
        <Row gutter={[10, 10]} justify={'space-between'} style={{ width: '85%' }}>
          <Col xl={12} xxl={12} lg={12} md={20} sm={20} xs={24}>
            <h2 style={{ textAlign: 'center' }}>
              {getMonthandQuarter?.data?.Data?.Result?.Table1?.[0]?.ActivityDescription}
            </h2>
            <Card hoverable style={{ height: '80%' }}>
              <ReactECharts option={chartOptions} style={{ height: '300px' }} />
            </Card>
          </Col>
          <Col xl={12} xxl={12} lg={11} md={20} sm={20} xs={24}>
            <h2 style={{ textAlign: 'center' }}> {t('quarterly_sale_report')} </h2>

            <Card hoverable style={{ height: '80%' }}>
              <SaleReportbyQuarter
                getMonthandQuarter={getMonthandQuarter}
                refetch={refetch}
                isError={isError}
                isFetching={isFetching}
                isLoading={isLoading}
                isSuccess={isSuccess}
              />
            </Card>
          </Col>
        </Row>
      </Card>
    </>
  );
}

export default QuarterlySaleGraph;
