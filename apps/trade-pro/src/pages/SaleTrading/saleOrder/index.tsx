import { Card, Col, Row, Tabs, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import SaleOrderTable from './table';
import SaleOrderForm from './forms';
import { AppHeader } from '@scs/ui';
import { useState } from 'react';
import './style.scss';

const { Title, Text } = Typography;
function SaleOrder() {
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>('1'); // '1' for history tab, '2' for form tab
  const { t } = useTranslation();

  return (
    <>
      <Card style={{ background: 'transparent', marginLeft: '-1%', marginTop: '-2%' }}>
        <h2 style={{ textAlign: 'center' }}>{t('sale_order')}</h2>

        <Tabs
          type="card"
          size="large"
          activeKey={activeTab}
          className="tabs-margin-bottom-0"
          onChange={(key) => setActiveTab(key)}
          // defaultActiveKey="1"
          items={[
            {
              key: '1',
              label: t('history'),
              children: <SaleOrderTable setSelectedRecordId={setSelectedRecordId} setActiveTab={setActiveTab} />,
            },
            {
              key: '2',
              label: t('form'),
              children: <SaleOrderForm selectedRecordId={selectedRecordId} setSelectedRecordId={setSelectedRecordId} />,
            },
          ]}
        />
      </Card>
    </>
  );
}

export default SaleOrder;
