import React from 'react';
import './style.scss';
import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import OutstandingPreBooking from './outstandingPreBooking/outstandingPreBooking';


import SearchCriteria from './outstandingPreBooking/searchCriteria';

function OrderDashboard() {
  const { t } = useTranslation();
  return (
    <div style={{ background: '#fff' }}>
      <Row justify={'start'} align={'middle'} style={{ marginLeft: '2%' }}>
        <Col xs={10} sm={10} md={12} lg={12} xl={14} xxl={3} className="">
          <h1 className="report_heading">{t('orders_dashboard')}</h1>
        </Col>
        <Col xxl={20}>
          <SearchCriteria />
        </Col>

      </Row>

      <OutstandingPreBooking />
    </div>
  );
}

export default OrderDashboard;
