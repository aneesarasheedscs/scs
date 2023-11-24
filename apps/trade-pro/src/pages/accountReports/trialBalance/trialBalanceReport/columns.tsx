// import { AntColumnType } from '@tradePro/globalTypes';
// import { TrialBalanceHistory, TtrialBalanceAllLevel, TtrialBalanceSelectedHistory } from '../tyes';
// import { Space } from 'antd';
// import { numberFormatter } from '@tradePro/utils/numberFormatter';

// export const TrialBalanceAllLevelHistoryColumns = (): AntColumnType<TtrialBalanceAllLevel>[] => [
//   {
//     title: 'Account Title',
//     width: 150,
//     dataIndex: 'AccountTitle',
//   },
//   {
//     title: 'Account Code',
//     width: 150,
//     dataIndex: 'AccountTitle',
//   },
//   {
//     title: 'Account Level',
//     width: 150,
//     dataIndex: 'AcLevel',
//   },
//   {
//     title: 'Is Group Detail',
//     width: 150,
//     dataIndex: 'IsGroupDetail',
//   },
//   {
//     title: 'Opening',
//     width: 150,
//     dataIndex: 'IsGroupDetail',
//   },
//   {
//     title: 'Debit',
//     width: 150,
//     dataIndex: 'IsGroupDetail',
//   },
//   {
//     title: 'Credit',
//     width: 150,
//     dataIndex: 'IsGroupDetail',
//   },
//   {
//     title: 'Closing',
//     width: 150,
//     dataIndex: 'IsGroupDetail',
//   },
// ];

// function handleRowClick(AccountId: number) {
//   console.log('Clicked on accountId:', AccountId);
//   // Perform any other actions you need with the accountId here
// }

// export const ColumnsTrialBalanceReport = (t: any): AntColumnType<TrialBalanceHistory>[] => [
//   {
//     title: <>{t('sr#')}</>,
//     dataIndex: '',
//     width: 85,
//     render: (_, __, index) => index + 1,
//   },
//   {
//     title: <> {t('parentAccount')}</>,
//     dataIndex: 'ParentAccount',
//     width: 170,
//   },
//   {
//     title: <>{t('ParentAccountTitle')}</>,
//     dataIndex: 'ParentAccountTitle',

//     width: 150,
//   },
//   {
//     title: <>{t('accountCode')}</>,
//     dataIndex: 'AccountCode',
//     width: 110,
//     render: (_, { AccountCode, AccountId }) => <a onClick={() => handleRowClick(AccountId)}>{AccountCode}</a>,
//   },
//   {
//     title: <>{t('AccountTitle')}</>,
//     dataIndex: 'AccountTitle',
//     width: 150,
//   },
//   {
//     title: <>{t('opening')}</>,
//     dataIndex: 'Opening',
//     width: 120,
//     render: (Opening, record) => (
//       <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(Opening)}</Space>
//     ),
//   },
//   {
//     title: <>{t('OpeningDr')}</>,
//     dataIndex: 'OpeningDr',
//     width: 120,
//     render: (OpeningDr, record) => (
//       <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(OpeningDr)}</Space>
//     ),
//   },
//   {
//     title: <>{t('OpeningCr')}</>,
//     dataIndex: 'OpeningCr',
//     width: 120,
//     render: (OpeningCr, record) => (
//       <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(OpeningCr)}</Space>
//     ),
//   },
//   {
//     title: <>{t('debit')}</>,
//     dataIndex: 'Debit',
//     width: 120,
//     render: (Debit, record) => (
//       <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(Debit)}</Space>
//     ),
//   },
//   {
//     title: <>{t('credit')}</>,
//     dataIndex: 'Credit',
//     width: 120,
//     render: (Credit, record) => (
//       <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(Credit)}</Space>
//     ),
//   },

//   {
//     title: <>{t('closing')}</>,
//     dataIndex: 'Closing',
//     width: 120,
//     render: (Closing, record) => (
//       <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(Closing)}</Space>
//     ),
//   },

//   {
//     title: <>{t('closingDr')}</>,
//     dataIndex: 'ClosingDr',
//     width: 120,
//     render: (ClosingDr, record) => (
//       <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(ClosingDr)}</Space>
//     ),
//   },
//   {
//     title: <>{t('closingCr')}</>,
//     dataIndex: 'ClosingCr',
//     width: 120,
//     render: (ClosingCr, record) => (
//       <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(ClosingCr)}</Space>
//     ),
//   },
// ];

// export const trialBalanceSelectedHistoryColumns = (): AntColumnType<TtrialBalanceSelectedHistory>[] => [
//   {
//     title: 'Class Name',
//     width: 150,
//     dataIndex: 'ClassName',
//   },
//   {
//     title: 'Account Level',
//     width: 150,
//     dataIndex: 'AcLevel',
//   },
//   {
//     title: 'Account Type',
//     width: 150,
//     dataIndex: 'AccountType',
//   },
//   {
//     title: 'Account Code',
//     width: 150,
//     dataIndex: 'AccountCode',
//   },
//   {
//     title: 'Account Title',
//     width: 150,
//     dataIndex: 'AccountTitle',
//   },
//   {
//     title: 'Opening',
//     width: 150,
//     dataIndex: 'Opening',
//   },
//   {
//     title: 'Debit',
//     width: 150,
//     dataIndex: 'Debit',
//   },
//   {
//     title: 'Credit',
//     width: 150,
//     dataIndex: 'Credit',
//   },
//   {
//     title: 'Closing',
//     width: 150,
//     dataIndex: 'Closing',
//   },
// ];
