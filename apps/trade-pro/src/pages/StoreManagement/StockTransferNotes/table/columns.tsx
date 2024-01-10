import { EditFilled, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { AntColumnType } from '@tradePro/globalTypes';
import { AntButton } from '@tradePro/components';
import { Space, Tooltip } from 'antd';
import { formateDate } from '@tradePro/utils/formateDate';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { TStockTransferNotesHistory } from '../types';
import dayjs from 'dayjs';

export const columns = (
  t?: any,
  setSelectedRecordId?: any,
  setActiveTab?: any,
  setSelectedRecordIdforDetail?: any
): AntColumnType<TStockTransferNotesHistory>[] => [
  {
    title: <>{t('doc_no')}</>,
    dataIndex: 'DocNo',
    searchableInput: true,
    width: 120,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.DocNo - b.DocNo,
  },
  {
    title: <>{t('doc_date')}</>,
    dataIndex: 'DocDate',
    searchableDate: true,
    render: (_, { DocDate }) => formateDate(DocDate),
    width: 150,
    sorter: (a, b) => {
      const dateA = dayjs(a.DocDate);
      const dateB = dayjs(b.DocDate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },
  {
    title: <>{t('location_from')}</>,
    dataIndex: 'LocationFrom',
    width: 250,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.LocationFrom.localeCompare(b.LocationFrom),
  },
  {
    title: <>{t('location_to')}</>,
    dataIndex: 'LocationTo',
    width: 280,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.LocationTo.localeCompare(b.LocationTo),
  },
  {
    title: <>{t('request_status')}</>,
    dataIndex: 'RequestStatus',
    width: 170,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.RequestStatus.localeCompare(b.RequestStatus),
  },
  {
    title: <>{t('issued_qty')}</>,
    width: 110,
    showTotal: true,
    dataIndex: 'IssuedQty',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.IssuedQty - b.IssuedQty,
    render: (_, { IssuedQty }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '10%' }}>{numberFormatter(IssuedQty)}</span>
    ),
  },
  {
    title: <>{t('issued_amount')}</>,
    width: 150,
    dataIndex: 'IssuedAmount',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.IssuedAmount - b.IssuedAmount,
    render: (_, { IssuedAmount }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '10%' }}>
        {numberFormatter(IssuedAmount)}
      </span>
    ),
  },
  {
    title: <>{t('received_no')}</>,
    width: 150,
    searchableInput: true,
    dataIndex: 'ReceivedNo',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ReceivedNo - b.ReceivedNo,
    render: (_, { ReceivedNo }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '10%' }}>{numberFormatter(ReceivedNo)}</span>
    ),
  },
  {
    title: <>{t('is_reffered')}</>,
    searchableInput: true,
    dataIndex: 'IsReffered',
    width: 150,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.IsReffered.localeCompare(b.IsReffered),
  },
  {
    title: <>{t('entry_user')}</>,
    dataIndex: 'EntryUser',
    width: 180,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.EntryUser.localeCompare(b.EntryUser),
  },

  {
    title: <>{t('remarks')}</>,
    dataIndex: 'RemarksHeader',
    width: 180,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.RemarksHeader.localeCompare(b.RemarksHeader),
  },
  {
    title: <>{t('attachment')}</>,
    dataIndex: '',
    width: 150,
  },
  {
    title: <>{t('action')}</>,
    width: 130,
    render: (_, record) => (
      <>
        <Tooltip title={t('edit')}>
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
        <Tooltip title={t('detail')}>
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
