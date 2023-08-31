import { AntColumnType } from '@tradePro/globalTypes';
import { PlusSquareFilled, EyeOutlined } from '@ant-design/icons';
import { Space, Tooltip } from 'antd';
import { AntButton } from '@tradePro/components';
import { TChartAccountData } from '@tradePro/pages/chartOfAccount/types';

export const columns = (): AntColumnType<TChartAccountData>[] => [
  {
    title: 'Sr#',
    dataIndex: '',
    width: 80,
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
    width: 120,
    render: (Account_Level) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>
        <span>{Account_Level}</span>
      </Space>
    ),
  },
  {
    title: 'Account Group',
    dataIndex: 'AccountGroup',
    searchableInput: true,
    width: 150,
  },
  {
    title: 'Account Class',
    dataIndex: 'AccountClass',
    render: (AccountClass) => {
      if (AccountClass === 1) {
        return 'Capital';
      } else if (AccountClass === 2) {
        return 'Assets';
      } else if (AccountClass === 3) {
        return 'Liabilities';
      } else if (AccountClass === 4) {
        return 'Expenses';
      } else if (AccountClass === 5) {
        return 'Revenue';
      } else {
        return '';
      }
    },

    width: 150,
  },

  {
    title: 'Action',
    dataIndex: '',
    width: 80,
    render: (_, record) => (
      <Tooltip title="Chose Action">
        <AntButton
          type="text"
          icon={
            <>
              <EyeOutlined style={{ color: 'red', marginRight: 10 }} />
              <PlusSquareFilled style={{ color: '#5A54F9' }} />
            </>
          }
          // onClick={() => handleOpen(record?.Id)}
        />
      </Tooltip>
    ),
    // render: (record: any) => <ActionModal record={record} onUpdateAccountTitle={onUpdateAccountTitle} />,
  },
];
