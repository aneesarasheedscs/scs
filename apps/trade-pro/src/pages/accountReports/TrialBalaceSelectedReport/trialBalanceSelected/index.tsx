import { Col, Radio, Row, Typography } from 'antd';
import { AntTable, BackButton } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import SearchCriteria from './SearchCriteria';
import { TtrialBalanceSelectedHistory } from './type';
import { useGetTrialBalanceSelectedReport } from './queries';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { FourTrialBalanceSelectedHistoryColumns, SixTrialBalanceSelectedHistoryColumns } from './columns';
import { useAtom } from 'jotai';
import { selectedColumnAtom } from './atom';

const { Text } = Typography;
function TrialBalanceSelectedReport() {
  const { t } = useTranslation();
  const { data, refetch, isError, isLoading, isFetching } = useGetTrialBalanceSelectedReport(true);
  const [selectedColumnss, setSelectedColumnss] = useAtom(selectedColumnAtom);


  const CriteriaString =()=>{
    return(
      <Row style={{border:'1px solid #25A7DF',padding:7,borderRadius:5}}>

      </Row>
    )
  }
  return (
    <div style={{ backgroundColor: '#fff' }}>
      <Row justify={'space-between'} align={'middle'}>
        <Col xs={10} sm={10} md={12} lg={12} xl={14} xxl={4} className="forms-heading-container">
          <h1 className="report_heading" style={{ textAlign: 'center' }}>
            {t('selected_trial_balance')}
          </h1>
        </Col>
        <Col xxl={1} style={{ marginRight: '50px' }}>
          {' '}
          <BackButton goToDashboard={true} />
        </Col>
      </Row>

      <Row justify={'space-around'}>
        <Col xxl={23} xs={23}>
          <AntTable
            key={selectedColumnss}
            refetch={refetch}
            isError={isError}
            numberOfSkeletons={12}
            searchCriteriaReport={data?.data?.Data?.Result?.[0]?.ReportCriteria? <CriteriaString/>:''}
            isLoading={isLoading || isFetching}
            columns={
              selectedColumnss === 'four'
                ? FourTrialBalanceSelectedHistoryColumns(t)
                : SixTrialBalanceSelectedHistoryColumns(t)
            }
            data={data?.data?.Data?.Result || []}
            searchCriteriaForm={<SearchCriteria />}
            scroll={{ x: '', y: convertVhToPixels('55vh') }}
            rowKey={(row: TtrialBalanceSelectedHistory) => row.AccountId}
          />
        </Col>
      </Row>
    </div>
  );
}

export default TrialBalanceSelectedReport;
