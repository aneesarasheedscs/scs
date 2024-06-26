import { map } from 'lodash';
import {
  useGetAccountsBalance,
  useGetBankReceiptProjectSelect,
  useGetChequeNoSelect,
  useGetConfigration,
  useGetDebitAccountSelect,
  useGetWHTAgainstAcSelect,
} from '../queries/queries';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { Card, Checkbox, Col, Row, FormInstance, Form } from 'antd';
import { AntDatePicker, AntInput, AntSelectDynamic } from '@tradePro/components';

const MainEntry = ({
  form,
  setBankId,
  bankId,
  setSharedStateIncludeWHT,
  SharedStateIncludeWHT,
  ScheduleData,
  setType,
}: TDynamicForm) => {
  const { t } = useTranslation();
  const { data } = useGetAccountsBalance(bankId);
  const { data: filter } = useGetWHTAgainstAcSelect();
  const { data: project, isSuccess, isLoading } = useGetBankReceiptProjectSelect();
  const [chequeBookEnabled, setChequeBookEnabled] = useState(false);
  const { data: chequeBooks } = useGetChequeNoSelect(bankId);
  const { data: chequeNoCompulsoryConfig } = useGetConfigration('ChequeNoCompulsoryOnBpv');
  const isChequeNoCompulsory = chequeNoCompulsoryConfig?.data?.Data?.Result === 'True';
  useEffect(() => {
    if (data?.data?.Data?.Result?.[0]?.Balance !== undefined) {
      form.setFieldsValue({ Balance: data?.data?.Data?.Result?.[0]?.Balance });
    }
  }, [bankId, data?.data?.Data?.Result]);
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
  const voucherType: TVoucherType[] = [
    { Id: 4, Type: 'BRV' },
    { Id: 3, Type: 'CRV' },
  ];

  const chequeBookOptions =
    chequeBooks?.data?.Data?.Result?.map((chequeBook: any) => ({
      label: chequeBook.CheqNo,
      value: chequeBook.Id,
    })) || [];
  const handleTypeChange = (value: number) => {
    console.log(value);
    setType(value);
  };
  return (
    <>
      <Row gutter={[10, 10]} style={{ marginTop: '-0.5%' }}>
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
                  bordered={false}
                  label={t('cost_center')}
                  fieldValue="Id"
                  fieldLabel="ProjectName"
                  name="ProjectId"
                  query={useGetBankReceiptProjectSelect}
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
                  defaultValue={4}
                  onChange={(value) => {
                    handleTypeChange(value);
                  }}
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
                    query={() => useGetDebitAccountSelect(form.getFieldValue('Type'))}
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
                md={{ span: 8 }}
                lg={{ span: 8 }}
                xl={{ span: 6 }}
                xxl={{ span: 6 }}
                className="formfield date"
                style={{ marginTop: '1%' }}
              >
                <AntDatePicker bordered={false} name="ChequeDate" label={t('cheque_date')} />
              </Col>
              <Col
                xs={{ span: 23 }}
                sm={{ span: 22 }}
                md={{ span: 12 }}
                lg={{ span: 12 }}
                xl={{ span: 7 }}
                xxl={{ span: 3 }}
                className="formfield cheqno"
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
                xs={{ span: 23 }}
                sm={{ span: 22 }}
                md={{ span: 11 }}
                lg={{ span: 11 }}
                xl={{ span: 10 }}
                xxl={{ span: 6 }}
                className="formfield payment"
                style={{ marginTop: '1%' }}
              >
                <AntInput name="PayeeTitle" bordered={false} label={t('pay_title')} />
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
  setBankId: (id: number | null) => void;
  bankId: number | null;
  setSharedStateIncludeWHT: (id: boolean) => void;
  SharedStateIncludeWHT: boolean;
  ScheduleData: any;
  setType: (value: number) => void;
};

export default MainEntry;
