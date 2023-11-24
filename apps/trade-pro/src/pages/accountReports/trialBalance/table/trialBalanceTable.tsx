import { AntTable } from '@scs/ui';
import React from 'react';

import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { TrialBalanceAllLevelHistoryColumns } from './columns';
import { useGetTrialBalanceReport } from '../quries';

const TrialBalanceTable = () => {
  const { data, isError, isLoading, refetch, isFetching } = useGetTrialBalanceReport();

  return (
    <div>
      <AntTable
        columns={TrialBalanceAllLevelHistoryColumns()}
        data={data?.data?.Data?.Result || []}
        refetch={refetch}
        isError={isError}
        isLoading={isLoading || isFetching}
        scroll={{ x: '', y: convertVhToPixels('53vh') }}
      />
    </div>
  );
};

export default TrialBalanceTable;
