import { EditFilled } from '@ant-design/icons';
import { AntColumnType } from '@tradePro/globalTypes';
import { AntButton } from '@tradePro/components';
import { TTownList } from '../../types';
import { Tooltip } from 'antd';

export const columns = (t: any, setSelectedRecordId?: any): AntColumnType<TTownList>[] => [
  {
    title: <>{t('tehsil_name')}</>,
    width: 210,
    searchableInput: true,
    dataIndex: 'TehsilName',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.TehsilName.localeCompare(b.TehsilName),
  },
  {
    title: <>{t('town_code')}</>,
    width: 150,
    searchableInput: true,
    dataIndex: 'TownCode',
  },
  {
    title: <>{t('town_name')}</>,
    width: 200,
    searchableInput: true,
    dataIndex: 'TownName',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.TownName.localeCompare(b.TownName),
  },
  {
    title: <>{t('action')}</>,
    width: 100,
    render: (_, record) => (
      <Tooltip title="Edit">
        <AntButton
          type="text"
          icon={<EditFilled style={{ color: 'primary' }} />}
          onClick={() => setSelectedRecordId(record?.TownId)}
        />
      </Tooltip>
    ),
  },
];
