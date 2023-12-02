import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { TCashBalance, TCashPayment } from './type';
import { AntColumnType } from '@tradePro/globalTypes';
import { formateDate } from '@tradePro/utils/formateDate';
import { Space } from 'antd';

export const columnsCashBalance = (t: any): AntColumnType<TCashBalance>[] => [
  {
    title: <>{t('sr#')}</>,
    dataIndex: '',
    width: 80,
    render: (_, __, index) => index + 1,
  },
  {
    title: <> {t('type')}</>,
    dataIndex: 'DocumentTypeCode',
    width: 70,
  },
  {
    title: <>{t('v.code')}</>,
    dataIndex: 'VoucherCode',
    width: 70,
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
    title: <>{t('receive_from')}</>,
    dataIndex: 'OffsetAccountTitle',
    width: 220,
  },
  {
    title: <>{t('cash_account')}</>,
    dataIndex: 'AccountTitle',
    width: 150,
  },

  {
    title: <>{t('attachments')}</>,
    dataIndex: 'NoOfAttachments',
    width: 120,
  },
];

export const columnsCashPayment = (t: any): AntColumnType<TCashPayment>[] => [
  {
    title: <>{t('sr#')}</>,
    dataIndex: '',
    width: 85,

    render: (_, __, index) => index + 1,
  },
  {
    width: 70,
    title: <>{t('v.code')}</>,
    searchableDate: true,
    dataIndex: 'DocumentTypeCode',
  },
  {
    width: 70,
    // searchableInput: true,
    title: <>{t('v.code')}</>,
    dataIndex: 'VoucherCode',
  },
  {
    title: <>{t('date')}</>,
    dataIndex: 'voucherdate',
    width: 120,
    render: (_, { voucherdate }) => formateDate(voucherdate),
  },

  {
    title: <>{t('paid_to')}</>,
    dataIndex: 'OffsetAccountTitle',
    width: 150,
  },
  {
    title: <>{t('amount')}</>,
    dataIndex: 'DebitAmount',
    width: 150,
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
    title: <>{t('attachments')}</>,
    dataIndex: 'NoOfAttachments',
    width: 120,
  },
];
