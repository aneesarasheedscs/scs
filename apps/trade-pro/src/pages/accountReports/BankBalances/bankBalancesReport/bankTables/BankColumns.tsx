import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { AntColumnType } from '@tradePro/globalTypes';
import { formateDate } from '@tradePro/utils/formateDate';
import { Space } from 'antd';
import { TPaymentReceipt } from '../../types';
import dayjs from 'dayjs';

export const columnsBankBalance = (t: any): AntColumnType<TPaymentReceipt>[] => [
  {
    width: 100,
    title: t('type'),
    searchableInput: true,
    dataIndex: 'DocumentTypeCode',
    showCount: true,
    sorter: (a, b) => a.DocumentTypeCode.localeCompare(b.DocumentTypeCode),
  },
  {
    width: 70,
    // searchableInput: true,
    title: t('v.code'),
    dataIndex: 'vouchercode',
    sorter: (a, b) => a.vouchercode - b.vouchercode,
  },
  {
    title: t('date'),
    dataIndex: 'voucherdate',
    width: 120,
    sorter: (a, b) => {
      const dateA = dayjs(a.voucherdate);
      const dateB = dayjs(b.voucherdate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
    render: (_, { voucherdate }) => formateDate(voucherdate),
  },
  {
    width: 120,
    title: t('amount'),
    dataIndex: 'DebitAmount',
    sorter: (a, b) => a.DebitAmount - b.DebitAmount,
    showTotal: true,
    align: 'right',
    render: (DebitAmount, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: '' }}>{numberFormatter(DebitAmount)}</Space>
    ),
  },
  {
    title: t('bank_name'),
    dataIndex: 'AccountTitle',
    searchableInput: true,
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
    width: 200,
  },
  {
    title: t('cheque_no'),
    dataIndex: 'ChequeNo',
    sorter: (a, b) => a.ChequeNo - b.ChequeNo,
    width: 150,
  },
  {
    title: t('receive_from'),
    dataIndex: 'OffsetAccountTitle',
    searchableInput: true,
    sorter: (a, b) => a.OffsetAccountTitle.localeCompare(b.OffsetAccountTitle),
    width: 200,
  },
];

export const columnsBankPayment = (t: any): AntColumnType<TPaymentReceipt>[] => [
  {
    width: 85,
    title: t('type'),
    dataIndex: 'DocumentTypeCode',
    showCount: true,
    searchableInput: true,
    sorter: (a, b) => a.DocumentTypeCode.localeCompare(b.DocumentTypeCode),
  },
  {
    width: 85,
    title: t('v.code'),
    dataIndex: 'vouchercode',
    sorter: (a, b) => a.vouchercode - b.vouchercode,
  },
  {
    title: t('date'),
    dataIndex: 'voucherdate',
    width: 150,
    sorter: (a, b) => {
      const dateA = dayjs(a.voucherdate);
      const dateB = dayjs(b.voucherdate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
    render: (_, { voucherdate }) => formateDate(voucherdate),
  },
  {
    width: 120,
    title: t('amount'),
    dataIndex: 'DebitAmount',
    showTotal: true,
    align: 'right',
    sorter: (a, b) => a.DebitAmount - b.DebitAmount,
    render: (DebitAmount, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: '' }}>{numberFormatter(DebitAmount)}</Space>
    ),
  },
  {
    title: t('bank_name'),
    dataIndex: 'AccountTitle',
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
    width: 200,
  },
  {
    title: t('cheque_no'),
    dataIndex: 'ChequeNo',
    sorter: (a, b) => a.ChequeNo - b.ChequeNo,
    width: 150,
  },
  {
    title: t('paid-to'),
    dataIndex: 'OffsetAccountTitle',
    sorter: (a, b) => a.OffsetAccountTitle.localeCompare(b.OffsetAccountTitle),
    searchableInput: true,
    width: 200,
  },
];
