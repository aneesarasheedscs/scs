import dayjs from 'dayjs';
import { AntColumnType } from '@tradePro/globalTypes';
import { Tooltip } from 'antd';
import { EditFilled } from '@ant-design/icons';
import { AntButton } from '@tradePro/components';
import { TAllocateBrandItemToDiscType } from '../types';
import { formateDate } from '@tradePro/utils/formateDate';

export const columns = (t?: any, setSelectedRecordId?: any): AntColumnType<TAllocateBrandItemToDiscType>[] => [
  {
    title: <>{t('brand_name')} </>,
    dataIndex: 'BrandName',
    width: 300,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.BrandName.localeCompare(b.BrandName),
  },

  {
    width: 200,
    searchableInput: true,
    title: <>{t('discount_type')} </>,
    dataIndex: 'DiscountType',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.DiscountType.localeCompare(b.DiscountType),
  },
  {
    width: 200,
    searchableInput: true,
    title: <>{t('entry_user')} </>,
    dataIndex: 'EntryUser',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.EntryUser.localeCompare(b.EntryUser),
  },
  {
    width: 180,
    searchableDate: true,
    title: <>{t('entry_date')} </>,
    dataIndex: 'EntryDate',
    sortDirections: ['ascend', 'descend'],
    render: (_, { EntryDate }) => formateDate(EntryDate),
    sorter: (a, b) => {
      const dateA = dayjs(a.EntryDate);
      const dateB = dayjs(b.EntryDate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },
  {
    width: 150,
    searchableInput: true,
    title: <>{t('is_active')} </>,
    dataIndex: 'IsActive',
    sortDirections: ['ascend', 'descend'],
  },

  {
    width: 100,
    title: <>{t('action')} </>,
    dataIndex: '',
    render: (_, record) => (
      <Tooltip title="Edit">
        <AntButton
          type="text"
          icon={<EditFilled style={{ color: 'black' }} />}
          onClick={() => setSelectedRecordId(record?.Id)}
        />
      </Tooltip>
    ),
  },
];
