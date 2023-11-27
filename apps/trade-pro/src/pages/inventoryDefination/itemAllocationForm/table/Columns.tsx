import { AntColumnType } from '@tradePro/globalTypes';
import { ItemAllocationTypes } from '../types';
import { Checkbox } from 'antd';
import { useState } from 'react';

export const PendingItemsForAllocationColumns = (
  t: any,
  setSelectedRows: any,
  handleRowSelection: (record: any) => void,
  handleSelectAllUn: any,
  allocatedData: any,
  selectedRows: any
): AntColumnType<ItemAllocationTypes>[] => {
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [selectAllChecked2, setSelectAllChecked2] = useState(false);

  return [
    {
      title: (
        <Checkbox
          onChange={(e) => {
            setSelectAllChecked(e.target.checked);
            setSelectAllChecked2(e.target.checked);
            if (e.target.checked) {
              handleSelectAllUn();
            } else {
              setSelectedRows([]);
            }
          }}
          name="IsActive"
          style={{ marginLeft: '10px' }}
        />
      ),
      dataIndex: 'IsActive',
      width: 100,
      render: (text: string, record: any) => (
        <Checkbox
          name="IsActive"
          onChange={(e) => {
            setSelectAllChecked2(e.target.checked), handleRowSelection(record);
          }}
          // checked={selectAllChecked2}
        />
      ),
    },
    {
      width: 370,
      title: <>{t('item_name')}</>,
      searchableInput: true,
      dataIndex: 'ItemName',
    },
  ];
};

export const ItemsAllocationColumns = (
  t: any,
  setSelectRowforAllocated: any,
  handleRowSelectionforAllocated: (record: any) => void,
  handleSelectAll: any,
  unallocatedData: any,
  selectedRows: any
): AntColumnType<ItemAllocationTypes>[] => {
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [selectAllChecked2, setSelectAllChecked2] = useState(false);
  return [
    {
      title: (
        <Checkbox
          onChange={(e) => {
            setSelectAllChecked(e.target.checked);
            setSelectAllChecked2(e.target.checked);
            if (e.target.checked) {
              handleSelectAll();
            } else {
              setSelectRowforAllocated([]);
            }
          }}
          // checked={unallocatedData?.data?.Data?.Result?.length === selectedRows.length}
          style={{ marginLeft: '10px' }}
        />
      ),
      dataIndex: 'IsActive',
      width: 100,
      render: (text: string, record: any) => (
        <Checkbox
          name="IsActive"
          // onChange={() => handleRowSelection(record)}
          onChange={(e) => {
            setSelectAllChecked2(e.target.checked), handleRowSelectionforAllocated(record);
          }}
          // checked={selectedRows.includes(record.Id) ? true : false}
        />
      ),
    },

    {
      width: 370,
      searchableInput: true,
      title: <>{t('item_name')}</>,

      dataIndex: 'ItemName',
    },
  ];
};
