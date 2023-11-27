import { columns } from './columns';
import { AntTable } from '@tradePro/components';
import { useGetAddTaxTypeHistory } from '../queries';

import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { TableRowSelection } from 'antd/es/table/interface';
import { useAtom } from 'jotai';
import { selectedRowsAtom } from '../form/Atom';
import { selectedRowsforAllocated } from './Atom';
import { map } from 'lodash';
import { useEffect } from 'react';
import { TAddTaxTypeHistory } from '../type';

function AddTaxTypeTable({ FormData, selectedRo, allocatedData, unallocatedData }: any) {
  const [selectedRow, setSelectedRow] = useAtom(selectedRowsAtom);
  const { data, refetch, isError, isLoading, isFetching } = useGetAddTaxTypeHistory();
  // const [selectedRecord, setSelectedRecord] = useState<TItemTaxShedule | null>(null);
  const [selectedRows, setSelectedRows] = useAtom(selectedRowsAtom);
  const [selectRowforAllocated, setSelectRowforAllocated] = useAtom(selectedRowsforAllocated);
  const handleRowSelection = (row: TAddTaxTypeHistory) => {
    setSelectedRows((prevSelectedRows: TAddTaxTypeHistory[]) => [...prevSelectedRows, row]);
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

  // You can append formData to the table data
  return (
    <AntTable
      rowKey="Id"
      refetch={refetch}
      isError={isError}
      columns={columns(handleUpdateClick, setSelectedRows, handleRowSelection, handleSelectAllUn, handleSelectAll)}
      numberOfSkeletons={12}
      isLoading={isLoading || isFetching}
      data={data?.data?.Data?.Result || []}
      scroll={{ x: '', y: convertVhToPixels('45vh') }}
    />
  );
}

export default AddTaxTypeTable;
