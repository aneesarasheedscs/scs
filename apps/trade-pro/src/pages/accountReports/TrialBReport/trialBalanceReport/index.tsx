import { Col, Radio, Row, Typography } from 'antd';
import { AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import SearchCriteria from './SearchCriteria';
import { TrialBalanceHistory } from './type';

import { useGetTrialBalanceReport } from './queries';
import { useTranslation } from 'react-i18next';
import { FourColumnsTrialBalanceReport, SixColumnsTrialBalanceReport } from './columns';
import { useState } from 'react';
const { Text } = Typography;
function TrialBalanceReport({}) {
  const [selectedColumnss, setSelectedColumnss] = useState('four'); // 'four' or 'six'

  const { t } = useTranslation();
  const { data, refetch, isError, isLoading, isFetching } = useGetTrialBalanceReport(false);
  const handleColumnChange = (e: any) => {
    setSelectedColumnss(e.target.value);
  };

  return (
    <div style={{ backgroundColor: '#fff' }}>
      {/* <Row>
        <Col
          xs={2}
          sm={4}
          md={6}
          lg={8}
          xl={14}
          style={{ display: 'flex', alignItems: 'center', alignContent: 'center', margin: '16px' }}
        >
          <h1 style={{ fontFamily: 'Poppins', fontSize: '19px', padding: '0px' }}>{t('trial_balance')} </h1>
        </Col>
      </Row> */}
      <Radio.Group value={selectedColumnss} onChange={handleColumnChange} style={{ marginLeft: '10px' }}>
        {/* 1st way */}
        {/* <Radio.Button value="four">Four Columns</Radio.Button>
        <Radio.Button value="six">Six Columns</Radio.Button> */}
        {/* 2nd way */}
        <Radio value="four"> {t('four_columns')}</Radio>
        <Radio value="six">{t('six_columns')}</Radio>
      </Radio.Group>
      <AntTable
        key={selectedColumnss}
        refetch={refetch}
        isError={isError}
        numberOfSkeletons={12}
        isLoading={isLoading || isFetching}
        columns={selectedColumnss === 'four' ? FourColumnsTrialBalanceReport(t) : SixColumnsTrialBalanceReport(t)}
        data={data?.data?.Data?.Result || []}
        searchCriteriaForm={<SearchCriteria />}
        scroll={{ x: '', y: convertVhToPixels('62vh') }}
        rowKey={(row: TrialBalanceHistory) => row.AccountId}
      />
    </div>
  );
}

export default TrialBalanceReport;
