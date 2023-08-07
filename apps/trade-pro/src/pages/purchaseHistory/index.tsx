import React from 'react';
import Formfile from './Components/formfile';
import Historyfile from './Components/fileHistory';
import './style.scss';

import { Button, Tabs } from 'antd';
import type { TabsProps } from 'antd';

const onChange = (key: string) => {
  console.log(key);
};
const items: TabsProps['items'] = [
  {
    key: '1',
    label: <Button className="button4">History</Button>,
    children: <Historyfile />,
  },
  {
    key: '2',
    label: <Button className="button4">Form</Button>,
    children: <Formfile />,
  },
];
function PurchaseHistory() {
  return (
    <>
      <div className="form-page">
        <h3 className="form-heading">PURCHASE ORDER</h3>

        <Tabs defaultActiveKey="1" items={items} onChange={onChange} className="tabs" type="card" />
      </div>
    </>
  );
}

export default PurchaseHistory;
