import React, { useEffect, useState } from 'react';
import History from './historyTable';
import Form1 from './chart_of_account_form';
import { Tabs, theme } from 'antd';
import './index.scss';
const { useToken } = theme;

const ChartOA: React.FC = () => {

  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <div>
      <Tabs 
  
        type="card"
        id="Tabs"
        size="large"
        defaultActiveKey="1"
        className="tabs-margin-bottom-0"
        items={[
          { key: '1', label: 'History', children: <History /> },
          { key: '2', label: 'Form', children: <Form1 /> },
        ]}
      />
 

    </div>
  );
};

export default ChartOA;
