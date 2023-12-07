import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { TCashAndBankBalancesSummary } from './type';
import { AntColumnType } from '@tradePro/globalTypes';
import { Space, Tooltip } from 'antd';
import { PrinterFilled, CheckSquareFilled } from '@ant-design/icons';

export const CashBalancesSummaryCash = (
  t: any,
  handleAccountCodeClick: any
): AntColumnType<TCashAndBankBalancesSummary>[] => [
  {
    title: <>{t('sr#')}</>,
    dataIndex: '',
    width: 150,
    fixed: 'left',
    render: (_, __, index) => index + 1,
  },
  {
    width: 150,
    title: <>{t('account_code')}</>,
    dataIndex: 'AccountCode',
    render: (_, { AccountCode, AccountId }) => (
      <>
        <a onClick={() => handleAccountCodeClick(AccountId)}>{AccountCode}</a>
      </>
    ),
  },
  {
    width: 150,
    title: <>{t('account_title')}</>,
    searchableDate: true,
    dataIndex: 'AccountTitle',

    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
  },
  {
    width: 150,
    searchableDate: true,
    title: <>{t('opening')}</>,
    dataIndex: 'Opening',
    showTotal: true,
    render: (Opening, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(Opening)}</Space>
    ),
  },
  {
    width: 150,
    title: <>{t('current_debit')}</>,
    searchableDate: true,
    dataIndex: 'CurrDebit',
    showTotal: true,
    render: (CurrDebit, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(CurrDebit)}</Space>
    ),
  },
  {
    width: 150,
    title: <>{t('current_credit')}</>,
    searchableDate: true,
    dataIndex: 'CurrCredit',
    showTotal: true,
    render: (CurrCredit, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(CurrCredit)}</Space>
    ),
  },
  {
    width: 150,
    title: <>{t('closing')}</>,
    searchableDate: true,
    dataIndex: 'Closing',
    showTotal: true,
    render: (Closing, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(Closing)}</Space>
    ),
  },
  {
    title: <>{t('action')}</>,
    dataIndex: '',
    render: (_, record) => (
      <Space>
        <Tooltip title="Approve">
          <CheckSquareFilled
            style={{
              fontSize: 18,
              cursor: 'pointer',
              color: '#5A54F9',
              boxShadow:
                'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
            }}
          />
        </Tooltip>
        <Tooltip title="Voucher-Slip">
          <PrinterFilled
            style={{
              fontSize: 18,
              cursor: 'pointer',
              color: '#F37DAA',
              boxShadow:
                'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
            }}
          />
        </Tooltip>
      </Space>
    ),
    width: 100,
  },
];
