import dayjs from 'dayjs';
import { TFunction } from 'i18next';
import { AntColumnType } from '@tradePro/globalTypes';
import { formateDate } from '@tradePro/utils/formateDate';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
//detail col branch&ItemWiseSalescolumn
export const DetailColumns = (t: TFunction): AntColumnType<StockTransferNoteRegisterHistory>[] => [
  { title: t('doc_no'), key: 'DocNo', dataIndex: 'DocNo', width: 100 },
  {
    width: 150,
    title: t('doc_date'),
    searchableDate: true,
    key: 'DocDate',
    dataIndex: 'DocDate',
    sortDirections: ['ascend', 'descend'],
    render: (_, { DocDate }) => formateDate(DocDate),
    sorter: (a, b) => {
      const dateA = dayjs(a.DocDate);
      const dateB = dayjs(b.DocDate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },
  {
    title: t('req_status'),
    key: 'ReqStatus',
    dataIndex: 'ReqStatus',
    width: 150,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a?.ReqStatus?.localeCompare(b?.ReqStatus),
  },
  {
    width: 200,
    searchableInput: true,
    title: t('source_location'),
    key: 'SourceLocation',
    dataIndex: 'SourceLocation',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a?.SourceLocation?.localeCompare(b?.SourceLocation),
  },

  {
    title: t('item_name'),
    key: 'ItemName',
    dataIndex: 'ItemName',
    width: 200,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a?.ItemName?.localeCompare(b?.ItemName),
  },
  // { title: t('item_uom'), key: 'ItemUom', dataIndex: 'ItemUom', width: 120 },

  {
    width: 120,
    title: t('req_qty'),
    key: 'ReqOrderQty',
    dataIndex: 'ReqOrderQty',
    render: (_, { ReqOrderQty }) => numberFormatter(ReqOrderQty),
  },

  {
    width: 120,
    title: t('req_amount'),
    key: 'ReqOrderAmount',
    dataIndex: 'ReqOrderAmount',
    render: (_, { ReqOrderAmount }) => numberFormatter(ReqOrderAmount),
  },
  {
    width: 120,
    title: t('dispatched_qty'),
    key: 'DispatchedQty',
    dataIndex: 'DispatchedQty',
    render: (_, { DispatchedQty }) => numberFormatter(DispatchedQty),
  },
  {
    width: 120,
    title: t('dispatched_amount'),
    key: 'DispatchedAmount',
    dataIndex: 'DispatchedAmount',
    render: (_, { DispatchedAmount }) => numberFormatter(DispatchedAmount),
  },
  {
    width: 120,
    title: t('received_qty'),
    key: 'ReceivedQty',
    dataIndex: 'ReceivedQty',
    render: (_, { ReceivedQty }) => numberFormatter(ReceivedQty),
  },
  {
    width: 120,
    title: t('received_amount'),
    key: 'ReceivedAmount',
    dataIndex: 'ReceivedAmount',
    render: (_, { ReceivedAmount }) => numberFormatter(ReceivedAmount),
  },
  {
    width: 120,
    title: t('expense_amount'),
    key: 'ExpenseAmount',
    dataIndex: 'ExpenseAmount',
    render: (_, { ExpenseAmount }) => numberFormatter(ExpenseAmount),
  },
  {
    width: 200,
    title: t('net_amount'),
    key: 'NetAmount',
    dataIndex: 'NetAmount',
    render: (_, { NetAmount }) => numberFormatter(NetAmount),
  },

  {
    title: t('entry_user'),
    key: 'EntryUer',
    dataIndex: 'EntryUser',
    width: 150,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a?.EntryUser?.localeCompare(b?.EntryUser),
  },
  {
    width: 150,
    title: t('entry_date'),
    searchableDate: true,
    key: 'EntryDate',
    dataIndex: 'EntryDate',
    sortDirections: ['ascend', 'descend'],
    render: (_, { EntryDate }) => formateDate(EntryDate),
    sorter: (a, b) => {
      const dateA = dayjs(a.EntryDate);
      const dateB = dayjs(b.EntryDate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },
  {
    title: t('approved_user'),
    key: 'ApprovedUser',
    dataIndex: 'ApprovedUser',
    width: 150,
    // sortDirections: ['ascend', 'descend'],
    // sorter: (a, b) => a?.ApprovedUser?.localeCompare(b?.ApprovedUser),
  },
  {
    width: 200,
    title: t('approved_date'),
    searchableDate: true,
    key: 'ApprovedDate',
    dataIndex: 'ApprovedDate',
    sortDirections: ['ascend', 'descend'],
    render: (_, { ApprovedDate }) => formateDate(ApprovedDate),
    sorter: (a, b) => {
      const dateA = dayjs(a.ApprovedDate);
      const dateB = dayjs(b.ApprovedDate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },
];

