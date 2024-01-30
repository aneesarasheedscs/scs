import { AntColumnType } from '@tradePro/globalTypes';
import { ItemAllocationTypes } from '../types';
import { Checkbox } from 'antd';

export const PendingItemsForAllocationColumns = (
  t: any,
  handleCheckboxChange: any,
  selectedRowKeys: any,
  handleSelectAllRecords: any
): AntColumnType<ItemAllocationTypes>[] => {
  return [
    {
      title: (
        <Checkbox
          onChange={(e) => {
            if (e.target.checked) {
              console.log('select all');
              handleSelectAllRecords(e.target.checked);
            } else {
              console.log('un select all');
              handleSelectAllRecords(e.target.checked);
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
          onChange={(e) => handleCheckboxChange(record, e.target.checked)}
          checked={selectedRowKeys?.includes(record.Id)}
        />
      ),
      showCount: true,
    },
    {
      width: 370,
      title: t('item_name'),
      searchableInput: true,
      dataIndex: 'ItemName',
    },
  ];
};

export const ItemsAllocationColumns = (
  t: any,
  selectedRowKeysForUnAllocate: any,
  handleSelectAllRecordsForAllocation: any,
  handleCheckboxChangeForAllocation: any
): AntColumnType<ItemAllocationTypes>[] => {
  return [
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
          checked={selectedRowKeysForUnAllocate?.includes(record.Id)}
        />
      ),
      showCount: true,
    },

    {
      width: 370,
      searchableInput: true,
      title: t('item_name'),

      dataIndex: 'ItemName',
    },
  ];
};
