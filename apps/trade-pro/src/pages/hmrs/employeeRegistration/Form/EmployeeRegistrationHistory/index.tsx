import React, { useState } from 'react';
import { Card, Col, Row, Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import EmployeeRegistrationInformation from './EmployeeInformation';
import EmployeeSalary from './EmployeeSalary';
import WeekDays from './WeekDays';
import EmployeeBenefits from './Benefits';

function EmployeeHistory({ form }: any) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>('1');

  return (
    <>
      <Card style={{ marginTop: '-3%' }}>
        <Row style={{ marginLeft: -10 }}>
          <Col xl={24} lg={24} md={24} sm={24} xs={23}>
            <h2 className="form-heading3" style={{ marginBottom: 5 }}>
              {t('employee_history')}
            </h2>
          </Col>
          <Tabs
            type="card"
            size="large"
            activeKey={activeTab}
            className="tabs-margin-bottom-0"
            onChange={(key) => setActiveTab(key)}
          >
            <Tabs.TabPane key="1" tab={t('employee_information')}>
              <EmployeeRegistrationInformation form={form} />
            </Tabs.TabPane>
            <Tabs.TabPane key="2" tab={t('employee_salary')}>
              <EmployeeSalary />
            </Tabs.TabPane>
            <Tabs.TabPane key="3" tab={t('benefits')}>
              <EmployeeBenefits />
            </Tabs.TabPane>
            <Tabs.TabPane key="4" tab={t('week_days')}>
              <WeekDays />
            </Tabs.TabPane>
          </Tabs>
        </Row>
      </Card>
    </>
  );
}

export default EmployeeHistory;
