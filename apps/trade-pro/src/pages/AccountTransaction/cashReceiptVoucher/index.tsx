import { Card, Tabs, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import './style.scss';
import { useState } from 'react';
import CashReceiptTable from './table/cashPaymentVoucher';
import CashReceiptVoucherForm from './form';

function CashReceiptVoucher() {
  const { t } = useTranslation();
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>();
  const [activeTab, setActiveTab] = useState<string>('1');

  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <>
      <Card style={{ background: 'transparent', marginLeft: '-1%', marginTop: '-2%' }}>
        <h2 className="form-heading">{t('cash_receipt_voucher')}</h2>
        <Tabs
          type="card"
          size="large"
          activeKey={activeTab}
          className="tabs-margin-bottom-0"
          onChange={(key) => setActiveTab(key)}
        >
          <Tabs.TabPane key="1" tab={t('history')}>
            <CashReceiptTable setSelectedRecordId={setSelectedRecordId} setActiveTab={setActiveTab} />
          </Tabs.TabPane>
          <Tabs.TabPane key="2" tab={t('form')}>
            <CashReceiptVoucherForm selectedRecordId={selectedRecordId} />
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </>
  );
}
export default CashReceiptVoucher;
