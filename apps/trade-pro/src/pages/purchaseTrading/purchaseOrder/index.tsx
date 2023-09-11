import { Tabs } from 'antd';
import PurchaseOrderForm from './form';
import PurchaseOrderTable from './table';

import { useTranslation } from 'react-i18next';

import FormFile from './Components/formfile';
import { theme } from 'antd';
const { useToken } = theme;
function PurchaseOrder() {
  const { t } = useTranslation();

  function PurchaseOrder() {
    const {
      token: { colorPrimary },
    } = theme.useToken();

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
}

export default PurchaseOrder;
