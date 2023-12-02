import { numberFormatter } from '@tradePro/utils/numberFormatter';

import { AntColumnType } from '@tradePro/globalTypes';
import { formateDate } from '@tradePro/utils/formateDate';
import { Space } from 'antd';
import { TPaymentReceipt } from '../../types';

export const columnsBankBalance = (t: any): AntColumnType<TPaymentReceipt>[] => [
  {
    title: <>{t('sr#')}</>,
    width: 85,
    render: (_, __, index) => index + 1,
  },
  {
    width: 70,
    title: <> {t('type')}</>,
    searchableDate: true,
    dataIndex: 'DocumentTypeCode',
  },
  {
    width: 70,
    // searchableInput: true,
    title: <>{t('v.code')}</>,
    dataIndex: 'vouchercode',
  },
  {
    title: <>{t('date')}</>,
    dataIndex: 'voucherdate',
    width: 120,
    render: (_, { voucherdate }) => formateDate(voucherdate),
  },
  {
    width: 120,
    title: <>{t('amount')}</>,
    dataIndex: 'DebitAmount',
    showTotal: true,
    render: (DebitAmount, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(DebitAmount)}</Space>
    ),
  },
  {
    title: <>{t('bank_name')}</>,
    dataIndex: 'AccountTitle',
    width: 200,
  },
  {
    title: <>{t('cheque_no')}</>,
    dataIndex: 'ChequeNo',
    width: 150,
  },
  {
    title: <>{t('receive_from')}</>,
    dataIndex: 'OffsetAccountTitle',
    width: 200,
  },
];

export const columnsBankPayment = (t: any): AntColumnType<TPaymentReceipt>[] => [
  {
    title: <>{t('sr#')}</>,
    dataIndex: '',
    width: 85,
    render: (_, __, index) => index + 1,
  },
  {
    width: 85,
    title: <> {t('type')}</>,
    dataIndex: 'DocumentTypeCode',
  },
  {
    width: 85,
    // searchableInput: true,
    title: <>{t('v.code')}</>,
    dataIndex: 'vouchercode',
  },
  {
    title: <>{t('date')}</>,
    dataIndex: 'voucherdate',
    width: 150,
    render: (_, { voucherdate }) => formateDate(voucherdate),
  },
  {
    width: 120,
    title: <>{t('amount')}</>,
    dataIndex: 'DebitAmount',
    showTotal: true,
    render: (DebitAmount, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(DebitAmount)}</Space>
    ),
  },
  {
    title: <>{t('bank_name')}</>,
    dataIndex: 'AccountTitle',
    width: 200,
  },
  {
    title: <>{t('cheque_no')}</>,
    dataIndex: 'ChequeNo',
    width: 150,
  },
  {
    title: <>{t('paid-to')}</>,
    dataIndex: 'OffsetAccountTitle',
    width: 200,
  },
];
