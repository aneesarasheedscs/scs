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
      left: 'left',
    },
    series: [
      {
        name: 'Sales by Quarter',
        type: 'pie',
        radius: '50%',
        center: ['50%', '55%'],

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
      <>
        <Row gutter={[10, 10]} justify={'start'}>
          <Col xl={12} xxl={11} lg={12} md={17} sm={24} xs={24}>
            <Card hoverable style={{ height: 'auto' }}>
              <ReactECharts option={chartOptions} style={{ height: '300px' }} />
            </Card>
          </Col>
          <Col xl={12} xxl={9} lg={11} md={17} sm={24} xs={24}>
            <Card
              hoverable
              style={{ height: '80%', marginBottom: '-5%' }}
              cover={
                <>
                  <SaleReportbyQuarter
                    getMonthandQuarter={getMonthandQuarter}
                    refetch={refetch}
                    isError={isError}
                    isFetching={isFetching}
                    isLoading={isLoading}
                    isSuccess={isSuccess}
                  />
                </>
              }
            ></Card>
          </Col>
        </Row>
      </>
    </>
  );
}

export default QuarterlySaleGraph;
