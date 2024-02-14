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
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
  },

  {
    title: t('opening'),
    dataIndex: 'Opening',
    width: 220,
    align: 'right',
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
    dataIndex: '1stInterval',
    sorter: (a, b) => a.Opening - b.Opening,
    render: (Opening, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(Opening)}</Space>
    ),
    // sorter: (a, b) => a.1stInterval - b.1stInterval,
    // render: (_, { Ac2LevelCode }) => numberFormatter(Ac2LevelCode),
  },

  {
    title: t('2nd_interval'),
    width: 210,
    align: 'right',
    dataIndex: '2ndInterval',
    sortDirections: ['ascend', 'descend'],
    // sorter: (a, b) => a.Ac2levelTitle.localeCompare(b.Ac2levelTitle),
  },

  {
    title: t('3rd_interval'),
    width: 220,
    align: 'right',
    dataIndex: '3rdInterval',
    // render: (_, { Ac3LevelCode }) => numberFormatter(Ac3LevelCode),
  },

  {
    title: t('interval_above'),
    width: 210,
    align: 'right',
    dataIndex: 'IntervalAbove',
    sortDirections: ['ascend', 'descend'],
    // sorter: (a, b) => a.Ac3levelTitle.localeCompare(b.Ac3levelTitle),
  },

  {
    width: 210,
    align: 'right',
    title: t('closing'),
    dataIndex: 'Closing',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Closing - b.Closing,
    render: (Closing, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(Closing)}</Space>
    ),
  },
];
