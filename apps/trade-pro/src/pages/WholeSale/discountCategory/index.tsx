import React, { useState } from 'react';
import { Card } from 'antd';
import { useTranslation } from 'react-i18next';
import DiscountCategoryForm from './form/DiscountCategoryForm';
import DiscountCategoryHistory from './table/DiscountCategoryHistory';

function DiscountCategory() {
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null);

  const { t } = useTranslation();
  return (
    <>
      <h2 className="form-heading"> {t('discount_category')} </h2>
      <Card>
        <DiscountCategoryForm selectedRecordId={selectedRecordId} setSelectedRecordId={setSelectedRecordId} />
        <DiscountCategoryHistory setSelectedRecordId={setSelectedRecordId} />
      </Card>
    </>
  );
}

export default DiscountCategory;
