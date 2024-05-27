import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { AntColumnType } from '@tradePro/globalTypes';
import { TCOAReportHistory } from './type';
import { TFunction, t } from 'i18next';

export const ChartOfAccountColumn = (t: TFunction): AntColumnType<TCOAReportHistory>[] => [
  {
    title: t('account_code'),
    dataIndex: 'AccountCode',
    width: 150,
    showCount: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountCode - b.AccountCode,
    render: (_, { AccountCode }) => (
      <>
        <a>{AccountCode}</a>
      </>
    ),
  },

  {
    width: 250,
    searchableInput: true,
    title: t('account_title'),
    dataIndex: 'AccountTitle',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
  },

  {
    title: t('account_group'),
    dataIndex: 'AccountGroup',
    width: 210,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountGroup.localeCompare(b.AccountGroup),
  },

  {
    width: 160,
    title: t('account_level'),
    dataIndex: 'AccountLevel',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountLevel - b.AccountLevel,
  },
  {
    title: t('account_class'),
    dataIndex: 'AccountClass',
    width: 250,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountClass.localeCompare(b.AccountClass),
  },
  {
    title: t('account_type'),
    dataIndex: 'AccountType',
    width: 200,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountType.localeCompare(b.AccountType),
  },
  {
    title: t('note_title'),
    dataIndex: 'NoteTitle',
    width: 250,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.NoteTitle.localeCompare(b.NoteTitle),
  },
];
