import { EditFilled } from '@ant-design/icons';
import { AntColumnType } from '@tradePro/globalTypes';
import { AntButton } from '@tradePro/components';
import { TDivisionList } from '../../types';
import { Tooltip } from 'antd';

export const columns = (t: any, setSelectedRecordId?: any): AntColumnType<TDivisionList>[] => [
  {
    title: <>{t('province_name')}</>,
    width: 170,
    searchableInput: true,
    dataIndex: 'ProvinceName',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ProvinceName.localeCompare(b.ProvinceName),
  },
  {
    title: <>{t('division_code')}</>,
    width: 150,
    searchableInput: true,
    dataIndex: 'DivisionCode',
  },
  {
    title: <>{t('division_name')}</>,
    width: 230,
    searchableInput: true,
    dataIndex: 'DivisionName',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.DivisionName.localeCompare(b.DivisionName),
  },
  {
    title: <>{t('action')}</>,
    width: 100,
    render: (_, record) => (
      <Tooltip title="Edit">
        <AntButton
          type="text"
          icon={<EditFilled style={{ color: 'primary' }} />}
          onClick={() => setSelectedRecordId(record?.DivisionId)}
        />
      </Tooltip>
    ),
  },
];
