import { AntTable } from '@scs/ui';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { columns } from './column';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { addtableData } from '../../purchaseOrderLoad/loadOrderTable/Atom';

interface Props {
  // selectedRows: any;
  onTableDataChange: (newData: any) => void;
  isError: any;
  isLoading: any;
  isFetching: any;
  // refetch: any;
  onSelectFieldChange: any;
  selectFieldValues: any;
}
function GRNDetailTable({
  onSelectFieldChange,
  onTableDataChange,
  selectFieldValues,
  // selectedRows,
  isFetching,
  isLoading,
  isError,
}: // refetch,
Props) {
  const { t } = useTranslation();
  const [tableData, setTableData] = useAtom(addtableData);

  const handleSelectChange = (fieldName: any, value: any) => {
    onSelectFieldChange(fieldName, value);
  };
  return (
    <>
      <h2 className="form-heading2"> Detail</h2>
      <AntTable
        // refetch={refetch}
        isError={isError}
        columns={columns(t, selectFieldValues, handleSelectChange)}
        numberOfSkeletons={12}
        isLoading={isLoading || isFetching}
        data={tableData}
        scroll={{ x: '', y: convertVhToPixels('20vh') }}
      />
    </>
  );
}

export default GRNDetailTable;
