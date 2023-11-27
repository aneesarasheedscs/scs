import { Card, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import './style.scss';
import { useState } from 'react';
import MainForm from './form';
import CustomerDiscountPolicyTable from './table/CustomerDiscountPolicy';

function CustomerDiscountPolicy() {
  const { t } = useTranslation();
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>();

  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <>
      <Card style={{ background: 'transparent', marginLeft: '-1%', marginTop: '-2%' }}>
        <h2 className="form-heading">{t('customer_discount_policy')}</h2>
        <MainForm selectedRecordId={selectedRecordId} />
        <CustomerDiscountPolicyTable setSelectedRecordId={setSelectedRecordId} />
      </Card>
    </>
  );
}
export default CustomerDiscountPolicy;
