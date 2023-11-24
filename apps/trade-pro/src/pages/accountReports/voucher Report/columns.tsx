import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { AntColumnType } from '@tradePro/globalTypes';
import { formateDate } from '@tradePro/utils/formateDate';
import { TVoucherReport } from '../types';

function handleRowClick(AccountId: number) {
  console.log('Clicked on accountId:', AccountId);
  // Perform any other actions you need with the accountId here
}

export const columnsVoucherReport = (): AntColumnType<TVoucherReport>[] => [
  {
    title: 'sr#',
    dataIndex: '',
    width: 85,
    render: (_, __, index) => index + 1,
  },
  {
    title: 'Type',
    dataIndex: 'DocumentTypeCode',
    width: 100,
  },
  {
    title: 'DocumentTypeSrNo',
    dataIndex: 'DocumentTypeSrNo',
    width: 170,
  },
  {
    title: 'V/Code',
    dataIndex: 'VoucherCode',
    width: 100,
  },
  {
    title: 'Date',
    dataIndex: 'voucherdate',
    width: 150,
    render: (_, { VoucherDate }) => formateDate(VoucherDate),
  },
  {
    title: 'manualBillNo',
    dataIndex: 'ManualBillNo',
    width: 110,
  },
  {
    title: 'Account Code',
    dataIndex: 'AccountCode',
    width: 120,
    render: (_, { AccountCode, AccountId }) => <a onClick={() => handleRowClick(AccountId)}>{AccountCode}</a>,
  },
  {
    title: 'Account Title',
    dataIndex: 'AccountTitle',
    width: 150,
  },
  {
    title: 'Cheque',
    dataIndex: 'ChequeNo',
    width: 100,
  },
  {
    title: 'Comments',
    dataIndex: 'Comments',
    width: 160,
  },
  {
    title: 'Debit',
    dataIndex: 'DebitAmount',
    width: 150,
    showTotal: true,
    render: (_, { DebitAmount }) => numberFormatter(DebitAmount),
  },
  {
    title: 'Credit',
    dataIndex: 'CreditAmount',
    showTotal: true,
    width: 150,
    render: (_, { CreditAmount }) => numberFormatter(CreditAmount),
  },
];
