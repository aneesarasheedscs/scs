import { AntTable } from '@scs/ui';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import React from 'react';
import { columns } from './column';
import { useTranslation } from 'react-i18next';
import { useGRNDetailTable } from '../../query';

function GRNHistoryTable() {
  const { t } = useTranslation();
  const { data, refetch, isError, isLoading, isFetching } = useGRNDetailTable();

  return (
    <>
      <AntTable
        refetch={refetch}
        isError={isError}
        columns={columns(t)}
        numberOfSkeletons={12}
        isLoading={isLoading || isFetching}
        data={data?.data?.Data?.Result || []}
        scroll={{ x: '', y: convertVhToPixels('42vh') }}
      />
    </>
  );
}

export default GRNHistoryTable;
