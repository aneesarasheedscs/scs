import React, { useState } from 'react';
import { Card, Col, Row, Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import EmployeeRegistrationInformation from './EmployeeInformation';

function EmployeeHistory({ form }: any) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>('1');

  return (
    <>
      <Card style={{ marginTop: '-3%' }}>
        <Row style={{ marginLeft: -10 }}>
          <Col xl={24} lg={24} md={24} sm={24} xs={23}>
            <h2 className="form-heading3" style={{ marginBottom: 5 }}>
              Employee History
            </h2>
          </Col>
          <Tabs
            type="card"
            size="large"
            activeKey={activeTab}
            className="tabs-margin-bottom-0"
            onChange={(key) => setActiveTab(key)}
          >
            <Tabs.TabPane key="1" tab="Employee Information">
              <EmployeeRegistrationInformation form={form} />
            </Tabs.TabPane>
            <Tabs.TabPane key="2" tab="Employee Salary"></Tabs.TabPane>
            <Tabs.TabPane key="3" tab="Benefits"></Tabs.TabPane>
            <Tabs.TabPane key="4" tab="Week Days"></Tabs.TabPane>
          </Tabs>
        </Row>
      </Card>
    </>
  );
}

export default EmployeeHistory;
