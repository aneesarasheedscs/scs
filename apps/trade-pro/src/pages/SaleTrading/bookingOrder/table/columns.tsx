import { TBookingOrder, TBookingOrderHistory } from '../type';
import { AntColumnType } from '@tradePro/globalTypes';
import { formateDate } from '@tradePro/utils/formateDate';
import { Button, Space, Tooltip } from 'antd';
import { PrinterFilled, EditFilled, SaveFilled, DeleteOutlined } from '@ant-design/icons';
import { AntButton } from '@tradePro/components';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { TFunction } from 'i18next';

export const saleOrderFormcolumns = (
  t: TFunction
  // handleDeleteRow: any,
  // handleEditRow: any
): AntColumnType<TBookingOrderHistory>[] => [
  { title: <>t{'Item Name'}</>, dataIndex: 'ItemName', width: 300 },
  {
    width: 150,
    title: <>{t('pack_uom')}</>,
    searchableDate: true,
    dataIndex: 'UOMCode',
  },
  {
    width: 150,
    searchableInput: true,
    title: <>{t('qty')}</>,
    dataIndex: 'OrderItemQty',
    sortDirections: ['ascend', 'descend'],
  },

  { title: <>{t('weight')}</>, dataIndex: 'NetWeight', width: 150 },
  {
    title: <>{t('item_price')}</>,
    dataIndex: 'BagPrice',
    width: 150,
    render: (Amount, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(Amount)}</Space>
    ),
  },

  // { title: 'Base UOM', dataIndex: 'UOMCodeItm', width: 120 },
  {
    width: 120,
    title: <>{t('add_less')}</>,
    dataIndex: 'AddLess',
  },
  {
    width: 120,
    title: <>{t('net_rate')}</>,
    dataIndex: 'RetailRate',
  },
  {
    width: 100,
    title: <>{'Rate UOM'}</>,
    dataIndex: 'RateUom',
  },
  {
    title: <>{t('amount')}</>,
    width: 120,
    showTotal: true,
    dataIndex: 'Amount',
    render: (Amount, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(Amount)}</Space>
    ),
  },
  {
    width: 120,
    title: <>{t('remarks')}</>,
    dataIndex: 'OrderRemarks',
  },

  {
    title: 'Action',
    width: 120,
    render: (_, record) => (
      <Tooltip title="Actions">
        <Space>
          <AntButton
            type="text"
            // icon={<DeleteOutlined style={{ color: 'red' }} onClick={() => handleDeleteRow(record)} />}
          />

          <AntButton
            type="text"
            icon={<EditFilled style={{ color: 'blue' }} />}
            // onClick={() => handleEditRow(record)}
          />
        </Space>
      </Tooltip>
    ),
  },
];

// export const saleOrderFormcolumns2 = (): AntColumnType<TSaleOrderForm2>[] => [
//   { title: 'Item Name', dataIndex: 'ItemName', width: 100 },
//   {
//     width: 150,
//     title: 'Pack Uom',
//     searchableDate: true,
//     dataIndex: 'UOMCode',
//   },
//   {
//     width: 150,
//     searchableInput: true,
//     title: 'QTY',
//     dataIndex: 'OrderItemQty',
//     sortDirections: ['ascend', 'descend'],
//   },
//   { title: 'Weight', dataIndex: 'NetWeight', width: 150 },
//   { title: 'Rate', dataIndex: '', width: 150 },

//   {
//     width: 100,
//     title: 'Rate UOM',
//     dataIndex: 'UOMCode',
//   },
//   {
//     width: 120,
//     dataIndex: 'OrderItemQty',
//     title: 'Balance Qty',
//   },
//   {
//     width: 120,
//     title: 'NetWeight',
//     dataIndex: 'NetWeight',
//   },
// ];

export const Bookingordercolumns = (
  t: any,
  setSelectedRecordId: (id: number | null) => void,
  setActiveTab: (tab: string) => void
): AntColumnType<TBookingOrderHistory>[] => [
  {
    width: 100,
    title: t('doc_no'),
    searchableDate: true,
    dataIndex: 'DocNo',
  },
  {
    width: 150,
    title: t('doc_date'),
    searchableDate: true,
    dataIndex: 'DocDate',
    render: (_, { DocDate }) => formateDate(DocDate),
  },

  {
    width: 260,
    title: t('party_name'),
    searchableDate: true,
    dataIndex: 'CustomerName',
  },

  {
    title: t('action'),
    dataIndex: 'action',
    key: 'action',
    width: 100,
    render: (_, record) => (
      <Tooltip title="Edit">
        <AntButton
          type="text"
          onClick={() => {
            setSelectedRecordId(record?.Id), setActiveTab('2');
          }}
          icon={<EditFilled style={{ color: '#00a148' }} />}
        />
      </Tooltip>
    ),
  },
];
