import { Col, Row } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import SaleOrderTable from './table';

function SaleOrderReport() {
  const { t } = useTranslation();
  return (
    <>
      <Row gutter={[4, 10]} justify={'center'} style={{ background: '#fff' }}>
        <Col span={23}>
          <Col span={24} style={{ marginBottom: 10 }}>
            <h1 className="report_heading">{t('sale_order')}</h1>
          </Col>
          <Col span={24} style={{ marginBottom: 15 }}>
            <SaleOrderTable />
          </Col>
        </Col>
      </Row>
    </>
  );
}

export default SaleOrderReport;
