import React from 'react';
import { Tabs, theme } from 'antd';
import HistoryTable from './ItemHistoryTable';
import FormFile from './Form';
import './style.scss';

const { useToken } = theme;

function ItemHistory() {
  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <>
      <h2 className="form-heading" style={{ marginBottom: 5, marginTop: -15 }}>
        Define Item
      </h2>
      <Tabs
        type="card"
        size="large"
        defaultActiveKey="1"
        className="tabs-margin-bottom-0"
        items={[
          { key: '1', label: 'History', children: <HistoryTable /> },
          { key: '2', label: 'Form', children: <FormFile /> },
        ]}
      />
    </>
  );
}

export default ItemHistory;
