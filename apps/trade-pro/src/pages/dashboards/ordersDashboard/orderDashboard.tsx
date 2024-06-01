import React from 'react';
import './style.scss';
import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import OutstandingPreBooking from './outstandingPreBooking/outstandingPreBooking';

function OrderDashboard() {
  const { t } = useTranslation();
  return (
    <div style={{ background: '#fff' }}>
      <Row justify={'start'} align={'middle'} style={{ marginLeft: '2%' }}>
        <Col span={24} className="">
          <h1 className="report_heading">{t('orders_dashboard')}</h1>
        </Col>
        <Col span={24}>
          <OutstandingPreBooking />
        </Col>
      </Row>
    </div>
  );
}

export default OrderDashboard;
