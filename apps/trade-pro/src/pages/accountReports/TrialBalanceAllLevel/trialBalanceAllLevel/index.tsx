import { Typography } from 'antd';
import { AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';

import SearchCriteria from './SearchCriteria';
import { TtrialBalanceSelectedHistory } from './type';
import { TrialBalanceSelectedHistoryColumns } from './columns';
import { useGetTrialBalanceSelectedReport } from './queries';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;
function TrialBalanceAllLevelReport() {
  const { t } = useTranslation();
  const { data, refetch, isError, isLoading, isFetching } = useGetTrialBalanceSelectedReport(false);
  // let totalDebit = 0;
  // let totalCredit = 0;
  // if (data?.data?.Data?.Result) {
  //   totalDebit = data.data.Data.Result.reduce((accumulator: number, item: any) => accumulator + (item.Debit || 0), 0);
  //   totalCredit = data.data.Data.Result.reduce((accumulator: number, item: any) => accumulator + (item.Credit || 0), 0);
  // }
  // const TableFooter = () => {
  // for (let i = 0; i < data?.data?.Data?.Result.length; i++) {
  //   totalDebit += data?.data?.Data?.Result[i].Debit;
  //   totalCredit += data?.data?.Data?.Result[i].Credit;
  // }
  // return (
  //   <Table.Summary.Row>
  //     <Table.Summary.Cell index={0}> {totalDebit}</Table.Summary.Cell>
  //     <Table.Summary.Cell index={1}> {totalCredit}</Table.Summary.Cell>
  //   </Table.Summary.Row>
  // );
  // };
  return (
    <AntTable
      refetch={refetch}
      isError={isError}
      numberOfSkeletons={12}
      isLoading={isLoading || isFetching}
      columns={TrialBalanceSelectedHistoryColumns(t)}
      // data={data?.data?.Data?.Result || []}
      searchCriteriaForm={<SearchCriteria />}
      scroll={{ x: '', y: convertVhToPixels('62vh') }}
      rowKey={(row: TtrialBalanceSelectedHistory) => row.AccountId}
      // summary={() => (
      //   <Table.Summary fixed>
      //     <TableFooter />
      //   </Table.Summary>
      // )}
    />
  );
}

export default TrialBalanceAllLevelReport;
