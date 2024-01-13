import { Space, Table, Typography } from 'antd';
import { dataTool } from 'echarts';
import React from 'react';
import { useGetMonthlySalesDashboard } from '../queries';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { formateDate } from '@tradePro/utils/formateDate';
import { useTranslation } from 'react-i18next';

const ParentCategoryTable = () => {
  const { data } = useGetMonthlySalesDashboard();
  const filteredParentCategory = data?.data?.Data?.Result.Table5.filter(
    (item: any) => item.CaptionTitle === 'Sales By Parent Category'
  );
  const { t } = useTranslation();

  return (
    <>
      {/* <Typography.Text>Recent Sales</Typography.Text> */}
      <Table
        dataSource={filteredParentCategory}
        columns={[
          {
            title: t('par_category'),
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
            title: t('net_weight'),
            width: '170px',
            dataIndex: 'NetWeight',
          },
          {
            title: t('net_amount'),
            width: '170px',
            dataIndex: 'NetAmount',
            render: (NetAmount, record) => (
              <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>
                {numberFormatter(NetAmount)}
              </Space>
            ),
          },
          {
            title: t('%_of_total_weight'),
            width: '150px',
            dataIndex: 'PrcntOfTotalWeight',
          },

          {
            title: t('%_of_total_amount'),
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
  const { data } = useGetMonthlySalesDashboard();
  const filteredSalesByDate = data?.data?.Data?.Result.Table4;
  const { t } = useTranslation();
  return (
    <>
      {/* <Typography.Text>Recent Sales</Typography.Text> */}
      <Table
        dataSource={filteredSalesByDate}
        columns={[
          {
            title: t('date'),
            width: '50px',
            dataIndex: 'DocDate',
            render: (_, { DocDate }) => formateDate(DocDate),
          },

          {
            title: t('net_weight'),
            width: '50px',
            dataIndex: 'NetWeight',
          },
          {
            title: t('%_of_total_amount'),
            width: '70px',
            dataIndex: 'NetAmount',
          },
          {
            title: t('%_of_total'),
            width: '50px',
            dataIndex: '%OfTotal',
          },
        ]}
        pagination={false}
        scroll={{ y: '14vh' }}
        size="small"
      />
    </>
  );
};

export const SaleByItemTable = () => {
  const { data } = useGetMonthlySalesDashboard();
  const filteredSalesByItem = data?.data?.Data?.Result.Table6.filter(
    (item: any) => item.CaptionTitle === 'Sales By Item Type'
  );
  const { t } = useTranslation();
  return (
    <>
      {/* <Typography.Text>Recent Sales</Typography.Text> */}
      <Table
        dataSource={filteredSalesByItem}
        columns={[
          {
            title: t('par_category'),
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
            title: t('item_type'),
            width: '135px',
            dataIndex: 'ItemType',
          },
          {
            title: t('net_weight'),
            width: '105px',
            dataIndex: 'NetWeight',
          },
          {
            title: t('net_amount'),
            width: '130px',
            dataIndex: 'NetAmount',
          },
          {
            title: t('%_of_total_weight'),
            width: '137px',
            dataIndex: 'PrcntOfTotalWeight',
          },

          {
            title: t('%_of_total_amount'),
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

export const SaleBybranchTable = () => {
  const { data } = useGetMonthlySalesDashboard();
  const filteredSalesByBranch = data?.data?.Data?.Result.Table7.filter(
    (item: any) => item.CaptionTitle === 'Sales By Branch'
  );
  const tableStyle: React.CSSProperties = {
    height: '25vh',
    overflowY: 'auto',
  };
  const { t } = useTranslation();

  return (
    <>
      {/* <Typography.Text>Recent Sales</Typography.Text> */}
      <Table
        dataSource={filteredSalesByBranch}
        columns={[
          {
            title: t('branch'),
            width: 280,
            dataIndex: 'Branch',
          },

          {
            title: t('net_amount'),
            width: 107,
            dataIndex: 'NetAmount',
            render: (NetAmount, record) => (
              <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>
                {numberFormatter(NetAmount)}
              </Space>
            ),
          },
          {
            title: t('%_of_total_weight'),
            width: 136,
            dataIndex: 'PrcntOfTotalWeight',
          },

          {
            title: t('%_of_total_amount'),
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
