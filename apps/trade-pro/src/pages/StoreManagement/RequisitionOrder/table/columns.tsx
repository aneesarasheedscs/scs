import { EditFilled, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { AntColumnType } from '@tradePro/globalTypes';
import { AntButton } from '@tradePro/components';
import { Space, Tooltip } from 'antd';
import { formateDate } from '@tradePro/utils/formateDate';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { TRequisitionOrderHistory } from '../types';
import dayjs from 'dayjs';

export const columns = (
  t?: any,
  setSelectedRecordId?: any,
  setActiveTab?: any,
  setSelectedRecordIdforDetail?: any
): AntColumnType<TRequisitionOrderHistory>[] => [
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
    width: 140,
    sorter: (a, b) => {
      const dateA = dayjs(a.DocDate);
      const dateB = dayjs(b.DocDate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },
  {
    title: <>{t('location_from')}</>,
    dataIndex: 'LocationFrom',
    width: 280,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.EntryUser.localeCompare(b.EntryUser),
  },
  {
    title: <>{t('location_to')}</>,
    dataIndex: 'LocationTo',
    width: 280,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.EntryUser.localeCompare(b.EntryUser),
  },
  {
    title: <>{t('request_status')}</>,
    dataIndex: 'RequestStatus',
    width: 170,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.EntryUser.localeCompare(b.EntryUser),
  },
  {
    title: <>{t('entry_user')}</>,
    dataIndex: 'EntryUser',
    width: 150,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.EntryUser.localeCompare(b.EntryUser),
  },
  {
    title: <>{t('entry_date')}</>,
    dataIndex: 'EntryDate',
    searchableDate: true,
    render: (_, { EntryDate }) => formateDate(EntryDate),
    width: 150,
    sorter: (a, b) => {
      const dateA = dayjs(a.EntryDate);
      const dateB = dayjs(b.EntryDate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },
  {
    title: <>{t('modify_user')}</>,
    dataIndex: 'ModifyUser',
    width: 150,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    // sorter: (a, b) => a.ModifyUser.localeCompare(b.ModifyUser),
  },
  {
    title: <>{t('modify_date')}</>,
    searchableDate: true,
    dataIndex: 'ModifyDate',
    render: (_, { ModifyDate }) => formateDate(ModifyDate),
    width: 150,
    sorter: (a, b) => {
      const dateA = dayjs(a.ModifyDate);
      const dateB = dayjs(b.ModifyDate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },
  {
    title: <>{t('approved_user')}</>,
    dataIndex: 'ApprovedUser',
    width: 180,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    // sorter: (a, b) => a.ApprovedUser.localeCompare(b.ApprovedUser),
  },
  {
    title: <>{t('approved_date')}</>,
    searchableDate: true,
    dataIndex: 'ApprovedDate',
    render: (_, { ApprovedDate }) => formateDate(ApprovedDate),
    width: 150,
    sorter: (a, b) => {
      const dateA = dayjs(a.ApprovedDate);
      const dateB = dayjs(b.ApprovedDate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },
  {
    title: <>{t('is_approved')}</>,
    dataIndex: 'IsApproved',
    width: 120,
    sortDirections: ['ascend', 'descend'],
    render: (IsApproved) => (
      <Space
        style={{
          color: IsApproved === 'Approved' ? 'lightgreen' : 'red',
          borderRadius: '5px',
          fontWeight: 'bold',
          width: '95%',
          paddingLeft: 8,
          border: '1px ridge white',
          boxShadow: ' rgba(0, 0, 0, 0.35) 0px 5px 15px',
          position: 'absolute',
          top: 8,
          left: 0,
          textAlign: 'center',
        }}
      >
        {IsApproved === 'Approved' ? 'Approved' : 'Not Approved'}
      </Space>
    ),
  },

  {
    title: <>{t('remarks')}</>,
    dataIndex: 'RemarksHeader',
    width: 150,
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
    width: 120,
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
