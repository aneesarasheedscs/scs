import { columns } from './columns';
import { AntTable } from '@tradePro/components';
import { useGetAddTaxSheduleHistory } from '../queries';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { TAddTaxSheduleHistory } from '../type';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';

import { Col, Row } from 'antd';
import { selectedRowsforAllocated, selectedRowsAtom } from './Atom';
import { map } from 'lodash';

function AddTaxSheduleTable({ FormData, selectedRo, allocatedData, unallocatedData }: any) {
  const { data, refetch, isError, isLoading, isFetching } = useGetAddTaxSheduleHistory();
  const [selectedRow, setSelectedRow] = useAtom(selectedRowsAtom);

  const [selectedRows, setSelectedRows] = useAtom(selectedRowsAtom);
  const [selectRowforAllocated, setSelectRowforAllocated] = useAtom(selectedRowsforAllocated);
  //ant deisng code
  const [selectionType, setSelectionType] = useState('checkbox');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  ///ended
  const handleRowSelection = (row: TAddTaxSheduleHistory, record: any) => {
    setSelectedRows((prevSelectedRows: TAddTaxSheduleHistory[]) => [...prevSelectedRows, row]);
  };
  // const onSelectChange = (newSelectedRowKeys: any) => {
  //   setSelectedRowKeys(newSelectedRowKeys);
  //   console.log('selectedRowKeys changed: ', newSelectedRowKeys);
  // };

  const handleSelectAllUn = () => {
    if (allocatedData?.data?.Data?.Result?.length === selectedRows.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(map(allocatedData?.data?.Data?.Result, 'Id'));
    }
  };
  // const rowSelection = {
  //   selectedRowKeys,
  //   onChange: onSelectChange,
  //   selections: [],
  // };

  useEffect(() => {
    console.log('Selected Rows multiple:', selectedRows);
    console.log('Selected Rows multiple for Allocated:', selectRowforAllocated);
  }, [selectedRows, selectRowforAllocated]);

  const handleUpdateClick = (record: any) => {
    // const selectedRow = data?.data?.Data?.Result.find((row: any) => row.Id === selectedRows);
    setSelectedRow([record]);
    // setSelectedRow(selectedRow);
  };

  return (
    <AntTable
      rowKey="Id"
      refetch={refetch}
      isError={isError}
      columns={columns(handleUpdateClick, setSelectedRows, selectedRows, handleSelectAllUn, handleRowSelection)}
      numberOfSkeletons={12}
      isLoading={isLoading || isFetching}
      data={data?.data?.Data?.Result || []}
      scroll={{ x: '', y: convertVhToPixels('45vh') }}
      // rowSelection={rowSelection}
    />
  );
}

export default AddTaxSheduleTable;
