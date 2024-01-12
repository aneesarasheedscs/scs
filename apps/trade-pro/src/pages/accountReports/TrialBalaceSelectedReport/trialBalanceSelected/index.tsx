import { Col, Radio, Row, Typography } from 'antd';
import { AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import SearchCriteria from './SearchCriteria';
import { TtrialBalanceSelectedHistory } from './type';
import { useGetTrialBalanceSelectedReport } from './queries';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { FourTrialBalanceSelectedHistoryColumns, SixTrialBalanceSelectedHistoryColumns } from './columns';

const { Text } = Typography;
function TrialBalanceSelectedReport() {
  const { t } = useTranslation();
  const { data, refetch, isError, isLoading, isFetching } = useGetTrialBalanceSelectedReport(false);
  const [selectedColumns, setSelectedColumns] = useState('four');
  const handleColumnChange = (e: any) => {
    setSelectedColumns(e.target.value);
  };
  return (
    <div style={{ backgroundColor: '#fff' }}>
      <Row>
        <Col
          xs={2}
          sm={4}
          md={6}
          lg={8}
          xl={14}
          style={{ display: 'flex', alignItems: 'center', alignContent: 'center', margin: '16px' }}
        >
          <h1 style={{ fontFamily: 'Poppins', fontSize: '19px', padding: '0px' }}>{t('selected_trial_balance')} </h1>
        </Col>
      </Row>
      <Radio.Group value={selectedColumns} onChange={handleColumnChange} style={{ marginLeft: '10px' }}>
        <Radio value="four">{t('four_columns')}</Radio>
        <Radio value="six">{t('six_columns')}</Radio>
      </Radio.Group>
      <AntTable
        key={selectedColumns}
        refetch={refetch}
        isError={isError}
        numberOfSkeletons={12}
        isLoading={isLoading || isFetching}
        columns={
          selectedColumns === 'four'
            ? FourTrialBalanceSelectedHistoryColumns(t)
            : SixTrialBalanceSelectedHistoryColumns(t)
        }
        data={data?.data?.Data?.Result || []}
        searchCriteriaForm={<SearchCriteria />}
        scroll={{ x: '', y: convertVhToPixels('62vh') }}
        rowKey={(row: TtrialBalanceSelectedHistory) => row.AccountId}
      />
    </div>
  );
}

export default TrialBalanceSelectedReport;
