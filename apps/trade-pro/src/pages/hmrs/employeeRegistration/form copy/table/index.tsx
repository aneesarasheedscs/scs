import { AntTable } from '@scs/ui';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { columns } from './column';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

interface Props {
  selectedRows: any;
  onTableDataChange: (newData: any) => void;
  isError: any;
  isLoading: any;
  isFetching: any;
  refetch: any;
  onSelectFieldChange: any;
  selectFieldValues: any;
}
function PurchaseInvoiceDetailTable({
  onSelectFieldChange,
  onTableDataChange,
  selectFieldValues,
  selectedRows,
  isFetching,
  isLoading,
  isError,
  refetch,
}: Props) {
  const { t } = useTranslation();

  const handleSelectChange = (fieldName: any, value: any) => {
    onSelectFieldChange(fieldName, value);
  };
  // console.log(selectedRows);
  return (
    <>
      <h2 className="form-heading2"> Detail</h2>
      <AntTable
        refetch={refetch}
        isError={isError}
        columns={columns(t, selectFieldValues, handleSelectChange)}
        numberOfSkeletons={12}
        isLoading={isLoading || isFetching}
        data={selectedRows}
        scroll={{ x: '', y: convertVhToPixels('30vh') }}
      />
    </>
  );
}

export default PurchaseInvoiceDetailTable;
