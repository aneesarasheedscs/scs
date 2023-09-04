import { Tabs } from 'antd';
import PurchaseOrderForm from './form';
import PurchaseOrderTable from './table';
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 48779b9abba142b14203ef32830ab3a67cf52ffd
import { useTranslation } from 'react-i18next';

function PurchaseOrder() {
  const { t } = useTranslation();
<<<<<<< HEAD
=======
import FormFile from './Components/formfile';
import { theme } from 'antd';

const { useToken } = theme;

function PurchaseOrder() {
  const {
    token: { colorPrimary },
  } = theme.useToken();
>>>>>>> 345f83303dfc60bebe7d25339daf2bc30c074316
=======
>>>>>>> 48779b9abba142b14203ef32830ab3a67cf52ffd

  return (
    <>
      <h2 className="form-heading"> {t('purchase_order')}</h2>
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
