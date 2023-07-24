import { TSyllabusAuthorityData } from '../types';
import { AntColumnType } from '@revisionary/globalTypes';

export const columns = (): AntColumnType<TSyllabusAuthorityData>[] => [
  {
    title: 'Code',
    dataIndex: 'syllabusAuthorityCode',
  },
  {
    title: 'Name',
    searchableInput: true,
    dataIndex: 'syllabusAuthorityName',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.syllabusAuthorityName.localeCompare(b.syllabusAuthorityName),
  },
];
