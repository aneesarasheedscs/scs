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
    width: 200,
    searchableInput: true,
    title: t('source_location'),
    key: 'SourceLocation',
    dataIndex: 'SourceLocation',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a?.SourceLocation?.localeCompare(b?.SourceLocation),
  },
  {
    title: t('destination_location'),
    key: 'DestinationLocation',
    dataIndex: 'DestinationLocation',
    width: 200,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a?.DestinationLocation?.localeCompare(b?.DestinationLocation),
  },
  {
    title: t('item_name'),
    key: 'ItemName',
    dataIndex: 'ItemName',
    width: 150,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a?.ItemName?.localeCompare(b?.ItemName),
  },
  { title: t('item_uom'), key: 'ItemUom', dataIndex: 'ItemUom', width: 120 },

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
    title: t('issued_qty'),
    key: 'IssuedQty',
    dataIndex: 'IssuedQty',
    render: (_, { IssuedQty }) => numberFormatter(IssuedQty),
  },
  {
    width: 120,
    title: t('issued_rate'),
    key: 'IssuedQty',
    dataIndex: 'IssuedQty',
    render: (_, { IssuedQty }) => numberFormatter(IssuedQty),
  },
  {
    width: 150,
    title: t('issued_amount'),
    key: 'IssuedAmount',
    dataIndex: 'IssuedAmount',
    render: (_, { IssuedAmount }) => numberFormatter(IssuedAmount),
  },
  {
    width: 120,
    title: t('received_qty'),
    key: 'ReceivedQty',
    dataIndex: 'ReceivedQty',
    render: (_, { ReceivedQty }) => numberFormatter(ReceivedQty),
  },
  {
    width: 200,
    title: t('received_amount'),
    key: 'ReceivedAmount',
    dataIndex: 'ReceivedAmount',
    render: (_, { ReceivedAmount }) => numberFormatter(ReceivedAmount),
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

  {
    width: 150,
    isNumber: true,
    title: t('item_rate'),
    key: 'ItemRate',
    dataIndex: 'ItemRate',
    searchableInput: true,
  },
  {
    width: 200,
    title: t('approved_date'),
    key: 'ApprovedDate',
    dataIndex: 'ApprovedDate',
    render: (_, { ApprovedDate }) => formateDate(ApprovedDate),
  },
];
export const BranchAndItemWiseColumns = (t: TFunction): AntColumnType<StockTransferNoteRegisterHistory>[] => [
  {
    title: t('item_name'),
    key: 'ItemName',
    dataIndex: 'ItemName',
    width: 150,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a?.ItemName?.localeCompare(b?.ItemName),
  },
  { title: t('item_uom'), key: 'ItemUom', dataIndex: 'ItemUom', width: 120 },

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
    title: t('issued_qty'),
    key: 'IssuedQty',
    dataIndex: 'IssuedQty',
    render: (_, { IssuedQty }) => numberFormatter(IssuedQty),
  },
  {
    width: 120,
    title: t('issued_rate'),
    key: 'IssuedQty',
    dataIndex: 'IssuedQty',
    render: (_, { IssuedQty }) => numberFormatter(IssuedQty),
  },
  {
    width: 150,
    title: t('issued_amount'),
    key: 'IssuedAmount',
    dataIndex: 'IssuedAmount',
    render: (_, { IssuedAmount }) => numberFormatter(IssuedAmount),
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
    title: t('req_status'),
    key: 'ReqStatus',
    dataIndex: 'ReqStatus',
    width: 150,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a?.ReqStatus?.localeCompare(b?.ReqStatus),
  },
];
