import { AntTable } from '@tradePro/components';
import { columns } from './columns';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useGetPurchaseOrder } from './queries';

function HistoryTable() {
  const { data, isError, isLoading } = useGetPurchaseOrder();
  return (
    <>
      <AntTable
        isError={isError}
        columns={columns()}
        numberOfSkeletons={12}
        isLoading={isLoading}
        data={data?.data?.Data?.Result || []}
        scroll={{ x: '', y: convertVhToPixels('62vh') }}
      />
    </>
  );
}

export default HistoryTable;
