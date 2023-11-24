import React, { useState } from 'react';
import { columns } from '../columns';
import { useGetVouchersForApproval } from '../queries/approvel';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useTranslation } from 'react-i18next';
import { AntTable } from '@tradePro/components';

const VoucherTable: React.FC<{ documentTypeId: number }> = ({ documentTypeId }) => {
  const {
    data: table,
    isError: tableError,
    refetch: tableRefetch,
    isSuccess: tableSucess,
    isLoading: tableLoading,
    isFetching,
  } = useGetVouchersForApproval(documentTypeId);

  const [clickedRow, setClickedRow] = useState(null); // Track the clicked row

  // Handle row click event
  // const handleRowClick = (record: any) => {
  //   console.log('Clicked row:', record.key);
  //   if (clickedRow === record.key) {
  //     setClickedRow(null); // Clear the clicked row
  //   } else {
  //     setClickedRow(record.key); // Set the clicked row
  //   }
  // };

  const { t } = useTranslation();

  return (
    <AntTable
      refetch={tableRefetch}
      numberOfSkeletons={10}
      data={table?.data?.Data?.Result || []}
      isLoading={tableLoading || isFetching}
      isError={tableError}
      columns={columns(t)}
      scroll={{ x: '', y: convertVhToPixels('50vh') }}

      // onRow={(record) => ({
      //   onClick: () => handleRowClick(record),
      // })}
    />
  );
};

export default VoucherTable;
