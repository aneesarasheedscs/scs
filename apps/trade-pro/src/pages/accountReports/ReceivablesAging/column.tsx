import { ReceivablesAgingRegisterHistory } from './type';
import { AntColumnType } from '@tradePro/globalTypes';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { Space } from 'antd';

export const columns = (t: any,handleAccountCodeClick:any,firstCaption:any,secondtCaption:any,thirdCaption:any,aboveCaption:any): AntColumnType<ReceivablesAgingRegisterHistory>[] => [
  {
    title: t('r_no'),
    width: 100,
    dataIndex: 'RNo',
    showCount:true,
    // searchableInput: true,
    // showCount:true,
    // sortDirections: ['ascend', 'descend'],
    // sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
  },
  {
    width: 150,
    title: t('account_code'),
    dataIndex: 'AccountCode',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountCode - b.AccountCode,
    render: (_, { AccountCode, AccountId }) => (
      <>
        <a onClick={() => handleAccountCodeClick(AccountId)}>{AccountCode}</a>
      </>
    ),
  },
  {
    title: t('account_title'),
    width: 250,
    dataIndex: 'AccountTitle',
    searchableInput: true,

    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
  },

  {
    title: t('opening'),
    dataIndex: 'Opening',
    width: 200,
    align: 'right',
    showTotal:true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Opening - b.Opening,
    render: (Opening, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(Opening)}</Space>
    ),
  },

  {
    title: t(firstCaption),
    width: 210,
    align: 'right',
    showTotal: true,
    dataIndex: 'IstIntervale',
    // sorter: (a, b) => a['FirstIntervalCaption'] - b['FirstIntervalCaption'], // Sorting based on the '2ndInterval' data
    render: (IstIntervale, record) => ( // Applying number formatting to '2ndInterval'
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(IstIntervale)}</Space>
    ),
  },
  
  {
    title: t(secondtCaption),
    width: 210,
    showTotal: true,
    align: 'right',
    dataIndex: 'ScnInterval',
    // sorter: (a, b) => a['2ndInterval'] - b['2ndInterval'], 
    render: (ScnInterval, record) => ( 
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(ScnInterval)}</Space>
    ),
  },
  

  {
    title: t(thirdCaption),
    width: 220,
    showTotal:true,
    align: 'right',
    dataIndex: 'TrdIntarval',
    // sorter: (a, b) => a['3rdInterval'] - b['3rdInterval'], 
    render: (TrdIntarval, record) => ( 
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(TrdIntarval)}</Space>
    ),
  },

  {
    title: t(aboveCaption),
    width: 210,
    align: 'right',
    showTotal:true,
    dataIndex: 'Above',
    // sortDirections: ['ascend', 'descend'],
    // sorter: (a, b) => a.IntervalAbove - b.IntervalAbove,
    render: (Above, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(Above)}</Space>
    ),
  },

  {
    width: 210,
    align: 'right',
    title: t('closing'),
    showTotal:true,
    dataIndex: 'Closing',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Closing - b.Closing,
    render: (Closing, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(Closing)}</Space>
    ),
  },
];
