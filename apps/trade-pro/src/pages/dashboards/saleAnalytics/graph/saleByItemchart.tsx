import { Col } from 'antd';
import ReactECharts from 'echarts-for-react';
import { usePostSalesAnalyticsDashboard } from '../queries';
import { sumBy } from 'lodash';

const SaleByItemChart = ({ data }: any) => {
  // const { data } = usePostSalesAnalyticsDashboard();
  const filteredParentCategory = data?.data?.Data?.Result.Table2.filter(
    (item: any) => item.ParentCategory === 'DAAL & OTHERS'
  );
  const filteredParentCategory2 = data?.data?.Data?.Result.Table2.filter((item: any) => item.ParentCategory === 'Rice');

  console.log(filteredParentCategory?.[0].NetAmount);
  const ParentCategoryAmount = filteredParentCategory?.[0].NetAmount;
  const ParentCategoryDesc = filteredParentCategory?.[0].ParentCategory;

  const ParentCategoryAmount2 = filteredParentCategory2?.[0].NetAmount;
  const ParentCategoryDesc2 = filteredParentCategory2?.[0].ParentCategory;

  const option = {
    title: {
      text: 'Parent Category',
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
          { value: `${ParentCategoryAmount}`, name: `${ParentCategoryDesc}` },
          { value: `${ParentCategoryAmount2}`, name: `${ParentCategoryDesc2}` },
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
    color: ['#FF5733', '#B1FF33'], // Coral and Lime
  };

  return (
    <Col span={24}>
      <ReactECharts option={option} style={{ width: '30vw' }} />
    </Col>
  );
};
export default SaleByItemChart;
