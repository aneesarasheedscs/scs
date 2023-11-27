import React, { useState } from 'react';
import { Tabs, theme } from 'antd';
import HistoryTable from './ItemHistoryTable';
import FormFile from './Form';
import './style.scss';
import { useTranslation } from 'react-i18next';

const { useToken } = theme;

function PosDefineItem() {
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const { t } = useTranslation();
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>();
  const [activeTab, setActiveTab] = useState<string>('1'); // '1' for history tab, '2' for form tab

  return (
    <>
      <h2 className="form-heading" style={{ marginBottom: 5, marginTop: -5 }}>
        {t('define_item')}
      </h2>

      <Tabs
        type="card"
        size="large"
        activeKey={activeTab}
        className="tabs-margin-bottom-0"
        onChange={(key) => setActiveTab(key)}
      >
        <Tabs.TabPane key="1" tab={t('history')}>
          <HistoryTable setSelectedRecordId={setSelectedRecordId} setActiveTab={setActiveTab} />
        </Tabs.TabPane>
        <Tabs.TabPane key="2" tab={t('form')}>
          <FormFile selectedRecordId={selectedRecordId} />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
}

export default PosDefineItem;
