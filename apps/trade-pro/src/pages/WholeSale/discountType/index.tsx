import React, { useState } from 'react';
import DiscountTypeForm from './form/discountTypeForm';
import DiscountTypeTable from './table/DiscountTypeHistory';
import { Card } from 'antd';
import { useTranslation } from 'react-i18next';

function DiscountTypes() {
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null);

  const { t } = useTranslation();
  return (
    <>
      <h2 className="form-heading"> {t('discount_type')} </h2>
      <Card>
        <DiscountTypeForm selectedRecordId={selectedRecordId} setSelectedRecordId={setSelectedRecordId} />
        <DiscountTypeTable setSelectedRecordId={setSelectedRecordId} />
      </Card>
    </>
  );
}

export default DiscountTypes;
