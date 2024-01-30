import { TChartAccountData } from '../types';
import { AntColumnType } from '@tradePro/globalTypes';
import { EditFilled, WindowsFilled } from '@ant-design/icons';
import { Space, Tooltip } from 'antd';
import { AntButton } from '@tradePro/components';

export const columns = (t?: any, onUpdateAccountTitle?: any): AntColumnType<TChartAccountData>[] => [
  {
    title: t('sr'),
    dataIndex: 'Id',
    searchableInput: true,

    width: 80,
    showCount: true,
  },

  {
    title: t('account_code'),
    dataIndex: 'AccountCode',
    searchableInput: true,
    width: 200,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountCode.localeCompare(b.AccountCode),
  },
  {
    title: t('account_title'),
    dataIndex: 'AccountTitle',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
    width: 200,
  },
  {
    title: t('account_level'),
    searchableInput: true,
    dataIndex: 'Account_Level',
    width: 155,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Account_Level - b.Account_Level,
    render: (Account_Level) => (
      <>
        <span>{Account_Level}</span>
      </>
    ),
  },
  {
    title: t('account_group'),
    searchableInput: true,
    dataIndex: 'AccountGroup',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountGroup.localeCompare(b.AccountGroup),

    width: 180,
  },
  {
    title: t('pl_bs_notes'),
    searchableInput: true,
    dataIndex: 'NoteTitle',
    width: 200,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.NoteTitle.localeCompare(b.NoteTitle),
  },
  {
    title: t('account_class'),
    dataIndex: 'AccountClass',
    searchableInput: true,
    sorter: (a, b) => a.AccountGroup.localeCompare(b.AccountGroup),
    width: 200,
  },
  {
    title: t('account_type'),
    searchableInput: true,
    dataIndex: 'AccountType',
    width: 200,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountType.localeCompare(b.AccountType),
  },
  {
    title: t('status'),
    width: 90,
    dataIndex: 'IsActive',
    // searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.IsActive.localeCompare(b.IsActive),
    render: (IsActive) => (
      <Space
        style={{
          color: IsActive === 'True' ? '#5A54F9' : 'red',
          fontWeight: 'bold',
          // borderRadius: '5px',
          width: '80%',
          position: 'absolute',
          top: 10,
          right: 5,
          textAlign: 'center',
          fontSize: 16,
          paddingLeft: 8,
          // border: '1px ridge white',
          // boxShadow: ' rgba(0, 0, 0, 0.35) 0px 5px 15px',
        }}
      >
        {IsActive === 'True' ? 'Active' : 'In-active'}
      </Space>
    ),
  },
  {
    title: t('action'),
    dataIndex: '',
    width: 90,
    render: (_, record) => (
      <Tooltip title="Chose Action">
        <AntButton
          type="text"
          icon={<WindowsFilled style={{ color: '#5A54F9', position: 'absolute', top: 0, right: 5, fontSize: 18 }} />}
          // onClick={() => handleOpen(record?.Id)}
        />
      </Tooltip>
    ),
    // render: (record: any) => <ActionModal record={record} onUpdateAccountTitle={onUpdateAccountTitle} />,
  },
];
