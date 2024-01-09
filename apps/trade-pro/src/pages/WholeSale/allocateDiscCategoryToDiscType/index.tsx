import { Card } from 'antd';
import React, { useState } from 'react';
import DiscountCategoryToDiscountTypeForm from './form/DiscountCategoryToDiscountTypeForm';
import DiscountCategoryToDiscountTypeTable from './table/DiscountTypeHistory';
import { useTranslation } from 'react-i18next';

function AllocateDiscCategoryToDiscType() {
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null);
  const { t } = useTranslation();
  return (
    <>
      <h2 className="form-heading">{t('allocate_discount_category_to_discount_type')}</h2>
      <Card>
        <DiscountCategoryToDiscountTypeForm
          selectedRecordId={selectedRecordId}
          setSelectedRecordId={setSelectedRecordId}
        />
        <DiscountCategoryToDiscountTypeTable setSelectedRecordId={setSelectedRecordId} />
      </Card>
    </>
  );
}

export default AllocateDiscCategoryToDiscType;
