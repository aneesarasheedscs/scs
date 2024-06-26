import { columns } from './columns';
import { AntTable } from '@tradePro/components';
import { PayableReportQueryHistory } from './queries';
import SearchCriteria from './SearchCriteria';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';

import { t } from 'i18next';

function PayablesTable() {
  const { data, refetch, isError, isLoading, isFetching } = PayableReportQueryHistory();

  return (
    <AntTable
      rowKey="Id"
      refetch={refetch}
      isError={isError}
      columns={columns(t)}
      numberOfSkeletons={12}
      isLoading={isLoading || isFetching}
      data={data?.data?.Data?.Result || []}
      searchCriteriaForm={<SearchCriteria />}
      scroll={{ x: '', y: convertVhToPixels('60vh') }}
    />
  );
}

export default PayablesTable;
