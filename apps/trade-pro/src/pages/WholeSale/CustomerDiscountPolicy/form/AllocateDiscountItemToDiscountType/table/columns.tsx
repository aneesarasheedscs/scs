import { AntColumnType } from '@tradePro/globalTypes';
import { formateDate } from '@tradePro/utils/formateDate';
import { Space, Tooltip } from 'antd';
import { AntButton } from '@tradePro/components';
import { AllocateDiscountTable } from '../../../types';
import { EditFilled } from '@ant-design/icons';
export const column2 = (t: any, setSelectedRecordId2?: any): AntColumnType<AllocateDiscountTable>[] => [
  {
    title: <>{t('discount_name')}</>,
    width: 180,
    dataIndex: 'DiscountCategory',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.DiscountCategory.localeCompare(b.DiscountCategory),
  },
  {
    title: <>{t('discount_type')}</>,
    width: 180,
    searchableInput: true,
    dataIndex: 'DiscountType',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.DiscountType.localeCompare(b.DiscountType),
  },
  {
    title: <>{t('entry_user')}</>,
    width: 230,
    dataIndex: 'EntryUser',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.EntryUser.localeCompare(b.EntryUser),
  },
  {
    title: <>{t('entry_date')}</>,
    width: 200,
    dataIndex: 'EntryDate',
    render: (_, { EntryDate }) => formateDate(EntryDate),
  },
  {
    title: <>{t('is_active')}</>,
    width: 150,
    dataIndex: 'IsActive',
    searchableInput: true,
    render: (isActive) => (isActive ? 'True' : 'False'),
  },
  {
    title: <>{t('action')}</>,
    width: 100,
    render: (_, record) => (
      <Tooltip title="Edit">
        <Space>
          <AntButton
            type="text"
            icon={<EditFilled style={{ color: 'black' }} />}
            onClick={() => {
              setSelectedRecordId2(record?.Id);
            }}
          />
        </Space>
      </Tooltip>
    ),
  },
];
