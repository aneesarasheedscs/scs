import { Card, Col, Row, Tabs, theme } from 'antd';
import React, { useState } from 'react';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import PresentReport from './EmployessData/PresentReport';
function AttendanceReportByDepartment() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>('1');
  const {
    token: { colorPrimary },
  } = theme.useToken();
  return (
    <>
      <Row gutter={[8, 6]} style={{ marginTop: 10 }}>
        <Col span={6}>
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
                    <p> Accounts</p>
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
        <Col span={6}>
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
        <Col span={6}>
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
        <Col span={6}>
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
        <Col span={6}>
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
        <Col span={6}>
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
      </Row>
      <Row style={{ marginTop: 10 }}>
        <Col span={18}>
          <Card
            style={{ height: '4vh', backgroundColor: 'purple' }}
            // onClick={(e) => handleReport(e)}
            cover={
              <>
                <h5 style={{ marginTop: 8, textAlign: 'center', color: '#ffff' }}>
                  {activeTab === '1' ? 'Present' : activeTab === '2' ? 'Absent' : activeTab === '3' ? 'Late' : ''}
                </h5>
              </>
            }
          ></Card>
        </Col>
        <Col span={18}>
          <Tabs
            type="card"
            size="large"
            activeKey={activeTab}
            className="tabs-margin-bottom-0"
            onChange={(key) => setActiveTab(key)}
          >
            <Tabs.TabPane key="1" tab={t('present')}>
              <PresentReport />
              {/* <PurchaseOrderTable setSelectedRecordId={setSelectedRecordId} setActiveTab={setActiveTab} /> */}
            </Tabs.TabPane>
            <Tabs.TabPane key="2" tab={t('absent')}>
              {/* <PurchaseOrderForm selectedRecordId={selectedRecordId} setSelectedRecordId={setSelectedRecordId} /> */}
            </Tabs.TabPane>
            <Tabs.TabPane key="3" tab={t('late')}>
              {/* <PurchaseOrderForm selectedRecordId={selectedRecordId} setSelectedRecordId={setSelectedRecordId} /> */}
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>
    </>
  );
}

export default AttendanceReportByDepartment;
