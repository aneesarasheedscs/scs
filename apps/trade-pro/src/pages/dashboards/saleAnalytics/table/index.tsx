import { Space, Table, Typography } from 'antd';
import React from 'react';
import { usePostSalesAnalyticsDashboard } from '../queries';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { useTranslation } from 'react-i18next';

const ParentCategoryTable = ({ data }: any) => {
  const filteredParentCategory = data?.data?.Data?.Result.Table2.filter((item: any) => item.GroupId === 2);
  const { t } = useTranslation();
  return (
    <>
      {/* <Typography.Text>Recent Sales</Typography.Text> */}
      <Table
        dataSource={filteredParentCategory}
        columns={[
          {
            title: <>{t('par_category')}</>,
            width: 200,

            dataIndex: 'ParentCategory',
            render: (_, { ParentCategory }) => (
              <>
                {' '}
                <p style={{ width: '150%' }}>{ParentCategory}</p>
              </>
            ),
          },
          {
            title: <>{t('net_weight')}</>,
            width: '170px',
            dataIndex: 'NetWeight',
          },
          {
            title: <>{t('net_amount')}</>,
            width: '170px',
            dataIndex: 'NetAmount',
            render: (NetAmount, record) => (
              <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>
                {numberFormatter(NetAmount)}
              </Space>
            ),
          },
          {
            title: <>{t('%_of_total_weight')}</>,
            width: '150px',
            dataIndex: 'PrcntOfTotalWeight',
          },

          {
            title: <>{t('%_of_total_amount')}</>,
            width: '170px',
            dataIndex: 'PrcntOfTotalAmount',
          },
        ]}
        size="small"
        pagination={false}
        scroll={{ x: 'auto' }}
      />
    </>
  );
};

export const SaleByDateTable = () => {
  const { data } = usePostSalesAnalyticsDashboard();
  const filteredSalesByItem = data?.data?.Data?.Result.Table3.filter((item: any) => item.GroupId === 3);
  const { t } = useTranslation();
  return (
    <>
      {/* <Typography.Text>Recent Sales</Typography.Text> */}
      <Table
        dataSource={filteredSalesByItem}
        columns={[
          {
            title: <>{t('par_category')}</>,
            width: '120px',
            dataIndex: 'ParentCategory',
            render: (_, { ParentCategory }) => (
              <>
                {' '}
                <p style={{ width: '150%' }}>{ParentCategory}</p>
              </>
            ),
          },
          {
            title: <>{t('item_type')}</>,
            width: '135px',
            dataIndex: 'ItemType',
          },
          {
            title: <>{t('net_weight')}</>,
            width: '105px',
            dataIndex: 'NetWeight',
          },
          {
            title: <>{t('net_amount')}</>,
            width: '130px',
            dataIndex: 'NetAmount',
            render: (NetAmount, record) => (
              <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>
                {numberFormatter(NetAmount)}
              </Space>
            ),
          },
          {
            title: <>{t('%_of_total_weight')}</>,
            width: '137px',
            dataIndex: 'PrcntOfTotalWeight',
          },

          {
            title: <>{t('%_of_total_amount')}</>,
            width: '136px',
            dataIndex: 'PrcntOfTotalAmount',
          },
        ]}
        pagination={false}
        scroll={{ y: '15vh' }}
        size="small"
      />
    </>
  );
};

export const SaleByItemTable = ({ data }: any) => {
  const filteredSalesByItem = data?.data?.Data?.Result.Table3.filter((item: any) => item.GroupId === 3);
  const { t } = useTranslation();
  return (
    <>
      {/* <Typography.Text>Recent Sales</Typography.Text> */}
      <Table
        dataSource={filteredSalesByItem}
        columns={[
          {
            title: <>{t('par_category')}</>,
            width: '120px',
            dataIndex: 'ParentCategory',
            render: (_, { ParentCategory }) => (
              <>
                {' '}
                <p style={{ width: '150%' }}>{ParentCategory}</p>
              </>
            ),
          },
          {
            title: <>{t('item_type')}</>,
            width: '135px',
            dataIndex: 'ItemType',
          },
          {
            title: <>{t('net_weight')}</>,
            width: '105px',
            dataIndex: 'NetWeight',
          },
          {
            title: <>{t('net_amount')}</>,
            width: '130px',
            dataIndex: 'NetAmount',
            render: (NetAmount, record) => (
              <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>
                {numberFormatter(NetAmount)}
              </Space>
            ),
          },
          {
            title: <>{t('%_of_total_weight')}</>,
            width: '137px',
            dataIndex: 'PrcntOfTotalWeight',
          },

          {
            title: <>{t('%_of_total_amount')}</>,
            width: '136px',
            dataIndex: 'PrcntOfTotalAmount',
          },
        ]}
        pagination={false}
        scroll={{ y: '15vh' }}
        size="small"
      />
    </>
  );
};

// export const SaleByBranchTable = () => {
//   const { data } = usePostSalesAnalyticsDashboard();
//   const filteredSalesByBranch = data?.data?.Data?.Result.Table3.filter((item: any) => item.GroupId === 3);
//   const tableStyle: React.CSSProperties = {
//     height: '25vh', // Set the height to 15vh
//     overflowY: 'auto', // Add vertical scroll if content exceeds the height
//   };

//   return (
//     <>
//       {/* <Typography.Text>Recent Sales</Typography.Text> */}
//       <Table
//         dataSource={filteredSalesByBranch}
//         columns={[
//           {
//             title: 'ParentCategory',
//             width: 170,
//             dataIndex: 'ParentCategory',
//           },
//           {
//             title: 'ItemType',
//             width: 150,
//             dataIndex: 'ItemType',
//           },
//           {
//             title: 'NetAmount ',
//             width: 140,
//             dataIndex: 'NetAmount',
//             render: (NetAmount, record) => (
//               <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>
//                 {numberFormatter(NetAmount)}
//               </Space>
//             ),
//           },
//           {
//             title: '%OfTotalWeight',
//             width: 170,
//             dataIndex: 'PrcntOfTotalWeight',
//           },

//           {
//             title: '%OfTotalWeight',
//             width: 170,
//             dataIndex: 'PrcntOfTotalAmount',
//           },
//         ]}
//         scroll={{ y: '15vh' }}
//         pagination={false}
//       />
//     </>
//   );
// };

export const SaleBybranchTable = ({ data }: any) => {
  const filteredSalesByBranch = data?.data?.Data?.Result.Table4.filter((item: any) => item.GroupId === 4);
  const tableStyle: React.CSSProperties = {
    height: '25vh', // Set the height to 15vh
    overflowY: 'auto', // Add vertical scroll if content exceeds the height
  };
  const { t } = useTranslation();
  return (
    <>
      {/* <Typography.Text>Recent Sales</Typography.Text> */}
      <Table
        dataSource={filteredSalesByBranch}
        columns={[
          {
            title: <>{t('branch')}</>,
            width: 280,
            dataIndex: 'Branch',
          },

          {
            title: <>{t('net_amount')}</>,
            width: 107,
            dataIndex: 'NetAmount',
            render: (NetAmount, record) => (
              <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>
                {numberFormatter(NetAmount)}
              </Space>
            ),
          },
          {
            title: <>{t('%_of_total_weight')}</>,
            width: 136,
            dataIndex: 'PrcntOfTotalWeight',
          },

          {
            title: <>{t('%_of_total_amount')}</>,
            width: 136,
            dataIndex: 'PrcntOfTotalAmount',
          },
        ]}
        scroll={{ y: '15vh' }}
        pagination={false}
      />
    </>
  );
};
export default ParentCategoryTable;
