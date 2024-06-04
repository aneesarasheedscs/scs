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
import { useGetMenualAttendanceStatusByDate } from './queries';
import { storedFinancialYear } from '@tradePro/utils/storageService';

const { useForm, useWatch } = Form;

function AttendanceReports() {
  const { t } = useTranslation();
  const financialYear = storedFinancialYear();
  const [form] = useForm<TAttendanceReport>();
  const formValues = useWatch<TAttendanceReport>([], form);
  const startDate = form.getFieldValue('FromDate');

  // const date = new Date(startDate?.toISOString().split('T')[0]);
  // const date = dayjs(startDate).startOf('day');
  const { data, isSuccess } = useGetMenualAttendanceStatusByDate(startDate);
  const onFinish = (values: TAttendanceReport) => {
    console.log(values);
  };
  useEffect(() => {
    form.setFieldValue('FromDate', dayjs(financialYear?.Start_Period));
  }, [form]);
  useEffect(() => {
    if (isSuccess) {
      form.setFieldValue('TotalTeam', data?.data?.Data?.Result?.[0]?.TotalTeam);
    }
  }, [isSuccess]);
  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <>
      <div style={{ backgroundColor: '#fff' }}>
        <Row justify={'space-around'} align={'middle'}>
          <Col span={23}>
            <Row justify={'space-between'}>
              <Col xs={15} sm={8} md={7} lg={7} xl={5} xxl={4}>
                <h1 className="report_heading" style={{ textAlign: 'center' }}>
                  {t('attendance_report')}
                </h1>
              </Col>
              <Col xl={17} xxl={18} lg={13} md={13} sm={10}>
                <Form form={form} onFinish={onFinish} layout="horizontal" style={{ marginBottom: 0 }}>
                  <Row
                    gutter={FormRowGutter}
                    justify={'space-between'}
                    align={'bottom'}
                    style={{ marginLeft: -10, marginTop: 5 }}
                  >
                    <Col xxl={10} xl={15} lg={24} md={24} sm={24}>
                      <Row gutter={FormRowGutter} justify={'space-between'}>
                        <Col className="formfield">
                          <AntDatePicker name="FromDate" label="FromDate" bordered={false} />
                        </Col>

                        <Col xxl={10} xl={10} lg={10} md={10} sm={23} className="formfield">
                          <AntInput label="Total Team" name="TotalTeam" bordered={false} />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Form>
              </Col>
              <Col xxl={1} xl={1} md={2} lg={2} sm={2} xs={2} style={{ marginRight: '30px', marginTop: 10 }}>
                <BackButton goToDashboard={false} />
              </Col>
            </Row>
          </Col>
          <Col span={23} style={{ backgroundColor: '#fff' }}>
            <Card bordered={false} style={{ height: '80vh' }}>
              <Row justify={'space-between'} gutter={[8, 0]}>
                <Col xxl={8} xl={9} lg={16} md={16} sm={24}>
                  <>
                    <Row gutter={FormRowGutter} justify={'space-between'}>
                      {/* <Col xxl={18}>
                      <Row gutter={FormRowGutter} justify={'space-between'}>
                        <Col className="formfield">
                          <AntDatePicker name="FromDate" label="FromDate" bordered={false} />
                        </Col>

                        <Col span={10} className="formfield">
                          <AntInput label="Total Team" name="TotalTeam" bordered={false} />
                        </Col>
                      </Row>
                    </Col> */}
                      <Col xxl={18} xl={20} lg={24} md={24} sm={24}>
                        <Row justify={'space-between'} gutter={0} style={{ marginTop: 0 }}>
                          <Col span={11}>
                            <Card
                              style={{ height: '13vh' }}
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
                                      {t('this_month')}
                                    </h4>
                                    <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                                      <p>Total Days </p>
                                      <p>{data ? data?.data?.Data?.Result?.[0]?.ThisMonthTotalDays : 0} </p>
                                    </Row>
                                    <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                                      <p>Holi + Reset </p>
                                      <p>
                                        {' '}
                                        {data
                                          ? data?.data?.Data?.Result?.[0]?.ThisMonthHoliDays +
                                            data?.data?.Data?.Result?.[0]?.ThisMonthRestDays
                                          : 0}{' '}
                                      </p>
                                    </Row>
                                    <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                                      <p> Working Days</p>
                                      <p> {data ? data?.data?.Data?.Result?.[0]?.ThisMonthWorkingDays : 0} </p>
                                    </Row>
                                  </div>
                                </>
                              }
                            ></Card>
                          </Col>
                          <Col span={11}>
                            <Card
                              style={{ height: '13vh' }}
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
                                      {t('previous_month')}
                                    </h4>
                                    <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                                      <p>Total Days </p>
                                      <p>{data ? data?.data?.Data?.Result?.[0]?.Last30TotalDays : 0} </p>
                                    </Row>
                                    <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                                      <p>Holi + Reset </p>
                                      <p>
                                        {data
                                          ? data?.data?.Data?.Result?.[0]?.Last30HoliDays +
                                            data?.data?.Data?.Result?.[0]?.Last30RestDays
                                          : 0}{' '}
                                      </p>
                                    </Row>
                                    <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                                      <p> Working Days</p>
                                      <p> {data ? data?.data?.Data?.Result?.[0]?.Last30WorkingDays : 0} </p>
                                    </Row>
                                  </div>
                                </>
                              }
                            ></Card>
                          </Col>
                        </Row>
                      </Col>
                      <Col span={24}>
                        <AttendanceReportByAll startDate={startDate} />
                      </Col>
                    </Row>
                  </>
                </Col>

                <Col xxl={16} xl={15} lg={24} md={24} sm={24} style={{}}>
                  <AttendanceReportByDepartment startDate={startDate} />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default AttendanceReports;
