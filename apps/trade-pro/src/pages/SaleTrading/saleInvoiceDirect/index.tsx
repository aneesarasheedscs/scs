import { Card, Tabs, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import './style.scss';
import { useState } from 'react';
import SaleInvoiceTable from './table/saleInvoiceTable';
import SaleInvoice from './form';

function SaleInvoiceDirect() {
  const { t } = useTranslation();
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>();
  const [activeTab, setActiveTab] = useState<string>('1');

  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <>
      <div style={{ background: 'transparent', marginLeft: '2%' }}>
        <h2 className="form-heading">{t('sale_invoice_direct')}</h2>
        <Tabs
          type="card"
          size="large"
          activeKey={activeTab}
          className="tabs-margin-bottom-0"
          onChange={(key) => setActiveTab(key)}
        >
          <Tabs.TabPane key="1" tab={t('history')}>
            <SaleInvoiceTable setSelectedRecordId={setSelectedRecordId} setActiveTab={setActiveTab} />
          </Tabs.TabPane>
          <Tabs.TabPane key="2" tab={t('form')}>
            <SaleInvoice selectedRecordId={selectedRecordId} />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </>
  );
}
export default SaleInvoiceDirect;
