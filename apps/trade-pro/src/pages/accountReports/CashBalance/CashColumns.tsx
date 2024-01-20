import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { TCashBalance, TCashPayment } from './type';
import { AntColumnType } from '@tradePro/globalTypes';
import { formateDate } from '@tradePro/utils/formateDate';
import { Space } from 'antd';

export const columnsCashBalance = (t: any): AntColumnType<TCashBalance>[] => [
  {
    title: t('type'),
    dataIndex: 'DocumentTypeCode',
    width: 70,
  },
  {
    title: t('v_code'),
    dataIndex: 'VoucherCode',
    width: 80,
  },
  {
    title: t('date'),
    dataIndex: 'voucherdate',
    width: 120,
    render: (_, { voucherdate }) => formateDate(voucherdate),
  },

  {
    title: t('receive_from'),
    dataIndex: 'OffsetAccountTitle',
    width: 150,
  },
  {
    width: 150,
    title: t('amount'),
    showTotal: true,
    fixed: 'right',
    dataIndex: 'DebitAmount',
    render: (DebitAmount, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(DebitAmount)}</Space>
    ),
  },
  {
    title: t('cash_account'),
    dataIndex: 'AccountTitle',
    width: 150,
  },

  {
    title: t('attachments'),
    dataIndex: 'NoOfAttachments',
    width: 120,
  },
];

export const columnsCashPayment = (t: any): AntColumnType<TCashPayment>[] => [
  {
    width: 110,
    title: t('type'),
    searchableDate: true,
    dataIndex: 'DocumentTypeCode',
  },
  {
    width: 100,
    // searchableInput: true,
    title: t('v_code'),
    dataIndex: 'VoucherCode',
  },
  {
    title: t('date'),
    dataIndex: 'voucherdate',
    width: 130,
    render: (_, { voucherdate }) => formateDate(voucherdate),
  },

  {
    title: t('paid_to'),
    dataIndex: 'OffsetAccountTitle',
    width: 130,
  },
  {
    title: t('amount'),
    dataIndex: 'DebitAmount',
    width: 110,
    showTotal: true,
    render: (DebitAmount, record) => {
      const numericDebitAmount = parseFloat(DebitAmount);

      if (!isNaN(numericDebitAmount)) {
        return (
          <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>
            {numberFormatter(numericDebitAmount)}
          </Space>
        );
      } else {
        return null;
      }
    },
  },

  {
    title: t('attachments'),
    dataIndex: 'NoOfAttachments',
    width: 120,
  },
];
