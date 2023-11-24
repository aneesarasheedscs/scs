import { AntTable } from '@scs/ui';
import { Row } from 'antd';
import { useGetVoucherReport } from '../queries';
import { columnsVoucherReport } from './columns';
import { t } from 'i18next';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import SearchCriteria from './searchCriteria';

function VoucherReport() {
  const { data, refetch, isError, isLoading, isFetching } = useGetVoucherReport(false);
  return (
    <AntTable
      refetch={refetch}
      isError={isError}
      columns={columnsVoucherReport()}
      numberOfSkeletons={12}
      isLoading={isLoading || isFetching}
      data={data?.data?.Data?.Result || []}
      searchCriteriaForm={<SearchCriteria />}
      scroll={{ x: '', y: convertVhToPixels('62vh') }}
    />
  );
}

export default VoucherReport;
