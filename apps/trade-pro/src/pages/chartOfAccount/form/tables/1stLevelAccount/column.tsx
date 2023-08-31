import { AntColumnType } from '@tradePro/globalTypes';
import { EyeOutlined, PlusSquareFilled } from '@ant-design/icons';
import { Space, Tooltip } from 'antd';
import { AntButton } from '@tradePro/components';
import { TChartAccountData } from '@tradePro/pages/chartOfAccount/types';

export const columns = (): AntColumnType<TChartAccountData>[] => [
  {
    title: 'Sr#',
    dataIndex: '',
    width: 100,
  },

  {
    title: 'Account Title',
    dataIndex: 'AccountTitle',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
    width: 300,
  },

  {
    title: 'Account Level',
    dataIndex: 'Account_Level',
    width: 200,
    render: (Account_Level) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>
        <span>{Account_Level}</span>
      </Space>
    ),
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
