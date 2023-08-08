import { columns } from './columns';
import { AntTable } from '@tradePro/components';
import { useGetPurchaseOrder } from '../queries';
import SearchCriteriaFrom from './SearchCriteriaForm';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';

function PurchaseOrderTable() {
  const { data, isError, isLoading } = useGetPurchaseOrder();

  return (
    <AntTable
      isError={isError}
      columns={columns()}
      numberOfSkeletons={12}
      isLoading={isLoading}
      data={data?.data?.Data?.Result || []}
      searchCriteriaForm={<SearchCriteriaFrom />}
      scroll={{ x: '', y: convertVhToPixels('62vh') }}
    />
  );
}

export default PurchaseOrderTable;
