import { Tabs } from 'antd';
import PurchaseOrderForm from './form';
import PurchaseOrderTable from './table';

import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import { theme } from 'antd';
const { useToken } = theme;
function PurchaseOrder() {
  const { t } = useTranslation();
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>();
  const [activeTab, setActiveTab] = useState<string>('1');

  return (
    <>
      <h2 className="form-heading"> {t('purchase_order')}</h2>

      <Tabs
        type="card"
        size="large"
        activeKey={activeTab}
        className="tabs-margin-bottom-0"
        onChange={(key) => setActiveTab(key)}
      >
        <Tabs.TabPane key="1" tab={t('history')}>
          <PurchaseOrderTable setSelectedRecordId={setSelectedRecordId} setActiveTab={setActiveTab} />
        </Tabs.TabPane>
        <Tabs.TabPane key="2" tab={t('form')}>
          <PurchaseOrderForm selectedRecordId={selectedRecordId} />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
}

export default PurchaseOrder;
