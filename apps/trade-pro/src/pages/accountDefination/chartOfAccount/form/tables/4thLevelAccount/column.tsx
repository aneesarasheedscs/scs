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
    title: t('account_code'),
    dataIndex: 'AccountCode',
    searchableInput: true,
    width: 150,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountCode.localeCompare(b.AccountCode),
    showCount: true,
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
    title: t('account_class'),
    dataIndex: 'AccountClassName',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountClassName.localeCompare(b.AccountClassName),
    width: 150,
  },

  {
    title: t('account_level'),
    dataIndex: 'Account_Level',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Account_Level - b.Account_Level,
    width: 125,
    render: (Account_Level) => (
      <Space style={{ display: 'flex', justifyContent: 'center' }}>
        <span>{Account_Level}</span>
      </Space>
    ),
  },

  {
    title: t('action'),
    dataIndex: '',
    width: 115,
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
