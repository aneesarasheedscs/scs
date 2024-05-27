import { map } from 'lodash';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AntInput, AntSelectDynamic } from '@tradePro/components';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { Card, Checkbox, Col, Row, Form, FormInstance } from 'antd';
import { useGetAccountsBalance, useGetCreditAccountSelect, useGetWHTAgainstAcSelect } from '../queries/queries';

function MainEntry({
  form,
  setBankId,
  bankId,
  SharedStateIncludeWHT,
  setSharedStateIncludeWHT,
  ScheduleData,
  isAddButtonClicked,
}: TDynamicForm) {
  const { t } = useTranslation();
  const { data: credit } = useGetCreditAccountSelect();
  const { data } = useGetAccountsBalance(bankId);
  const { data: filter } = useGetWHTAgainstAcSelect();

  useEffect(() => {
    if (data?.data?.Data?.Result?.[0]?.Balance !== undefined) {
      form.setFieldsValue({ Balance: numberFormatter(data?.data?.Data?.Result?.[0]?.Balance) });
    }
  }, [credit, data?.data?.Data?.Result]);
  useEffect(() => {
    if (SharedStateIncludeWHT && ScheduleData) {
      form.setFieldValue('AgainstAccountId', ScheduleData?.TaxGLAccountId);
    } else {
      form.setFieldValue('AgainstAccountId', ScheduleData?.TaxGLAccountId);
    }
  }, [form, SharedStateIncludeWHT, ScheduleData]);
  const handleCreditAccountChange = (accountId: number, index?: any) => {
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
      <>
        <>
          <Card bordered={false} style={{ boxShadow: ' ' }}>
            <Row gutter={[0, 0]} justify={'space-between'} style={{ marginTop: '-1%' }}>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 23 }}
                md={{ span: 11 }}
                lg={{ span: 11 }}
                xl={{ span: 5 }}
                xxl={{ span: 3 }}
                className="formfield"
                style={{ marginLeft: -3 }}
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
                className="formfield"
                style={{ marginLeft: -10 }}
              >
                <p style={{ marginTop: -18, marginLeft: '65%' }} className="cr">
                  Cr : <b> {numberFormatter(data?.data?.Data?.Result?.[0]?.Balance)}</b>
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
                md={{ span: 11 }}
                lg={{ span: 11 }}
                xl={{ span: 7 }}
                xxl={{ span: 8 }}
                className="formfield"
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
                md={{ span: 11 }}
                lg={{ span: 11 }}
                xl={{ span: 2 }}
                xxl={{ span: 2 }}
                style={{ marginTop: '0.5%' }}
                // className="wht"
              >
                <Row style={{ height: 30 }}>
                  <Col>
                    <Form.Item className="box" name="IncludeWHT" valuePropName="checked" initialValue={false}>
                      <Checkbox onChange={(e) => handleCheckboxChangeforWHT(e.target.checked, 'IncludeWHT')}>
                        {t('wht')}
                      </Checkbox>
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col xxl={2} xl={2} lg={0}></Col>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 23 }}
                md={{ span: 24 }}
                lg={{ span: 24 }}
                xl={{ span: 19 }}
                xxl={{ span: 19 }}
                style={{ marginTop: '0%' }}
                className="formfield"
              >
                <p className="formfield" style={{ width: '102%', border: '' }}>
                  <AntInput bordered={false} name="Remarks" label={t('remarks')} />
                </p>

                <AntInput bordered={false} label={t('')} name="VoucherAmount" style={{ display: 'none' }} />
              </Col>
            </Row>
          </Card>
        </>
      </>
    </>
  );
}
type TDynamicForm = {
  form: FormInstance;
  setBankId: (id: number | null) => void;
  bankId: number | null;
  SharedStateIncludeWHT: boolean;
  setSharedStateIncludeWHT: (id: boolean) => void;
  ScheduleData: any;
  isAddButtonClicked: boolean;
};

export default MainEntry;
