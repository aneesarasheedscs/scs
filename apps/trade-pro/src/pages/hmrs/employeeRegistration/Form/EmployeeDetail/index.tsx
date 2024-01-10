import React, { useState } from 'react';
import { Card, Col, Row, Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import AddressDetailForm from './AddressDetail';
import ExperienceForm from './Experience';
import EducationForm from './EducationForm';
import FamilyForm from './FamilyForm';
import ReferenceForm from './ReferenceForm';
import BankAccountForm from './BankAccoutForm';

function EmployeeDetail({ form }: any) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>('1');

  return (
    <>
      <Card style={{ marginTop: '0%', width: '100%' }}>
        <Row style={{ marginLeft: -10 }}>
          <Col xl={24} lg={24} md={24} sm={24} xs={23}>
            <h2 className="form-heading3" style={{ marginBottom: 5 }}>
              {t('employee_detail')}
            </h2>
          </Col>
          <Col xl={24} lg={24} md={24} sm={24} xs={23}>
            <Tabs
              type="card"
              size="large"
              activeKey={activeTab}
              className="tabs-margin-bottom-0"
              onChange={(key) => setActiveTab(key)}
            >
              <Tabs.TabPane key="1" tab={t('address_detail')}>
                <AddressDetailForm form={form} />
              </Tabs.TabPane>
              <Tabs.TabPane key="2" tab={t('experience')}>
                <ExperienceForm form={form} />
              </Tabs.TabPane>
              <Tabs.TabPane key="3" tab={t('education')}>
                <EducationForm form={form} />
              </Tabs.TabPane>
              <Tabs.TabPane key="4" tab={t('family')}>
                <FamilyForm form={form} />
              </Tabs.TabPane>
              <Tabs.TabPane key="5" tab={t('reference')}>
                <ReferenceForm form={form} />
              </Tabs.TabPane>
              <Tabs.TabPane key="6" tab={t('bank_account')}>
                <BankAccountForm form={form} />
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
      </Card>
    </>
  );
}

export default EmployeeDetail;
