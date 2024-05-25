import { BackButton } from '@tradePro/components';
import { Card, Col, Row, Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import './styles.scss';
import { useState } from 'react';
import AccountsPrematureForm from './form';
import AccountsPrematureHistory from './table';

function AccountsPrematureRecipts() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>('1');
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null);
  const [selectedTrackingSlip, setSelectedTrackingSlip] = useState<number | null>(null);

  return (
    <>
      <Row justify={'space-between'} align={'middle'}>
        <Col xs={15} sm={12} md={9} lg={9} xl={7} xxl={5} className="forms-heading-container">
          <h1 className="report_heading" style={{ textAlign: 'center' }}>
            {t('accounts_premature_receipts')}
          </h1>
        </Col>
        <Col xxl={1} xl={1} md={2} lg={2} sm={2} xs={2} style={{ marginRight: '56px' }}>
          <BackButton goToDashboard={false} />
        </Col>
        <Col span={24} style={{ marginLeft: 10 }}>
          <Tabs
            type="card"
            size="large"
            activeKey={activeTab}
            className="tabs-margin-bottom-0"
            onChange={(key) => setActiveTab(key)}
          >
            <Tabs.TabPane key="1" tab={t('history')}>
              <AccountsPrematureHistory
                setSelectedTrackingSlip={setSelectedTrackingSlip}
                setSelectedRecordId={setSelectedRecordId}
                setActiveTab={setActiveTab}
              />
            </Tabs.TabPane>
            <Tabs.TabPane key="2" tab={t('form')}>
              <AccountsPrematureForm
                selectedTrackingSlip={selectedTrackingSlip}
                setSelectedTrackingSlip={setSelectedTrackingSlip}
                selectedRecordId={selectedRecordId}
                setSelectedRecordId={setSelectedRecordId}
              />
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>
    </>
  );
}

export default AccountsPrematureRecipts;
