import { AntInput, AntSelectDynamic } from '@tradePro/components';
import { Card, Checkbox, Col, Row, Form, FormInstance } from 'antd';
import { useTranslation } from 'react-i18next';
import {
  useGetAccountsBalance,
  useGetCashPaymentProjectSelect,
  useGetCreditAccountSelect,
  useGetWHTAgainstAcSelect,
} from '../queries/queries';
import { map } from 'lodash';
import { useEffect } from 'react';
import { isWithHoldingCheckedAtom, selectedAgainstAccountAtom, selectedCreditAccountAtom, totalValue } from './Atom';
import { useAtom } from 'jotai';

function MainEntry({ form, setBankId, bankId, isAddButtonClicked, setSharedStateIncludeWHT }: TDynamicForm) {
  const { t } = useTranslation();

  const handleCheckboxChangeforWHT = (isChecked: boolean, fieldName: string) => {
    setIsWithHoldingChecked(isChecked);
    form.setFieldsValue({
      [fieldName]: isChecked,
    });
  };

  const [totalDebitAmounts, setTotalDebitAmounts] = useAtom(totalValue);
  const { data: credit } = useGetCreditAccountSelect();
  const { data } = useGetAccountsBalance(bankId);

  const [selectedCreditAccount, setSelectedCreditAccount] = useAtom(selectedCreditAccountAtom);
  const [againstAccountAtom, setAgainstAccountAtom] = useAtom(selectedAgainstAccountAtom);
  const [isWithHoldingChecked, setIsWithHoldingChecked] = useAtom(isWithHoldingCheckedAtom);

  const { data: whtAgainst } = useGetWHTAgainstAcSelect();
  const { data: project } = useGetCashPaymentProjectSelect();

  useEffect(() => {
    form.setFieldValue('ProjectId', project?.data?.Data?.Result?.[0]?.ProjectName);
    // form.setFieldValue('VoucherAmount', totalDebitAmounts);
    if (data?.data?.Data?.Result?.[0]?.Balance !== undefined) {
      form.setFieldsValue({ Balance: data?.data?.Data?.Result?.[0]?.Balance.toFixed(2) });
    }
  }, [credit, bankId, totalDebitAmounts, data?.data?.Data?.Result]);

  const handleCreditAccountChange = (accountId?: any, index?: any) => {
    const balance = data?.data?.Data?.Result?.[0]?.Balance.toFixed(2);
    form.setFieldValue(['voucherDetailList', index, 'Balance'], balance);
    console.log('abc', balance);
    setSelectedCreditAccount(accountId);
    setBankId(accountId);
  };

  const handleAgainstAccountChange = (accountId?: any) => {
    setAgainstAccountAtom(accountId);
  };

  interface TVoucherType {
    Id: number;
    Type: string;
  }
  const voucherType: TVoucherType[] = [{ Id: 1, Type: 'CPV' }];

  return (
    <>
      <Row gutter={[10, 10]} style={{ marginTop: '-2%' }}>
        <Col span={24}>
          <Card style={{ paddingBottom: '0.5%', boxShadow: '2px 4px 12px 1px gray' }}>
            <div className="form-list-container">
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
                  query={useGetCashPaymentProjectSelect}
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
                  name=""
                  options={map(voucherType, (item: any) => ({
                    value: item.Id,
                    label: item.Type,
                  }))}
                  defaultValue={1}
                />
              </Col>
              <Col
                xs={{ span: 23, offset: 0 }}
                sm={{ span: 22, offset: 1 }}
                md={{ span: 10, offset: 0 }}
                lg={{ span: 10, offset: 0 }}
                xl={{ span: 7, offset: 1 }}
                xxl={{ span: 5, offset: 1 }}
                className="formfield balance"
              >
                <p style={{ marginTop: -18, marginLeft: '50%' }} className="cr">
                  Cr : <b> {data?.data?.Data?.Result?.[0]?.Balance.toFixed(2)}</b>
                </p>

                <p style={{ marginTop: -4 }}>
                  <AntSelectDynamic
                    bordered={false}
                    required
                    label={t('credit_account')}
                    fieldValue="Id"
                    fieldLabel="AccountTitle"
                    name="RefAccountId"
                    query={useGetCreditAccountSelect}
                    onChange={(accountId) => handleCreditAccountChange(accountId)}
                    disabled={!isAddButtonClicked}
                  />
                </p>
              </Col>

              <Col
                xs={{ span: 18, offset: 0 }}
                sm={{ span: 18, offset: 1 }}
                md={{ span: 10, offset: 1 }}
                lg={{ span: 10, offset: 1 }}
                xl={{ span: 7, offset: 0 }}
                xxl={{ span: 5, offset: 1 }}
                className="formfield against"
              >
                <AntSelectDynamic
                  required={form.getFieldValue('IncludeWHT') ? true : false}
                  bordered={false}
                  label={t('wht_against_ac')}
                  fieldValue="Id"
                  fieldLabel="AccountTitle"
                  name="RefDocNoId"
                  disabled={!form.getFieldValue('IncludeWHT') /*isWithHoldingChecked*/}
                  options={map(whtAgainst, (item: any) => ({
                    value: item.Id,
                    label: item.AccountTitle,
                  }))}
                  onChange={(accountId) => handleAgainstAccountChange(accountId)}
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
                className="formfield remarks"
              >
                <AntInput bordered={false} name="Remarks" label={t('remarks')} />
                <AntInput bordered={false} label={t('')} name="VoucherAmount" style={{ display: 'none' }} />
              </Col>
            </div>
          </Card>
        </Col>
      </Row>
      <br />
    </>
  );
}

type TDynamicForm = {
  form: FormInstance;
  setBankId: any;
  bankId: any;
  isAddButtonClicked: any;
  setSharedStateIncludeWHT: any;
};

export default MainEntry;
