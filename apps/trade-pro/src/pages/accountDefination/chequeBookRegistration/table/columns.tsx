import { PrinterOutlined } from '@ant-design/icons';
import { AntColumnType } from '@tradePro/globalTypes';
import { AntButton } from '@revisionary/components';
// import { TDistrictList } from '../../types';
import { Tooltip } from 'antd';
import { TChequeBookRegistration } from './types';
// import { TJobLotHistory } from '../types';

export const columns = (t: any): AntColumnType<TChequeBookRegistration>[] => [
  {
    title: <>{t('bank_name')}</>,
    width: 500,
    searchableInput: true,
    dataIndex: 'AccountTitle',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
  },
  {
    title: <>{t('cheque_book_payment')}</>,
    width: 500,
    searchableInput: true,
    dataIndex: 'CbPrefix',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CbPrefix.localeCompare(b.CbPrefix),
  },
  {
    title: <>{t('cheque_no')}</>,
    width: 500,
    searchableInput: true,
    dataIndex: 'CheqNo',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CheqNo.localeCompare(b.CheqNo),
  },
  {
    title: <>{t('action')}</>,
    dataIndex: '',
    width: 300,
    render: (_, record) => (
      <Tooltip title="Print">
        <AntButton type="text" icon={<PrinterOutlined style={{ color: 'red', fontSize: 20 }} />} />
      </Tooltip>
    ),
  },
];

export const generatecolumns = (t: any): AntColumnType<TChequeBookRegistration>[] => [
  {
    title: <>{t('bank_name')}</>,
    width: 400,
    searchableInput: true,
    dataIndex: ' ChartOfAccountId',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
  },
  {
    title: <>{t('cheque_book_payment')}</>,
    width: 400,
    searchableInput: true,
    dataIndex: 'CbPrefix',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CbPrefix.localeCompare(b.CbPrefix),
  },
  {
    title: <>{t('cheque_no')}</>,
    width: 400,
    searchableInput: true,
    dataIndex: 'CheqNo',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CheqNo.localeCompare(b.CheqNo),
  },
  {
    title: <>{t('action')}</>,
    width: 200,
    render: (_, record) => (
      <Tooltip title="Print">
        <AntButton type="text" icon={<PrinterOutlined style={{ color: 'red', fontSize: 20 }} />} />
      </Tooltip>
    ),
  },
];

// export const generatecolumns = (t:any): AntColumnType<TChequeBookRegistration>[] => [
//   {
//     title: 'Cheque No',
//     width: 350,
//     searchableInput: true,
//     dataIndex: 'AccountTitle',
//     sortDirections: ['ascend', 'descend'],
//     sorter: (a: any, b: any) => a.CheqNo.localeCompare(b.AccountTitle),
//   },
//   {
//     title: "Cheq Status",
//     width: 350,
//     searchableInput: true,
//     dataIndex: 'CbPrefix',
//     sortDirections: ['ascend', 'descend'],
//     sorter: (a: any, b: any) => a.CbPrefix.localeCompare(b.CbPrefix),
//   },
//   {
//     title:'Other Remarks',
//     width: 350,
//     searchableInput: true,
//     dataIndex: 'CheqNo',
//     sortDirections: ['ascend', 'descend'],
//     sorter: (a: any, b: any) => a.CheqNo.localeCompare(b.CheqNo),
//   },
// ];
