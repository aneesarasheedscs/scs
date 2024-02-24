import { Tabs } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './style.scss';
import StockAdjustmentTable from './table/StockAdjustmentTable';

function StockAdjustment() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>('1');
  return (
    <>
      <h2 style={{ textAlign: 'center' }}>{t('stock_adjustment')}</h2>

      <Tabs
        type="card"
        size="large"
        activeKey={activeTab}
        className="tabs-margin-bottom-0"
        onChange={(key) => setActiveTab(key)}
      >
        <Tabs.TabPane key="1" tab={t('history')}>
          <StockAdjustmentTable />
        </Tabs.TabPane>
        <Tabs.TabPane key="2" tab={t('form')}></Tabs.TabPane>
      </Tabs>
    </>
  );
}
export default StockAdjustment;
