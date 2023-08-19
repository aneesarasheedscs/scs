import { Tabs } from 'antd';
import PurchaseOrderForm from './form';
import PurchaseOrderTable from './table';

function PurchaseOrder() {
  return (
    <>
      <Tabs
        type="card"
        size="large"
        defaultActiveKey="1"
        className="tabs-margin-bottom-0"
        items={[
          { key: '1', label: 'History', children: <PurchaseOrderTable /> },
          { key: '2', label: 'Form', children: <PurchaseOrderForm /> },
        ]}
      />
    </>
  );
}

export default PurchaseOrder;
