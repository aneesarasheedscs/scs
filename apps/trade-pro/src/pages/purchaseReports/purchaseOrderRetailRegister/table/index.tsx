import { columns } from './columns';
import { AntTable } from '@tradePro/components';
import { useGetPurchaseOrder, useGetPurchaseOrderStatus } from '../queries';
import SearchCriteriaFrom from './SearchCriteriaForm';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useTranslation } from 'react-i18next';
import { Card, theme } from 'antd';
import PurchaseOrderStatus from './purchaseOrderStatus';

const { useToken } = theme;

function PurchaseOrderTable() {
  const { t } = useTranslation();
  const { data, refetch, isError, isLoading, isFetching } = useGetPurchaseOrder();
  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <>
      <PurchaseOrderStatus />
      <AntTable
        rowKey="Id"
        refetch={refetch}
        isError={isError}
        columns={columns(t)}
        numberOfSkeletons={12}
        isLoading={isLoading || isFetching}
        data={data?.data?.Data?.Result || []}
        searchCriteriaForm={<SearchCriteriaFrom />}
        scroll={{ x: '', y: convertVhToPixels('60vh') }}
        // printData={{pass options here as needed}}
        // downloadExcel={{pass options here as needed}}
        // downloadPdf={{pass options here as needed}}
      />
    </>
  );
}

export default PurchaseOrderTable;
