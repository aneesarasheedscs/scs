import { AntButton, AntDatePicker, AntInput, AntInputNumber, AntSelectDynamic } from '@tradePro/components';
import { Card, Checkbox, Col, Row, Form, FormInstance } from 'antd';
import { map } from 'lodash';
import { useTranslation } from 'react-i18next';
import CustomerInfo from './CustomerInfo';
// import {
//   fetchAccountBalance,
//   useGetContraBranchSelect,
//   useGetContraChequeNoSelect,
//   useGetContraCompanySelect,
//   useGetContraCreditAccountSelect,
//   useGetContraProjectSelect,
// } from '../queries/queries';
// import { useEffect, useState } from 'react';

function MainEntry({ form }: TDynamicForm) {
  //   const [creditAccountId, setCreditAccountId] = useState(null);
  //   const [creditAccountBalance, setCreditAccountBalance] = useState(0);
  //   const [chequeNoEnabled, setChequeNoEnabled] = useState(false); // State to store the "CheqBook Enabled" configuration
  const { t } = useTranslation();

  const onChange = (checkedValues: any[]) => {
    console.log('checked = ', checkedValues);
  };

  const options = [
    { label: <>{t('do_preview')}</>, value: 1 },
    { label: <>{t('slip_preview')}</>, value: 2 },
    { label: <>{t('voucher_preview')}</>, value: 3 },
  ];
  // For Credit Account
  //   const handleCreditAccountChange = async (value: any) => {
  //     setCreditAccountId(value);

  //     // Fetch and update the credit account balance based on the selected account
  //     try {
  //       await fetchAccountBalance(value, 'credit', setCreditAccountBalance);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   const { data: filter } = useGetContraCreditAccountSelect();

  //   useEffect(() => {
  //     // Replace this with your actual API call to fetch the configuration
  //     // For the purpose of this example, I'll set it to `true` initially.
  //     const useGetContraCreditAccountSelect = async () => {
  //       try {
  //         const response = await fetch(
  //           '/api/Voucher/ReadBalanceBySelectedAccount?OrganizationId=2&CompanyId=2&FinancialYearId=2&RefAccountId=21493&VoucherDate=2023-09-12'
  //         ); // Replace with your API endpoint
  //         const data = await response.json();
  //         setChequeNoEnabled(data.isEnabled); // Assuming your API response has an "isEnabled" field
  //       } catch (error) {
  //         console.error('Error fetching CheqBook Enabled config:', error);
  //       }
  //     };

  //     useGetContraCreditAccountSelect();
  //   }, []);

  return (
    <>
      <Row gutter={[16, 16]} style={{ marginTop: '-2%' }}>
        <Col xs={24} sm={24} md={24} lg={24} xl={{ span: 18 }}>
          <Card style={{ boxShadow: '2px 4px 12px 1px gray', paddingBottom: '0.5%' }}>
            <h3>{t('main_header')}</h3>

            <br />
            <div className="form-list-container">
              <Col
                xs={{ span: 20, offset: 1 }}
                sm={{ span: 22, offset: 0 }}
                md={{ span: 22, offset: 0 }}
                lg={{ span: 22, offset: 0 }}
                xl={{ span: 7, offset: 0 }}
                className="formfield"
                // style={{ marginBottom: '2.5%' }}
              >
                <AntDatePicker
                  //   query={useGetContraCompanySelect}
                  bordered={false}
                  label={t('document_date')}
                  name="CompanyId"
                />
              </Col>

              <Col
                xs={{ span: 20, offset: 1 }}
                sm={{ span: 22, offset: 0 }}
                md={{ span: 22, offset: 0 }}
                lg={{ span: 22, offset: 0 }}
                xl={{ span: 7, offset: 1 }}
                // style={{ marginTop: '-2.5%' }}
                className="formfield"
              >
                <Row>
                  <Col span={24} offset={22}>
                    <p style={{ marginTop: '-10%' }}>Dr</p>
                  </Col>
                </Row>

                <AntSelectDynamic
                  bordered={false}
                  label={t('customer')}
                  fieldValue="Id"
                  fieldLabel="BranchName"
                  name="BranchId"
                  //   query={useGetContraBranchSelect}
                />
              </Col>

              <Col
                xs={{ span: 20, offset: 1 }}
                sm={{ span: 22, offset: 0 }}
                md={{ span: 22, offset: 0 }}
                lg={{ span: 22, offset: 0 }}
                xl={{ span: 7, offset: 1 }}
                // style={{ marginTop: '-2.5%' }}
                className="formfield"
              >
                <AntInputNumber
                  bordered={false}
                  label={t('bill_amount')}
                  name="BranchId"
                  //   query={useGetContraBranchSelect}
                />
              </Col>

              <Col
                xs={{ span: 20, offset: 1 }}
                sm={{ span: 22, offset: 0 }}
                md={{ span: 22, offset: 0 }}
                lg={{ span: 22, offset: 0 }}
                xl={{ span: 7, offset: 0 }}
                // style={{ marginTop: '-2.5%' }}
                className="formfield"
              >
                <AntSelectDynamic
                  bordered={false}
                  label={t('payment_terms')}
                  fieldValue="Id"
                  fieldLabel="BranchName"
                  name="BranchId"
                  //   query={useGetContraBranchSelect}
                />
              </Col>

              <Col
                xs={{ span: 20, offset: 1 }}
                sm={{ span: 22, offset: 0 }}
                md={{ span: 22, offset: 0 }}
                lg={{ span: 22, offset: 0 }}
                xl={{ span: 7, offset: 1 }}
                // style={{ marginTop: '-2.5%' }}
                className="formfield"
              >
                <AntInputNumber
                  bordered={false}
                  label={t('due_days')}
                  name="BranchId"
                  //   query={useGetContraBranchSelect} label={t('due_days_and_date')}
                />
              </Col>

              <Col
                xs={{ span: 20, offset: 1 }}
                sm={{ span: 22, offset: 0 }}
                md={{ span: 22, offset: 0 }}
                lg={{ span: 22, offset: 0 }}
                xl={{ span: 7, offset: 1 }}
                // style={{ marginTop: '-2.5%' }}
                className="formfield"
              >
                <AntDatePicker
                  bordered={false}
                  label={t('due_date')}
                  name="BranchId"
                  //   query={useGetContraBranchSelect} label={t('due_days_and_date')}
                />
              </Col>

              <Col
                xs={{ span: 20, offset: 1 }}
                sm={{ span: 22, offset: 0 }}
                md={{ span: 22, offset: 0 }}
                lg={{ span: 22, offset: 0 }}
                xl={{ span: 15, offset: 0 }}
                // style={{ marginTop: '-2.5%' }}
                className="formfield"
              >
                <AntInput
                  bordered={false}
                  label={t('remarks')}
                  name="BranchId"
                  //   query={useGetContraBranchSelect} label={t('due_days_and_date')}
                />
              </Col>

              <Col
                xs={{ span: 20, offset: 1 }}
                sm={{ span: 22, offset: 0 }}
                md={{ span: 22, offset: 0 }}
                lg={{ span: 22, offset: 0 }}
                xl={{ span: 7, offset: 1 }}
                // style={{ marginBottom: '2%' }}
                className="formfield"
              >
                <AntSelectDynamic
                  bordered={false}
                  label={t('salesman_agent')}
                  fieldValue="Id"
                  fieldLabel="ProjectName"
                  name="ProjectId"
                  //   query={useGetContraProjectSelect}
                />
              </Col>

              <Col
                xs={{ span: 20, offset: 1 }}
                sm={{ span: 22, offset: 0 }}
                md={{ span: 22, offset: 0 }}
                lg={{ span: 22, offset: 0 }}
                xl={{ span: 7, offset: 0 }}
                // style={{ marginBottom: '2%' }}
                className="formfield"
              >
                {' '}
                <AntSelectDynamic
                  bordered={false}
                  label={t('commission_type')}
                  fieldValue="Id"
                  fieldLabel="ProjectName"
                  name="ProjectId"
                  //   query={useGetContraProjectSelect}
                />
              </Col>

              <Col
                xs={{ span: 20, offset: 1 }}
                sm={{ span: 22, offset: 0 }}
                md={{ span: 22, offset: 0 }}
                lg={{ span: 22, offset: 0 }}
                xl={{ span: 7, offset: 1 }}
                // style={{ marginBottom: '2%' }}
                className="formfield"
              >
                {' '}
                <AntInputNumber
                  bordered={false}
                  label={t('commission_rate')}
                  name="ProjectId"
                  //   query={useGetContraProjectSelect}
                />
              </Col>

              <Col
                xs={{ span: 20, offset: 1 }}
                sm={{ span: 22, offset: 0 }}
                md={{ span: 22, offset: 0 }}
                lg={{ span: 22, offset: 0 }}
                xl={{ span: 7, offset: 1 }}
                // style={{ marginBottom: '2%' }}
                className="formfield"
              >
                {' '}
                <AntInputNumber
                  bordered={false}
                  label={t('commission_amount')}
                  name="ProjectId"
                  //   query={useGetContraProjectSelect}
                />
              </Col>

              <Col
                xs={{ span: 20, offset: 1 }}
                sm={{ span: 22, offset: 0 }}
                md={{ span: 22, offset: 0 }}
                lg={{ span: 22, offset: 0 }}
                xl={{ span: 15, offset: 0 }}
                // style={{ marginTop: '-2.5%' }}
                className="formfield"
              >
                <AntInput
                  bordered={false}
                  label={t('commission_remarks')}
                  name="BranchId"
                  //   query={useGetContraBranchSelect} label={t('due_days_and_date')}
                />
              </Col>

              <Col span={24} style={{ marginTop: '1.5%' }} className="checkbox">
                <Checkbox.Group options={options} defaultValue={[1, 2]} onChange={onChange} />
              </Col>
            </div>
          </Card>
        </Col>
        {/* <Col xs={24} sm={24} md={12} lg={12} xl={{ span: 6 }}>
          <Card style={{ height: 'auto' }} className="antCard card-shadow saleInvoice voucher-card">
            <h3>Customer and Item Information:</h3>
            <br />

            <div className="form-list-container">
              <Col
                xs={{ span: 23 }}
                sm={{ span: 23 }}
                md={{ span: 23 }}
                lg={{ span: 23 }}
                xl={{ span: 23 }}
                className="formfield"
              >
                <AntDatePicker bordered={false} name="VoucherDate" label={t('last_bill_date')} />
              </Col>
              <Col
                xs={{ span: 23 }}
                sm={{ span: 23 }}
                md={{ span: 23 }}
                lg={{ span: 23 }}
                xl={{ span: 23 }}
                className="formfield"
              >
                <AntInputNumber bordered={false} name="ChequeDate" label={t('last_bill_no')} />
              </Col>

              <Col
                xs={{ span: 23 }}
                sm={{ span: 23 }}
                md={{ span: 23 }}
                lg={{ span: 23 }}
                xl={{ span: 23 }}
                className="formfield"
              >
                <AntInputNumber bordered={false} name="ChequeDate" label={t('last_bill_price')} />
              </Col>

              <Col
                xs={{ span: 23 }}
                sm={{ span: 23 }}
                md={{ span: 23 }}
                lg={{ span: 23 }}
                xl={{ span: 23 }}
                className="formfield"
              >
                <AntInputNumber bordered={false} name="ChequeDate" label={t('last_bill_rate')} />
              </Col>

              <Col
                xs={{ span: 23 }}
                sm={{ span: 23 }}
                md={{ span: 23 }}
                lg={{ span: 23 }}
                xl={{ span: 23 }}
                className="formfield"
              >
                <AntInputNumber bordered={false} name="ChequeDate" label={t('min_rate')} />
              </Col>

              <Col
                xs={{ span: 23 }}
                sm={{ span: 23 }}
                md={{ span: 23 }}
                lg={{ span: 23 }}
                xl={{ span: 23 }}
                className="formfield"
              >
                <AntInputNumber bordered={false} name="ChequeDate" label={t('max_rate')} />
              </Col>
            </div>
            <br />
          </Card>
        </Col> */}
        <CustomerInfo form={form} />{' '}
      </Row>

      <br />
    </>
  );
}

type TDynamicForm = { form: FormInstance };

export default MainEntry;
