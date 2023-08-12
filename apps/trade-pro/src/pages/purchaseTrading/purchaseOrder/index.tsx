import { Tabs } from 'antd';
import PurchaseOrderTable from './table';
import FormFile from './Components/formfile';
import { theme } from 'antd';

const { useToken } = theme;

function PurchaseOrder() {
  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <>
      <h2 className="form-heading">Purchase Order</h2>
      <Tabs
        type="card"
        size="large"
        defaultActiveKey="1"
        className="tabs-margin-bottom-0"
        items={[
          { key: '1', label: 'History', children: <PurchaseOrderTable /> },
          { key: '2', label: 'Form', children: <FormFile /> },
        ]}
      />
    </>
  );
}

export default PurchaseOrder;
