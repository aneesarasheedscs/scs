import React from 'react';
import { Col, Row, Tabs, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import ChequeBookTable from './table/chequeBookRegistrationTable';
import './style.scss';
import ChequeForm from './form';
import ChequeBookStatusTable from '../chequeBookStatus/table/chequeBookStatusTable';
import ChequeStatusForm from '../chequeBookStatus/form';

function ChequeBookForm() {
  const { t } = useTranslation();

  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <>
      <div style={{ marginLeft: '2%' }}>
        <h2 className="form-heading">{t('cheque_book')}</h2>
        <Tabs
          type="card"
          size="large"
          defaultActiveKey="1"
          className="tabs-margin-bottom-0"
          items={[
            { key: '1', label: t('form'), children: <ChequeForm /> },
            { key: '2', label: t('history'), children: <ChequeBookTable /> },
            { key: '3', label: t('cheque_book_status'), children: <ChequeStatusForm /> },
          ]}
        />
      </div>
    </>
  );
}

export default ChequeBookForm;
