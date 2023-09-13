import { AntButton } from '@scs/ui';
import { AntColumnType } from '@tradePro/globalTypes';
import { Space, Tooltip } from 'antd';

export const columns = (): AntColumnType<any>[] => [
  {
    title: 'Account Title',
    dataIndex: 'AccountTitle',
    width: 100,
  },

  {
    title: 'Remarks',
    dataIndex: 'Remarks',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
    width: 100,
  },

  {
    title: 'Cheq No',
    dataIndex: 'CheqNo',
    width: 100,
    render: (Account_Level) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>
        <span>{Account_Level}</span>
      </Space>
    ),
  },
  {
    title: 'Account Drdgdfgdf',
    dataIndex: 'AccountDr',
    searchableInput: true,
    width: 100,
  },
  {
    title: 'Account Cr',
    dataIndex: 'AccountCr',
    width: 100,
  },
];
