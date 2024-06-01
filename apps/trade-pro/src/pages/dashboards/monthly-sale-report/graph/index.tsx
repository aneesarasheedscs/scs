import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { Col } from 'antd';
import ReactECharts from 'echarts-for-react';

const SalesDashboardChart = ({ data }: any) => {
  const filteredSalesPaymentTerms = data?.data?.Data?.Result.Table.filter(
    (item: any) => item.CaptionTitle === 'Cash Sale'
  );
  const filteredSalesPaymentTerms2 = data?.data?.Data?.Result.Table.filter(
    (item: any) => item.CaptionTitle === 'Credit Sale'
  );

  const CashSaleAmount = filteredSalesPaymentTerms?.[0]?.TotalSale;
  const CashSaleDesc = filteredSalesPaymentTerms?.[0]?.CaptionTitle;

  const CreditSaleAmount = filteredSalesPaymentTerms2?.[0]?.TotalSale;
  const CreditSaleDesc = filteredSalesPaymentTerms2?.[0]?.CaptionTitle;

  const option = {
    title: {
      // text: 'Cash & Credit Sale',
      // subtext: 'Fake Data',
      // left: 'center',
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
        radius: '70%',
        data: [
          { value: `${CashSaleAmount}`, name: `${CashSaleDesc}  ${numberFormatter(CashSaleAmount)}` },
          { value: `${CreditSaleAmount}`, name: `${CreditSaleDesc} ${numberFormatter(CreditSaleAmount)}` },
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
    <Col span={24} style={{ paddingBottom: '15%' }}>
      <ReactECharts option={option} style={{ width: '100%', marginTop: '15px',height:'25vh' }} />
    </Col>
  );
};
export default SalesDashboardChart;
