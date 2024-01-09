import { Card, Tabs, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import Main from './DutyRoaster/form';
import './style.scss';
import { useState } from 'react';
import DutyRoasterHistory from './DutyRoaster/table/DutyRoasterTable';

function DutyRoasterForm() {
  const { t } = useTranslation();
  const [selectedRecordId, setSelectedRecordId] = useState<null | string>();
  const [activeTab, setActiveTab] = useState<string>('1');

  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <>
      <h2 style={{ boxShadow: '2px 2px 12px 1px #5a54f9', padding: '0.8%' }} className="form-heading">
        {t('duty_roaster')}
      </h2>
      <Tabs
        type="card"
        size="large"
        activeKey={activeTab}
        className="tabs-margin-bottom-0"
        onChange={(key) => setActiveTab(key)}
      >
        <Tabs.TabPane key="1" tab={t('history')}>
          <DutyRoasterHistory setActiveTab={setActiveTab} setSelectedRecordId={setSelectedRecordId} />
        </Tabs.TabPane>
        <Tabs.TabPane key="2" tab={t('form')}>
          <Main />
          {/* <ContraVoucherForm selectedRecordId={selectedRecordId} /> */}
        </Tabs.TabPane>
      </Tabs>
    </>
  );
}

export default DutyRoasterForm;
