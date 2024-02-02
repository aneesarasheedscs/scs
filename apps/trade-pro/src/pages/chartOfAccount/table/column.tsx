import { TChartAccountData } from '../types';
import { AntColumnType } from '@tradePro/globalTypes';
import { EditFilled, WindowsFilled } from '@ant-design/icons';
import { Space, Tooltip } from 'antd';
import { AntButton } from '@tradePro/components';

export const columns = (onUpdateAccountTitle: any): AntColumnType<TChartAccountData>[] => [
  {
    title: 'Account Code',
    dataIndex: 'AccountCode',
    width: 200,
    showCount: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountCode.localeCompare(b.AccountCode),
  },
  {
    title: 'Account Title',
    dataIndex: 'AccountTitle',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
    width: 200,
  },
  {
    title: 'Account Level',
    dataIndex: 'Account_Level',
    width: 140,
    render: (Account_Level) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>
        <span>{Account_Level}</span>
      </Space>
    ),
  },
  {
    title: 'Account Group',
    dataIndex: 'AccountGroup',
    width: 180,
  },
  {
    title: 'PL/BS Note',
    searchableInput: true,
    dataIndex: 'NoteTitle',
    width: 200,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.NoteTitle.localeCompare(b.NoteTitle),
  },
  {
    title: 'Account Class',
    dataIndex: 'AccountClass',
    searchableInput: true,
    sorter: (a, b) => a.AccountGroup.localeCompare(b.AccountGroup),
    width: 200,
  },
  {
    title: 'Account Type',
    dataIndex: 'AccountType',
    width: 200,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountType.localeCompare(b.AccountType),
  },
  {
    title: 'Status',
    width: 90,
    dataIndex: 'IsActive',
    render: (IsActive) => (
      <Space
        style={{
          backgroundColor: IsActive === 'True' ? '#5A54F9' : 'red',
          color: 'white',
          borderRadius: '5px',
          width: '95%',
          paddingLeft: 8,
          border: '1px ridge white',
          boxShadow: ' rgba(0, 0, 0, 0.35) 0px 5px 15px',
        }}
      >
        {IsActive === 'True' ? 'active' : 'Inactive'}
      </Space>
    ),
  },
  {
    title: 'Action',
    dataIndex: '',
    width: 90,
    render: (_, record) => (
      <Tooltip title="Chose Action">
        <AntButton
          type="text"
          icon={<WindowsFilled style={{ color: '#5A54F9', fontSize: 20 }} />}
          // onClick={() => handleOpen(record?.Id)}
        />
      </Tooltip>
    ),
    // render: (record: any) => <ActionModal record={record} onUpdateAccountTitle={onUpdateAccountTitle} />,
  },
];
