import dayjs from 'dayjs';
import { TPurchaseOrderHistory } from '../type';
import { AntColumnType } from '@tradePro/globalTypes';
import { formateDate } from '@tradePro/utils/formateDate';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { Tooltip } from 'antd';
import { AntButton } from '@tradePro/components';
import { EditFilled } from '@ant-design/icons';

export const columns = (
  t?: any,
  setSelectedRecordId?: any,
  setActiveTab?: any
): AntColumnType<TPurchaseOrderHistory>[] => [
  { title: <>{t('order_no')}</>, dataIndex: 'OrderNo', width: 150 },
  {
    width: 150,
    title: <>{t('order_date')}</>,
    searchableDate: true,
    dataIndex: 'OrderDate',
    sortDirections: ['ascend', 'descend'],
    render: (_, { OrderDate }) => formateDate(OrderDate),
    sorter: (a, b) => {
      const dateA = dayjs(a.OrderDate);
      const dateB = dayjs(b.OrderDate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },
  {
    width: 300,
    searchableInput: true,
    title: <>{t('supplier_name')}</>,
    dataIndex: 'SupplierName',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.SupplierName.localeCompare(b.SupplierName),
  },
  {
    title: <>{t('delivery_term')}</>,
    searchableInput: true,
    dataIndex: 'DeliveryTerm',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.DeliveryTerm.localeCompare(b.DeliveryTerm),
    width: 180,
  },
  {
    title: <>{t('item_name')}</>,
    dataIndex: 'ItemName',
    width: 350,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ItemName.localeCompare(b.ItemName),
  },
  {
    title: <>{t('pack_uom')}</>,
    searchableInput: true,
    dataIndex: 'BaseUom',
    width: 180,
  },
  {
    width: 180,
    title: <>{t('order_quantity')}</>,
    dataIndex: 'OrderQty',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.OrderQty - b.OrderQty,
    render: (_, { OrderQty }) => numberFormatter(OrderQty),
  },
  {
    width: 180,
    title: <>{t('received_quantity')}</>,
    dataIndex: 'ReceivedQty',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ReceivedQty - b.ReceivedQty,
    render: (_, { ReceivedQty }) => numberFormatter(ReceivedQty),
  },
  {
    width: 160,
    title: <>{t('balance_quantity')}</>,
    dataIndex: 'BalanceQty',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.BalanceQty - b.BalanceQty,
    render: (_, { BalanceQty }) => numberFormatter(BalanceQty),
  },
  {
    width: 160,
    showTotal: true,
    title: <>{t('order_weight')}</>,
    dataIndex: 'OrderWeight',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.OrderWeight - b.OrderWeight,
    render: (_, { OrderWeight }) => numberFormatter(OrderWeight),
  },
  {
    width: 150,
    showTotal: true,
    title: <>{t('received_weight')}</>,
    dataIndex: 'ReceivedWeight',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ReceivedWeight - b.ReceivedWeight,

    render: (_, { ReceivedWeight }) => numberFormatter(ReceivedWeight),
  },
  {
    width: 180,
    showAverage: true,
    title: <>{t('balance_weight')}</>,
    dataIndex: 'BalWeight',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.BalWeight - b.BalWeight,
    render: (_, { BalWeight }) => numberFormatter(BalWeight),
  },
  {
    width: 130,
    title: <>{t('item_rate')}</>,
    dataIndex: 'ItemRate',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ItemRate - b.ItemRate,
    render: (_, { ItemRate }) => numberFormatter(ItemRate),
  },
  {
    width: 150,
    title: <>{t('approved_date')}</>,
    dataIndex: 'ApprovedDate',
    sortDirections: ['ascend', 'descend'],
    render: (_, { ApprovedDate }) => formateDate(ApprovedDate),
    sorter: (a, b) => {
      const dateA = dayjs(a.ApprovedDate);
      const dateB = dayjs(b.ApprovedDate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },
  {
    width: 150,
    title: <>{t('order_expiry_date')}</>,
    dataIndex: 'OrderExpiryDate',
    render: (_, { OrderExpiryDate }) => formateDate(OrderExpiryDate),
  },
  {
    width: 100,
    title: <>{t('action')} </>,
    dataIndex: '',
    render: (_, record) => (
      <Tooltip title={t('edit')}>
        <AntButton
          type="text"
          icon={<EditFilled style={{ color: 'black' }} />}
          onClick={() => {
            setSelectedRecordId(record?.Id), setActiveTab('2');
          }}
        />
      </Tooltip>
    ),
  },
];
