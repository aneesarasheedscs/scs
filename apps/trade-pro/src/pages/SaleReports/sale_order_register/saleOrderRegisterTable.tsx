import React from 'react';
import SaleOrderFormCriteria from './saleOrder';
import { ColumnsSaleOrderRegisterReport } from './colomns';
import { AntTable, BackButton } from '@tradePro/components';
import './style.scss';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { t } from 'i18next';
import { useSalesReportTable } from './queries';
import { Col, Row } from 'antd';

const SaleOrderRegisterTable = () => {
  const { data, refetch, isError, isLoading, isFetching } = useSalesReportTable();

  function CriteriaString() {
    return (
      <Row style={{ border: '1px solid #25A7DF', padding: 7, borderRadius: 5 }}>
        <h5> {data?.data?.Data?.Result?.[0]?.ReportCriteria}</h5>
      </Row>
    );
  }

  return (
    <div style={{ background: '#fff' }}>
      <Row justify={'space-between'} align={'middle'}>
        <Col xs={10} sm={10} md={12} lg={8} xl={6} xxl={4} className="forms-heading-container">
          <h1 className="report_heading" style={{ textAlign: 'center' }}>
            {t('sale_order_history')}
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
            columns={ColumnsSaleOrderRegisterReport(t)}
            data={data?.data?.Data?.Result || []}
            searchCriteriaForm={<SaleOrderFormCriteria />}
            searchCriteriaReport={data?.data?.Data?.Result?.[0]?.ReportCriteria ? <CriteriaString /> : ''}
            scroll={{ x: '', y: convertVhToPixels('65vh') }}
       
            rowKey="Id"
          />
        </Col>
      </Row>
    </div>
  );
};

export default SaleOrderRegisterTable;
