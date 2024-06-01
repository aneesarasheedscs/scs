import { AntColumnType } from '@tradePro/globalTypes';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { TFunction } from 'i18next';
import { TSalesDataBranchWiseHistory } from './types';

export const columns = (t: TFunction): AntColumnType<TSalesDataBranchWiseHistory>[] => {
  return [
    {
      title: t('item_name'),
      width: 250,
      dataIndex: 'ItemName',
      searchableInput: true,
      sortDirections: ['ascend', 'descend'],
      // render: (_, { ItemName }) => <a onClick={() => console.log(ItemName)}>{ItemName}</a>,
      sorter: (a, b) => a.ItemName.localeCompare(b.ItemName),
    },
    {
      title: 'AKBARI MANDI',
      width: 160,
      dataIndex: 'Value_01',
      searchableInput: true,
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.Value_01 - b.Value_01,
      render: (Value_01) => numberFormatter(Value_01),
    },

    {
      title: 'PIA',
      width: 140,
      dataIndex: 'Value_02',
      searchableInput: true,
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.Value_02 - b.Value_02,
      render: (Value_02) => numberFormatter(Value_02),
    },
    {
      title: 'YATEEM KHANA',
      width: 180,
      dataIndex: 'Value_03',
      searchableInput: true,
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.Value_03 - b.Value_03,
      render: (Value_03) => numberFormatter(Value_03),
    },
    {
      title: 'GREEN TOWN',
      width: 150,
      dataIndex: 'Value_04',
      searchableInput: true,
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.Value_04 - b.Value_04,
      render: (Value_04) => numberFormatter(Value_04),
    },
    {
      title: 'RAIWAND',
      width: 150,
      dataIndex: 'Value_05',
      searchableInput: true,
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.Value_05 - b.Value_05,
      render: (Value_05) => numberFormatter(Value_05),
    },
    {
      title: 'LOSS',
      width: 120,
      dataIndex: 'Value_06',
      searchableInput: true,
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.Value_06 - b.Value_06,
      render: (Value_06) => numberFormatter(Value_06),
    },
    {
      title: 'DHA',
      width: 120,
      dataIndex: 'Value_07',
      searchableInput: true,
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.Value_07 - b.Value_07,
      render: (Value_07) => numberFormatter(Value_07),
    },
    {
      title: 'MANDI FAIZABAD',
      width: 180,
      dataIndex: 'Value_08',
      searchableInput: true,
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.Value_08 - b.Value_08,
      render: (Value_08) => numberFormatter(Value_08),
    },
  ];
};
