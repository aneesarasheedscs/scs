import './style.scss';
import { useState } from 'react';
import CashReceiptVoucherForm from './form';
import { useTranslation } from 'react-i18next';
import { Card, Col, Row, Tabs, theme } from 'antd';
import CashReceiptTable from './table/cashReceiptVoucher';

function CashReceiptVoucher() {
  const { t } = useTranslation();
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>();
  const [activeTab, setActiveTab] = useState<string>('1');

  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <>
      <Row style={{ background: '' }}>
        <Col span={24}>
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
        </Col>
      </Row>
    </>
  );
}
export default CashReceiptVoucher;
