import { EditFilled } from '@ant-design/icons';
import { AntColumnType } from '@tradePro/globalTypes';
import { AntButton } from '@tradePro/components';
import { TDistrictList } from '../../types';
import { Tooltip } from 'antd';

export const columns = (t: any, setSelectedRecordId?: any): AntColumnType<TDistrictList>[] => [
  {
    title: <>{t('division_name')}</>,
    width: 230,
    searchableInput: true,
    dataIndex: 'DivisionName',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.DivisionName.localeCompare(b.DivisionName),
  },
  {
    title: <>{t('district_code')}</>,
    width: 150,
    searchableInput: true,
    dataIndex: 'DistrictCode',
  },
  {
    title: <>{t('district_name')}</>,
    width: 210,
    searchableInput: true,
    dataIndex: 'DistrictName',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.DistrictName.localeCompare(b.DistrictName),
  },
  {
    title: <>{t('action')}</>,
    width: 100,
    render: (_, record) => (
      <Tooltip title="Edit">
        <AntButton
          type="text"
          icon={<EditFilled style={{ color: 'primary' }} />}
          onClick={() => setSelectedRecordId(record?.DistrictId)}
        />
      </Tooltip>
    ),
  },
];
