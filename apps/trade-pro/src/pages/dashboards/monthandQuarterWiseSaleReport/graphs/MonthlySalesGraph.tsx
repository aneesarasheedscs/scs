import { Card, Col, Form, Row, Skeleton } from 'antd';
import ReactECharts from 'echarts-for-react';
import SaleReportbyMonth from '../tables';
import { map } from 'lodash';
import { useTranslation } from 'react-i18next';

function MonthlySalesGraph({ getMonthandQuarter, isSuccess, isLoading, isError, refetch, isFetching }: any) {
  const monthlySales = getMonthandQuarter?.data?.Data?.Result?.Table2 || [];
  const barColors = ['#5A54F9', '#FF5733', '#00A148', '#FFC300', '#900C3F'];
  const { t } = useTranslation();
  const chartOptions = {
    title: {
      // text: getMonthandQuarter?.data?.Data?.Result?.Table2?.[0]?.ActivityDescription,
    },
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
      data: monthlySales?.map((card: any) => card.SalesMonth) || [],
      top: 10,
      right: 'center',
    },
    grid: {
      top: '-5%',
      left: '5%',
      right: '10%',
      bottom: '5%',
      containLabel: true,
    },
    xAxis: {
      name: 'Months',
      nameGap: 10,
      type: 'category',
      data: monthlySales.map((graph: any) => graph.SalesMonth) || [],
    },
    yAxis: {
      type: 'value',
    },

    series: [
      {
        data: map(monthlySales, (activity: any, activityIndex: number) => ({
          name: ` ${activity.SalesMonth}`,
          value: activity.CurrSaleAmount,
          itemStyle: {
            color: barColors[activityIndex % barColors.length],
          },
        })),
        type: 'bar',
      },
    ],
  };

  return (
    <>
      <>
        <Row gutter={[10, 10]} justify={'start'}>
          <Col xl={12} xxl={11} lg={12} md={17} sm={24} xs={24}>
            <Card hoverable style={{ height: 'auto' }}>
              <h3 className="graphAmount verticalText"> {t('amount_in_rs')}</h3>
              <ReactECharts option={chartOptions} style={{ height: '250px' }} />
            </Card>
          </Col>
          <Col xl={12} xxl={9} lg={12} md={17} sm={24} xs={24}>
            <Card
              hoverable
              style={{ height: '87%', marginBottom: '-5%' }}
              cover={
                <>
                  <SaleReportbyMonth
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

export default MonthlySalesGraph;
