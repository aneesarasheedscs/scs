import { Card, Tabs, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import Transportation from './transportation';
import CustomerAddLess from './customerAddLess';
import ItemAddLess from './itemAddorLess';
import DetailInformation from './detailInformation';
import { useForm } from 'antd/es/form/Form';
import '../style.scss';

function TabsPortion() {
  const { t } = useTranslation();
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>();
  const [activeTab, setActiveTab] = useState<string>('1');
  const [form] = useForm<any>();

  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <>
      <h2 className="form-heading">{t('sale_invoice_direct')}</h2>
      <Tabs
        type="card"
        size="large"
        activeKey={activeTab}
        className="tabs-margin-bottom-0"
        onChange={(key) => setActiveTab(key)}
      >
        <Tabs.TabPane key="1" tab={t('detail_information')}>
          <DetailInformation
            form={form}
            // setSelectedRecordId={setSelectedRecordId}
            // setActiveTab={setActiveTab}
          />
        </Tabs.TabPane>
        <Tabs.TabPane key="2" tab={t('transportation')}>
          <Transportation
            form={form}
            // selectedRecordId={selectedRecordId}
          />
        </Tabs.TabPane>
        <Tabs.TabPane key="3" tab={t('customer_add_less')}>
          <CustomerAddLess
            form={form}
            // selectedRecordId={selectedRecordId}
          />
        </Tabs.TabPane>
        <Tabs.TabPane key="4" tab={t('item_add_less')}>
          <ItemAddLess
            form={form}
            // selectedRecordId={selectedRecordId}
          />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
}
export default TabsPortion;
