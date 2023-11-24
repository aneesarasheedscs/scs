import { Col, Row, Tabs, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import SaleOrderTable from './table';
import SaleOrderForm from './forms';
import { AppHeader } from '@scs/ui';
import { useState } from 'react';
const { Title, Text } = Typography;
function SaleOrder() {
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>();
  const [activeTab, setActiveTab] = useState<string>('1'); // '1' for history tab, '2' for form tab
  const { t } = useTranslation();

  return (
    <>
      <Row gutter={[24, 24]} style={{ marginBottom: '10px' }}>
        <Col xs={24} md={12} lg={8} style={{ marginLeft: '15px' }}>
          <Text style={{ fontSize: '20px' }}>{t('Sale Order')}</Text>
        </Col>
      </Row>

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
          { key: '2', label: t('form'), children: <SaleOrderForm selectedRecordId={selectedRecordId} /> },
          //selectedRecordId={selectedRecordId}
        ]}
      />
    </>
  );
}

export default SaleOrder;
