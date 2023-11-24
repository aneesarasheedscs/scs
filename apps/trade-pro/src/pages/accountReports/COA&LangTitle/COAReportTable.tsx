import React from 'react';
import { TCOAReportHistory } from './type';
import ChartOfAccountReport from './COAsearchCriteria';
import { useChartOfReporttableQuery } from './tableQueries';
import { ChartOfAccountColumn } from './colomns';
import { AntTable } from '@scs/ui';
// import { AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';

const ChartOfAccountReportTable = () => {
  const { data, refetch, isError, isLoading, isFetching } = useChartOfReporttableQuery();

  return (
    <AntTable
      refetch={refetch}
      isError={isError}
      numberOfSkeletons={12}
      isLoading={isLoading || isFetching}
      columns={ChartOfAccountColumn()}
      data={data?.data?.Data?.Result || []}
      searchCriteriaForm={<ChartOfAccountReport />}
      scroll={{ x: '', y: convertVhToPixels('60vh') }}
      rowKey="Id"
    />
  );
};

export default ChartOfAccountReportTable;
