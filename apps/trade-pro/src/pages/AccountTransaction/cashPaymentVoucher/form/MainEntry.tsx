import {
  useGetAccountsBalance,
  useGetCashPaymentProjectSelect,
  useGetCreditAccountSelect,
  useGetWHTAgainstAcSelect,
} from '../queries/queries';
import { map } from 'lodash';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AntInput, AntSelectDynamic } from '@tradePro/components';
import { Card, Checkbox, Col, Row, Form, FormInstance } from 'antd';
import { numberFormatter } from '@tradePro/utils/numberFormatter';

function MainEntry({
  form,
  setBankId,
  bankId,
  isAddButtonClicked,
  setSharedStateIncludeWHT,
  SharedStateIncludeWHT,
  ScheduleData,
}: TDynamicForm) {
  const { t } = useTranslation();
  const handleCheckboxChangeforWHT = (isChecked: boolean, fieldName: string) => {
    setSharedStateIncludeWHT(isChecked);
    form.setFieldsValue({
      [fieldName]: isChecked,
    });
  };

  const { data: project } = useGetCashPaymentProjectSelect();
  const { data: credit } = useGetCreditAccountSelect();
  const { data } = useGetAccountsBalance(bankId);
  const { data: whtAgainst } = useGetWHTAgainstAcSelect();
  useEffect(() => {
    form.setFieldValue('ProjectId', project?.data?.Data?.Result?.[0]?.ProjectName);
    if (data?.data?.Data?.Result?.[0]?.Balance !== undefined) {
      form.setFieldsValue({ Balance: data?.data?.Data?.Result?.[0]?.Balance.toFixed(2) });
    }
  }, [credit, bankId, data?.data?.Data?.Result, form]);
  useEffect(() => {
    if (SharedStateIncludeWHT && ScheduleData) {
      form.setFieldValue('RefDocNoId', ScheduleData?.TaxGLAccountId);
    } else {
      form.setFieldValue('RefDocNoId', ScheduleData?.TaxGLAccountId);
    }
  }, [form, SharedStateIncludeWHT, ScheduleData]);
  const handleCreditAccountChange = (accountId?: any, index?: any) => {
    const balance = data?.data?.Data?.Result?.[0]?.Balance.toFixed(2);
    form.setFieldValue(['voucherDetailList', index, 'Balance'], numberFormatter(balance));
    setBankId(accountId);
  };

  interface TVoucherType {
    Id: number;
    Type: string;
  }
  const voucherType: TVoucherType[] = [{ Id: 1, Type: 'CPV' }];
  return (
    <>
      <Card bordered={false}>
        <Row justify={'space-between'} gutter={[0, 0]} style={{ marginTop: '-1%' }}>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 12 }}
            lg={{ span: 12 }}
            xl={{ span: 9 }}
            xxl={{ span: 7 }}
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
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 11 }}
            lg={{ span: 11 }}
            xl={{ span: 5 }}
            xxl={{ span: 3 }}
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
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 12 }}
            lg={{ span: 12 }}
            xl={{ span: 9 }}
            xxl={{ span: 6 }}
            className="formfield balance"
          >
            <p style={{ marginTop: -18, marginLeft: '75%', color: 'blue' }} className="cr">
              {data ? (
                <b>Cr: {numberFormatter(data?.data?.Data?.Result?.[0]?.Balance)}</b>
              ) : (
                <p style={{ visibility: 'hidden' }}> Balance </p>
              )}
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
            xs={{ span: 21 }}
            sm={{ span: 21 }}
            md={{ span: 9 }}
            lg={{ span: 9 }}
            xl={{ span: 8 }}
            xxl={{ span: 6 }}
            className="formfield against"
          >
            <AntSelectDynamic
              required={form.getFieldValue('IncludeWHT') ? true : false}
              bordered={false}
              label={t('wht_against_ac')}
              fieldValue="Id"
              fieldLabel="AccountTitle"
              name="RefDocNoId"
              disabled={!form.getFieldValue('IncludeWHT')}
              options={map(whtAgainst, (item: any) => ({
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
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 24 }}
            lg={{ span: 24 }}
            xl={{ span: 14 }}
            xxl={{ span: 24 }}
            className="formfield"
          >
            <AntInput bordered={false} name="Remarks" label={t('remarks')} />
            <AntInput bordered={false} label={t('')} name="VoucherAmount" style={{ display: 'none' }} />
          </Col>
        </Row>
      </Card>
    </>
  );
}

type TDynamicForm = {
  form: FormInstance;
  setBankId: (id: number) => void;
  bankId: number | null;
  isAddButtonClicked: boolean;
  setSharedStateIncludeWHT: (id: boolean) => void;
  SharedStateIncludeWHT: boolean;
  ScheduleData: any;
};

export default MainEntry;
