import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { AntColumnType } from '@tradePro/globalTypes';
import { Space } from 'antd';
import { SaleOrderHistory } from './type';
import { formateDate } from '@tradePro/utils/formateDate';

export const ColumnsSaleOrderRegisterReport = (t: any): AntColumnType<SaleOrderHistory>[] => [
  {
    title: <>{t('sr#')}</>,
    dataIndex: '',
    width: 50,
    render: (_, __, index) => index + 1,
  },

  {
    title: 'Doc Date',
    dataIndex: 'DocDate',
    searchableDate: true,
    width: 150,
    // sorter: (a, b) => a.DocDate.formateDate(b.DocDate),
    render: (_, { DocDate }) => formateDate(DocDate),
  },
  {
    title: 'Doc No',
    dataIndex: 'DocNo',
    width: 100,
    render: (_, { DocNo }) => numberFormatter(DocNo),
  },
  {
    width: 250,
    searchableInput: true,
    title: 'Customer Name',
    dataIndex: 'CustomerName',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CustomerName.localeCompare(b.CustomerName),
  },

  { title: 'PackUom', dataIndex: 'PackUom', width: 120 },
  {
    title: 'Delivery Term',
    dataIndex: 'DeliveryTerm',
    width: 120,
  },
  {
    width: 260,
    searchableInput: true,
    title: 'Item Name',
    dataIndex: 'ItemName',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ItemName.localeCompare(b.ItemName),
  },
  {
    title: 'Item Qty',
    dataIndex: 'ItemQty',
    width: 120,
    showTotal: true,

    render: (_, { ItemQty }) => numberFormatter(ItemQty),
  },
  {
    title: 'Dispatch Qty',
    dataIndex: 'DispatchQty',
    width: 120,
    render: (_, { DispatchQty }) => numberFormatter(DispatchQty),
  },
  {
    title: 'Bal Qty',
    dataIndex: 'BalQty',
    width: 120,
    showTotal: true,

    render: (_, { BalQty }) => numberFormatter(BalQty),
  },

  {
    title: 'Weight',
    dataIndex: 'Weight',
    showTotal: true,
    width: 100,
    render: (_, { Weight }) => numberFormatter(Weight),
  },
  {
    title: 'Dispatch Weight',
    dataIndex: 'DispatchWeight',
    width: 130,
    showTotal: true,

    render: (_, { DispatchWeight }) => numberFormatter(DispatchWeight),
  },
  {
    title: 'Bal Weight',
    dataIndex: 'BalWeight',
    width: 120,
    showAverage: true,
    render: (_, { BalWeight }) => numberFormatter(BalWeight),
  },

  {
    title: 'Rate',
    dataIndex: 'Rate',
    width: 130,
    showTotal: true,

    render: (_, { Rate }) => numberFormatter(Rate),
  },

  {
    title: 'Expiry Date',
    dataIndex: 'ExpiryDate',
    width: 150,

    render: (_, { ExpiryDate }) => formateDate(ExpiryDate),
  },
];
