import React from 'react';

import { ReceivableReportTypeHistory } from './type';
import { ReceivableReportQueryHistory } from './tableQueries';
import { ReceivablColumn } from './colomns';
import { AntTable, BackButton } from '@scs/ui';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import ReceivableFormCriteria from './searchCriteria';
import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import './style.scss';
const ReceivableReport: React.FC = () => {
  const { data, refetch, isError, isLoading, isFetching } = ReceivableReportQueryHistory();
  const { t } = useTranslation();
  return (
    <div style={{ background: '#fff' }}>
      <Row justify={'space-between'} align={'middle'}>
        <Col xs={10} sm={10} md={12} lg={8} xl={6} xxl={4} className="forms-heading-container">
          <h1 className="report_heading" style={{ textAlign: 'center' }}>
            {t('receivables_report')}
          </h1>
        </Col>
        <Col xxl={1} style={{ marginRight: '49px' }}>
          <BackButton goToDashboard={false} />
        </Col>
      </Row>
      <Row justify={'space-around'}>
        <Col xxl={23}>
          <AntTable
            refetch={refetch}
            isError={isError}
            numberOfSkeletons={12}
            isLoading={isLoading || isFetching}
            columns={ReceivablColumn()}
            data={data?.data?.Data?.Result || []}
            searchCriteriaForm={<ReceivableFormCriteria />}
            scroll={{ x: '', y: convertVhToPixels('60vh') }}
            // rowKey={(row: ReceivableReportTypeHistory) => row.Id}
            rowKey="Id"
          />
        </Col>
      </Row>
    </div>
  );
};

export default ReceivableReport;
