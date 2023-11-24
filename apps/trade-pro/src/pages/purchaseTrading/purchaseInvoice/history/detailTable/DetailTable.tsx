import { AntTable } from '@scs/ui';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useTranslation } from 'react-i18next';
import { DetailColumn } from './DetailColumn';

interface Props {
  isError: any;
  isLoading: any;
  isFetching: any;
  refetch: any;
  loadOrderData: any;
}
function GRNDetailLoadOrderTable({ isFetching, isLoading, isError, refetch, loadOrderData }: Props) {
  const { t } = useTranslation();

  return (
    <>
      <h2 className="form-heading2"> Detail</h2>
      <AntTable
        refetch={refetch}
        isError={isError}
        columns={DetailColumn(t)}
        numberOfSkeletons={12}
        isLoading={isLoading || isFetching}
        data={loadOrderData?.data?.Data?.Result || []}
        scroll={{ x: '', y: convertVhToPixels('30vh') }}
      />
    </>
  );
}

export default GRNDetailLoadOrderTable;
