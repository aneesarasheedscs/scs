import { AntTable } from '@scs/ui';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import React from 'react';
import { columns } from './column';
import { useTranslation } from 'react-i18next';
import SearchCriteriaFrom from './SearchCriteriaForm';
import { useGRNDetailTableHistory } from '../query';

function GRNHistoryTable() {
  const { t } = useTranslation();
  const { data, refetch, isError, isLoading, isFetching } = useGRNDetailTableHistory();

  return (
    <>
      <AntTable
        refetch={refetch}
        isError={isError}
        columns={columns(t)}
        numberOfSkeletons={12}
        isLoading={isLoading || isFetching}
        data={data?.data?.Data?.Result || []}
        searchCriteriaForm={<SearchCriteriaFrom />}
        scroll={{ x: '', y: convertVhToPixels('62vh') }}
      />
    </>
  );
}

export default GRNHistoryTable;
