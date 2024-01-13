import dayjs from 'dayjs';
import { AntColumnType } from '@tradePro/globalTypes';
import { Space, Tooltip } from 'antd';
import { EditFilled } from '@ant-design/icons';
import { AntButton } from '@tradePro/components';
import { TDiscountCategory } from '../types';
import { formateDate } from '@tradePro/utils/formateDate';
import { numberFormatter } from '@tradePro/utils/numberFormatter';

export const columns = (t?: any, setSelectedRecordId?: any): AntColumnType<TDiscountCategory>[] => [
  {
    title: t('sr'),
    dataIndex: 'Id',
    width: 100,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Id.localeCompare(b.Id),
  },
  {
    title: t('discount_name'),
    dataIndex: 'DiscountCategory',
    width: 200,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.DiscountCategory.localeCompare(b.DiscountCategory),
  },

  {
    width: 200,
    searchableInput: true,
    title: t('percentage'),
    dataIndex: 'Percentage',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Percentage - b.Percentage,
    render: (_, { Percentage }) => numberFormatter(Percentage),
  },
  {
    width: 200,
    searchableInput: true,
    title: t('entry_user'),
    dataIndex: 'EntryUser',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.EntryUser.localeCompare(b.EntryUser),
  },
  {
    width: 185,
    searchableDate: true,
    title: t('entry_date'),
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
    title: t('is_active'),
    dataIndex: 'IsActive',
    sortDirections: ['ascend', 'descend'],
    // // sorter: (a, b) => a.IsActive.localeCompare(b.IsActive),
  },

  {
    width: 100,
    title: t('action'),
    dataIndex: 'Id',
    render: (_, record) => (
      <Tooltip title="Edit">
        <Space style={{ marginLeft: 20 }}>
          <AntButton
            type="text"
            icon={<EditFilled style={{ color: 'black' }} />}
            onClick={() => setSelectedRecordId(record?.Id)}
          />
        </Space>
      </Tooltip>
    ),
  },
];
