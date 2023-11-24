import { Row, Table, Typography } from 'antd';
import { AntTable } from '@scs/ui';

import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { t } from 'i18next';
import SearchCriteria from './SearchCriteria';
import { TrialBalanceHistory } from './type';
import { useGetTrialBalanceReport } from '../quries';
import { ColumnsTrialBalanceReport } from '../table/columns';

const { Text } = Typography;
function TrialBalanceReport() {
  const { data, refetch, isError, isLoading, isFetching } = useGetTrialBalanceReport(false);
  let totalDebit = 0;
  let totalCredit = 0;
  if (data?.data?.Data?.Result) {
    totalDebit = data.data.Data.Result.reduce((accumulator: number, item: any) => accumulator + (item.Debit || 0), 0);
    totalCredit = data.data.Data.Result.reduce((accumulator: number, item: any) => accumulator + (item.Credit || 0), 0);
  }
  const TableFooter = () => {
    // for (let i = 0; i < data?.data?.Data?.Result.length; i++) {
    //   totalDebit += data?.data?.Data?.Result[i].Debit;
    //   totalCredit += data?.data?.Data?.Result[i].Credit;
    // }
    return (
      <Table.Summary.Row>
        <Table.Summary.Cell index={0}> {totalDebit}</Table.Summary.Cell>
        <Table.Summary.Cell index={1}> {totalCredit}</Table.Summary.Cell>
      </Table.Summary.Row>
    );
  };
  return (
    <Row>
      <div>
        <h1>Trial Balance Report</h1>
      </div>

      <div>
        <AntTable
          refetch={refetch}
          isError={isError}
          numberOfSkeletons={12}
          isLoading={isLoading || isFetching}
          columns={ColumnsTrialBalanceReport(t)}
          data={data?.data?.Data?.Result || []}
          searchCriteriaForm={<SearchCriteria />}
          scroll={{ x: '', y: convertVhToPixels('62vh') }}
          rowKey={(row: TrialBalanceHistory) => row.AccountId}
          summary={() => (
            <Table.Summary fixed>
              <TableFooter />
            </Table.Summary>
          )}
        />
      </div>
    </Row>
  );
}

export default TrialBalanceReport;
