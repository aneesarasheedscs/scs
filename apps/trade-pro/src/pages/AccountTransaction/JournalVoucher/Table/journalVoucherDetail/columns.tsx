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
    title: 'Account Dr',
    dataIndex: 'AccountDr',
    searchableInput: true,
    width: 100,
  },
  {
    title: 'Account Cr',
    dataIndex: 'AccountCr',
    width: 100,
  },

  {
    title: 'Action',
    dataIndex: '',
    width: 100,
    render: (_, record) => (
      <Tooltip title="Chose Action">
        <AntButton
          type="text"
          icon={
            <>
              {/* <EyeOutlined style={{ color: 'red', marginRight: 10 }} /> */}
              {/* <PlusSquareFilled style={{ color: '#5A54F9' }} /> */}
            </>
          }
        />
      </Tooltip>
    ),
  },
];
