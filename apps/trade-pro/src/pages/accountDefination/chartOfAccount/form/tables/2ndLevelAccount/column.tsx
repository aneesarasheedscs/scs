import { AntColumnType } from '@tradePro/globalTypes';
import { EyeOutlined, PlusSquareFilled } from '@ant-design/icons';
import { Space, Tooltip } from 'antd';
import { AntButton } from '@tradePro/components';
import { TChartAccountAllLevelData } from '../../../types';

export const columns = (
  t?: any,
  handleAccountSelect?: any,
  handleChildAccount?: any
): AntColumnType<TChartAccountAllLevelData>[] => [
  {
    title: t('account_title'),
    dataIndex: 'AccountCode',
    width: 170,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountCode.localeCompare(b.AccountCode),
    searchableInput: true,
    showCount: true,
  },

  {
    title: t('account_title'),
    dataIndex: 'AccountTitle',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
    width: 290,
  },

  {
    title: t('account_level'),
    dataIndex: 'Account_Level',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Account_Level - b.Account_Level,
    width: 150,
    render: (Account_Level) => (
      <Space style={{ display: 'flex', justifyContent: 'center' }}>
        <span>{Account_Level}</span>
      </Space>
    ),
  },

  {
    title: t('action'),
    dataIndex: '',
    width: 120,
    render: (_, record) => (
      <>
        <Tooltip title="Filter Child">
          <AntButton
            type="text"
            onClick={() => handleAccountSelect(record)}
            icon={
              <>
                <EyeOutlined style={{ color: 'red', marginRight: 5 }} />
              </>
            }
          />
        </Tooltip>
        <Tooltip title="Add Child">
          <AntButton
            type="text"
            onClick={() => handleChildAccount(record)}
            icon={
              <>
                <PlusSquareFilled style={{ color: '#5A54F9' }} />
              </>
            }
          />
        </Tooltip>
      </>
    ),
  },
];
