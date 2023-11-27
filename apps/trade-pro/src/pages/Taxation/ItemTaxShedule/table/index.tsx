import { columns } from './columns';
import { AntTable } from '@tradePro/components';
import { useGetItemTaxSheduleHistory } from '../queries';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { TItemTaxShedule } from '../type';
import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useAtom } from 'jotai';

import { selectedRowsAtom, selectedRowsforAllocated } from './Atom';
import { map } from 'lodash';
import ItemTaxSheduleScreen from '../form';
function ItemTaxSheduleTable({ FormData, selectedRo, allocatedData, unallocatedData }: any) {
  const { data, refetch, isError, isLoading, isFetching } = useGetItemTaxSheduleHistory();
  const [selectedRow, setSelectedRow] = useAtom(selectedRowsAtom);
  const [selectedRows, setSelectedRows] = useAtom(selectedRowsAtom);
  const [selectRowforAllocated, setSelectRowforAllocated] = useAtom(selectedRowsforAllocated);

  const handleRowSelection = (row: TItemTaxShedule) => {
    setSelectedRows((prevSelectedRows: TItemTaxShedule[]) => [...prevSelectedRows, row]);
    // checked={selectedRows.includes(record.Id) ? true : false
  };

  const handleSelectAllUn = () => {
    if (allocatedData?.data?.Data?.Result?.length === selectedRows.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(map(allocatedData?.data?.Data?.Result, 'Id'));
    }
  };

  const handleSelectAll = () => {
    if (unallocatedData?.data?.Data?.Result?.length === selectedRows.length) {
      setSelectRowforAllocated([]);
    } else {
      setSelectRowforAllocated(map(unallocatedData?.data?.Data?.Result, 'Id'));
    }
  };
  const handleUpdateClick = (record: any) => {
    // const selectedRow = data?.data?.Data?.Result.find((row: any) => row.Id === selectedRows);
    setSelectedRow([record]);
    // setSelectedRow(selectedRow);
  };

  useEffect(() => {
    console.log('Selected Rows multiple:', selectedRows);
    console.log('Selected Rows multiple for Allocated:', selectRowforAllocated);
  }, [selectedRows, selectRowforAllocated]);

  return (
    <AntTable
      rowKey="Id"
      // onRow={(row) => ({
      //   onClick: () => handleUpdateClick(row),
      // })}
      refetch={refetch}
      isError={isError}
      columns={columns(handleUpdateClick, setSelectedRows, handleRowSelection, handleSelectAllUn, handleSelectAll)}
      numberOfSkeletons={12}
      isLoading={isLoading || isFetching}
      data={data?.data?.Data?.Result || []}
      scroll={{ x: '', y: convertVhToPixels('48vh') }}
    />
  );
}

export default ItemTaxSheduleTable;
