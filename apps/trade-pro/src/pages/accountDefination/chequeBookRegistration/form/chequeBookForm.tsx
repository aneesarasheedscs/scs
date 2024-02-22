import { AntDatePicker, AntInput, AntInputNumber, AntSelectDynamic } from '@tradePro/components';
import { Card, Col, Row, FormInstance } from 'antd';
import { useTranslation } from 'react-i18next';
import '../style.scss';
import { useGetChequeBookRegistrationSelect } from '../queries/queries';
import { useState } from 'react';
interface Props {
  form: FormInstance;
}
const ChequeBook = ({ form }: Props) => {
  const { t } = useTranslation();
  const { data: bankAccount } = useGetChequeBookRegistrationSelect();

  const handleInputChange = (value: number) => {
    console.log(bankAccount);
    const selectedAccount = bankAccount?.data?.Data?.Result?.find((item: any) => item.Id === value);
    if (selectedAccount) {
      const accountTitle = selectedAccount.AccountTitle;
      console.log(accountTitle);
      form.setFieldValue('AccountTitle', accountTitle);
    }
  };

  return (
    <>
      <Row gutter={[10, 10]} style={{ marginTop: '-0.5%' }}>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 24 }}
          lg={{ span: 24 }}
          xl={{ span: 24 }}
          xxl={{ span: 18 }}
        >
          <Card style={{ height: 'auto', paddingBottom: '1%', boxShadow: '2px 4px 12px 1px gray' }}>
            <div className="form-list-container">
              <Col
                xs={{ span: 23, offset: 0 }}
                sm={{ span: 21, offset: 1 }}
                md={{ span: 11, offset: 0 }}
                lg={{ span: 11, offset: 0 }}
                xl={{ span: 7, offset: 0 }}
                className="formfield bankaccount"
              >
                <AntSelectDynamic
                  bordered={false}
                  label={t('bank_account')}
                  fieldValue="Id"
                  fieldLabel="AccountTitle"
                  name="BankId"
                  onChange={(value) => handleInputChange(value)}
                  query={useGetChequeBookRegistrationSelect}
                />
              </Col>
              <Col
                xs={{ span: 23, offset: 0 }}
                sm={{ span: 21, offset: 1 }}
                md={{ span: 11, offset: 1 }}
                lg={{ span: 11, offset: 1 }}
                xl={{ span: 7, offset: 1 }}
                className="formfield doc-date"
              >
                <AntDatePicker
                  bordered={false}
                  label={t('doc_date')}
                  name="DocDate"
                  onChange={() => handleInputChange}
                />
              </Col>
              <Col
                xs={{ span: 23, offset: 0 }}
                sm={{ span: 21, offset: 1 }}
                md={{ span: 11, offset: 0 }}
                lg={{ span: 11, offset: 0 }}
                xl={{ span: 7, offset: 1 }}
                className="formfield prefix"
              >
                <AntInput bordered={false} label={t('prefix')} name="CbPrefix" onChange={() => handleInputChange} />
              </Col>
              <Col
                xs={{ span: 23, offset: 0 }}
                sm={{ span: 21, offset: 1 }}
                md={{ span: 11, offset: 1 }}
                lg={{ span: 11, offset: 1 }}
                xl={{ span: 7, offset: 0 }}
                style={{ marginTop: '1%' }}
                className="formfield serial-from"
              >
                <AntInputNumber
                  required
                  bordered={false}
                  label={t('serial_from')}
                  name="CbSrFrom"
                  onChange={() => handleInputChange}
                />
              </Col>

              <Col
                xs={{ span: 23, offset: 0 }}
                sm={{ span: 21, offset: 1 }}
                md={{ span: 11, offset: 0 }}
                lg={{ span: 11, offset: 0 }}
                xl={{ span: 7, offset: 1 }}
                style={{ marginTop: '1%' }}
                className="formfield serial-to"
              >
                <AntInputNumber
                  required
                  bordered={false}
                  label={t('serial_to')}
                  name="CbSrTo"
                  onChange={() => handleInputChange}
                />
              </Col>

              <Col
                xs={{ span: 23, offset: 0 }}
                sm={{ span: 21, offset: 1 }}
                md={{ span: 11, offset: 1 }}
                lg={{ span: 11, offset: 1 }}
                xl={{ span: 7, offset: 1 }}
                style={{ marginTop: '1%' }}
                className="formfield remarks"
              >
                <AntInput bordered={false} label={t('remarks')} name="Remarks" onChange={() => handleInputChange} />
                <AntInput
                  bordered={false}
                  label={''}
                  name="AccountTitle"
                  style={{ display: 'none', visibility: 'hidden' }}
                />
              </Col>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ChequeBook;
