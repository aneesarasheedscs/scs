import { EditFilled, PrinterOutlined } from '@ant-design/icons';
import { AntColumnType } from '@tradePro/globalTypes';
import { AntButton } from '@revisionary/components';
// import { TDistrictList } from '../../types';
import { Tooltip } from 'antd';
// import { TJobLotHistory } from '../types';
import { formateDate } from '@tradePro/utils/formateDate';
import { useTranslation } from 'react-i18next';

export const columns = (t: any, setSelectedRecordId?: any): AntColumnType<any>[] => [
  {
    title: <>{t('account_title')}</>,
    width: 220,
    searchableInput: true,
    dataIndex: 'AccountTitle',
    sortDirections: ['ascend', 'descend'],
    sorter: (a: any, b: any) => a.AccountTitle.localeCompare(b.AccountTitle),
  },
  {
    title: <>{t('cheque no')}</>,
    width: 220,
    searchableInput: true,
    dataIndex: 'CheqNo',
    sortDirections: ['ascend', 'descend'],
    sorter: (a: any, b: any) => a.CheqNo.localeCompare(b.CheqNo),
  },
  {
    title: <>{t('other remarks')}</>,
    width: 220,
    searchableInput: true,
    dataIndex: 'OtherRemarks',
    sortDirections: ['ascend', 'descend'],
    sorter: (a: any, b: any) => a.OtherRemarks.localeCompare(b.OtherRemarks),
  },
  {
    title: <>{t('cheque status')}</>,
    width: 220,
    dataIndex: 'CheqCancelStatus',
    render: (isActive) => (isActive ? 'True' : 'False'),
  },
  {
    title: <>{t('cheque status date')}</>,
    width: 220,
    dataIndex: 'ChequeStatusDate',
    render: (_, { ChequeStatusDate }) => formateDate(ChequeStatusDate),
  },
  {
    title: <>{t('status change user')}</>,
    width: 220,
    searchableInput: true,
    dataIndex: 'StatusChangeUser',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.StatusChangeUser.localeCompare(b.StatusChangeUser),
  },
  {
    title: <>{t('no of attachments')}</>,
    width: 220,
    searchableInput: true,
    // dataIndex: 'JobLotDescription',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.JobLotDescription.localeCompare(b.JobLotDescription),
  },
];
