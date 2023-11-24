import { AntColumnType } from '@revisionary/globalTypes';
import { EditFilled } from '@ant-design/icons';
import { SubTopic, Topic } from '../../../Subject-Topics.tsx/types';
import { AntButton } from '@revisionary/pages/Syllabus_Management/Revisionary_ui/SyllabusStatus/Components';
import { TTopicsData } from '../../types/topics';

export const columns = (
  setSelectedTopic: (record: string) => void,
  handleOpen: (id: number) => void,
  t: any
): AntColumnType<TTopicsData>[] => [
  {
    width: 200,
    title: <>{t ('class_division')}</>,
    searchableInput: true,
    dataIndex: 'classSubDivision',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.classSubDivision.localeCompare(b.classSubDivision),
  },
  {
    width: 190,
    searchableInput: true,
    title: <>{t ('subject_name')}</>,
    dataIndex: 'subjectName',
    sortDirections: ['ascend', 'descend'],

    sorter: (a, b) => a.subjectName.localeCompare(b.subjectName),
  },
  { title:  <>{t ('topic_code')}</>, dataIndex: 'unitTopicNo', width: 140 },
  {
    title: <>{t ('topic_description')}</>,
    dataIndex: 'unitTopicDescription',
    searchableInput: true,
    width: 200,
    sorter: (a, b) => a.unitTopicDescription.localeCompare(b.unitTopicDescription),
  },
  {
    title: <>{t ('subject_subtopics')}</>,
    dataIndex: 'subTopics',
    width: 190,
    render: (subTopics: SubTopic[], record) => (
      <a onClick={() => setSelectedTopic(record?.unitTopicDescription)}>
        <span style={{ color: '#00a148' }}>
          <>{t ('view_subtopics')}</>
        </span>
      </a>
    ),
  },
  {
    title: <>{t ('action')}</>,
    dataIndex: 'action',
    key: 'action',
    width: 110,
    render: (_, record) => (
      <AntButton
        type="text"
        icon={<EditFilled style={{ color: '#00a148' }} />}
        onClick={() => handleOpen(record?.unitTopicId)}
      />
    ),
  },
];
