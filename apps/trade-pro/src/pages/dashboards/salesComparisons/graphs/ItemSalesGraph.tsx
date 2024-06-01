import ReactECharts from 'echarts-for-react';
import { map } from 'lodash';
import { useTranslation } from 'react-i18next';

function ItemSalesGraph({ data }: any) {
  const { t } = useTranslation();
  const rawData = data?.data?.Data?.Result;
  const filteredItemsData = rawData?.filter((item: any) => item.DescriptionTitle === 'Item');
  console.log(filteredItemsData);
  const barColors = [
    '#5A54F9',
    '#FF5733',
    '#B5F803',
    '#EF9903',
    '#03A3F9',
    '#00A148',
    '#FFC300',
    '#900C3F',
    '#03CFD3',
    '#BB0DFC',
  ];
  const chartOptions = {
    // dataZoom: [
    //   {
    //     type: 'slider',
    //     start: 0,
    //     end: 100,
    //   },
    // ],
    title: {
      // text: filteredItemsData?.map((graph: any) => graph.DescriptionTitle) || [],
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
      data: filteredItemsData?.map((graph: any) => graph.GroupTitle) || [],
      top: 10,
      right: 'center',
    },
    grid: {
      top: '2%',
      left: '4%',
      right: '-4%',
      bottom: '-4%',
      containLabel: true,
    },
    xAxis: {
      name: 'Items',
      nameGap: 6,
      type: 'category',
      data: filteredItemsData?.map((graph: any) => graph.GroupTitle) || [],
      axisLabel: {
        rotate: 45,
      },
    },
    yAxis: {
      type: 'value',
    },

    series: [
      {
        data: map(filteredItemsData, (activity: any, activityIndex: number) => ({
          value: activity.SaleAmount,

          itemStyle: {
            color: barColors[activityIndex % barColors.length],
          },
        })),
        name: 'Items',
        type: 'bar',
      },
    ],
  };

  return (
    <>
      <h3 className="graphAmount verticalText"> {t('amount_in_rs')} </h3>
      <ReactECharts option={chartOptions} style={{ height: '300px' }} />
    </>
  );
}

export default ItemSalesGraph;
