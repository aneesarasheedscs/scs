import { DetailTableColumns, SummaryITableColumns } from './columns';
import { AntTable } from '@tradePro/components';
import { useGetGeneralLedgerDetail, useGetGeneralLedgerSummaryI } from '../queries';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import AccountsSearchCriteriaForm from './AccountsDetailSearchCriteriaForm';
import { useTranslation } from 'react-i18next';
import { theme } from 'antd';

const { useToken } = theme;

function GeneralLedgerTableSummaryI() {
  const { t } = useTranslation();
  const {
    data: SummaryI,
    refetch: SummaryIrefetch,
    isError: SummaryError,
    isLoading: SummaryLoading,
    isFetching: SummaryFetching,
  } = useGetGeneralLedgerSummaryI();
  const {
    token: { colorPrimary },
  } = theme.useToken();
  return (
    <AntTable
      refetch={SummaryIrefetch}
      isError={SummaryError}
      columns={SummaryITableColumns(t)}
      numberOfSkeletons={12}
      isLoading={SummaryLoading || SummaryFetching}
      data={SummaryI?.data?.Data?.Result || []}
      // searchCriteriaForm={<AccountsSearchCriteriaForm />}
      scroll={{ x: '', y: convertVhToPixels('62vh') }}
    />
  );
}
export default GeneralLedgerTableSummaryI;
