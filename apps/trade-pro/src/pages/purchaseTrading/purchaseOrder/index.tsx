import { Tabs } from 'antd';
import PurchaseOrderForm from './form';
import PurchaseOrderTable from './table';
<<<<<<< HEAD
import { useTranslation } from 'react-i18next';

function PurchaseOrder() {
  const { t } = useTranslation();
=======
import FormFile from './Components/formfile';
import { theme } from 'antd';

const { useToken } = theme;

function PurchaseOrder() {
  const {
    token: { colorPrimary },
  } = theme.useToken();
>>>>>>> 345f83303dfc60bebe7d25339daf2bc30c074316

  return (
    <>
      <h2 className="form-heading">Purchase Order</h2>
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
