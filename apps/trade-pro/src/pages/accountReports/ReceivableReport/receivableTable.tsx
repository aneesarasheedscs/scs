import React from 'react';

import { ReceivableReportTypeHistory } from './type';
import { ReceivableReportQueryHistory } from './tableQueries';
import { ReceivablColumn } from './colomns';
import { AntTable } from '@scs/ui';
// import { AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import ReceivableFormCriteria from './searchCriteria';

const ReceivableReport: React.FC = () => {
  const { data, refetch, isError, isLoading, isFetching } = ReceivableReportQueryHistory();

  return (
    <AntTable
      refetch={refetch}
      isError={isError}
      numberOfSkeletons={12}
      isLoading={isLoading || isFetching}
      columns={ReceivablColumn()}
      data={data?.data?.Data?.Result || []}
      searchCriteriaForm={<ReceivableFormCriteria />}
      scroll={{ x: '', y: convertVhToPixels('60vh') }}
      // rowKey={(row: ReceivableReportTypeHistory) => row.Id}
      rowKey="Id"
    />
  );
};

export default ReceivableReport;
