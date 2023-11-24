import { AntButton } from '@tradePro/components';
import { AntColumnType } from '@tradePro/globalTypes';
import { Popconfirm, Space, Tooltip } from 'antd';
import { DeleteOutlined, EditFilled } from '@ant-design/icons';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { TJournalVoucherData, TVoucherDetailList } from '../types';

export const columns = (t: any, handleDeleteRow: any, handleEditRow: any): AntColumnType<TVoucherDetailList>[] => [
  {
    title: <>{t('account_title')}</>,
    width: 350,
    searchableInput: true,
    dataIndex: 'AccountTitle',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitleC.localeCompare(b.AccountTitleC),
  },
  {
    title: <>{t('cheque no')}</>,
    width: 210,
    searchableInput: true,
    dataIndex: 'CheqNoDetail',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CheqNoDetail.localeCompare(b.CheqNoDetail),
  },
  {
    title: <>{t('debit_amount')}</>,
    width: 200,
    showTotal: true,
    dataIndex: 'DebitAmount',
    render: (_, { DebitAmount }) => <span>{numberFormatter(DebitAmount)}</span>,
  },
  {
    title: <>{t('credit_amount')}</>,
    width: 200,
    showTotal: true,
    dataIndex: 'CreditAmount',
    render: (_, { CreditAmount }) => <span>{numberFormatter(CreditAmount)}</span>,
  },
  {
    title: <>{t('remarks')}</>,
    width: 330,
    dataIndex: 'Comments',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Comments.localeCompare(b.Comments),
  },
  {
    title: <>{t('action')}</>,
    width: 120,
    render: (_, record) => (
      <Tooltip title={t('actions')}>
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
