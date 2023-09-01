import { EditFilled } from '@ant-design/icons';
import { AntColumnType } from '@revisionary/globalTypes';
import { TSubjectListData } from '../queries/types';
import { AntButton } from '@revisionary/components';

export const columns = (t: any, setSelectedRecordId?: any): AntColumnType<TSubjectListData>[] => [
  {
    title: <>{t('title')}</>,
    width: 280,
    searchableInput: true,
    dataIndex: 'syllabusAuthorityName',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.syllabusAuthorityName.localeCompare(b.syllabusAuthorityName),
  },
  {
    title: <>{t('code')}</>,
    width: 200,
    dataIndex: 'subjectCode',
  },
  {
    title: <>{t('subject_name')}</>,
    width: 280,
    searchableInput: true,
    dataIndex: 'subjectName',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.subjectName.localeCompare(b.subjectName),
  },
  {
    title: <>{t('action')}</>,
    width: 180,
    render: (_, record) => (
      <AntButton
        type="text"
        icon={<EditFilled style={{ color: '#00a148' }} />}
        onClick={() => setSelectedRecordId(record?.subjectListId)}
      />
    ),
  },
];
