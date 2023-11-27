import { EditFilled, PrinterOutlined, DeleteOutlined } from '@ant-design/icons';
import { AntColumnType } from '@tradePro/globalTypes';
import { AntButton } from '@tradePro/components';
import { Space, Tooltip } from 'antd';
import { formateDate } from '@tradePro/utils/formateDate';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { StockTransferExpense, TStockTransferNoteDetailEntry } from '../form/types';
import { TStockTransferNoteDirectTable } from './types';

export const columns = (
  t: any,
  setSelectedRecordId?: any,
  setActiveTab?: any
): AntColumnType<TStockTransferNoteDirectTable>[] => [
  {
    title: <>{t('document_no')}</>,
    width: 150,
    searchableInput: true,
    dataIndex: 'DocNo',
  },
  {
    title: <>{t('document_date')}</>,
    width: 190,
    dataIndex: 'DocDate',
    sortDirections: ['ascend', 'descend'],
    render: (_, { DocDate }) => formateDate(DocDate),
  },
  {
    title: <>{t('location_from')}</>,
    width: 350,
    searchableInput: true,
    dataIndex: 'LocationFrom',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.LocationFrom.localeCompare(b.LocationFrom),
  },
  {
    title: <>{t('location_to')}</>,
    width: 300,
    dataIndex: 'LocationTo',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.LocationTo.localeCompare(b.LocationTo),
  },
  {
    title: <>{t('request_status')}</>,
    width: 180,
    dataIndex: 'RequestStatus',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.RequestStatus.localeCompare(b.RequestStatus),
  },
  {
    title: <>{t('total_qty')}</>,
    width: 180,
    dataIndex: 'IssuedQty',
    searchableInput: true,
    render: (_, { IssuedQty }) => numberFormatter(IssuedQty),
  },
  {
    title: <>{t('total_amount')}</>,
    width: 220,
    dataIndex: 'IssuedAmount',
    showTotal: true,
    render: (_, { IssuedAmount }) => numberFormatter(IssuedAmount),
  },
  {
    title: <>{t('entry_user')}</>,
    width: 220,
    dataIndex: 'EntryUser',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.EntryUser.localeCompare(b.EntryUser),
  },
  {
    title: <>{t('remarks_header')}</>,
    width: 200,
    dataIndex: 'RemarksHeader',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.RemarksHeader.localeCompare(b.RemarksHeader),
  },

  {
    title: <>{t('action')}</>,
    width: 150,
    render: (_, record) => (
      <Tooltip title="Edit">
        <Space>
          <AntButton
            type="text"
            icon={<EditFilled style={{ color: 'black' }} />}
            onClick={() => {
              setSelectedRecordId(record?.Id), setActiveTab('2');
            }}
          />
          <AntButton type="text" icon={<PrinterOutlined style={{ color: 'red', marginLeft: '-1rem' }} />} />
        </Space>
      </Tooltip>
    ),
  },
];

export const column2 = (
  t: any,
  handleDeleteRow?: any,
  handleEditRow?: any
): AntColumnType<TStockTransferNoteDetailEntry>[] => [
  {
    title: <>{t('warehouse')}</>,
    width: 300,
    dataIndex: 'WareHouseName',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.WareHouseName.localeCompare(b.WareHouseName),
  },
  {
    title: <>{t('item_name')}</>,
    width: 300,
    searchableInput: true,
    dataIndex: 'ItemName',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ItemName.localeCompare(b.ItemName),
  },
  {
    title: <>{t('item_qty')}</>,
    width: 200,
    dataIndex: 'IssuedQty',
    render: (_, { IssuedQty }) => numberFormatter(IssuedQty),
    showTotal: true,
  },
  {
    title: <>{t('pack_uom')}</>,
    width: 200,
    dataIndex: 'UOMCode',
    searchableInput: true,
  },
  {
    title: <>{t('weight')}</>,
    width: 200,
    dataIndex: 'BillWeight',
    render: (_, { BillWeight }) => numberFormatter(BillWeight),
    showTotal: true,
  },
  {
    title: <>{t('average_rate')}</>,
    width: 200,
    dataIndex: 'IssuedRate',
    render: (_, { IssuedRate }) => numberFormatter(IssuedRate),
  },
  {
    title: <>{t('amount')}</>,
    width: 200,
    dataIndex: 'IssuedAmount',
    render: (_, { IssuedAmount }) => numberFormatter(IssuedAmount),
    showTotal: true,
  },
  {
    title: <>{t('expense')}</>,
    width: 200,
    dataIndex: 'ExpenseAmount',
    render: (_, { ExpenseAmount }) => numberFormatter(ExpenseAmount),
    showTotal: true,
  },
  {
    title: <>{t('net_amount')}</>,
    width: 200,
    dataIndex: 'ItemNetAmount',
    render: (_, { ItemNetAmount }) => numberFormatter(ItemNetAmount),
    showTotal: true,
  },
  {
    title: <>{t('remarks')}</>,
    width: 200,
    dataIndex: 'RemarksDetail',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.RemarksDetail.localeCompare(b.RemarksDetail),
  },
  {
    title: <>{t('action')}</>,
    width: 120,
    render: (_, record) => (
      <Tooltip title="Delete">
        <Space>
          <AntButton
            type="text"
            icon={<DeleteOutlined style={{ color: 'red' }} />}
            onClick={() => handleDeleteRow(record)}
          />
          <AntButton
            type="text"
            icon={<EditFilled style={{ color: 'blue' }} />}
            onClick={() => handleEditRow(record)}
          />
        </Space>
      </Tooltip>
    ),
  },
];

export const column3 = (t: any, handleDeleteRow?: any, handleEditRow?: any): AntColumnType<StockTransferExpense>[] => [
  {
    title: <>{t('other_item_name')}</>,
    width: 250,
    searchableInput: true,
    dataIndex: 'OtherItemName',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.OtherItemName.localeCompare(b.OtherItemName),
  },
  {
    title: <>{t('qty')}</>,
    width: 250,
    dataIndex: 'Qty',
    render: (_, { Qty }) => numberFormatter(Qty),
    showTotal: true,
  },
  {
    title: <>{t('rate')}</>,
    width: 250,
    dataIndex: 'Rate',
    render: (_, { Rate }) => numberFormatter(Rate),
  },
  {
    title: <>{t('amount')}</>,
    width: 250,
    dataIndex: 'Amount',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    render: (_, { Amount }) => numberFormatter(Amount),
  },
  {
    title: <>{t('remarks')}</>,
    width: 250,
    dataIndex: 'Remarks',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Remarks.localeCompare(b.Remarks),
  },
  {
    title: <>{t('action')}</>,
    width: 150,
    render: (_, record) => (
      <Tooltip title="Delete">
        <Space>
          <AntButton
            type="text"
            icon={<DeleteOutlined style={{ color: 'red' }} />}
            onClick={() => handleDeleteRow(record)}
          />
          <AntButton
            type="text"
            icon={<EditFilled style={{ color: 'blue' }} />}
            onClick={() => handleEditRow(record)}
          />
        </Space>
      </Tooltip>
    ),
  },
];
