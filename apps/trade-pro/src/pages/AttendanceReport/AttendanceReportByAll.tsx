import { Button, Card, Col, Row, Tabs, theme } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PresentReport from './EmployessData/PresentReport';
import AbsentReport from './EmployessData/AbsentReport';
import LateReport from './EmployessData/LateReport';
import { DownOutlined } from '@ant-design/icons';
import { useGetMenualAttendanceStatusByDate, useGetMenualAttendanceSummaryStatusByAll } from './queries';
interface Props {
  startDate: Date;
}
function AttendanceReportByAll({ startDate }: Props) {
  const { t } = useTranslation();
  const { data, isSuccess } = useGetMenualAttendanceStatusByDate(startDate);
  const { data: attendanceStatus } = useGetMenualAttendanceSummaryStatusByAll(startDate);
  const PresentData = attendanceStatus?.data?.Data?.Result?.filter((item: any) => item.TodayPresent === 'Present');
  const AbsentData = attendanceStatus?.data?.Data?.Result?.filter((item: any) => item.TodayAbsent === 'Absent');
  const LateData = attendanceStatus?.data?.Data?.Result?.filter((item: any) => item.TodayLate === 'LateComer');

  const [activeTab, setActiveTab] = useState<string>('1');
  const [caption, setCaption] = useState<string>('Present');
  const handleReport = (e: any) => {
    console.log(e.target);
    console.log(e.target.innerText);
    console.log(e.target.id);
    setCaption(e.target.id);
  };
  const {
    token: { colorPrimary },
  } = theme.useToken();
  return (
    <>
      <Row style={{ marginTop: '31.5%', marginBottom: 10 }}>
        <Col span={24}>
          <Row justify={'end'} style={{ marginBottom: 5 }}>
            <Col span={7}>
              <Card
                bordered={false}
                onClick={(e) => handleReport(e)}
                style={{
                  height: '6vh',
                  borderRadius: 0,
                  borderTopLeftRadius: 10,

                  background: colorPrimary,
                }}
                cover={
                  <>
                    <h4 style={{ padding: 10, paddingTop: 15 }}> {caption} </h4>
                  </>
                }
              ></Card>
            </Col>
            <Col span={5}>
              <Card
                id="Present"
                bordered={false}
                onClick={(e) => handleReport(e)}
                style={{ height: '6vh', borderRadius: 0, cursor: 'pointer', background: 'lightgrey' }}
                cover={
                  <>
                    <h5 style={{ marginTop: 0, textAlign: 'center' }}> {t('present')} </h5>
                    <h5 style={{ marginTop: 0, textAlign: 'center' }}>
                      {data ? data?.data?.Data?.Result?.[0]?.TotalPresent : 0}
                    </h5>
                    <h5
                      style={{
                        textAlign: 'center',
                        height: 20,

                        background: 'green',
                        color: '#fff',
                      }}
                    >
                      <Button
                        id="Present"
                        style={{ height: 20, backgroundColor: 'green', border: 'none' }}
                        icon={
                          <DownOutlined
                            style={{
                              color: '#fff',
                              fontSize: 14,
                              position: 'absolute',
                              top: 3,
                              left: 8,
                            }}
                          />
                        }
                      ></Button>
                    </h5>
                  </>
                }
              ></Card>
            </Col>
            <Col span={6}>
              <Card
                id="Absent"
                bordered={false}
                onClick={(e) => handleReport(e)}
                style={{ height: '6vh', borderRadius: 0, cursor: 'pointer', background: '#eeee' }}
                cover={
                  <>
                    <h5 style={{ marginTop: 0, textAlign: 'center' }}> {t('absent')} </h5>
                    <h5 style={{ marginTop: 0, textAlign: 'center' }}>
                      {data ? data?.data?.Data?.Result?.[0]?.TotalAbsents : 0}
                    </h5>
                    <h5
                      style={{
                        textAlign: 'center',
                        height: 20,

                        background: 'green',
                        color: '#fff',
                      }}
                    >
                      <Button
                        id="Absent"
                        style={{ height: 20, backgroundColor: 'green', border: 'none' }}
                        icon={
                          <DownOutlined
                            style={{
                              color: '#fff',
                              fontSize: 14,
                              position: 'absolute',
                              top: 3,
                              left: 8,
                            }}
                          />
                        }
                      ></Button>
                    </h5>
                  </>
                }
              ></Card>
            </Col>
            <Col span={6}>
              <Card
                bordered={false}
                onClick={(e) => handleReport(e)}
                style={{
                  height: '6vh',
                  borderRadius: 0,
                  borderTopRightRadius: 10,
                  cursor: 'pointer',
                  background: 'orange',
                }}
                cover={
                  <>
                    <h5 style={{ marginTop: 0, textAlign: 'center' }}> {t('late')} </h5>
                    <h5 style={{ marginTop: 0, textAlign: 'center' }}>
                      {' '}
                      {data ? data?.data?.Data?.Result?.[0]?.TotalLate : 0}{' '}
                    </h5>
                    <h5
                      style={{
                        textAlign: 'center',
                        height: 20,

                        background: 'green',
                        color: '#fff',
                      }}
                    >
                      <Button
                        id="Late"
                        style={{ height: 20, backgroundColor: 'green', border: 'none' }}
                        icon={
                          <DownOutlined
                            style={{
                              color: '#fff',
                              fontSize: 14,
                              position: 'absolute',
                              top: 3,
                              left: 8,
                            }}
                          />
                        }
                      ></Button>
                    </h5>
                  </>
                }
              ></Card>
            </Col>
          </Row>
          {caption === 'Present' ? (
            <PresentReport PresentData={PresentData} />
          ) : caption === 'Absent' ? (
            <AbsentReport AbsentData={AbsentData} />
          ) : caption === 'Late' ? (
            <LateReport LateData={LateData} />
          ) : (
            ''
          )}
        </Col>
      </Row>
    </>
  );
}

export default AttendanceReportByAll;
