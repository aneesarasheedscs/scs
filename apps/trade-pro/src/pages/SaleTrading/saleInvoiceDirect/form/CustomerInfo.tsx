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

function CustomerInfo({ form }: TDynamicForm) {
  //   const [creditAccountId, setCreditAccountId] = useState(null);
  //   const [creditAccountBalance, setCreditAccountBalance] = useState(0);
  //   const [chequeNoEnabled, setChequeNoEnabled] = useState(false); // State to store the "CheqBook Enabled" configuration
  const { t } = useTranslation();

  const onChange = (checkedValues: any[]) => {
    console.log('checked = ', checkedValues);
  };

  return (
    <>
      <Col xs={24} sm={24} md={12} lg={12} xl={{ span: 6 }}>
        <Card style={{ height: 'auto', boxShadow: '2px 4px 12px 1px gray' }}>
          <h3>{t('customer_and_item_information')}</h3>
          <br />

          <div>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 24 }}
              lg={{ span: 24 }}
              xl={{ span: 24 }}
              className="formfield"
            >
              <AntDatePicker bordered={false} name="VoucherDate" label={t('last_bill_date')} />
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 24 }}
              lg={{ span: 24 }}
              xl={{ span: 24 }}
              className="formfield"
            >
              <AntInputNumber bordered={false} name="ChequeDate" label={t('last_bill_no')} />
            </Col>

            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 24 }}
              lg={{ span: 24 }}
              xl={{ span: 24 }}
              className="formfield"
            >
              <AntInputNumber bordered={false} name="ChequeDate" label={t('last_bill_price')} />
            </Col>

            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 24 }}
              lg={{ span: 24 }}
              xl={{ span: 24 }}
              className="formfield"
            >
              <AntInputNumber bordered={false} name="ChequeDate" label={t('last_bill_rate')} />
            </Col>

            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 24 }}
              lg={{ span: 24 }}
              xl={{ span: 24 }}
              className="formfield"
            >
              <AntInputNumber bordered={false} name="ChequeDate" label={t('min_rate')} />
            </Col>

            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 24 }}
              lg={{ span: 24 }}
              xl={{ span: 24 }}
              className="formfield"
            >
              <AntInputNumber bordered={false} name="ChequeDate" label={t('max_rate')} />
            </Col>
          </div>
        </Card>
      </Col>
    </>
  );
}

type TDynamicForm = { form: FormInstance };

export default CustomerInfo;
