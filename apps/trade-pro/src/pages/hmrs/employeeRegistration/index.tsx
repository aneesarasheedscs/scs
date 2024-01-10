import React, { useState } from 'react';
import { Tabs, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import EmployeeRegistrationForm from './Form';
import EmployeeHistory from './History';

const { useToken } = theme;

function EmployeeRegistration() {
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const { t } = useTranslation();
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>();
  const [activeTab, setActiveTab] = useState<string>('1'); // '1' for history tab, '2' for form tab

  return (
    <>
      <h2 className="form-heading" style={{ marginBottom: 5 }}>
        {t('employee_registration')}
      </h2>

      <Tabs
        type="card"
        size="large"
        activeKey={activeTab}
        className="tabs-margin-bottom-0"
        onChange={(key) => setActiveTab(key)}
      >
        <Tabs.TabPane key="1" tab={t('history')}>
          <EmployeeHistory />
        </Tabs.TabPane>
        <Tabs.TabPane key="2" tab={t('form')}>
          <EmployeeRegistrationForm />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
}

export default EmployeeRegistration;
