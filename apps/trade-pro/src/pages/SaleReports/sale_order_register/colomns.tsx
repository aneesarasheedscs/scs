import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { AntColumnType } from '@tradePro/globalTypes';
import { SaleOrderHistory } from './type';
import { formateDate } from '@tradePro/utils/formateDate';
import dayjs from 'dayjs';
import { Space } from 'antd';

export const ColumnsSaleOrderRegisterReport = (t: any): AntColumnType<SaleOrderHistory>[] => [
  {
    title: t('doc_date'),
    width: 150,
    searchableDate: true,
    dataIndex: 'DocDate',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => {
      const dateA = dayjs(a.DocDate);
      const dateB = dayjs(b.DocDate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
    render: (_, { DocDate }) => formateDate(DocDate),
  },

  {
    title: t('doc_no'),
    dataIndex: 'DocNo',
    width: 100,
    sorter: (a, b) => a.DocNo - b.DocNo,
    render: (_, { DocNo }) => (
      <>
        <a onClick={() => {}}>{DocNo}</a>
      </>
    ),
  },
  {
    title: t('due_days'),
    width: 150,
    searchableDate: true,
    dataIndex: 'DueDays',
    sorter: (a, b) => a.DueDays - b.DueDays,
  },

  {
    title: t('due_date'),
    width: 150,
    searchableDate: true,
    dataIndex: 'DouDate',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => {
      const dateA = dayjs(a.DocDate);
      const dateB = dayjs(b.DocDate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
    render: (_, { DocDate }) => formateDate(DocDate),
  },

  {
    title: t('customer_name'),
    width: 300,
    dataIndex: 'CustomerName',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CustomerName.localeCompare(b.CustomerName),
    render: (_, { CustomerName }) => (
      <>
        <a onClick={() => {}}>{CustomerName}</a>
      </>
    ),
  },

  {
    title: t('commission_agent'),
    width: 300,
    dataIndex: 'CommissionAgent',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CommissionAgent.localeCompare(b.CommissionAgent),
  },

  {
    title: t('delivery_term'),
    searchableInput: true,
    dataIndex: 'DeliveryTerm',
    sorter: (a, b) => a.DeliveryTerm.localeCompare(b.DeliveryTerm),
    width: 150,
  },
  {
    width: 300,
    title: t('item_name'),
    dataIndex: 'ItemName',
    render: (_, { CommissionAgent }) => (
      <>
        <a onClick={() => {}}>{CommissionAgent}</a>
      </>
    ),
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ItemName.localeCompare(b.ItemName),
  },
  {
    title: t('pack_uom'),
    searchableInput: true,
    dataIndex: 'PackUom',
    width: 150,
    sorter: (a, b) => a.PackUom.localeCompare(b.PackUom),
  },
  {
    title: t('item_qty'),
    dataIndex: 'ItemQty',
    width: 200,
    align: 'right',
    showTotal: true,
    sorter: (a, b) => a.ItemQty - b.ItemQty,

    render: (_, { ItemQty }) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}> {numberFormatter(ItemQty)} </Space>
    ),
  },
  {
    title: t('dispatch_qty'),
    dataIndex: 'DispatchQty',
    width: 120,
    align: 'right',
    showTotal: true,
    sorter: (a, b) => a.DispatchQty - b.DispatchQty,

    render: (_, { DispatchQty }) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}> {numberFormatter(DispatchQty)} </Space>
    ),
  },
  {
    title: t('bal_qty'),
    dataIndex: 'BalQty',
    width: 150,
    align: 'right',
    showTotal: true,
    sorter: (a, b) => a.BalQty - b.BalQty,
    render: (_, { BalQty }) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}> {numberFormatter(BalQty)} </Space>
    ),
  },

  {
    title: t('weight'),
    dataIndex: 'Weight',
    showTotal: true,
    sorter: (a, b) => a.Weight - b.Weight,
    width: 150,
    align: 'right',
    render: (_, { Weight }) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}> {numberFormatter(Weight)} </Space>
    ),
  },
  {
    title: t('dispatch_weight'),
    dataIndex: 'DispatchWeight',
    width: 150,
    align: 'right',
    sorter: (a, b) => a.DispatchWeight - b.DispatchWeight,
    showTotal: true,
    render: (_, { DispatchWeight }) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}> {numberFormatter(DispatchWeight)} </Space>
    ),
  },
  {
    title: t('bal_weight'),
    dataIndex: 'BalWeight',
    sorter: (a, b) => a.BalWeight - b.BalWeight,
    width: 150,
    align: 'right',
    showTotal: true,
    showAverage: true,
    render: (_, { BalWeight }) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}> {numberFormatter(BalWeight)} </Space>
    ),
  },

  {
    title: t('rate'),
    dataIndex: 'Rate',
    sorter: (a, b) => a.Rate - b.Rate,
    width: 150,
    align: 'right',
    showTotal: true,

    render: (_, { Rate }) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}> {numberFormatter(Rate)} </Space>
    ),
  },

  {
    title: t('expiry_date'),
    dataIndex: 'ExpiryDate',
    width: 150,
    sorter: (a, b) => {
      const dateA = dayjs(a.DocDate);
      const dateB = dayjs(b.DocDate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
    render: (_, { ExpiryDate }) => formateDate(ExpiryDate),
  },
  {
    title: t('number_of_attachments'),
    dataIndex: 'NoOfAttachments',
    sorter: (a, b) => a.NoOfAttachments - b.NoOfAttachments,
    width: 150,
  },
];
