import { Col } from 'antd';
import ReactECharts from 'echarts-for-react';

const SalesDashboardChart = ({ data }: any) => {
  // const { data } = usePostSalesAnalyticsDashboard();
  const filteredSalesPaymentTerms = data?.data?.Data?.Result.Table1.filter(
    (item: any) => item.DescriptionTitle === 'Cash Sales'
  );
  const filteredSalesPaymentTerms2 = data?.data?.Data?.Result.Table1.filter(
    (item: any) => item.DescriptionTitle === 'Credit Sales'
  );

  // console.log(filteredSalesPaymentTerms?.[0].NetAmount);
  const CashSaleAmount = filteredSalesPaymentTerms?.[0]?.NetAmount;
  const CashSaleDesc = filteredSalesPaymentTerms?.[0]?.DescriptionTitle;
  // const cashSaleAmount = (filteredSalesPaymentTerms, 'NetAmount');

  const CreditSaleAmount = filteredSalesPaymentTerms2?.[0]?.NetAmount;
  const CreditSaleDesc = filteredSalesPaymentTerms2?.[0]?.DescriptionTitle;

  const option = {
    title: {
      text: 'Cash & Credit Sales',
      // subtext: 'Fake Data',
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
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [
          { value: `${CashSaleAmount}`, name: `${CashSaleDesc}` },
          { value: `${CreditSaleAmount}`, name: `${CreditSaleDesc}` },
        ],
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
    <Col xxl={24} xl={24} md={20} xs={24} lg={24}>
      <ReactECharts option={option} style={{ width: '100%' }} />
    </Col>
  );
};
export default SalesDashboardChart;
