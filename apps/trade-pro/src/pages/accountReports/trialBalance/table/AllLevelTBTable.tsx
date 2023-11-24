import { AntTable } from '@scs/ui';
import React from 'react';
import { TrialBalanceAllLevelHistoryColumns } from './columns';

const AllLevelTBTable = () => {
  return (
    <div>
      <AntTable columns={TrialBalanceAllLevelHistoryColumns()} />
    </div>
  );
};

export default AllLevelTBTable;
