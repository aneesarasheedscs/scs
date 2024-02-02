import { Col, Radio, Row, Typography } from 'antd';
import { AntTable, BackButton } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import SearchCriteria from './SearchCriteria';
import { TrialBalanceHistory } from './type';
import { useGetTrialBalanceReport } from './queries';
import { useTranslation } from 'react-i18next';
import { FourColumnsTrialBalanceReport, SixColumnsTrialBalanceReport } from './columns';
import { selectedColumnAtom } from './atom';
import { useAtom } from 'jotai';
const { Text } = Typography;
function TrialBalanceReport({}) {
  const [selectedColumnss, setSelectedColumnss] = useAtom(selectedColumnAtom);

  const { t } = useTranslation();
  const { data, refetch, isError, isLoading, isFetching } = useGetTrialBalanceReport(false);

  return (
    <div style={{ backgroundColor: '#fff' }}>
      <Row justify={'space-between'} align={'middle'}>
        <Col xs={10} sm={10} md={12} lg={12} xl={14} xxl={3} className="forms-heading-container">
          <h1 className="report_heading" style={{ textAlign: 'center' }}>
            {t('trial_balance')}
          </h1>
        </Col>
        <Col xxl={1} style={{ marginRight: '50px' }}>
          {' '}
          <BackButton />
        </Col>
      </Row>

      <Row justify={'space-around'}>
        <Col xxl={23}>
          <AntTable
            key={selectedColumnss}
            refetch={refetch}
            isError={isError}
            numberOfSkeletons={12}
            isLoading={isLoading || isFetching}
            columns={selectedColumnss === 'four' ? FourColumnsTrialBalanceReport(t) : SixColumnsTrialBalanceReport(t)}
            data={data?.data?.Data?.Result || []}
            searchCriteriaForm={<SearchCriteria />}
            scroll={{ x: '', y: convertVhToPixels('60vh') }}
            rowKey={(row: TrialBalanceHistory) => row.AccountId}
          />
        </Col>
      </Row>
    </div>
  );
}

export default TrialBalanceReport;
