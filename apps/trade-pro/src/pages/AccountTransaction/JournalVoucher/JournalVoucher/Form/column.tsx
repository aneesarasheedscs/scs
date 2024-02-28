import { Space, Tooltip } from 'antd';
import { TVoucherDetailList } from '../types';
import { AntButton } from '@tradePro/components';
import { AntColumnType } from '@tradePro/globalTypes';
import { DeleteOutlined, EditFilled } from '@ant-design/icons';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { TFunction } from 'i18next';

export const detailcolumns = (
  t: TFunction,
  handleDeleteRow: (record: TVoucherDetailList) => void,
  handleEditRow: (record: TVoucherDetailList) => void
): AntColumnType<TVoucherDetailList>[] => [
  {
    title: t('account_title'),
    width: 400,
    searchableInput: true,
    dataIndex: 'AccountTitle',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitleC.localeCompare(b.AccountTitleC),
  },
  {
    title: t('cheque no'),
    width: 200,
    searchableInput: true,
    dataIndex: 'CheqNoDetail',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CheqNoDetail.localeCompare(b.CheqNoDetail),
  },
  {
    align: 'right',
    title: t('debit_amount'),
    width: 200,
    showTotal: true,
    dataIndex: 'DebitAmount',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.DebitAmount - b.DebitAmount,
    render: (_, { DebitAmount }) => (
      <span style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(DebitAmount)}</span>
    ),
  },
  {
    align: 'right',
    title: t('credit_amount'),
    width: 200,
    showTotal: true,
    dataIndex: 'CreditAmount',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CreditAmount - b.CreditAmount,
    render: (_, { CreditAmount }) => (
      <span style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(CreditAmount)}</span>
    ),
  },
  {
    title: t('remarks'),
    width: 420,
    dataIndex: 'Comments',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Comments.localeCompare(b.Comments),
  },

  {
    title: t('action'),
    width: 95,
    render: (_, record, index) => {
      if (index % 2 !== 0) {
        return (
          <Tooltip title={t('actions')}>
            <Space>
              <AntButton
                type="text"
                icon={<EditFilled style={{ color: '#006640' }} />}
                onClick={() => handleEditRow(record)}
              />
              <AntButton
                type="text"
                icon={<DeleteOutlined style={{ color: 'red' }} />}
                onClick={() => handleDeleteRow(record)}
              />
            </Space>
          </Tooltip>
        );
      } else {
        return null;
      }
    },
  },
];
