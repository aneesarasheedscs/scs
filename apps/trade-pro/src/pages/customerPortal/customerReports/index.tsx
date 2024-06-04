import './style.scss';
import { Card, Col, Row, theme } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useGetCustomerReportMenu } from './queries';
import { map } from 'lodash';
import { useNavigate } from 'react-router';

function CustomerReports() {
  const { t } = useTranslation();
  const { data } = useGetCustomerReportMenu();
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const navigate = useNavigate();
  const customerMenu = data?.data?.Data?.Result;
  const handleNavigate = (ScreenAlias: string) => {
    if (ScreenAlias === 'Booking Report') {
      navigate('/booking-report');
    } else if (ScreenAlias === 'Sales Comparison Report') {
      navigate('/sales-comparison');
    } else if (ScreenAlias === 'Sale Order Report') {
      navigate('/sale-order-report');
    } else if (ScreenAlias === 'Sale Report') {
      navigate('/sale-analycis');
    } else {
    }
  };
  return (
    <>
      <div style={{ background: '#fff' }}>
        <Row justify={'start'} align={'middle'} style={{ marginLeft: '2%' }}>
          <Col span={24} className="">
            <h1 className="report_heading">{t('customer_reports')}</h1>
          </Col>
          <Col span={24}>
            <Row justify={'center'} gutter={10}>
              {map(customerMenu, ({ ScreenAlias }: any, index: number) => (
                <Col xs={24} xxl={4} sm={12} md={11} lg={6} key={index}>
                  <Card
                    hoverable
                    onClick={() => handleNavigate(ScreenAlias)}
                    className="container_menuCard"
                    style={{
                      border: `1px solid ${colorPrimary}`,
                    }}
                  >
                    <div
                      className="menuCard_div"
                      style={{
                        backgroundColor: colorPrimary,
                      }}
                    ></div>
                    <br></br>
                    <br />

                    <p className="menu_desc">
                      <h4 style={{ textAlign: 'center' }}> {ScreenAlias}</h4>
                    </p>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default CustomerReports;
