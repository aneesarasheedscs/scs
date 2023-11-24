import { AntColumnType } from '@tradePro/globalTypes';
import { Tooltip } from 'antd';
import { AntButton } from '@tradePro/components';
import { EditFilled } from '@ant-design/icons';
import { TWareHouseHistory } from '../types';

export const columns = (
  setSelectedRecordId?: any,
  handleEditClick?: any,
  t?: any
): AntColumnType<TWareHouseHistory>[] => [
  {
    width: 300,
    title: <>{t('code')}</>,
    searchableInput: true,
    dataIndex: 'WareHouseCode',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.WareHouseCode.localeCompare(b.WareHouseCode),
  },
  {
    width: 250,
    searchableInput: true,
    title: <>{t('description')}</>,
    dataIndex: 'WareHouseName',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.WareHouseName.localeCompare(b.WareHouseName),
  },
  {
    width: 150,
    title: <>{t('is_active')}</>,
    dataIndex: 'IsActive',
    render: (isActive) => (isActive ? 'True' : 'False'),
  },
  {
    title: <>{t('action')}</>,
    width: 150,
    render: (_, record) => (
      <Tooltip title="Edit">
        <AntButton
          type="text"
          icon={<EditFilled style={{ color: 'primary' }} />}
          onClick={() => {
            setSelectedRecordId(record?.Id);
            handleEditClick(record?.Id);
          }}
        />
      </Tooltip>
    ),
  },
];
