import { Card, Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import './style.scss';
import BookingOrderForm from './forms';
import BookingOrderTable from './table';

function BookingOrder() {
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>('1');
  const { t } = useTranslation();

  return (
    <>
      <Card style={{ background: 'transparent', marginLeft: '-1%', marginTop: '-2%' }}>
        <h2 style={{ textAlign: 'center' }}>{t('booking_order')}</h2>

        <Tabs
          type="card"
          size="large"
          activeKey={activeTab}
          className="tabs-margin-bottom-0"
          onChange={(key) => setActiveTab(key)}
          items={[
            {
              key: '1',
              label: t('history'),
              children: <BookingOrderTable setSelectedRecordId={setSelectedRecordId} setActiveTab={setActiveTab} />,
            },
            {
              key: '2',
              label: t('form'),
              children: (
                <BookingOrderForm selectedRecordId={selectedRecordId} setSelectedRecordId={setSelectedRecordId} />
              ),
            },
          ]}
        />
      </Card>
    </>
  );
}

export default BookingOrder;
