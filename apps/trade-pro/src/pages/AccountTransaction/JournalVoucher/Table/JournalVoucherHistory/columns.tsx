import { EditFilled, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { AntColumnType } from '@tradePro/globalTypes';
import { AntButton } from '@tradePro/components';
import { Space, Tooltip } from 'antd';
import { formateDate } from '@tradePro/utils/formateDate';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import dayjs from 'dayjs';
import { TJournalVoucherHistory } from '../../types';

export const columns = (
  t?: any,
  setSelectedRecordId?: any,
  setActiveTab?: any
): AntColumnType<TJournalVoucherHistory>[] => [
  {
    title: <>{t('document_type_code')}</>,
    width: 200,
    searchableInput: true,
    dataIndex: 'DocumentTypeCode',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.DocumentTypeCode.localeCompare(b.DocumentTypeCode),
  },
  {
    title: <>{t('voucher_code')}</>,
    width: 160,
    searchableInput: true,
    dataIndex: 'VoucherCode',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.VoucherCode - b.VoucherCode,
  },
  {
    title: <>{t('voucher_date')}</>,
    width: 200,
    dataIndex: 'VoucherDate',
    render: (_, { VoucherDate }) => formateDate(VoucherDate),
    sorter: (a, b) => {
      const dateA = dayjs(a.VoucherDate);
      const dateB = dayjs(b.VoucherDate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },

  {
    title: <>{t('voucher_amount')}</>,
    width: 160,
    dataIndex: 'VoucherAmount',
    showTotal: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.VoucherAmount - b.VoucherAmount,
    render: (_, { VoucherAmount }) => <span>{numberFormatter(VoucherAmount)}</span>,
  },
  {
    title: <>{t('user_name')}</>,
    width: 220,
    dataIndex: 'UserName',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.UserName.localeCompare(b.UserName),
  },

  {
    title: <>{t('attachment')}</>,
    width: 150,
    dataIndex: 'CheqNo',
    searchableInput: true,
  },
  {
    title: <>{t('action')}</>,
    width: 150,
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
                    setSelectedRecordId(record?.Id);
                  }}
                />
              }
            />
          </Space>
        </Tooltip>
        <Tooltip title="Delete">
          <Space>
            <AntButton type="text" icon={<DeleteOutlined style={{ color: 'red', marginLeft: 4 }} />} />
          </Space>
        </Tooltip>
      </>
    ),
  },
];
