import { Card } from 'antd';
import React, { useState } from 'react';
import DiscountCategoryToDiscountTypeForm from './form/DiscountCategoryToDiscountTypeForm';
import DiscountCategoryToDiscountTypeTable from './table/DiscountTypeHistory';

function AllocateDiscCategoryToDiscType() {
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null);

  return (
    <>
      <h2 className="form-heading"> Allocate Discount Category To Discount Type</h2>
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
