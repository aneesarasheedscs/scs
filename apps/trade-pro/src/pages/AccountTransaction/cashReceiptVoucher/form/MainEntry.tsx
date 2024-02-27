import { map } from 'lodash';
import {
  useGetAccountsBalance,
  useGetCashReceiptProjectSelect,
  useGetDebitAccountSelect,
  useGetWHTAgainstAcSelect,
} from '../queries/queries';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { Card, Checkbox, Col, Row, FormInstance, Form } from 'antd';
import { AntInput, AntSelectDynamic } from '@tradePro/components';

const MainEntry = ({
  form,
  setBankId,
  bankId,
  setSharedStateIncludeWHT,
  SharedStateIncludeWHT,
  ScheduleData,
}: TDynamicForm) => {
  const { t } = useTranslation();
  const { data } = useGetAccountsBalance(bankId);
  const { data: filter } = useGetWHTAgainstAcSelect();
  const { data: project, isSuccess, isLoading } = useGetCashReceiptProjectSelect();
  const { data: debit } = useGetDebitAccountSelect();
  useEffect(() => {
    if (data?.data?.Data?.Result?.[0]?.Balance !== undefined) {
      form.setFieldsValue({ Balance: data?.data?.Data?.Result?.[0]?.Balance });
    }
  }, [debit, bankId, data?.data?.Data?.Result]);
  useEffect(() => {
    if (isSuccess && !isLoading) {
      form.setFieldValue('ProjectId', project?.data?.Data?.Result?.[0]?.ProjectName);
    }
  }, [isSuccess, !isLoading]);
  useEffect(() => {
    if (SharedStateIncludeWHT && ScheduleData) {
      form.setFieldValue('AgainstAccountId', ScheduleData?.TaxGLAccountId);
    } else {
      form.setFieldValue('AgainstAccountId', ScheduleData?.TaxGLAccountId);
    }
  }, [form, SharedStateIncludeWHT, ScheduleData]);

  const handleDebitAccountChange = (accountId?: any) => {
    setBankId(accountId);
  };

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
  const voucherType: TVoucherType[] = [{ Id: 1, Type: 'CRV' }];

  return (
    <>
      <Row gutter={[10, 10]} style={{ marginTop: '-0.5%', marginBottom: '0.8%' }}>
        <Col span={24}>
          <Card style={{ paddingBottom: '0.5%', boxShadow: '2px 4px 12px 1px gray' }}>
            <div
              className="form-list-container"
              style={{ border: ' ', display: 'flex', justifyContent: 'space-between' }}
            >
              <Col
                xs={{ span: 23 }}
                sm={{ span: 22 }}
                md={{ span: 11 }}
                lg={{ span: 11 }}
                xl={{ span: 10 }}
                xxl={{ span: 6 }}
                className="formfield project"
              >
                <AntSelectDynamic
                  disabled
                  bordered={false}
                  label={t('cost_center')}
                  fieldValue="Id"
                  fieldLabel="ProjectName"
                  name="ProjectId"
                  query={useGetCashReceiptProjectSelect}
                />
              </Col>
              <Col
                xs={{ span: 23 }}
                sm={{ span: 22 }}
                md={{ span: 12 }}
                lg={{ span: 12 }}
                xl={{ span: 6 }}
                xxl={{ span: 3 }}
                className="formfield voucher"
              >
                <AntSelectDynamic
                  disabled
                  aria-readonly
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

              <Col
                xs={{ span: 23 }}
                sm={{ span: 22 }}
                md={{ span: 11 }}
                lg={{ span: 11 }}
                xl={{ span: 7 }}
                xxl={{ span: 6 }}
                className="formfield balance"
                style={{ marginTop: '-1.1rem', borderBottom: '1px solid gray', height: '50px' }}
              >
                <p style={{ marginLeft: '55%' }} className="cr">
                  Dr : <b> {numberFormatter(data?.data?.Data?.Result?.[0]?.Balance)}</b>
                </p>

                <p style={{ marginTop: -4 }}>
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
                xs={{ span: 19 }}
                sm={{ span: 18 }}
                md={{ span: 12 }}
                lg={{ span: 12 }}
                xl={{ span: 8 }}
                xxl={{ span: 6 }}
                className="formfield against"
              >
                <AntSelectDynamic
                  bordered={false}
                  label={t('against_ac')}
                  fieldValue="Id"
                  fieldLabel="AccountTitle"
                  name="AgainstAccountId"
                  disabled={!form.getFieldValue('IncludeWHT')}
                  options={map(filter, (item: any) => ({
                    value: item.Id,
                    label: item.AccountTitle,
                  }))}
                />
              </Col>
              <Col
                xs={{ span: 4 }}
                sm={{ span: 5 }}
                md={{ span: 1 }}
                lg={{ span: 1 }}
                xl={{ span: 2 }}
                xxl={{ span: 1 }}
                style={{ height: '20px' }}
                className="wht"
              >
                <Form.Item className="box" name="IncludeWHT" valuePropName="checked" initialValue={false}>
                  <Checkbox onChange={(e) => handleCheckboxChangeforWHT(e.target.checked, 'IncludeWHT')}>
                    {t('wht')}
                  </Checkbox>
                </Form.Item>
              </Col>

              <Col
                xs={{ span: 23 }}
                sm={{ span: 22 }}
                md={{ span: 12 }}
                lg={{ span: 12 }}
                xl={{ span: 13 }}
                xxl={{ span: 7 }}
                style={{ marginTop: '1%' }}
                className="formfield"
              >
                <AntInput bordered={false} name="Remarks" label={t('remarks')} />
              </Col>
              <AntInput
                bordered={false}
                label={t('')}
                name="VoucherAmount"
                style={{ display: 'none', visibility: 'hidden' }}
              />
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
};

type TDynamicForm = {
  form: FormInstance;
  setBankId: (id: number) => void;
  bankId: number | null;
  setSharedStateIncludeWHT: (id: boolean) => void;
  SharedStateIncludeWHT: boolean;
  ScheduleData: any;
};

export default MainEntry;
