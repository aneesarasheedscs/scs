import { AntColumnType } from '@tradePro/globalTypes';
import { OpeningBalanceTypes } from '../types';
import { Space } from 'antd';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { AntButton } from '@tradePro/components';
import { EditFilled } from '@ant-design/icons';
import { Tooltip } from 'antd';

export const OpeningBalanceColumns = (t: any, handleEditButtonChange: any): AntColumnType<OpeningBalanceTypes>[] => [
  {
    width: 250,
    title: t('account_type'),
    showCount: true,
    searchableInput: true,

    dataIndex: 'AccountType',
  },
  {
    width: 300,
    title: t('parent_account_title'),
    searchableInput: true,
    dataIndex: 'ParentAccountTitle',
  },
  {
    width: 300,
    title: t('account_title'),
    searchableInput: true,
    dataIndex: 'AccountTitle',
  },
  {
    width: 250,
    title: t('debit_balance'),
    dataIndex: 'DebitBalance',
    showTotal: true,
    // align: 'right',
    render: (DebitBalance, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(DebitBalance)}</Space>
    ),
  },
  {
    width: 250,
    title: t('credit_balance'),
    dataIndex: 'CreditBalance',
    showTotal: true,
    // align: 'right',
    render: (CreditBalance, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>
        {numberFormatter(CreditBalance)}
      </Space>
    ),
  },
  {
    title: t('action'),
    dataIndex: 'Id',
    align: 'center',
    width: 160,
    render: (_, record) => (
      <Tooltip title="Edit">
        <AntButton
          ghost
          style={{ border: 'none', display: 'flex', justifyContent: 'center', marginLeft: 65 }}
          onClick={(e) => handleEditButtonChange(record)}
          size="small"
          icon={<EditFilled style={{ color: '#006640' }} />}
        />
      </Tooltip>
    ),
  },
];
