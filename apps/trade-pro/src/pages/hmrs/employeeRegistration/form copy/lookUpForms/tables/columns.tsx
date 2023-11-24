import { AntColumnType } from '@tradePro/globalTypes';
import { Button, Popconfirm, Space, Tooltip } from 'antd';
import { EditFilled } from '@ant-design/icons';
import { AntButton } from '@scs/ui';

export const columns = (setSelectedRecordId?: any, t?: any): AntColumnType<any>[] => [
  {
    width: 260,
    searchableInput: true,
    title: <>{t('category_name')}</>,
    dataIndex: 'CategoryCode',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CategoryCode.localeCompare(b.CategoryCode),
  },
  {
    width: 250,
    searchableInput: true,
    title: <>{t('short_name')} </>,
    dataIndex: 'CategoryDescription',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CategoryDescription.localeCompare(b.CategoryDescription),
  },
];
