import { EditFilled, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { AntColumnType } from '@tradePro/globalTypes';
import { AntButton } from '@tradePro/components';
import { Space, Tooltip } from 'antd';
import { formateDate } from '@tradePro/utils/formateDate';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { TStockReceivedNoteHistory } from '../types';
import dayjs from 'dayjs';

export const columns = (
  t?: any,
  setSelectedRecordId?: any,
  setActiveTab?: any,
  setSelectedRecordIdforDetail?: any
): AntColumnType<TStockReceivedNoteHistory>[] => [
  {
    title: t('doc_no'),
    dataIndex: 'DocNo',
    searchableInput: true,
    width: 120,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.DocNo - b.DocNo,
  },
  {
    title: t('doc_date'),
    dataIndex: 'DocDate',
    searchableDate: true,
    render: (_, { DocDate }) => formateDate(DocDate),
    width: 140,
    sorter: (a, b) => {
      const dateA = dayjs(a.DocDate);
      const dateB = dayjs(b.DocDate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },
  {
    title: t('location_from'),
    dataIndex: 'DispatchedFrom',
    width: 250,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.DispatchedFrom.localeCompare(b.DispatchedFrom),
  },
  {
    title: t('location_to'),
    dataIndex: 'DispactchedTo',
    width: 280,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.DispactchedTo.localeCompare(b.DispactchedTo),
  },
  {
    title: t('request_status'),
    dataIndex: 'RequestStatus',
    width: 170,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.RequestStatus.localeCompare(b.RequestStatus),
  },
  {
    title: t('total_qty'),
    width: 110,
    showTotal: true,
    dataIndex: 'TotalReceivedQty',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.TotalReceivedQty - b.TotalReceivedQty,
    render: (_, { TotalReceivedQty }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '10%' }}>
        {numberFormatter(TotalReceivedQty)}
      </span>
    ),
  },
  {
    title: t('total_amount'),
    width: 140,
    dataIndex: 'TotalReceivedAmount',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.TotalReceivedAmount - b.TotalReceivedAmount,
    render: (_, { TotalReceivedAmount }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '10%' }}>
        {numberFormatter(TotalReceivedAmount)}
      </span>
    ),
  },

  {
    title: t('entry_user'),
    dataIndex: 'EntryUser',
    width: 150,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.EntryUser.localeCompare(b.EntryUser),
  },
  {
    title: t('entry_date'),
    dataIndex: 'EntryDate',
    width: 140,
    searchableDate: true,
    render: (_, { EntryDate }) => formateDate(EntryDate),
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => {
      const dateA = dayjs(a.EntryDate);
      const dateB = dayjs(b.EntryDate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },

  {
    title: t('remarks'),
    dataIndex: 'RemarksHeader',
    width: 180,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.RemarksHeader.localeCompare(b.RemarksHeader),
  },
  {
    title: t('attachment'),
    dataIndex: 'NoOfAttachments',
    width: 150,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.NoOfAttachments - b.NoOfAttachments,
  },
  {
    title: t('action'),
    width: 130,
    render: (_, record) => (
      <>
        <Tooltip title="Edit">
          <Space>
            <AntButton
              type="text"
              icon={<EditFilled style={{ color: 'black' }} />}
              onClick={() => {
                setSelectedRecordId(record?.Id), setActiveTab('2');
              }}
            />
          </Space>
        </Tooltip>
        <Tooltip title="View Detail">
          <Space>
            <AntButton
              type="text"
              icon={
                <EyeOutlined
                  style={{ color: 'blue', marginLeft: 4 }}
                  onClick={() => {
                    setSelectedRecordIdforDetail(record?.Id);
                  }}
                />
              }
            />
          </Space>
        </Tooltip>
      </>
    ),
  },
];
