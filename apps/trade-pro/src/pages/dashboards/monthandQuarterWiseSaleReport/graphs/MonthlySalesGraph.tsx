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
      bottom: '30%',
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
      <Card style={{ height: '38%' }}>
        <Row gutter={[10, 10]} justify={'space-between'} style={{ width: '85%' }}>
          <Col xl={12} xxl={12} lg={12} md={20} sm={20} xs={24}>
            <h2 style={{ textAlign: 'center' }}>
              {' '}
              {getMonthandQuarter?.data?.Data?.Result?.Table2?.[0]?.ActivityDescription}
            </h2>
            <Card hoverable style={{ height: '75%' }}>
              <h3 className="graphAmount verticalText"> {t('amount_in_rs')}</h3>
              <ReactECharts option={chartOptions} style={{ height: '300px' }} />
            </Card>
          </Col>
          <Col xl={12} xxl={12} lg={11} md={20} sm={20} xs={24}>
            <h2 style={{ textAlign: 'center' }}> {t('monthly_sale_report')}</h2>

            <Card hoverable style={{ height: '75%' }}>
              <SaleReportbyMonth
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

export default MonthlySalesGraph;
