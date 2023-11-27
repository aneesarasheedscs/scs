import { Card } from 'antd';
import React, { useState } from 'react';
import BrandItemDiscountTypeTable from './table/DiscountTypeHistory';
import BrandItemDiscountTypeForm from './form/BrandItemDiscountTypeForm';
import { useTranslation } from 'react-i18next';

function AllocateBrandItemtoDiscountType() {
  const { t } = useTranslation();
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null);
  return (
    <>
      <h2 className="form-heading"> {t('allocate_brand_item_to_disc_type')} </h2>
      <Card>
        <BrandItemDiscountTypeForm selectedRecordId={selectedRecordId} setSelectedRecordId={setSelectedRecordId} />
        <BrandItemDiscountTypeTable setSelectedRecordId={setSelectedRecordId} />
      </Card>
    </>
  );
}

export default AllocateBrandItemtoDiscountType;
