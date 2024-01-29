import { Col } from 'antd';
import ReactECharts from 'echarts-for-react';
import { useGetMonthlySalesDashboard } from '../queries';

const ParentCategoryChart = ({ data }: any) => {
  // const { data } = useGetMonthlySalesDashboard();

  // Filtered data arrays
  const filteredParentCategory = data?.data?.Data?.Result.Table5.filter(
    (item: any) => item.InvParentCateCode === 'DAAL & OTHERS'
  );
  const filteredParentCategory2 = data?.data?.Data?.Result.Table5.filter(
    (item: any) => item.InvParentCateCode === 'Rice'
  );

  // Initialize variables for NetAmount and InvParentCateCode
  let ParentCategoryAmount = 0;
  let ParentCategoryDesc = '';
  let ParentCategoryAmount2 = 0;
  let ParentCategoryDesc2 = '';

  // Check if filtered data is available before accessing properties
  if (filteredParentCategory?.[0]) {
    ParentCategoryAmount = filteredParentCategory[0].NetAmount;
    ParentCategoryDesc = filteredParentCategory[0].InvParentCateCode;
  }

  if (filteredParentCategory2?.[0]) {
    ParentCategoryAmount2 = filteredParentCategory2[0].NetAmount;
    ParentCategoryDesc2 = filteredParentCategory2[0].InvParentCateCode;
  }

  const option = {
    title: {
      // text: 'Parent Category',
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
    color: ['#FF5733', '#33FF88'],
  };

  return (
    <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
      <ReactECharts option={option} style={{ width: '40vw', marginBottom: '-5%' }} />
    </Col>
  );
};

export default ParentCategoryChart;
