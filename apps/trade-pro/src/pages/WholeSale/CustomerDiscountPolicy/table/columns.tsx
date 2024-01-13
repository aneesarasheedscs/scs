import { EditFilled } from '@ant-design/icons';
import { AntColumnType } from '@tradePro/globalTypes';
import { AntButton } from '@tradePro/components';
import { Space, Tooltip } from 'antd';
import { formateDate } from '@tradePro/utils/formateDate';
import { TCustomerDiscountPolicyHistory } from '../types';

export const columns = (t: any, setSelectedRecordId?: any): AntColumnType<TCustomerDiscountPolicyHistory>[] => [
  {
    title: t('effected_date'),
    width: 250,
    dataIndex: 'EffectedDate',
    render: (_, { EffectedDate }) => formateDate(EffectedDate),
  },
  {
    title: t('customer_name'),
    width: 250,
    searchableInput: true,
    dataIndex: 'CustomerName',
    sortDirections: ['ascend', 'descend'],
    render: (_, { CustomerName }) => formateDate(CustomerName),
  },
  {
    title: t('discount_type'),
    width: 200,
    searchableInput: true,
    dataIndex: 'DiscountType',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.DiscountType.localeCompare(b.DiscountType),
  },
  {
    title: t('discount_item'),
    width: 200,
    dataIndex: 'DiscountItem',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.DiscountItem.localeCompare(b.DiscountItem),
  },
  {
    title: t('discount_percentage'),
    width: 200,
    dataIndex: 'Discount%',
    searchableInput: true,
    sorter: (a, b) => (a['Discount%'] as string).localeCompare(b['Discount%'] as string),
  },
  {
    title: t('is_active'),
    width: 200,
    dataIndex: 'IsActive',
    searchableInput: true,
    render: (isActive) => (isActive ? 'True' : 'False'),
  },
  {
    title: t('action'),
    width: 150,
    render: (_, record) => (
      <Tooltip title="Edit">
        <Space>
          <AntButton
            type="text"
            icon={<EditFilled style={{ color: 'black' }} />}
            onClick={() => {
              setSelectedRecordId(record?.Id);
            }}
          />
        </Space>
      </Tooltip>
    ),
  },
];
