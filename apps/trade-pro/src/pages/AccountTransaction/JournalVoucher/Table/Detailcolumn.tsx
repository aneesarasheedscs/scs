import { EditFilled, PrinterOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { AntColumnType } from '@tradePro/globalTypes';
import { AntButton } from '@tradePro/components';
import { Space, Tooltip } from 'antd';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { TVoucherDetailList } from '../types';

export const detailColumns = (t?: any): AntColumnType<TVoucherDetailList>[] => [
  {
    title: <>{t('account_title')}</>,
    width: 280,
    searchableInput: true,
    dataIndex: 'AccountTitle',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitleC.localeCompare(b.AccountTitleC),
  },
  {
    title: <>{t('against_account')}</>,
    width: 250,
    searchableInput: true,
    dataIndex: 'AccountTitle',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitleD.localeCompare(b.AccountTitleD),
  },
  {
    title: <>{t('cheque no')}</>,
    width: 180,
    searchableInput: true,
    dataIndex: 'CheqNoDetail',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CheqNoDetail.localeCompare(b.CheqNoDetail),
  },
  {
    title: <>{t('debit_amount')}</>,
    width: 180,
    showTotal: true,
    dataIndex: 'DebitAmount',
    render: (_, { DebitAmount }) => <span>{numberFormatter(DebitAmount)}</span>,
  },
  {
    title: <>{t('credit_amount')}</>,
    width: 150,
    showTotal: true,
    dataIndex: 'CreditAmount',
    render: (_, { CreditAmount }) => <span>{numberFormatter(CreditAmount)}</span>,
  },
  {
    title: <>{t('remarks')}</>,
    width: 200,
    dataIndex: 'Comments',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Comments.localeCompare(b.Comments),
  },
];
