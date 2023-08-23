import { Tabs } from 'antd';
import PurchaseOrderForm from './form';
import PurchaseOrderTable from './table';
import { useTranslation } from 'react-i18next';

function PurchaseOrder() {
  const { t } = useTranslation();

  return (
    <>
      <Tabs
        type="card"
        size="large"
        defaultActiveKey="1"
        className="tabs-margin-bottom-0"
        items={[
          { key: '1', label: t('history'), children: <PurchaseOrderTable /> },
          { key: '2', label: t('form'), children: <PurchaseOrderForm /> },
        ]}
      />
    </>
  );
}

export default PurchaseOrder;
