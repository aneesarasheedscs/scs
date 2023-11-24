import { AntDatePicker, AntInput, AntSelectDynamic } from '@tradePro/components';
import { Card, Checkbox, Col, Row, FormInstance, Form } from 'antd';
import { map } from 'lodash';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { isWithHoldingCheckedAtom, totalValue } from './Atom';
import { useAtom } from 'jotai';
import {
  useGetAccountsBalance,
  useGetBankReceiptBranchSelect,
  useGetBankReceiptCompanySelect,
  useGetBankReceiptProjectSelect,
  useGetChequeNoSelect,
  useGetConfigration,
  useGetDebitAccountSelect,
  useGetWHTAgainstAcSelect,
} from '../queries/queries';

const MainEntry = ({ form, setBankId, bankId }: TDynamicForm) => {
  const { t } = useTranslation();
  const [totalDebitAmounts, setTotalDebitAmounts] = useAtom(totalValue);
  const [isWithHoldingChecked] = useAtom(isWithHoldingCheckedAtom);
  const { data } = useGetAccountsBalance(bankId);
  const { data: company, isSuccess, isLoading } = useGetBankReceiptCompanySelect();
  const { data: branch } = useGetBankReceiptBranchSelect();
  const { data: project, isSuccess: projectSuccess } = useGetBankReceiptProjectSelect();
  const [chequeBookEnabled, setChequeBookEnabled] = useState(false);
  const { data: debit } = useGetDebitAccountSelect();
  const { data: chequeBooks } = useGetChequeNoSelect(bankId);
  const { data: chequeNoCompulsoryConfig } = useGetConfigration('ChequeNoCompulsoryOnBpv');
  const isChequeNoCompulsory = chequeNoCompulsoryConfig?.data?.Data?.Result === 'True';

  useEffect(() => {
    if (isSuccess && projectSuccess && !isLoading) {
      form.setFieldValue('CompanyId', company?.data?.Data?.Result?.[0]?.CompName);
      form.setFieldValue('BranchId', branch?.data?.Data?.Result?.[0]?.BranchName);
      form.setFieldValue('ProjectId', project?.data?.Data?.Result?.[0]?.ProjectName);
    }
  }, [isSuccess, !isLoading]);

  useEffect(() => {
    form.setFieldValue('VoucherAmount', totalDebitAmounts);
  }, [debit, bankId, totalDebitAmounts]);

  const handleDebitAccountChange = (accountId?: any) => {
    setBankId(accountId);
  };

  const handleCheckboxChange = (isChecked: boolean, fieldName: string) => {
    form.setFieldsValue({
      [fieldName]: isChecked,
    });
  };

  const { data: filter } = useGetWHTAgainstAcSelect();

  interface TVoucherType {
    Id: number;
    Type: string;
  }
  const voucherType: TVoucherType[] = [{ Id: 1, Type: 'BRV' }];

  const chequeBookOptions =
    chequeBooks?.data?.Data?.Result?.map((chequeBook: any) => ({
      label: chequeBook.CheqNo,
      value: chequeBook.Id,
    })) || [];

  return (
    <>
      <Row gutter={[16, 16]} style={{ marginTop: '-1%' }}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Card style={{ paddingBottom: '0.5%', boxShadow: '2px 4px 12px 1px gray' }}>
            <div className="form-list-container">
              <Col
                xs={{ span: 24, offset: 0 }}
                sm={{ span: 21, offset: 1 }}
                md={{ span: 11, offset: 0 }}
                lg={{ span: 11, offset: 0 }}
                xl={{ span: 5, offset: 0 }}
                className="formfield company"
              >
                <AntSelectDynamic
                  bordered={false}
                  label={t('company')}
                  fieldValue="Id"
                  fieldLabel="CompName"
                  name="CompanyId"
                  query={useGetBankReceiptCompanySelect}
                />
              </Col>
              <Col
                xs={{ span: 24, offset: 0 }}
                sm={{ span: 21, offset: 1 }}
                md={{ span: 11, offset: 1 }}
                lg={{ span: 11, offset: 1 }}
                xl={{ span: 5, offset: 1 }}
                className="formfield branch"
              >
                <AntSelectDynamic
                  bordered={false}
                  label={t('branch')}
                  fieldValue="Id"
                  fieldLabel="BranchName"
                  name="BranchId"
                  query={useGetBankReceiptBranchSelect}
                />
              </Col>
              <Col
                xs={{ span: 24, offset: 0 }}
                sm={{ span: 21, offset: 1 }}
                md={{ span: 11, offset: 0 }}
                lg={{ span: 11, offset: 0 }}
                xl={{ span: 5, offset: 1 }}
                className="formfield project"
              >
                <AntSelectDynamic
                  bordered={false}
                  label={t('project')}
                  fieldValue="Id"
                  fieldLabel="ProjectName"
                  name="ProjectId"
                  query={useGetBankReceiptProjectSelect}
                />
              </Col>
              <Col
                xs={{ span: 24, offset: 0 }}
                sm={{ span: 21, offset: 1 }}
                md={{ span: 11, offset: 1 }}
                lg={{ span: 11, offset: 1 }}
                xl={{ span: 5, offset: 1 }}
                className="formfield voucher"
              >
                <AntSelectDynamic
                  bordered={false}
                  label={t('voucher_type')}
                  fieldValue="Id"
                  fieldLabel="Type"
                  name="Type"
                  options={map(voucherType, (item: any) => ({
                    value: item.Id,
                    label: item.Type,
                  }))}
                  defaultValue={1}
                />
              </Col>
            </div>
            <br />
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Card>
                <br />
                <div className="form-list-container">
                  <Col
                    xs={{ span: 24, offset: 0 }}
                    sm={{ span: 21, offset: 1 }}
                    md={{ span: 11, offset: 0 }}
                    lg={{ span: 11, offset: 0 }}
                    xl={{ span: 7, offset: 0 }}
                    className="formfield date"
                  >
                    <AntDatePicker bordered={false} name="VoucherDate" label={t('voucher_date')} />
                  </Col>
                  <Col
                    xs={{ span: 24, offset: 0 }}
                    sm={{ span: 21, offset: 1 }}
                    md={{ span: 11, offset: 1 }}
                    lg={{ span: 11, offset: 1 }}
                    xl={{ span: 7, offset: 1 }}
                    className="formfield balance"
                    style={{ marginTop: '-1.3rem', borderBottom: '1px solid gray', height: '60px' }}
                  >
                    <p style={{ marginTop: -15 }}>
                      {t('debit_account_balance')} : <b> {data?.data?.Data?.Result?.[0]?.Balance.toFixed(2)}</b>
                    </p>
                    <p style={{ marginTop: 12 }}>
                      <AntSelectDynamic
                        required
                        bordered={false}
                        label={t('debit_account')}
                        fieldValue="Id"
                        fieldLabel="AccountTitle"
                        name="RefAccountId"
                        query={useGetDebitAccountSelect}
                        onChange={(accountId) => handleDebitAccountChange(accountId)}
                      />
                    </p>
                  </Col>
                  <Col
                    xs={{ span: 24, offset: 0 }}
                    sm={{ span: 21, offset: 1 }}
                    md={{ span: 11, offset: 0 }}
                    lg={{ span: 11, offset: 0 }}
                    xl={{ span: 7, offset: 1 }}
                    className="formfield"
                  >
                    <AntSelectDynamic
                      bordered={false}
                      label={t('against_ac')}
                      fieldValue="Id"
                      fieldLabel="AccountTitle"
                      name="Id"
                      disabled={!isWithHoldingChecked}
                      options={map(filter, (item: any) => ({
                        value: item.Id,
                        label: item.AccountTitle,
                      }))}
                    />
                  </Col>
                  <Col
                    xs={{ span: 24, offset: 0 }}
                    sm={{ span: 21, offset: 1 }}
                    md={{ span: 11, offset: 1 }}
                    lg={{ span: 11, offset: 1 }}
                    xl={{ span: 7, offset: 0 }}
                    className="formfield"
                    style={{ marginTop: '1%' }}
                  >
                    <AntDatePicker bordered={false} name="ChequeDate" label={t('cheque_date')} />
                  </Col>
                  <Col
                    xs={{ span: 24, offset: 0 }}
                    sm={{ span: 21, offset: 1 }}
                    md={{ span: 11, offset: 0 }}
                    lg={{ span: 11, offset: 0 }}
                    xl={{ span: 7, offset: 1 }}
                    className="formfield"
                    style={{ marginTop: '1%' }}
                  >
                    {chequeBookEnabled ? (
                      <AntInput bordered={false} label={t('cheque_no')} name="CheqId" required={isChequeNoCompulsory} />
                    ) : (
                      <AntSelectDynamic
                        bordered={false}
                        fieldValue="Id"
                        fieldLabel="ChequeNo"
                        name="CheqId"
                        label={t('cheque_no')}
                        required={isChequeNoCompulsory}
                        options={chequeBookOptions}
                      />
                    )}
                  </Col>
                  <Col
                    xs={{ span: 24, offset: 0 }}
                    sm={{ span: 21, offset: 1 }}
                    md={{ span: 11, offset: 1 }}
                    lg={{ span: 11, offset: 1 }}
                    xl={{ span: 7, offset: 1 }}
                    className="formfield payment"
                    style={{ marginTop: '1%' }}
                  >
                    <AntInput name="PayeeTitle" bordered={false} label={t('pay_title')} />
                  </Col>
                  <Col
                    xs={{ span: 24, offset: 0 }}
                    sm={{ span: 21, offset: 1 }}
                    md={{ span: 18, offset: 0 }}
                    lg={{ span: 15, offset: 0 }}
                    xl={{ span: 15, offset: 0 }}
                    style={{ marginTop: '1%' }}
                    className="formfield"
                  >
                    <AntInput bordered={false} name="Remarks" label={t('remarks')} />
                  </Col>
                  <AntInput bordered={false} label={t('')} name="VoucherAmount" style={{ display: 'none' }} />
                  <Col
                    xs={{ span: 18, offset: 2 }}
                    sm={{ span: 22, offset: 1 }}
                    md={{ span: 24, offset: 19 }}
                    lg={{ span: 24, offset: 17 }}
                    xl={{ span: 10, offset: 16 }}
                    style={{ marginTop: '-3%' }}
                    className="checkbox"
                  >
                    <label>
                      <Form.Item name="IsTaxable" valuePropName="checked" initialValue={true}>
                        <Checkbox onChange={(e) => handleCheckboxChange(e.target.checked, 'IsTaxable')}>
                          {t('print_preview')}
                        </Checkbox>
                      </Form.Item>
                    </label>
                  </Col>
                </div>
              </Card>
            </Col>
          </Card>
        </Col>
      </Row>
      <br />
      <br />
    </>
  );
};

type TDynamicForm = { form: FormInstance; setBankId: any; bankId: any };

export default MainEntry;
