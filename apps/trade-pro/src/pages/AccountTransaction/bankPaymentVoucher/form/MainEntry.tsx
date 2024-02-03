import { map } from 'lodash';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AntInput, AntSelectDynamic } from '@tradePro/components';
import { Card, Checkbox, Col, Row, Form, FormInstance } from 'antd';
import { useGetAccountsBalance, useGetCreditAccountSelect, useGetWHTAgainstAcSelect } from '../queries/queries';

function MainEntry({
  form,
  setBankId,
  bankId,
  setSharedStateIncludeWHT,
  SharedStateIncludeWHT,
  ScheduleData,
  isAddButtonClicked,
}: TDynamicForm) {
  const { t } = useTranslation();
  const { data: credit } = useGetCreditAccountSelect();
  const { data } = useGetAccountsBalance(bankId);
  const { data: filter } = useGetWHTAgainstAcSelect();

  useEffect(() => {
    if (data?.data?.Data?.Result?.[0]?.Balance !== undefined) {
      form.setFieldsValue({ Balance: data?.data?.Data?.Result?.[0]?.Balance.toFixed(2) });
    }
  }, [credit, bankId, data?.data?.Data?.Result]);
  useEffect(() => {
    if (SharedStateIncludeWHT && ScheduleData) {
      form.setFieldValue('AgainstAccountId', ScheduleData?.TaxGLAccountId);
    } else {
      form.setFieldValue('AgainstAccountId', ScheduleData?.TaxGLAccountId);
    }
  }, [form, SharedStateIncludeWHT, ScheduleData]);
  const handleCreditAccountChange = (accountId?: any, index?: any) => {
    setBankId(accountId);
  };
  const handleAgainstAccountChange = (accountId?: any) => {};

  const handleCheckboxChangeforWHT = (isChecked: boolean, fieldName: string) => {
    setSharedStateIncludeWHT(isChecked);
    form.setFieldsValue({
      [fieldName]: isChecked,
    });
  };

  interface TVoucherType {
    Id: number;
    Type: string;
  }
  const voucherType: TVoucherType[] = [{ Id: 1, Type: 'BPV' }];
  return (
    <>
      <Row gutter={[10, 10]} style={{ marginTop: '-0.5%' }}>
        <Col span={24}>
          <Card style={{ paddingBottom: '0.5%', boxShadow: '2px 4px 12px 1px gray' }}>
            <Row gutter={[10, 10]} justify={'space-between'} style={{ marginLeft: 10 }}>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 23 }}
                md={{ span: 11 }}
                lg={{ span: 11 }}
                xl={{ span: 5 }}
                xxl={{ span: 4 }}
                className="formfield"
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

              <Col
                xs={{ span: 24 }}
                sm={{ span: 23 }}
                md={{ span: 12 }}
                lg={{ span: 12 }}
                xl={{ span: 7 }}
                xxl={{ span: 8 }}
                className="formfield credit"
              >
                <p style={{ marginTop: -18, marginLeft: '65%' }} className="cr">
                  Cr : <b> {data?.data?.Data?.Result?.[0]?.Balance.toFixed(2)}</b>
                </p>

                <p style={{ marginTop: -4 }}>
                  <AntSelectDynamic
                    required
                    bordered={false}
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
                xs={{ span: 19 }}
                sm={{ span: 19 }}
                md={{ span: 9 }}
                lg={{ span: 9 }}
                xl={{ span: 7 }}
                xxl={{ span: 8 }}
                className="formfield against"
              >
                <AntSelectDynamic
                  required={form.getFieldValue('IncludeWHT') ? true : false}
                  bordered={false}
                  label={t('wht_against_ac')}
                  fieldValue="Id"
                  fieldLabel="AccountTitle"
                  name="AgainstAccountId"
                  disabled={!form.getFieldValue('IncludeWHT')}
                  options={map(filter, (item: any) => ({
                    value: item.Id,
                    label: item.AccountTitle,
                  }))}
                  onChange={(accountId) => handleAgainstAccountChange(accountId)}
                />
              </Col>
              <Col
                xs={{ span: 2 }}
                sm={{ span: 4 }}
                md={{ span: 2 }}
                lg={{ span: 2 }}
                xl={{ span: 2 }}
                xxl={{ span: 2 }}
                style={{ marginTop: '0.5%' }}
                className="wht"
              >
                <Form.Item className="box" name="IncludeWHT" valuePropName="checked" initialValue={false}>
                  <Checkbox onChange={(e) => handleCheckboxChangeforWHT(e.target.checked, 'IncludeWHT')}>
                    {t('wht')}
                  </Checkbox>
                </Form.Item>
              </Col>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 23 }}
                md={{ span: 12 }}
                lg={{ span: 12 }}
                xl={{ span: 13 }}
                xxl={{ span: 13 }}
                style={{ marginTop: '-2%' }}
                className="formfield remarks"
              >
                <AntInput bordered={false} name="Remarks" label={t('remarks')} />
                <AntInput bordered={false} label={t('')} name="VoucherAmount" style={{ display: 'none' }} />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
}
type TDynamicForm = {
  form: FormInstance;
  setBankId: any;
  bankId: any;
  setSharedStateIncludeWHT: any;
  SharedStateIncludeWHT: any;
  ScheduleData: any;
  isAddButtonClicked: any;
};

export default MainEntry;
