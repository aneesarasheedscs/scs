import { Button, Card, Col, Row, Tabs, theme } from 'antd';
import React, { useState } from 'react';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import { DownOutlined } from '@ant-design/icons';

import {
  useGetMenualAttendanceStatusByDepartmentWise,
  useGetMenualAttendanceSummaryStatusByDepartment,
} from './queries';
import { map } from 'lodash';
import PresentReport from './EmployessDataByDepartment/PresentReport';
import AbsentReport from './EmployessDataByDepartment/AbsentReport';
import LateReport from './EmployessDataByDepartment/LateReport';

interface TProps {
  startDate: Date;
}
function AttendanceReportByDepartment({ startDate }: TProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>('1');
  const [departmentId, setDepartmentId] = useState<number>();
  const { data } = useGetMenualAttendanceStatusByDepartmentWise(startDate);
  const { data: departmentsData } = useGetMenualAttendanceSummaryStatusByDepartment(startDate, departmentId);
  const departmentDatawise = data?.data?.Data?.Result;
  const departmentData = departmentsData?.data?.Data?.Result;

  const PresentData = departmentData?.filter((item: any) => item.TodayPresent === 'Present');
  const AbsentData = departmentData?.filter((item: any) => item.TodayAbsent === 'Absent');
  const LateData = departmentData?.filter((item: any) => item.TodayLate === 'LateComer');
  const [caption, setCaption] = useState<string>('Present');
  const handleReport = (e: any) => {
    console.log(e.target);
    console.log(e.target.innerText);
    console.log(e.target.id);
    setCaption(e.target.id);
  };
  const dumydata = 12;
  const {
    token: { colorPrimary },
  } = theme.useToken();
  return (
    <>
      <Row
        gutter={[8, 8]}
        style={{ marginTop: -2, border: ' ', height: '29vh', overflow: dumydata <= 12 ? 'hidden' : 'scroll' }}
      >
        {map(departmentDatawise, (item) => (
          <Col span={4}>
            <Card
              style={{ height: '14vh' }}
              cover={
                <>
                  <div className="departement_card">
                    <h4
                      style={{
                        backgroundColor: colorPrimary,
                        padding: 5,
                        textAlign: 'center',
                        color: '#ffff',
                        borderTopLeftRadius: 5,
                        borderTopRightRadius: 5,
                        marginBottom: 5,
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <p> {item.DepartmentName}</p>
                      <h4>
                        <ArrowRightOutlined size={24} onClick={() => setDepartmentId(item.DepartmentId)} />
                      </h4>
                    </h4>
                    <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                      <p>Present </p>
                      <p>{item.TotalPresent} </p>
                    </Row>
                    <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                      <p>Absent </p>
                      <p> {item.TotalAbsent} </p>
                    </Row>
                    <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                      <p> Late </p>
                      <p> {item.TotalLate} </p>
                    </Row>
                    <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                      <p> Total </p>
                      <p> {item.TotalLate + item.TotalAbsent + item.TotalPresent} </p>
                    </Row>
                  </div>
                </>
              }
            ></Card>
          </Col>
        ))}

        {/* <Col span={4}>
          <Card
            style={{ height: '14vh' }}
            cover={
              <>
                <div className="departement_card">
                  <h4
                    style={{
                      backgroundColor: colorPrimary,
                      padding: 5,
                      textAlign: 'center',
                      color: '#ffff',
                      borderTopLeftRadius: 5,
                      borderTopRightRadius: 5,
                      marginBottom: 5,
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <p> Civil & Others </p>
                    <h4>
                      <ArrowRightOutlined size={24} />
                    </h4>
                  </h4>
                  <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <p>Present </p>
                    <p>4</p>
                  </Row>
                  <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <p>Absent </p>
                    <p>0</p>
                  </Row>
                  <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <p> Late </p>
                    <p> 0 </p>
                  </Row>
                  <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <p> Total </p>
                    <p> 4 </p>
                  </Row>
                </div>
              </>
            }
          ></Card>
        </Col>
        <Col span={4}>
          <Card
            style={{ height: '14vh' }}
            cover={
              <>
                <div className="departement_card">
                  <h4
                    style={{
                      backgroundColor: colorPrimary,
                      padding: 5,
                      textAlign: 'center',
                      color: '#ffff',
                      borderTopLeftRadius: 5,
                      borderTopRightRadius: 5,
                      marginBottom: 5,
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <p> Civil & Others </p>
                    <h4>
                      <ArrowRightOutlined size={24} />
                    </h4>
                  </h4>
                  <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <p>Present </p>
                    <p>4</p>
                  </Row>
                  <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <p>Absent </p>
                    <p>0</p>
                  </Row>
                  <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <p> Late </p>
                    <p> 0 </p>
                  </Row>
                  <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <p> Total </p>
                    <p> 4 </p>
                  </Row>
                </div>
              </>
            }
          ></Card>
        </Col>
        <Col span={4}>
          <Card
            style={{ height: '14vh' }}
            cover={
              <>
                <div className="departement_card">
                  <h4
                    style={{
                      backgroundColor: colorPrimary,
                      padding: 5,
                      textAlign: 'center',
                      color: '#ffff',
                      borderTopLeftRadius: 5,
                      borderTopRightRadius: 5,
                      marginBottom: 5,
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <p> Civil & Others </p>
                    <h4>
                      <ArrowRightOutlined size={24} />
                    </h4>
                  </h4>
                  <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <p>Present </p>
                    <p>4</p>
                  </Row>
                  <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <p>Absent </p>
                    <p>0</p>
                  </Row>
                  <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <p> Late </p>
                    <p> 0 </p>
                  </Row>
                  <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <p> Total </p>
                    <p> 4 </p>
                  </Row>
                </div>
              </>
            }
          ></Card>
        </Col>
        <Col span={4}>
          <Card
            style={{ height: '14vh' }}
            cover={
              <>
                <div className="departement_card">
                  <h4
                    style={{
                      backgroundColor: colorPrimary,
                      padding: 5,
                      textAlign: 'center',
                      color: '#ffff',
                      borderTopLeftRadius: 5,
                      borderTopRightRadius: 5,
                      marginBottom: 5,
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <p> Civil & Others </p>
                    <h4>
                      <ArrowRightOutlined size={24} />
                    </h4>
                  </h4>
                  <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <p>Present </p>
                    <p>4</p>
                  </Row>
                  <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <p>Absent </p>
                    <p>0</p>
                  </Row>
                  <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <p> Late </p>
                    <p> 0 </p>
                  </Row>
                  <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <p> Total </p>
                    <p> 4 </p>
                  </Row>
                </div>
              </>
            }
          ></Card>
        </Col>
        <Col span={4}>
          <Card
            style={{ height: '14vh' }}
            cover={
              <>
                <div className="departement_card">
                  <h4
                    style={{
                      backgroundColor: colorPrimary,
                      padding: 5,
                      textAlign: 'center',
                      color: '#ffff',
                      borderTopLeftRadius: 5,
                      borderTopRightRadius: 5,
                      marginBottom: 5,
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <p> Civil & Others </p>
                    <h4>
                      <ArrowRightOutlined size={24} />
                    </h4>
                  </h4>
                  <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <p>Present </p>
                    <p>4</p>
                  </Row>
                  <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <p>Absent </p>
                    <p>0</p>
                  </Row>
                  <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <p> Late </p>
                    <p> 0 </p>
                  </Row>
                  <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <p> Total </p>
                    <p> 4 </p>
                  </Row>
                </div>
              </>
            }
          ></Card>
        </Col>
        <Col span={4}>
          <Card
            style={{ height: '14vh' }}
            cover={
              <>
                <div className="departement_card">
                  <h4
                    style={{
                      backgroundColor: colorPrimary,
                      padding: 5,
                      textAlign: 'center',
                      color: '#ffff',
                      borderTopLeftRadius: 5,
                      borderTopRightRadius: 5,
                      marginBottom: 5,
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <p> Civil & Others </p>
                    <h4>
                      <ArrowRightOutlined size={24} />
                    </h4>
                  </h4>
                  <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <p>Present </p>
                    <p>4</p>
                  </Row>
                  <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <p>Absent </p>
                    <p>0</p>
                  </Row>
                  <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <p> Late </p>
                    <p> 0 </p>
                  </Row>
                  <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <p> Total </p>
                    <p> 4 </p>
                  </Row>
                </div>
              </>
            }
          ></Card>
        </Col>
        <Col span={4}>
          <Card
            style={{ height: '14vh' }}
            cover={
              <>
                <div className="departement_card">
                  <h4
                    style={{
                      backgroundColor: colorPrimary,
                      padding: 5,
                      textAlign: 'center',
                      color: '#ffff',
                      borderTopLeftRadius: 5,
                      borderTopRightRadius: 5,
                      marginBottom: 5,
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <p> Civil & Others </p>
                    <h4>
                      <ArrowRightOutlined size={24} />
                    </h4>
                  </h4>
                  <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <p>Present </p>
                    <p>4</p>
                  </Row>
                  <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <p>Absent </p>
                    <p>0</p>
                  </Row>
                  <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <p> Late </p>
                    <p> 0 </p>
                  </Row>
                  <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <p> Total </p>
                    <p> 4 </p>
                  </Row>
                </div>
              </>
            }
          ></Card>
        </Col>
        <Col span={4}>
          <Card
            style={{ height: '14vh' }}
            cover={
              <>
                <div className="departement_card">
                  <h4
                    style={{
                      backgroundColor: colorPrimary,
                      padding: 5,
                      textAlign: 'center',
                      color: '#ffff',
                      borderTopLeftRadius: 5,
                      borderTopRightRadius: 5,
                      marginBottom: 5,
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <p> Civil & Others </p>
                    <h4>
                      <ArrowRightOutlined size={24} />
                    </h4>
                  </h4>
                  <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <p>Present </p>
                    <p>4</p>
                  </Row>
                  <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <p>Absent </p>
                    <p>0</p>
                  </Row>
                  <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <p> Late </p>
                    <p> 0 </p>
                  </Row>
                  <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <p> Total </p>
                    <p> 4 </p>
                  </Row>
                </div>
              </>
            }
          ></Card>
        </Col>
        <Col span={4}>
          <Card
            style={{ height: '14vh' }}
            cover={
              <>
                <div className="departement_card">
                  <h4
                    style={{
                      backgroundColor: colorPrimary,
                      padding: 5,
                      textAlign: 'center',
                      color: '#ffff',
                      borderTopLeftRadius: 5,
                      borderTopRightRadius: 5,
                      marginBottom: 5,
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <p> Civil & Others </p>
                    <h4>
                      <ArrowRightOutlined size={24} />
                    </h4>
                  </h4>
                  <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <p>Present </p>
                    <p>4</p>
                  </Row>
                  <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <p>Absent </p>
                    <p>0</p>
                  </Row>
                  <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <p> Late </p>
                    <p> 0 </p>
                  </Row>
                  <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <p> Total </p>
                    <p> 4 </p>
                  </Row>
                </div>
              </>
            }
          ></Card>
        </Col>
        <Col span={4}>
          <Card
            style={{ height: '14vh' }}
            cover={
              <>
                <div className="departement_card">
                  <h4
                    style={{
                      backgroundColor: colorPrimary,
                      padding: 5,
                      textAlign: 'center',
                      color: '#ffff',
                      borderTopLeftRadius: 5,
                      borderTopRightRadius: 5,
                      marginBottom: 5,
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <p> Civil & Others </p>
                    <h4>
                      <ArrowRightOutlined size={24} />
                    </h4>
                  </h4>
                  <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <p>Present </p>
                    <p>4</p>
                  </Row>
                  <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <p>Absent </p>
                    <p>0</p>
                  </Row>
                  <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <p> Late </p>
                    <p> 0 </p>
                  </Row>
                  <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <p> Total </p>
                    <p> 4 </p>
                  </Row>
                </div>
              </>
            }
          ></Card>
        </Col>
        <Col span={4}>
          <Card
            style={{ height: '14vh' }}
            cover={
              <>
                <div className="departement_card">
                  <h4
                    style={{
                      backgroundColor: colorPrimary,
                      padding: 5,
                      textAlign: 'center',
                      color: '#ffff',
                      borderTopLeftRadius: 5,
                      borderTopRightRadius: 5,
                      marginBottom: 5,
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <p> Civil & Others </p>
                    <h4>
                      <ArrowRightOutlined size={24} />
                    </h4>
                  </h4>
                  <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <p>Present </p>
                    <p>4</p>
                  </Row>
                  <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <p>Absent </p>
                    <p>0</p>
                  </Row>
                  <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <p> Late </p>
                    <p> 0 </p>
                  </Row>
                  <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <p> Total </p>
                    <p> 4 </p>
                  </Row>
                </div>
              </>
            }
          ></Card>
        </Col>
        <Col span={4}>
          <Card
            style={{ height: '14vh' }}
            cover={
              <>
                <div className="departement_card">
                  <h4
                    style={{
                      backgroundColor: colorPrimary,
                      padding: 5,
                      textAlign: 'center',
                      color: '#ffff',
                      borderTopLeftRadius: 5,
                      borderTopRightRadius: 5,
                      marginBottom: 5,
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <p> Civil & Others </p>
                    <h4>
                      <ArrowRightOutlined size={24} />
                    </h4>
                  </h4>
                  <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <p>Present </p>
                    <p>4</p>
                  </Row>
                  <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <p>Absent </p>
                    <p>0</p>
                  </Row>
                  <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <p> Late </p>
                    <p> 0 </p>
                  </Row>
                  <Row justify={'space-between'} style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <p> Total </p>
                    <p> 4 </p>
                  </Row>
                </div>
              </>
            }
          ></Card>
        </Col> */}
      </Row>
      <Row style={{ marginTop: 10 }}>
        <Col span={18}>
          <Row style={{ marginTop: '0%' }}>
            <Col span={24}>
              <Row justify={'end'} style={{ marginBottom: 5 }}>
                <Col span={7}>
                  <Card
                    id="Present"
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
                    id="Absent"
                    bordered={false}
                    onClick={(e) => handleReport(e)}
                    style={{ height: '6vh', borderRadius: 0, cursor: 'pointer', background: 'lightgrey' }}
                    cover={
                      <>
                        <h5 style={{ marginTop: 0, textAlign: 'center' }}> Present</h5>
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
                    id="Late"
                    bordered={false}
                    onClick={(e) => handleReport(e)}
                    style={{ height: '6vh', borderRadius: 0, cursor: 'pointer', background: '#eeee' }}
                    cover={
                      <>
                        <h5 style={{ marginTop: 0, textAlign: 'center' }}> Absent</h5>
                        <h5 style={{ marginTop: 0, textAlign: 'center' }}>
                          {' '}
                          {data ? data?.data?.Data?.Result?.[0]?.TotalAbsent : 0}{' '}
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
                        <h5 style={{ marginTop: 0, textAlign: 'center' }}> Late </h5>
                        <h5 style={{ marginTop: 0, textAlign: 'center' }}>
                          {data ? data?.data?.Data?.Result?.[0]?.TotalLate : 0}
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
                {/* <Col span={6}>
              <Card
                onClick={(e) => handleReport(e)}
                style={{ height: '5vh', cursor: 'pointer' }}
                cover={
                  <>
                    <h4 style={{ marginTop: 10, textAlign: 'center' }}> Absent </h4>
                  </>
                }
              ></Card>
            </Col>
            <Col span={6}>
              <Card
                onClick={(e) => handleReport(e)}
                style={{ height: '5vh', cursor: 'pointer' }}
                cover={
                  <>
                    <h4 style={{ marginTop: 10, textAlign: 'center' }}> Late </h4>
                  </>
                }
              ></Card>
            </Col> */}
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
        </Col>
      </Row>
    </>
  );
}

export default AttendanceReportByDepartment;
