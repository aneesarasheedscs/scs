import { columns } from './columns';
import { AntTable } from '@tradePro/components';
import { useGetPurchaseOrder } from '../queries';

function PurchaseOrderTable() {
  const { data, isError, isLoading } = useGetPurchaseOrder();

  return (
    <AntTable
      data={[]}
      isError={isError}
      scroll={{ x: '' }}
      columns={columns()}
      isLoading={isLoading}
      numberOfSkeletons={8}
      tableTitle="Purchase Order"
    />
  );
}

export default PurchaseOrderTable;
