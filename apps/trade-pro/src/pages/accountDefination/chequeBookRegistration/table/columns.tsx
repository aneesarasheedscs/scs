import { PrinterOutlined, PrinterTwoTone } from '@ant-design/icons';
import { AntColumnType } from '@tradePro/globalTypes';
import { AntButton } from '@revisionary/components';
import { Space, Tooltip } from 'antd';
import { TChequeBookRegistration } from './types';

export const columns = (t: any): AntColumnType<TChequeBookRegistration>[] => [
  {
    title: t('bank_name'),
    width: 400,
    searchableInput: true,
    dataIndex: 'AccountTitle',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
    showCount: true,
  },
  {
    title: t('cheque_book_payment'),
    width: 300,
    searchableInput: true,
    dataIndex: 'CbPrefix',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CbPrefix.localeCompare(b.CbPrefix),
  },
  {
    title: t('cheque_no'),
    width: 240,
    searchableInput: true,
    dataIndex: 'CheqNo',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CheqNo.localeCompare(b.CheqNo),
  },
  {
    align: 'center',
    title: t('action'),
    dataIndex: '',
    width: 100,
    render: (_, record) => (
      <Tooltip title="Print">
        <Space style={{ position: 'absolute', top: 10, right: 15 }}>
          <AntButton type="text" icon={<PrinterTwoTone style={{}} />} />
        </Space>
      </Tooltip>
    ),
  },
];

export const generatecolumns = (t: any): AntColumnType<TChequeBookRegistration>[] => [
  {
    title: t('bank_name'),
    width: 480,
    searchableInput: true,
    dataIndex: 'ChartOfAccountId',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
  },
  {
    title: t('cheque_book_payment'),
    width: 360,
    searchableInput: true,
    dataIndex: 'CbPrefix',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CbPrefix.localeCompare(b.CbPrefix),
  },
  {
    title: t('cheque_no'),
    width: 200,
    searchableInput: true,
    dataIndex: 'CheqNo',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CheqNo.localeCompare(b.CheqNo),
  },
  {
    align: 'center',
    title: t('action'),
    width: 100,
    render: (_, record) => (
      <Tooltip title="Print">
        <Space style={{ position: 'absolute', top: 10, right: 15 }}>
          <AntButton type="text" icon={<PrinterTwoTone style={{}} />} />
        </Space>
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
