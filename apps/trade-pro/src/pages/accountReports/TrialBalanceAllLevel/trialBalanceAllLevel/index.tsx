import { Col, Row, Typography } from 'antd';
import { AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import SearchCriteria from './SearchCriteria';
import { TtrialBalanceSelectedHistory } from './type';
import { useTranslation } from 'react-i18next';
import { useAtom } from 'jotai';
import { FourTrialBalanceAllLevelHistoryColumns, SixTrialBalanceAllLevelHistoryColumns } from './columns';
import { selectedColumnAtom } from './atom';
import { useGetTrialAllLevelReport } from './queries';

const { Text } = Typography;
function TrialBalanceAllLevelReport() {
  const { t } = useTranslation();
  const [selectedColumnss, setSelectedColumnss] = useAtom(selectedColumnAtom);
  const { data, refetch, isError, isLoading, isFetching } = useGetTrialAllLevelReport();

  return (
    <>
      <Row justify={'space-around'}>
        <Col xxl={23} xl={23} lg={23}>
          {' '}
          <AntTable
            refetch={refetch}
            isError={isError}
            numberOfSkeletons={12}
            isLoading={isLoading || isFetching}
            columns={
              selectedColumnss === 'four'
                ? FourTrialBalanceAllLevelHistoryColumns(t)
                : SixTrialBalanceAllLevelHistoryColumns(t)
            }
            data={data?.data?.Data?.Result || []}
            searchCriteriaForm={<SearchCriteria />}
            scroll={{ x: '', y: convertVhToPixels('60vh') }}
            rowKey={(row: TtrialBalanceSelectedHistory) => row.AccountId}
            // summary={() => (
            //   <Table.Summary fixed>
            //     <TableFooter />
            //   </Table.Summary>
            // )}
          />
        </Col>
      </Row>
    </>
  );
}

export default TrialBalanceAllLevelReport;
