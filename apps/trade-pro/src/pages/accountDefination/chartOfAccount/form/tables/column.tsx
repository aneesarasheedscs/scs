import { AntColumnType } from '@tradePro/globalTypes';
import { PlusSquareFilled, EyeOutlined } from '@ant-design/icons';
import { Space, Tooltip } from 'antd';
import { AntButton } from '@tradePro/components';
import { TChartAccountAllLevelData } from '../../types';

export const columns = (t?: any): AntColumnType<TChartAccountAllLevelData>[] => [
  {
    title: <>{t('account_code')}</>,
    dataIndex: 'AccountCode',
    width: 160,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountCode.localeCompare(b.AccountCode),
  },

  {
    title: <>{t('account_title')} </>,
    dataIndex: 'AccountTitle',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
    width: 200,
  },

  {
    title: <>{t('account_level')} </>,
    dataIndex: 'Account_Level',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Account_Level - b.Account_Level,
    width: 140,
    render: (Account_Level) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>
        <span>{Account_Level}</span>
      </Space>
    ),
  },
  {
    title: <>{t('account_type')} </>,
    dataIndex: 'AccountType',
    searchableInput: true,
    width: 160,
    sorter: (a, b) => a.AccountType.localeCompare(b.AccountType),
  },
  {
    title: <>{t('account_class')} </>,
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
    title: <>{t('action')} </>,
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
        />
      </Tooltip>
    ),
  },
];
