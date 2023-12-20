import { Card, Tabs, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import './style.scss';
import ContraVoucherForm from './form';
import { useState } from 'react';
import ContraVoucherTable from './table/contraVoucherTable';

function ContraVoucher() {
  const { t } = useTranslation();
  const [selectedRecordId, setSelectedRecordId] = useState<null | string>();
  const [activeTab, setActiveTab] = useState<string>('1');

  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <>
      <Card style={{ background: 'transparent', marginLeft: '-1%', marginTop: '-2%' }}>
        <h2 style={{ textAlign: 'center' }}>{t('contra_voucher')}</h2>
        <Tabs
          type="card"
          size="large"
          activeKey={activeTab}
          className="tabs-margin-bottom-0"
          onChange={(key) => setActiveTab(key)}
        >
          <Tabs.TabPane key="1" tab={t('history')}>
            <ContraVoucherTable setSelectedRecordId={setSelectedRecordId} setActiveTab={setActiveTab} />
          </Tabs.TabPane>
          <Tabs.TabPane key="2" tab={t('form')}>
            <ContraVoucherForm selectedRecordId={selectedRecordId} />
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </>
  );
}
export default ContraVoucher;
