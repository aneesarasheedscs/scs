import { AntDatePicker, AntInput, AntSelectDynamic } from '@tradePro/components';
import { Card, Checkbox, Col, Row, Form, FormInstance } from 'antd';
import { useTranslation } from 'react-i18next';
import {
  useGetAccountsBalance,
  useGetCashPaymentBranchSelect,
  useGetCashPaymentCompanySelect,
  useGetCashPaymentProjectSelect,
  useGetCreditAccountSelect,
  useGetWHTAgainstAcSelect,
} from '../queries/queries';
import { map } from 'lodash';
import { useEffect } from 'react';
import { isWithHoldingCheckedAtom } from './Atom';
import { useAtom } from 'jotai';

function MainEntry({ form, setBankId, bankId, setAgainstAccountId }: TDynamicForm) {
  const { t } = useTranslation();
  const [isWithHoldingChecked] = useAtom(isWithHoldingCheckedAtom);
  const { data: credit } = useGetCreditAccountSelect();
  const { data } = useGetAccountsBalance(bankId);
  const { data: company, isSuccess, isLoading } = useGetCashPaymentCompanySelect();
  const { data: bank } = useGetCashPaymentBranchSelect();
  const { data: project, isSuccess: projectSuccess } = useGetCashPaymentProjectSelect();
  useEffect(() => {
    if (isSuccess && projectSuccess && !isLoading) {
      form.setFieldValue('CompanyId', company?.data?.Data?.Result?.[0]?.CompName);
      form.setFieldValue('BranchId', bank?.data?.Data?.Result?.[0]?.BranchName);
      form.setFieldValue('ProjectId', project?.data?.Data?.Result?.[0]?.ProjectName);
      form.setFieldValue('AgainstAccountId', credit?.data?.Data?.Result?.[0]?.AccountTitle);
    }
  }, [isSuccess, projectSuccess, !isLoading]);

  // For Credit Account

  const handleCreditAccountChange = (accountId?: number) => {
    setBankId(accountId);
    setAgainstAccountId(accountId);
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
  const voucherType: TVoucherType[] = [{ Id: 1, Type: 'CPV' }];

  return (
    <>
      <Row gutter={[10, 10]} style={{ marginTop: '-1%' }}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Card style={{ paddingBottom: '0.5%', boxShadow: '2px 4px 12px 1px gray' }}>
            <div className="form-list-container">
              <Col
                xs={{ span: 20, offset: 1 }}
                sm={{ span: 21, offset: 1 }}
                md={{ span: 11, offset: 0 }}
                lg={{ span: 11, offset: 0 }}
                xl={{ span: 5, offset: 0 }}
                className="formfield company"
              >
                <AntSelectDynamic
                  autoFocus
                  bordered={false}
                  label={t('company')}
                  fieldValue="Id"
                  fieldLabel="CompName"
                  name="CompanyId"
                  query={useGetCashPaymentCompanySelect}
                />
              </Col>
              <Col
                xs={{ span: 20, offset: 1 }}
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
                  query={useGetCashPaymentBranchSelect}
                />
              </Col>
              <Col
                xs={{ span: 20, offset: 1 }}
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
                  query={useGetCashPaymentProjectSelect}
                />
              </Col>
              <Col
                xs={{ span: 20, offset: 1 }}
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
                  name="Id"
                  options={map(voucherType, (item: any) => ({
                    value: item.Id,
                    label: item.Type,
                  }))}
                  defaultValue={1}
                />
              </Col>
            </div>
            <br /> <br />
            <Col xs={23} sm={23} md={23} lg={23} xl={23}>
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
                    style={{ marginTop: '-1.3rem', borderBottom: '1px solid gray', height: '60px' }}
                    className="formfield balance"
                  >
                    <p style={{ marginTop: -15 }}>
                      {t('credit_account_balance')} : <b> {data?.data?.Data?.Result?.[0]?.Balance.toFixed(2)}</b>
                    </p>

                    <p style={{ marginTop: 12 }}>
                      <AntSelectDynamic
                        bordered={false}
                        required
                        label={t('credit_account')}
                        fieldValue="Id"
                        fieldLabel="AccountTitle"
                        name="RefAccountId"
                        query={useGetCreditAccountSelect}
                        onChange={(accountId) => handleCreditAccountChange(accountId)}
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
                      label={t('wht_against_ac')}
                      fieldValue="Id"
                      fieldLabel="AccountTitle"
                      name="AgainstAccountId"
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
                    xl={{ span: 15, offset: 0 }}
                    style={{ marginTop: '1%' }}
                    className="formfield"
                  >
                    <AntInput bordered={false} name="Remarks" label={t('remarks')} />
                  </Col>
                  <Col
                    xs={{ span: 18, offset: 0 }}
                    sm={{ span: 22, offset: 1 }}
                    md={{ span: 22, offset: 0 }}
                    lg={{ span: 24, offset: 0 }}
                    xl={{ span: 10, offset: 17 }}
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
}

type TDynamicForm = { form: FormInstance; setBankId: any; bankId: any; setAgainstAccountId: any };

export default MainEntry;
