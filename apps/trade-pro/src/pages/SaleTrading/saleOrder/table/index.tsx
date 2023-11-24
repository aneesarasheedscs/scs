import { AntTable } from '@scs/ui';
import { useGetSaleOrder } from '../queries';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { SaleOrdercolumns, saleOrderFormcolumns2 } from './columns';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';

const SaleOrderTable = ({ setSelectedRecordId, setActiveTab }: TFrom) => {
  const { t } = useTranslation();
  const { data, refetch, isError, isLoading, isFetching } = useGetSaleOrder();
  console.log(data?.data?.Data?.Result);
  return (
    <>
      <AntTable
        refetch={refetch}
        isError={isError}
        columns={SaleOrdercolumns(t)}
        numberOfSkeletons={12}
        isLoading={isLoading || isFetching}
        data={data?.data?.Data?.Result || []}
        scroll={{ x: '', y: convertVhToPixels('26vh') }}
      />
      <br></br>
      <AntTable
        refetch={refetch}
        isError={isError}
        columns={saleOrderFormcolumns2()}
        numberOfSkeletons={12}
        isLoading={isLoading || isFetching}
        data={data?.data?.Data?.Result || []}
        scroll={{ x: '', y: convertVhToPixels('18vh') }}
      />
    </>
  );
};
type TFrom = {
  setSelectedRecordId: (id: number | null) => void;
  setActiveTab: (tab: string) => void;
};

export default SaleOrderTable;
