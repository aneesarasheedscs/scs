import { AntDatePicker, AntInput, AntSelectDynamic } from '@tradePro/components';
import { Card, Checkbox, Col, Row, Form, FormInstance } from 'antd';
import { useTranslation } from 'react-i18next';
import {
  useGetAccountsBalance,
  useGetCashReceiptProjectSelect,
  useGetCreditAccountSelect,
  useGetWHTAgainstAcSelect,
} from '../queries/queries';
import { map } from 'lodash';
import { useEffect } from 'react';
import { isWithHoldingCheckedAtom, selectedCreditAccountAtom } from './Atom';
import { useAtom } from 'jotai';

function MainEntry({ form, setBankId, bankId, setAgainstAccountId }: TDynamicForm) {
  const { t } = useTranslation();
  const { data } = useGetAccountsBalance(bankId);
  const [isWithHoldingChecked, setIsWithHoldingChecked] = useAtom(isWithHoldingCheckedAtom);
  const [selectedCreditAccount, setSelectedCreditAccount] = useAtom(selectedCreditAccountAtom);
  const { data: project, isSuccess, isLoading } = useGetCashReceiptProjectSelect();

  useEffect(() => {
    if (isSuccess && !isLoading) {
      form.setFieldValue('ProjectId', project?.data?.Data?.Result?.[0]?.ProjectName);
    }
  }, [isSuccess]);

  // For Credit Account

  const handleCreditAccountChange = (accountId?: number) => {
    setBankId(accountId);
    setAgainstAccountId(accountId);
    setSelectedCreditAccount(accountId);
  };

  const { data: filter } = useGetWHTAgainstAcSelect();

  interface TVoucherType {
    Id: number;
    Type: string;
  }
  const voucherType: TVoucherType[] = [{ Id: 1, Type: 'CRV' }];

  const handleCheckboxChangeforWHT = (isChecked: boolean, fieldName: string) => {
    setIsWithHoldingChecked(isChecked);
    form.setFieldsValue({
      [fieldName]: isChecked,
    });
  };

  return (
    <>
      <Row gutter={[10, 10]} style={{ marginTop: '-1%' }}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Card style={{ paddingBottom: '0.5%', boxShadow: '2px 4px 12px 1px gray' }}>
            <div className="form-list-container">
              {/* <Col
                xs={{ span: 20, offset: 1 }}
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
                  query={useGetCashReceiptCompanySelect}
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
                  query={useGetCashReceiptBranchSelect}
                />
              </Col> */}
              <Col
                xs={{ span: 23, offset: 0 }}
                sm={{ span: 22, offset: 1 }}
                md={{ span: 11, offset: 0 }}
                lg={{ span: 11, offset: 0 }}
                xl={{ span: 9, offset: 0 }}
                xxl={{ span: 6, offset: 0 }}
                className="formfield project"
              >
                <AntSelectDynamic
                  bordered={false}
                  label={t('cost_center')}
                  fieldValue="Id"
                  fieldLabel="ProjectName"
                  name="ProjectId"
                  query={useGetCashReceiptProjectSelect}
                />
              </Col>
              <Col
                xs={{ span: 23, offset: 0 }}
                sm={{ span: 22, offset: 1 }}
                md={{ span: 11, offset: 1 }}
                lg={{ span: 11, offset: 1 }}
                xl={{ span: 5, offset: 1 }}
                xxl={{ span: 3, offset: 1 }}
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

              {/* <Col
                    xs={{ span: 24, offset: 0 }}
                    sm={{ span: 21, offset: 1 }}
                    md={{ span: 11, offset: 0 }}
                    lg={{ span: 11, offset: 0 }}
                    xl={{ span: 7, offset: 0 }}
                    className="formfield date"
                  >
                    <AntDatePicker bordered={false} name="VoucherDate" label={t('voucher_date')} />
                  </Col> */}
              <Col
                xs={{ span: 23, offset: 0 }}
                sm={{ span: 22, offset: 1 }}
                md={{ span: 11, offset: 0 }}
                lg={{ span: 11, offset: 0 }}
                xl={{ span: 7, offset: 1 }}
                xxl={{ span: 5, offset: 1 }}
                className="formfield balance"
              >
                <p style={{ marginTop: -18, marginLeft: '50%' }} className="dr">
                  Dr : <b> {data?.data?.Data?.Result?.[0]?.Balance.toFixed(2)}</b>
                </p>

                <p style={{ marginTop: -4 }}>
                  <AntSelectDynamic
                    required
                    bordered={false}
                    label={t('debit_account')}
                    fieldValue="Id"
                    fieldLabel="AccountTitle"
                    name="AccountId"
                    query={useGetCreditAccountSelect}
                    onChange={(accountId) => handleCreditAccountChange(accountId)}
                  />
                </p>
              </Col>
              <Col
                xs={{ span: 18, offset: 0 }}
                sm={{ span: 18, offset: 1 }}
                md={{ span: 9, offset: 1 }}
                lg={{ span: 9, offset: 1 }}
                xl={{ span: 7, offset: 0 }}
                xxl={{ span: 5, offset: 1 }}
                className="formfield against"
              >
                <AntSelectDynamic
                  bordered={false}
                  label={t('against_ac')}
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
                xs={{ span: 2 }}
                sm={{ span: 2 }}
                md={{ span: 2 }}
                lg={{ span: 2 }}
                xl={{ span: 3 }}
                xxl={{ span: 1 }}
                style={{ height: '20px' }}
                className="wht"
              >
                <Form.Item name="IncludeWHT" valuePropName="checked" initialValue={false}>
                  <Checkbox onChange={(e) => handleCheckboxChangeforWHT(e.target.checked, 'IncludeWHT')}>
                    {t('wht')}
                  </Checkbox>
                </Form.Item>
              </Col>
              <Col
                xs={{ span: 23, offset: 0 }}
                sm={{ span: 22, offset: 1 }}
                md={{ span: 23, offset: 0 }}
                lg={{ span: 23, offset: 0 }}
                xl={{ span: 13, offset: 0 }}
                xxl={{ span: 16, offset: 0 }}
                style={{ marginTop: '1%' }}
                className="formfield remarks"
              >
                <AntInput bordered={false} name="Remarks" label={t('remarks')} />
              </Col>
            </div>
          </Card>
        </Col>
      </Row>
      <br />
    </>
  );
}

type TDynamicForm = { form: FormInstance; setBankId: any; bankId: any; setAgainstAccountId: any };

export default MainEntry;
