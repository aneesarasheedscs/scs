import React from 'react';
import ChartOfAccountReport from './COAsearchCriteria';

import { ChartOfAccountColumn } from './colomns';
import { AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import './style.scss';
import { useChartOfReporttableQuery } from './queries';

const ChartOfAccountReportTable = () => {
  const { data, refetch, isError, isLoading, isFetching } = useChartOfReporttableQuery();
  const { t } = useTranslation();
  return (
    <div style={{ background: '#fff' }}>
      <Row>
        <Col xs={10} sm={10} md={12} lg={12} xl={14} xxl={16} className="forms-heading-container">
          <h1 className="report_heading">{t('chart_of_account')}</h1>
        </Col>
      </Row>
      <Row justify={'space-around'}>
        <Col xl={23}>
          <AntTable
            refetch={refetch}
            isError={isError}
            numberOfSkeletons={12}
            isLoading={isLoading || isFetching}
            columns={ChartOfAccountColumn()}
            data={data?.data?.Data?.Result || []}
            searchCriteriaForm={<ChartOfAccountReport />}
            scroll={{ x: '', y: convertVhToPixels('60vh') }}
            rowKey="Id"
          />
        </Col>
      </Row>
    </div>
  );
};

export default ChartOfAccountReportTable;
