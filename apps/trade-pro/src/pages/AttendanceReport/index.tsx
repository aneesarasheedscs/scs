import { Card, Col, Form, Row, theme } from 'antd';
import React, { useEffect } from 'react';
import './styles.scss';
import { AntDatePicker, AntInput, BackButton } from '@tradePro/components';
import { useTranslation } from 'react-i18next';
import { FormRowGutter } from '@tradePro/globalAtoms';
import { TAttendanceReport } from './types';
import dayjs from 'dayjs';
import AttendanceReportByAll from './AttendanceReportByAll';
import AttendanceReportByDepartment from './AttendanceReportByDepartment';

const { useForm, useWatch } = Form;
function AttendanceReports() {
  const { t } = useTranslation();
  const [form] = useForm<TAttendanceReport>();
  const formValues = useWatch<TAttendanceReport>([], form);
  const onFinish = (values: TAttendanceReport) => {
    console.log(values);
  };
  useEffect(() => {
    form.setFieldValue('FromDate', dayjs(new Date()));
    form.setFieldValue('TotalTeam', 58);
  });
  const {
    token: { colorPrimary },
  } = theme.useToken();
  return (
    <>
      <Row justify={'space-around'} align={'middle'}>
        <Col span={23} style={{ backgroundColor: '#fff' }}>
          <Row justify={'space-between'}>
            <Col xs={15} sm={12} md={9} lg={9} xl={7} xxl={4}>
              <h1 className="report_heading" style={{ textAlign: 'center' }}>
                {t('attendance_report')}
              </h1>
            </Col>
            <Col xxl={1} xl={1} md={2} lg={2} sm={2} xs={2} style={{ marginRight: '30px', marginTop: 10 }}>
              <BackButton goToDashboard={false} />
            </Col>
          </Row>
        </Col>
        <Col span={23} style={{ backgroundColor: '#fff' }}>
          <Card bordered={false} style={{ height: '80vh' }}>
            <Row>
              <Col span={10}>
                <Form form={form} onFinish={onFinish} layout="horizontal" style={{ marginBottom: 0 }}>
                  <Row gutter={FormRowGutter} justify={'space-between'}>
                    <Col xxl={18}>
                      <Row gutter={FormRowGutter} justify={'space-between'}>
                        <Col className="formfield">
                          <AntDatePicker name="FromDate" label="FromDate" bordered={false} />
                        </Col>

                        <Col span={10} className="formfield">
                          <AntInput label="Total Team" name="TotalTeam" bordered={false} />
                        </Col>
                      </Row>
                    </Col>
                    <Col span={18}>
                      <Row justify={'space-between'} gutter={0} style={{ marginTop: 10 }}>
                        <Col span={11}>
                          <Card
                            style={{ height: '12vh' }}
                            cover={
                              <>
                                <div className="month_card">
                                  <h4
                                    style={{
                                      backgroundColor: colorPrimary,
                                      padding: 5,
                                      textAlign: 'center',
                                      color: '#ffff',
                                      borderTopLeftRadius: 5,
                                      borderTopRightRadius: 5,
                                      marginBottom: 5,
                                    }}
                                  >
                                    This Month
                                  </h4>
                                  <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                                    <p>Total Days </p>
                                    <p>21 </p>
                                  </Row>
                                  <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                                    <p>Holi + Reset </p>
                                    <p>3 </p>
                                  </Row>
                                  <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                                    <p> Working Days</p>
                                    <p> 18 </p>
                                  </Row>
                                </div>
                              </>
                            }
                          ></Card>
                        </Col>
                        <Col span={11}>
                          <Card
                            style={{ height: '12vh' }}
                            cover={
                              <>
                                <div className="month_card">
                                  <h4
                                    style={{
                                      backgroundColor: colorPrimary,
                                      padding: 5,
                                      textAlign: 'center',
                                      color: '#ffff',
                                      borderTopLeftRadius: 5,
                                      borderTopRightRadius: 5,
                                      marginBottom: 5,
                                    }}
                                  >
                                    Previous Month
                                  </h4>
                                  <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                                    <p>Total Days </p>
                                    <p>30 </p>
                                  </Row>
                                  <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                                    <p>Holi + Reset </p>
                                    <p>5</p>
                                  </Row>
                                  <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                                    <p> Working Days</p>
                                    <p> 25 </p>
                                  </Row>
                                </div>
                              </>
                            }
                          ></Card>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={23}>
                      <AttendanceReportByAll />
                    </Col>
                  </Row>
                </Form>
              </Col>

              <Col span={14}>
                <AttendanceReportByDepartment />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default AttendanceReports;
