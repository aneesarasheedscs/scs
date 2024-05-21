import { Card, Col, Row, Tabs } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PresentReport from './EmployessData/PresentReport';

function AttendanceReportByAll() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>('1');
  const handleReport = (e: any) => {
    console.log(e.target.innerText);
  };
  return (
    <>
      <Row style={{ marginTop: '20%' }}>
        <Col span={24}>
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
        <Col span={24}>
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

export default AttendanceReportByAll;
