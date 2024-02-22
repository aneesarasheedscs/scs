import dayjs from 'dayjs';
import { AntColumnType } from '@tradePro/globalTypes';
import { Space, Tooltip } from 'antd';
import { formateDate } from '@tradePro/utils/formateDate';
import { AntButton } from '@tradePro/components';
import { EditFilled } from '@ant-design/icons';

export const columns = (t?: any, setSelectedRecordId?: any): AntColumnType<any>[] => [
  {
    title: t('account_title'),
    width: 230,
    searchableInput: true,
    dataIndex: 'AccountTitle',
    sortDirections: ['ascend', 'descend'],
    sorter: (a: any, b: any) => a.AccountTitle.localeCompare(b.AccountTitle),
    showCount: true,
  },
  {
    title: t('cheque no'),
    width: 170,
    searchableInput: true,
    dataIndex: 'CheqNo',
    sortDirections: ['ascend', 'descend'],
    sorter: (a: any, b: any) => a.CheqNo.localeCompare(b.CheqNo),
  },
  {
    title: t('other remarks'),
    width: 250,
    searchableInput: true,
    dataIndex: 'OtherRemarks',
    sortDirections: ['ascend', 'descend'],
    sorter: (a: any, b: any) => a.OtherRemarks.localeCompare(b.OtherRemarks),
  },
  {
    title: t('cheque status'),
    width: 160,
    searchableInput: true,
    dataIndex: 'ChequeStatus',
    // render: (isActive) => (isActive ? 'True' : 'False'),
    sorter: (a: any, b: any) => a.CheqCancelStatus.localeCompare(b.CheqCancelStatus),
  },
  {
    title: t('cheque status date'),
    width: 200,
    dataIndex: 'ChequeStatusDate',
    sorter: (a, b) => {
      const dateA = dayjs(a.ChequeStatusDate);
      const dateB = dayjs(b.ChequeStatusDate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
    render: (_, { ChequeStatusDate }) => formateDate(ChequeStatusDate),
  },
  {
    title: t('status change user'),
    width: 220,
    searchableInput: true,
    dataIndex: 'StatusChangeUser',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.StatusChangeUser.localeCompare(b.StatusChangeUser),
  },
  {
    title: t('no of attachments'),
    width: 220,
    searchableInput: true,
    dataIndex: 'Attachments',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Attachments.localeCompare(b.Attachments),
  },
  {
    title: t('action'),
    width: 95,
    render: (_, record) => (
      <>
        <Tooltip title="Edit">
          <Space style={{ position: 'absolute', top: 10, left: 10 }}>
            <AntButton
              type="text"
              icon={<EditFilled style={{ color: '#006640' }} />}
              onClick={() => {
                setSelectedRecordId(record?.Id);
              }}
            />
          </Space>
        </Tooltip>
      </>
    ),
  },
];
