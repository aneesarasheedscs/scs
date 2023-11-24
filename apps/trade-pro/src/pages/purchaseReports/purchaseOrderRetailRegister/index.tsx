import { Tabs } from 'antd';
import PurchaseOrderTable from './table';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

function PurchaseOrderRetailRegister() {
  const { t } = useTranslation();
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>();

  return (
    <>
      <h2 className="form-heading"> {t('purchase_order_history')}</h2>

      <PurchaseOrderTable />
    </>
  );
}

export default PurchaseOrderRetailRegister;
