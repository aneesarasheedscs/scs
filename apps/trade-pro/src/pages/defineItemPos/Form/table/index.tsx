import { AntTable } from '@tradePro/components';
import { columns } from './column';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useGetItemTypeHistory } from './querie';

function ItemDefinitionTable() {
  const { data, isError, isLoading } = useGetItemTypeHistory();
  return (
    <>
      <AntTable
        isError={isError}
        columns={columns()}
        numberOfSkeletons={12}
        isLoading={isLoading}
        data={data?.data?.Data?.Result || []}
        scroll={{ x: '', y: convertVhToPixels('42vh') }}
      />
    </>
  );
}

export default ItemDefinitionTable;
