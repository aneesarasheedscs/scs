import { ReceivablesAgingRegisterHistory } from './type';
import { AntColumnType } from '@tradePro/globalTypes';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { Space } from 'antd';

export const columns = (t: any): AntColumnType<ReceivablesAgingRegisterHistory>[] => [
  {
    title: t('account_title'),
    width: 250,
    dataIndex: 'AccountTitle',
    searchableInput: true,
    showCount:true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
  },

  {
    title: t('opening'),
    dataIndex: 'Opening',
    width: 220,
    align: 'right',
    showTotal:true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Opening - b.Opening,
    render: (Opening, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(Opening)}</Space>
    ),
  },

  {
    title: t('1st_interval'),
    width: 210,
    align: 'right',
    showTotal: true,
    dataIndex: '1stInterval',
    sorter: (a, b) => a['1stInterval'] - b['1stInterval'], // Sorting based on the '2ndInterval' data
    render: (FirstIntervall, record) => ( // Applying number formatting to '2ndInterval'
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(FirstIntervall)}</Space>
    ),
  },
  
  {
    title: t('2nd_interval'),
    width: 210,
    showTotal: true,
    align: 'right',
    dataIndex: '2ndInterval',
    sorter: (a, b) => a['2ndInterval'] - b['2ndInterval'], 
    render: (SecondIntervall, record) => ( 
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(SecondIntervall)}</Space>
    ),
  },
  

  {
    title: t('3rd_interval'),
    width: 220,
    showTotal:true,
    align: 'right',
    dataIndex: '3rdInterval',
    sorter: (a, b) => a['3rdInterval'] - b['3rdInterval'], 
    render: (ThirdIntervall, record) => ( 
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(ThirdIntervall)}</Space>
    ),
  },

  {
    title: t('interval_above'),
    width: 210,
    align: 'right',
    showTotal:true,
    dataIndex: 'IntervalAbove',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.IntervalAbove - b.IntervalAbove,
    render: (IntervalAbove, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(IntervalAbove)}</Space>
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
