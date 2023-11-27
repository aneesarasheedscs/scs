import dayjs from 'dayjs';
import { AntColumnType } from '@tradePro/globalTypes';
import { Space, Tooltip } from 'antd';
import { EditFilled } from '@ant-design/icons';
import { AntButton } from '@tradePro/components';
import { TDiscountType } from '../types';
import { formateDate } from '@tradePro/utils/formateDate';

export const columns = (t?: any, setSelectedRecordId?: any): AntColumnType<TDiscountType>[] => [
  {
    title: <>{t('sr')} </>,
    dataIndex: 'Id',
    width: 100,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Id.localeCompare(b.Id),
  },
  {
    title: <>{t('type_code')} </>,
    dataIndex: 'DiscountTypeCode',
    width: 200,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.DiscountTypeCode.localeCompare(b.DiscountTypeCode),
  },

  {
    width: 200,
    searchableInput: true,
    title: <>{t('description')} </>,
    dataIndex: 'Description',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Description.localeCompare(b.Description),
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
    // // sorter: (a, b) => a.IsActive.localeCompare(b.IsActive),
  },

  {
    width: 100,
    title: <>{t('action')} </>,
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
