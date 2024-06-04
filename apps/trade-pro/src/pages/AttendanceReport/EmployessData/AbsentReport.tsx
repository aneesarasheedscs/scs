import { Card, Col, Row, theme } from 'antd';
import { map } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';

function AbsentReport({ AbsentData }: Props) {
  const { t } = useTranslation();
  const {
    token: { colorPrimary },
  } = theme.useToken();
  return (
    <>
      <Row style={{ marginTop: '-0.5%' }}>
        <Col span={24}>
          <Row justify={'end'} style={{ marginBottom: 5 }}>
            <Col span={7}>
              <Card
                bordered={false}
                style={{
                  height: '6vh',
                  borderRadius: 0,
                  background: colorPrimary,
                }}
                cover={
                  <>
                    <h4 style={{ padding: 10, paddingTop: 15 }}> {t('employee Name')} </h4>
                  </>
                }
              ></Card>
            </Col>
            <Col span={5}>
              <Card
                bordered={false}
                style={{ height: '6vh', borderRadius: 0, cursor: 'pointer', background: 'lightgrey' }}
                cover={
                  <>
                    <h5 style={{ marginTop: 0, textAlign: 'center', textDecoration: 'underline' }}>
                      {t('this_month')}
                    </h5>
                    <h5 style={{ marginTop: 0, textAlign: 'center' }}> {t('previous')} </h5>
                    <h5 style={{ marginTop: -5, textAlign: 'center', marginLeft: -5 }}> {t('month')} </h5>
                  </>
                }
              ></Card>
            </Col>
            <Col span={6}>
              <Card
                bordered={false}
                style={{ height: '6vh', borderRadius: 0, cursor: 'pointer', background: '#eeee' }}
                cover={
                  <>
                    <h5 style={{ marginTop: 0, textAlign: 'center', textDecoration: 'underline' }}>
                      {t('this_month')}
                    </h5>
                    <h5 style={{ marginTop: 0, textAlign: 'center' }}> {t('previous')} </h5>
                    <h5 style={{ marginTop: -5, textAlign: 'center', marginLeft: -5 }}> {t('month')} </h5>
                  </>
                }
              ></Card>
            </Col>
            <Col span={6}>
              <Card
                bordered={false}
                style={{
                  height: '6vh',
                  borderRadius: 0,

                  cursor: 'pointer',
                  background: 'orange',
                }}
                cover={
                  <>
                    <h5 style={{ marginTop: 0, textAlign: 'center', textDecoration: 'underline' }}>
                      {t('this_month')}
                    </h5>
                    <h5 style={{ marginTop: 0, textAlign: 'center' }}> {t('previous')} </h5>
                    <h5 style={{ marginTop: -5, textAlign: 'center', marginLeft: -5 }}> {t('month')} </h5>
                  </>
                }
              ></Card>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row style={{ height: '35vh', overflowY: AbsentData?.length > 10 ? 'scroll' : 'auto' }}>
        <Col span={24}>
          {map(AbsentData, (item, index: number) => (
            <Row gutter={0} style={{ borderTop: '1px solid grey' }}>
              <Col
                span={24}
                style={{ borderBottom: '1px solid grey', backgroundColor: index % 2 === 0 ? '#EBF5FB' : '' }}
              >
                <Row gutter={0} justify={'end'} style={{ paddingLeft: 2 }}>
                  <Col span={7}>
                    <h5 style={{ textDecoration: 'underline' }}> {item.EmployeeName} </h5>
                  </Col>
                  <Col span={5} style={{ backgroundColor: 'lightgrey' }}>
                    <h5 style={{ textAlign: 'center' }}>{item.Present} </h5>
                    <h5 style={{ textAlign: 'center' }}>{item.Last30DaysPresent} </h5>
                  </Col>
                  <Col span={6}>
                    <h5 style={{ textAlign: 'center' }}>{item.Absent} </h5>
                    <h5 style={{ textAlign: 'center' }}>{item.Last30DaysAbsent} </h5>
                  </Col>
                  <Col span={6} style={{ backgroundColor: 'orange' }}>
                    <h5 style={{ textAlign: 'center' }}> {item.ThisMonthLate} </h5>
                    <h5 style={{ textAlign: 'center' }}> {item.Last30DaysLate} </h5>
                  </Col>
                </Row>
              </Col>
            </Row>
          ))}
        </Col>
      </Row>
    </>
  );
}

export default AbsentReport;
interface Props {
  AbsentData: any;
}
