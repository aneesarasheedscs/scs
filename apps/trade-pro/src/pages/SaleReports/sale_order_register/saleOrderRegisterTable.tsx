import React from 'react';

import { SaleOrderHistory } from './type';
import SaleOrderFormCriteria from './saleOrder';
import { useSalesReportTable } from './tableQueries';
import { ColumnsSaleOrderRegisterReport } from './colomns';
import { AntTable } from '@scs/ui';
// import { AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';

import { t } from 'i18next';

const SaleOrderRegisterTable = () => {
  const { data, refetch, isError, isLoading, isFetching } = useSalesReportTable();

  return (
    <AntTable
      refetch={refetch}
      isError={isError}
      numberOfSkeletons={12}
      isLoading={isLoading || isFetching}
      columns={ColumnsSaleOrderRegisterReport(t)}
      data={data?.data?.Data?.Result || []}
      searchCriteriaForm={<SaleOrderFormCriteria />}
      scroll={{ x: '', y: convertVhToPixels('60vh') }}
      // rowKey={(row: SaleOrderHistory) => row.DocNo}
      rowKey="Id"
    />
  );
};

export default SaleOrderRegisterTable;
