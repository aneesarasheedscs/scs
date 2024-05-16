import { Col, Row, Tabs } from 'antd';
import PurchaseOrderTable from './table';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { BackButton } from '@scs/ui';
import './style.scss';

function PurchaseOrderRetailRegister() {
  const { t } = useTranslation();
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>();

  return (
    <>
      <h2 className="form-heading"> {t('purchase_order_retail_register')}</h2>

      <PurchaseOrderTable />
    </>
  );
}

export default PurchaseOrderRetailRegister;
