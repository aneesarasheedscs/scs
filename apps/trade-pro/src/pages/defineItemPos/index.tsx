import React from 'react';
import { Tabs, theme } from 'antd';
import HistoryTable from './ItemHistoryTable';
import FormFile from './Form';
import './style.scss';
import { useTranslation } from 'react-i18next';

const { useToken } = theme;

function ItemHistory() {
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const { t } = useTranslation();
  return (
    <>
      <h2 className="form-heading" style={{ marginBottom: 5, marginTop: -15 }}>
        {t('define_item')}
      </h2>
      <Tabs
        type="card"
        size="large"
        defaultActiveKey="1"
        className="tabs-margin-bottom-0"
        items={[
          { key: '1', label: t('history'), children: <HistoryTable /> },
          { key: '2', label: t('form'), children: <FormFile /> },
        ]}
      />
    </>
  );
}

export default ItemHistory;
