import { AntColumnType } from '@revisionary/globalTypes';
import { EditFilled } from '@ant-design/icons';
import { AntButton } from '@revisionary/components';
import { TSubTopicsData } from '../../types/subTopics';

export const columns = (handleOpen: (id: number) => void, t?: any): AntColumnType<TSubTopicsData>[] => [
  {
    width: 410,
    title: <>{t('topic')}</>,
    searchableInput: true,
    dataIndex: 'unitTopicDescription',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.unitTopicDescription.localeCompare(b.unitTopicDescription),
  },
  {
    width: 300,
    title: <>{t('subtopic_code')}</>,
    dataIndex: 'subTopicNo',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.subTopicNo.localeCompare(b.subTopicNo),
  },
  {
    title: <>{t('subtopic_description')}</>,
    dataIndex: 'subTopicDescription',
    searchableInput: true,
    width: 340,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.subTopicDescription.localeCompare(b.subTopicDescription),
  },
  {
    title: <>{t('action')}</>,
    dataIndex: 'action',
    key: 'action',
    width: 100,
    render: (_, record) => (
      <a>
        <AntButton
          type="text"
          onClick={() => handleOpen(record?.subTopicId)}
          icon={<EditFilled style={{ color: '#7a07ae' }} />}
        />
      </a>
    ),
  },
];
