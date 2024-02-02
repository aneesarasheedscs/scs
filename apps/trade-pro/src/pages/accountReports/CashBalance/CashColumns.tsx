import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { TCashBalance, TCashPayment } from './type';
import { AntColumnType } from '@tradePro/globalTypes';
import { formateDate } from '@tradePro/utils/formateDate';
import { Space } from 'antd';
import dayjs from 'dayjs';

export const columnsCashBalance = (t: any): AntColumnType<TCashBalance>[] => [
  {
    title: t('type'),
    dataIndex: 'DocumentTypeCode',
    showCount: true,
    width: 70,
    searchableInput: true,
    sorter: (a, b) => a.DocumentTypeCode.localeCompare(b.DocumentTypeCode),
  },
  {
    title: t('v_code'),
    dataIndex: 'VoucherCode',
    width: 80,
    sorter: (a, b) => a.VoucherCode - b.VoucherCode,
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
    title: t('receive_from'),
    dataIndex: 'OffsetAccountTitle',
    searchableInput: true,
    sorter: (a, b) => a.OffsetAccountTitle.localeCompare(b.OffsetAccountTitle),
    width: 150,
  },
  {
    width: 150,
    title: t('amount'),
    showTotal: true,
    fixed: 'right',
    align: 'right',
    dataIndex: 'DebitAmount',
    sorter: (a, b) => a.DebitAmount - b.DebitAmount,
    render: (DebitAmount, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(DebitAmount)}</Space>
    ),
  },
  {
    title: t('cash_account'),
    dataIndex: 'AccountTitle',
    searchableInput: true,
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
    width: 150,
  },

  {
    title: t('attachments'),
    dataIndex: 'NoOfAttachments',
    sorter: (a, b) => a.NoOfAttachments - b.NoOfAttachments,
    width: 120,
  },
];

export const columnsCashPayment = (t: any): AntColumnType<TCashPayment>[] => [
  {
    width: 110,
    title: t('type'),
    showCount: true,
    searchableDate: true,
    dataIndex: 'DocumentTypeCode',
    sorter: (a, b) => a.DocumentTypeCode.localeCompare(b.DocumentTypeCode),
  },
  {
    width: 100,
    title: t('v_code'),
    dataIndex: 'VoucherCode',
    sorter: (a, b) => a.VoucherCode - b.VoucherCode,
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
    title: t('paid_to'),
    dataIndex: 'OffsetAccountTitle',
    searchableInput: true,
    sorter: (a, b) => a.DocumentTypeCode.localeCompare(b.DocumentTypeCode),
    width: 200,
  },
  {
    title: t('amount'),
    dataIndex: 'DebitAmount',
    width: 150,
    align: 'right',
    sorter: (a, b) => a.DebitAmount - b.DebitAmount,
    showTotal: true,
    render: (DebitAmount, record) => {
      const numericDebitAmount = parseFloat(DebitAmount);
      if (!isNaN(numericDebitAmount)) {
        return <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(numericDebitAmount)}</Space>;
      } else {
        return null;
      }
    },
  },
  {
    title: t('attachments'),
    dataIndex: 'NoOfAttachments',
    sorter: (a, b) => a.NoOfAttachments - b.NoOfAttachments,
    width: 120,
  },
];
