import { AntDatePicker, AntInput, AntSelectDynamic } from '@tradePro/components';
import { Card, Checkbox, Col, Row, FormInstance, Form } from 'antd';
import { map } from 'lodash';
import {
  useGetAccountsBalances,
  useGetConfigration,
  useGetContraBranchSelect,
  useGetContraChequeNoSelect,
  useGetContraCompanySelect,
  useGetContraCreditAccountSelect,
  useGetContraProjectSelect,
} from '../queries/queries';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAtom } from 'jotai';
import { totalValue } from './Atom';
import { numberFormatter } from '@tradePro/utils/numberFormatter';

function MainEntry({ form, setAgainstAccountId }: TDynamicForm) {
  const { t } = useTranslation();

  const [totalDebitAmounts, setTotalDebitAmounts] = useAtom(totalValue);
  const [chequeNoEnabled, setChequeNoEnabled] = useState(false);
  const [bankId, setBankId] = useState<number>(0);
  const { data } = useGetAccountsBalances(bankId);
  const { data: credit } = useGetContraCreditAccountSelect();
  const { data: chequeBooks } = useGetContraChequeNoSelect(bankId);
  const { data: chequeNoCompulsoryConfig } = useGetConfigration('ChequeBook Enabled');
  const isChequeNoCompulsory = chequeNoCompulsoryConfig?.data?.Data?.Result === 'True';
  const { data: company, isSuccess, isLoading } = useGetContraCompanySelect();
  const { data: branch, isSuccess: isSuccessBranch } = useGetContraBranchSelect();
  const { data: project, isSuccess: projectSuccess } = useGetContraProjectSelect();
  useEffect(() => {
    if (isSuccess && projectSuccess && !isLoading) {
      form.setFieldValue('CompanyId', company?.data?.Data?.Result?.[0]?.CompName);
      form.setFieldValue('BranchId', branch?.data?.Data?.Result?.[0]?.BranchName);
      form.setFieldValue('ProjectId', project?.data?.Data?.Result?.[0]?.ProjectName);
    }
  }, [isSuccess, isSuccessBranch]);

  const handleCreditAccountChange = (value: any) => {
    setBankId(value);
    setAgainstAccountId(value);
  };

  const chequeBookOptions =
    chequeBooks?.data?.Data?.Result?.map((chequeBook: any) => ({
      label: chequeBook.CheqNo,
      value: chequeBook.Id,
    })) || [];

  useEffect(() => {
    form.setFieldValue('VoucherAmount', totalDebitAmounts);
  }, [credit, bankId, totalDebitAmounts]);

  const handleCheckboxChange = (isChecked: boolean, fieldName: string) => {
    form.setFieldsValue({
      [fieldName]: isChecked,
    });
  };

  return (
    <>
      <Row gutter={[16, 16]} style={{ marginTop: '-2%' }}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Card style={{ paddingBottom: '0.5%', boxShadow: '2px 4px 12px 1px gray' }}>
            <div className="form-list-container">
              <Col
                xs={{ span: 24, offset: 0 }}
                sm={{ span: 23, offset: 0 }}
                md={{ span: 11, offset: 0 }}
                lg={{ span: 11, offset: 0 }}
                xl={{ span: 7, offset: 0 }}
                className="formfield"
              >
                <AntSelectDynamic
                  query={useGetContraCompanySelect}
                  bordered={false}
                  label={t('company')}
                  fieldValue="Id"
                  fieldLabel="CompName"
                  name="CompanyId"
                />
              </Col>

              <Col
                xs={{ span: 24, offset: 0 }}
                sm={{ span: 23, offset: 0 }}
                md={{ span: 11, offset: 1 }}
                lg={{ span: 11, offset: 1 }}
                xl={{ span: 7, offset: 1 }}
                className="formfield"
              >
                <AntSelectDynamic
                  bordered={false}
                  label={t('branch')}
                  fieldValue="Id"
                  fieldLabel="BranchName"
                  name="BranchId"
                  query={useGetContraBranchSelect}
                />
              </Col>
              <Col
                xs={{ span: 24, offset: 0 }}
                sm={{ span: 23, offset: 0 }}
                md={{ span: 11, offset: 0 }}
                lg={{ span: 11, offset: 0 }}
                xl={{ span: 7, offset: 1 }}
                className="formfield"
              >
                <AntSelectDynamic
                  bordered={false}
                  label={t('project')}
                  fieldValue="Id"
                  fieldLabel="ProjectName"
                  name="ProjectId"
                  query={useGetContraProjectSelect}
                />
              </Col>
            </div>
            <br /> <br />
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Card>
                <div className="form-list-container">
                  <Col
                    xs={{ span: 24, offset: 0 }}
                    sm={{ span: 23, offset: 0 }}
                    md={{ span: 11, offset: 0 }}
                    lg={{ span: 11, offset: 0 }}
                    xl={{ span: 7, offset: 0 }}
                    className="formfield"
                  >
                    <AntDatePicker bordered={false} name="VoucherDate" label={t('voucher_date')} />
                  </Col>
                  <Col
                    xs={{ span: 24, offset: 0 }}
                    sm={{ span: 23, offset: 0 }}
                    md={{ span: 11, offset: 1 }}
                    lg={{ span: 11, offset: 1 }}
                    xl={{ span: 7, offset: 1 }}
                    className="formfield"
                  >
                    <AntDatePicker bordered={false} name="ChequeDate" label={t('cheque_date')} />
                  </Col>

                  <Col
                    xs={{ span: 24, offset: 0 }}
                    sm={{ span: 23, offset: 0 }}
                    md={{ span: 11, offset: 0 }}
                    lg={{ span: 11, offset: 0 }}
                    xl={{ span: 7, offset: 1 }}
                    className="formfield"
                  >
                    {chequeNoEnabled ? (
                      <AntInput bordered={false} label={t('cheque_no')} name="CheqId" required={isChequeNoCompulsory} />
                    ) : (
                      <AntSelectDynamic
                        required={isChequeNoCompulsory}
                        bordered={false}
                        label={t('cheque_no')}
                        fieldValue="Id"
                        fieldLabel="CheqNo"
                        name="CheqId"
                        options={chequeBookOptions}
                      />
                    )}
                  </Col>
                  <Col
                    xs={{ span: 24, offset: 0 }}
                    sm={{ span: 23, offset: 0 }}
                    md={{ span: 11, offset: 1 }}
                    lg={{ span: 11, offset: 1 }}
                    xl={{ span: 7, offset: 0 }}
                    className="formfield paytitle"
                    style={{ marginTop: '1.2%' }}
                  >
                    <AntInput bordered={false} label={t('pay_title')} name="PayTitle" />
                  </Col>

                  <Col
                    xs={{ span: 24, offset: 0 }}
                    sm={{ span: 23, offset: 0 }}
                    md={{ span: 11, offset: 0 }}
                    lg={{ span: 11, offset: 0 }}
                    xl={{ span: 7, offset: 1 }}
                    className="formfield1"
                    style={{ marginTop: '0.2rem', borderBottom: '1px solid gray', height: '60px' }}
                  >
                    <p style={{ marginTop: 0 }}>
                      {t('credit_account_balance')} : <b> {numberFormatter(data?.data?.Data?.Result?.[0]?.Balance)}</b>
                    </p>
                    <p>
                      <AntSelectDynamic
                        required
                        bordered={false}
                        label={t('credit_account')}
                        fieldValue="Id"
                        fieldLabel="AccountTitle"
                        name="AgainstAccountId"
                        options={map(credit, (item: any) => ({
                          value: item.Id,
                          label: item.AccountTitle,
                        }))}
                        value={bankId}
                        onChange={(value) => handleCreditAccountChange(value)}
                      />
                    </p>
                  </Col>

                  <Col
                    xs={{ span: 23, offset: 0 }}
                    sm={{ span: 23, offset: 0 }}
                    md={{ span: 11, offset: 1 }}
                    lg={{ span: 11, offset: 1 }}
                    xl={{ span: 7, offset: 1 }}
                    style={{ marginTop: '1.2%' }}
                    className="formfield remark"
                  >
                    <AntInput bordered={false} label={t('remarks')} name="Remarks" style={{ width: '120%' }} />
                    <AntInput
                      bordered={false}
                      label={''}
                      name="VoucherAmount"
                      style={{ width: '120%', display: 'none' }}
                    />
                  </Col>

                  <Col
                    xs={{ span: 22, offset: 0 }}
                    sm={{ span: 22, offset: 0 }}
                    md={{ span: 22, offset: 0 }}
                    lg={{ span: 24, offset: 0 }}
                    xl={{ span: 24, offset: 0 }}
                    style={{ marginTop: '1.5%' }}
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
}

type TDynamicForm = { form: FormInstance; setAgainstAccountId: any };

export default MainEntry;
