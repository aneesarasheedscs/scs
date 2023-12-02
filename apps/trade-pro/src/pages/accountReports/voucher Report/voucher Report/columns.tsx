import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { AntColumnType } from '@tradePro/globalTypes';
import { formateDate } from '@tradePro/utils/formateDate';
import { TVoucherReport } from '../types';

function handleRowClick(AccountId: number) {
  console.log('Clicked on accountId:', AccountId);
}

export const columnsVoucherReport = (): AntColumnType<TVoucherReport>[] => [
  // {
  //   title: 'sr#',
  //   dataIndex: '',
  //   width: 85,
  //   render: (_, __, index) => index + 1,
  //   showCount: true
  // },

  {
    title: 'Type',
    dataIndex: 'DocumentTypeCode',
    width: 80,
  },
  // {
  //   title: 'DocumentTypeSrNo',
  //   dataIndex: 'DocumentTypeSrNo',
  //   width: 170,
  // },
  {
    title: 'Voucher Code',
    dataIndex: 'VoucherCode',
    width: 120,
  },

  {
    title: 'Voucher Date',
    dataIndex: 'voucherdate',
    width: 200,
    render: (_, { VoucherDate }) => formateDate(VoucherDate),
  },

  {
    title: 'Manual Bill No',
    dataIndex: 'ManualBillNo',
    width: 110,
  },

  {
    title: 'Account Code',
    dataIndex: 'AccountCode',
    width: 120,
    render: (_, { AccountCode }) => <a>{AccountCode}</a>,

    // render: (_, { AccountCode, AccountId }) => <a onClick={() => handleRowClick(AccountId)}>{AccountCode}</a>,

    // render: (_, { AccountCode, AccountId }) => (
    //   <Link to={`/general-ledger${AccountId ? `/${AccountId}` : ''}`}>
    //     {AccountCode}
    //   </Link>
    // )
  },

  {
    title: 'Account Title',
    dataIndex: 'AccountTitle',
    width: 200,
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
    width: 200,
    showTotal: true,
    render: (_, { DebitAmount }) => numberFormatter(DebitAmount),
  },

  {
    title: 'Credit',
    dataIndex: 'CreditAmount',
    showTotal: true,
    width: 200,
    render: (_, { CreditAmount }) => numberFormatter(CreditAmount),
  },
];
