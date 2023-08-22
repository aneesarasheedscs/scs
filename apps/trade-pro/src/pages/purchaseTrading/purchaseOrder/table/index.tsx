import { columns } from './columns';
import { AntTable } from '@tradePro/components';
import { useGetPurchaseOrder } from '../queries';
import SearchCriteriaFrom from './SearchCriteriaForm';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';

function PurchaseOrderTable() {
  const { data, refetch, isError, isLoading, isFetching } = useGetPurchaseOrder();

  return (
    <AntTable
      refetch={refetch}
      isError={isError}
      columns={columns()}
      numberOfSkeletons={12}
      isLoading={isLoading || isFetching}
      data={data?.data?.Data?.Result || []}
      searchCriteriaForm={<SearchCriteriaFrom />}
      scroll={{ x: '', y: convertVhToPixels('62vh') }}
    />
  );
}

export default PurchaseOrderTable;
