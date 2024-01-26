import { AntColumnType } from '@tradePro/globalTypes';
import { Checkbox } from 'antd';
import { AccountAllocationTypes } from '../types';
export const AccountAllocationColumns = (
  t: any,
  handleSelectAllRecordsForAllocation: any,
  handleCheckboxChangeForAllocation: any,
  selectedRowKeys: any
): AntColumnType<AccountAllocationTypes>[] => [
  // {
  //   width: 100,
  //   title: t('select'),
  //   dataIndex: 'Id',
  //   render: (_text, _record, _index) => {
  //     return <Checkbox />;
  //   },
  //   showCount: true,
  // },
  {
    title: (
      <Checkbox
        onChange={(e) => {
          if (e.target.checked) {
            console.log('select all');
            handleSelectAllRecordsForAllocation(e.target.checked);
          } else {
            console.log('un select all');
            handleSelectAllRecordsForAllocation(e.target.checked);
          }
        }}
        name="IsActive"
        style={{ marginLeft: '10px' }}
      />
    ),
    dataIndex: 'Id',
    width: 100,
    render: (_, record) => (
      <Checkbox
        name="IsActive"
        onChange={(e) => handleCheckboxChangeForAllocation(record, e.target.checked)}
        // checked={selectedRowKeys?.includes(record.Id)}
      />
    ),
    showCount: true,
  },

  {
    width: 160,
    title: t('account_code'),
    searchableInput: true,
    dataIndex: 'AccountCode',
  },
  {
    width: 300,
    title: t('account_title'),
    searchableInput: true,
    dataIndex: 'AccountTitle',
  },
];
