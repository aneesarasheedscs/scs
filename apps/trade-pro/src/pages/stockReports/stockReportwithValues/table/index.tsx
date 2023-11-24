import { AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import SearchCriteriaForm from './SearchCriteriaForm';
import { columns } from './column';
import { useTranslation } from 'react-i18next';
import { useGetStockReportHistory } from '../query';

function StockReportHistoryTable() {
  const { t } = useTranslation();
  const { data, isError, isFetching, isLoading, refetch } = useGetStockReportHistory();
  return (
    <>
      <AntTable
        rowKey="Id"
        refetch={refetch}
        isError={isError}
        columns={columns(t)}
        numberOfSkeletons={12}
        isLoading={isLoading || isFetching}
        data={data?.data?.Data?.Result || []}
        searchCriteriaForm={<SearchCriteriaForm />}
        scroll={{ x: '', y: convertVhToPixels('62vh') }}
      />
    </>
  );
}

export default StockReportHistoryTable;
