import { EditFilled } from '@ant-design/icons';
import { AntColumnType } from '@tradePro/globalTypes';
import { AntButton } from '@tradePro/components';
import { TTehsilList } from '../../types';
import { Tooltip } from 'antd';

export const columns = (t: any, setSelectedRecordId?: any): AntColumnType<TTehsilList>[] => [
  {
    title: <>{t('district_name')}</>,
    width: 180,
    searchableInput: true,
    dataIndex: 'DistrictName',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.DistrictName.localeCompare(b.DistrictName),
  },
  {
    title: <>{t('tehsil_code')}</>,
    width: 150,
    searchableInput: true,
    dataIndex: 'TehsilCode',
  },
  {
    title: <>{t('tehsil_name')}</>,
    width: 210,
    searchableInput: true,
    dataIndex: 'TehsilName',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.TehsilName.localeCompare(b.TehsilName),
  },
  {
    title: <>{t('action')}</>,
    width: 100,
    render: (_, record) => (
      <Tooltip title="Edit">
        <AntButton
          type="text"
          icon={<EditFilled style={{ color: 'primary' }} />}
          onClick={() => setSelectedRecordId(record?.TehsilId)}
        />
      </Tooltip>
    ),
  },
];
