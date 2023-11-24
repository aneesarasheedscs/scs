import { AntColumnType } from '@tradePro/globalTypes';
import { Checkbox } from 'antd';
import { AccountAllocationTypes } from '../types';
export const AccountAllocationColumns = (t: any): AntColumnType<AccountAllocationTypes>[] => [
  {
    width: 100,
    title: <>{t('select')}</>,
    dataIndex: 'selection',
    render: (_text, _record, _index) => {
      return <Checkbox />;
    },
  },

  {
    width: 160,
    title: <>{t('account_code')}</>,
    searchableDate: true,
    dataIndex: 'AccountCode',
  },
  {
    width: 300,
    title: <>{t('account_title')}</>,
    searchableDate: true,
    dataIndex: 'AccountTitle',
  },
];
