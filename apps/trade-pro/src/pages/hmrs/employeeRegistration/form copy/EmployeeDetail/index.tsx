import React, { useState } from 'react';
import { Card, Col, Row, Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import AddressDetailForm from './AddressDetail';
// import EmployeeRegistrationInformation from './EmployeeInformation';

function EmployeeDetail({ form }: any) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>('1');

  return (
    <>
      <Card style={{ marginTop: '-3%' }}>
        <Row style={{ marginLeft: -10 }}>
          <Col xl={24} lg={24} md={24} sm={24} xs={23}>
            <h2 className="form-heading3" style={{ marginBottom: 5 }}>
              Employee Detail
            </h2>
          </Col>
          <Tabs
            type="card"
            size="large"
            activeKey={activeTab}
            className="tabs-margin-bottom-0"
            onChange={(key) => setActiveTab(key)}
          >
            <Tabs.TabPane key="1" tab="Address Detail">
              <AddressDetailForm form={form} />

              {/* <EmployeeRegistrationInformation form={form} /> */}
            </Tabs.TabPane>
            <Tabs.TabPane key="2" tab="Experience"></Tabs.TabPane>
            <Tabs.TabPane key="3" tab="Education"></Tabs.TabPane>
            <Tabs.TabPane key="4" tab="Family"></Tabs.TabPane>
            <Tabs.TabPane key="5" tab="Reference"></Tabs.TabPane>
            <Tabs.TabPane key="6" tab="Bank Account"></Tabs.TabPane>
          </Tabs>
        </Row>
      </Card>
    </>
  );
}

export default EmployeeDetail;
