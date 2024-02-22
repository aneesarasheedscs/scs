import React, { useState } from 'react';
import { Col, Row, Tabs, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import ChequeBookTable from './table/chequeBookRegistrationTable';
import './style.scss';
import ChequeForm from './form';
import ChequeStatusForm from '../chequeBookStatus/form';

function ChequeBookForm() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>('1');

  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <>
      {/* <Row style={{ marginLeft: '' }}>
        <Col span={24}>
          <h2 className="form-heading">{t('cheque_book')}</h2>
          <Tabs
            type="card"
            size="large"
            defaultActiveKey="1"
            className="tabs-margin-bottom-0"
            items={[
              // { key: '1', label: t('form'), children: <ChequeForm /> },
              { key: '2', label: t('history'), children: <ChequeBookTable /> },
              // { key: '3', label: t('cheque_book_status'), children: <ChequeStatusForm /> },
            ]}
          />
        </Col>
      </Row> */}
      <Row style={{ background: '', marginLeft: '2%', marginTop: '0%' }}>
        <Col span={24}>
          <h2 className="form-heading">{t('cheque_book')}</h2>
          <Tabs
            type="card"
            size="large"
            activeKey={activeTab}
            className="tabs-margin-bottom-0"
            onChange={(key) => setActiveTab(key)}
          >
            <Tabs.TabPane key="1" tab={t('form')}>
              <ChequeForm />
            </Tabs.TabPane>
            <Tabs.TabPane key="2" tab={t('history')}>
              <ChequeBookTable />
            </Tabs.TabPane>
            <Tabs.TabPane key="3" tab={t('cheque_book_status')}>
              <ChequeStatusForm />
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>
    </>
  );
}

export default ChequeBookForm;
