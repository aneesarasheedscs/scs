import { AntTable } from '@tradePro/components';
import { columns } from './column';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useGetItemCategoryHistory } from './queries';

function ItemCategoryTable() {
  const { data, isError, isLoading } = useGetItemCategoryHistory();
  return (
    <>
      <AntTable
        isError={isError}
        columns={columns()}
        numberOfSkeletons={12}
        isLoading={isLoading}
        data={data?.data?.Data?.Result || []}
        scroll={{ x: '', y: convertVhToPixels('30vh') }}
      />
    </>
  );
}

export default ItemCategoryTable;
