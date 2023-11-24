import { columns } from './column';
import { AntTable } from '@tradePro/components';
import { useGetReceivablesAgingRegister } from './queries';
import SearchCriteria from './SearchCriteria';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';

import { t } from 'i18next';

function ReceivablesAgingRegisterTable() {
  const { data, refetch, isError, isLoading, isFetching } = useGetReceivablesAgingRegister();

  return (
    <AntTable
      rowKey="Id"
      refetch={refetch}
      isError={isError}
      columns={columns(t)}
      numberOfSkeletons={12}
      isLoading={isLoading || isFetching}
      data={data?.data?.Data?.Result || []}
      searchCriteriaForm={<SearchCriteria />}
      scroll={{ x: '', y: convertVhToPixels('60vh') }}
    />
  );
}

export default ReceivablesAgingRegisterTable;
