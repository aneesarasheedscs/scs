import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { AntColumnType } from '@tradePro/globalTypes';
import { TCOAReportHistory } from './type';
import { formateDate } from '@tradePro/utils/formateDate';

export const ChartOfAccountColumn = (): AntColumnType<TCOAReportHistory>[] => [
  {
    title: 'sr#',
    dataIndex: '',
    width: 50,
    render: (_, __, index) => index + 1,
  },

  {
    title: 'Account Code',
    dataIndex: 'AccountCode',
    width: 150,
    // sorter: (a, b) => a.DocDate.formateDate(b.DocDate),
    render: (_, { AccountCode }) => numberFormatter(AccountCode),
  },

  {
    width: 250,
    searchableInput: true,
    title: 'Account Title',
    dataIndex: 'AccountTitle',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
  },

  { title: 'Account Group', dataIndex: 'AccountGroup', width: 120 },

  {
    width: 120,
    title: 'Account Level',
    dataIndex: 'AccountLevel',
    render: (_, { AccountLevel }) => numberFormatter(AccountLevel),
  },
  {
    title: 'Account Class',
    dataIndex: 'AccountClass',
    width: 120,

    sorter: (a, b) => a.AccountClass.localeCompare(b.AccountClass),
  },
  {
    title: 'Account Type',
    dataIndex: 'AccountType',
    width: 200,
    sorter: (a, b) => a.AccountType.localeCompare(b.AccountType),
  },
  {
    title: 'Note Title',
    dataIndex: 'NoteTitle',
    width: 220,
    sorter: (a, b) => a.NoteTitle.localeCompare(b.NoteTitle),
  },

  {
    title: 'Language Id',
    dataIndex: 'LanguageId',
    width: 120,
    render: (_, { LanguageId }) => numberFormatter(LanguageId),
  },
  {
    title: 'Language Name',
    dataIndex: 'LanguageName',
    width: 150,
    sorter: (a, b) => a.LanguageName.localeCompare(b.LanguageName),
  },
  {
    title: 'Account Title Other Lingo',
    dataIndex: 'AccountTitleOtherLingo',
    width: 270,
    sorter: (a, b) => a.AccountTitleOtherLingo.localeCompare(b.AccountTitleOtherLingo),
  },
];
