import { Row, Table, Typography } from 'antd';
import { useGetTrialBalanceReport } from '../queries';
import { AntTable } from '@scs/ui';
import { ColumnsTrialBalanceReport } from './columns';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { t } from 'i18next';
import SearchCriteria from './SearchCriteria';
import { TrialBalanceHistory, TrialBalanceSearchCriteria } from './type';
import { useState } from 'react';
const { Text } = Typography;
function TrialBalanceReport() {
  const { data, refetch, isError, isLoading, isFetching } = useGetTrialBalanceReport(false);
  const [formData, setformData] = useState<TrialBalanceSearchCriteria>();
  const GetData = (values: any) => {
    setformData(values);
    console.log('Form Values:', values);
  };

  return (
    <AntTable
      refetch={refetch}
      isError={isError}
      numberOfSkeletons={12}
      isLoading={isLoading || isFetching}
      columns={ColumnsTrialBalanceReport(t, formData)}
      data={data?.data?.Data?.Result || []}
      searchCriteriaForm={<SearchCriteria GetData={GetData} />}
      scroll={{ x: '', y: convertVhToPixels('62vh') }}
      rowKey={(row: TrialBalanceHistory) => row.AccountId}
    />
  );
}

export default TrialBalanceReport;
