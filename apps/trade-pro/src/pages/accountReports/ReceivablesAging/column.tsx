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
  },
  {
    width: 140,
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
    width: 340,
    dataIndex: 'AccountTitle',
    searchableInput: true,

    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
  },

  {
    title: t('opening'),
    dataIndex: 'Opening',
    width: 150,
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
    width: 150,
    align: 'right',
    showTotal: true,
    dataIndex: 'IstIntervale',
    sorter: (a, b) => a['IstIntervale'] - b['IstIntervale'], 
    render: (IstIntervale, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(IstIntervale)}</Space>
    ),
  },
  
  {
    title: t(secondtCaption),
    width: 150,
    showTotal: true,
    align: 'right',
    dataIndex: 'ScnInterval',
    sorter: (a, b) => a['ScnInterval'] - b['ScnInterval'], 
    render: (ScnInterval, record) => ( 
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(ScnInterval)}</Space>
    ),
  },
  

  {
    title: t(thirdCaption),
    width: 150,
    showTotal:true,
    align: 'right',
    dataIndex: 'TrdIntarval',
    sorter: (a, b) => a['TrdIntarval'] - b['TrdIntarval'], 
    render: (TrdIntarval, record) => ( 
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(TrdIntarval)}</Space>
    ),
  },

  {
    title: t(aboveCaption),
    width: 150,
    align: 'right',
    showTotal:true,
    dataIndex: 'Above',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Above - b.Above,
    render: (Above, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(Above)}</Space>
    ),
  },

  {
    width: 150,
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
