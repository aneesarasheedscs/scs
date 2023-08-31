import { columns } from './column';
import { theme, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { AntTable } from '@tradePro/components';
import { usegetAccountHistoryTable } from '../../queries';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { TChartAccount } from '../../types';
import { usegetAccountLevels } from './queries';

interface SelectedValues {
  accountLevel: number;
  accountTitle: string;
}
interface AnotherComponentProps {
  selectedValues: SelectedValues;
}
function ChildAccountTable({ selectedValues }: AnotherComponentProps) {
  const {
    refetch,

    data: table,
    isError: tableError,
    isLoading: tableLoading,
    isSuccess: tableSuccess,
  } = usegetAccountLevels();

  const {
    token: { colorPrimary },
  } = theme.useToken();
  const { accountLevel, accountTitle } = selectedValues;

  const filteredTableData =
    table?.data?.Data?.Result?.filter((item: TChartAccount) => item.Account_Level === accountLevel) || [];

  return (
    <div className="childTables0">
      <h4
        style={{
          padding: '10px',
          borderRadius: 5,
          background: colorPrimary,
          textAlign: 'center',
          border: '2px ridge #ffeeee',
        }}
      >
        Child Accounts of {accountTitle} Level {accountLevel}{' '}
      </h4>
      <AntTable
        refetch={refetch}
        isError={tableError}
        data={filteredTableData || []}
        columns={columns()}
        isLoading={tableLoading}
        numberOfSkeletons={15}
        scroll={{ x: '', y: convertVhToPixels('56vh') }}
      />
    </div>
  );
}

export default ChildAccountTable;
