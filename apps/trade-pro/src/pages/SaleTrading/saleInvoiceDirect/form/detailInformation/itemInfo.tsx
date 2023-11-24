import { AntButton, AntDatePicker, AntInput, AntInputNumber, AntSelectDynamic } from '@tradePro/components';
import { Card, Checkbox, Col, Row, Form, FormInstance, Radio } from 'antd';
import { map } from 'lodash';
import { useTranslation } from 'react-i18next';
// import {
//   fetchAccountBalance,
//   useGetContraBranchSelect,
//   useGetContraChequeNoSelect,
//   useGetContraCompanySelect,
//   useGetContraCreditAccountSelect,
//   useGetContraProjectSelect,
// } from '../queries/queries';
// import { useEffect, useState } from 'react';

function ItemInfo({ form }: TDynamicForm) {
  //   const [creditAccountId, setCreditAccountId] = useState(null);
  //   const [creditAccountBalance, setCreditAccountBalance] = useState(0);
  //   const [chequeNoEnabled, setChequeNoEnabled] = useState(false); // State to store the "CheqBook Enabled" configuration
  const { t } = useTranslation();

  return (
    <>
      <Col xs={24} sm={24} md={24} lg={24} xl={{ span: 4 }}>
        <Card
          style={{ height: 'auto', marginTop: '-26%', boxShadow: '2px 4px 12px 1px gray' }}
          className="antCard card-shadow saleInvoice voucher-card"
        >
          <h3>{t('today_item_information')}</h3>
          <br />

          <div className="form-list-container">
            <Col
              xs={{ span: 24 }}
              sm={{ span: 23 }}
              md={{ span: 23 }}
              lg={{ span: 23 }}
              xl={{ span: 24 }}
              className="formfield"
            >
              <AntInputNumber bordered={false} name="ChequeDate" label={t('min_rate')} />
            </Col>

            <Col
              xs={{ span: 24 }}
              sm={{ span: 23 }}
              md={{ span: 23 }}
              lg={{ span: 23 }}
              xl={{ span: 24 }}
              className="formfield"
            >
              <AntInputNumber bordered={false} name="ChequeDate" label={t('max_rate')} />
            </Col>
          </div>
          <br />
        </Card>
      </Col>
    </>
  );
}

type TDynamicForm = { form: FormInstance };

export default ItemInfo;
