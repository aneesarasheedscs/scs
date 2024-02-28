import dayjs from 'dayjs';
import { map } from 'lodash';
import { useAtom } from 'jotai';
import {
  useGetAccountsBalance,
  useGetBankPaymentJobLotSelect,
  useGetBankPaymentTaxType,
  useGetConfigration,
  useGetDebitAccountSelect,
  useGetWHTAgainstAcSelect,
} from '../queries/queries';
import { addtableData } from './Atom';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import DetailEntryTable from './DetailEntryTable';
import { TCashPaymentDetailEntry, TTaxType, TjobLot } from './types';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { Card, Col, Row, Form, FormInstance, notification } from 'antd';
import { AntButton, AntInput, AntInputNumber, AntSelectDynamic } from '@tradePro/components';

const { useWatch } = Form;

const DynamicFormCPV = ({ form, SharedStateIncludeWHT, handleTaxTypeChange, ScheduleData }: TDynamicForm) => {
  interface TPaymentType {
    typeId: number;
    PaymentType: string;
  }
  const type: TPaymentType[] = [
    {
      typeId: 1,
      PaymentType: 'Regular',
    },
    { typeId: 2, PaymentType: 'Advance' },
  ];

  const initialValues = {
    PaymentTypeId: null,
    AccountId: null,
    AccountTitle: null,
    JobLotId: null,
    JobLotDescription: null,
    DebitAmount: null,
    Comments: null,
    CreditAmount: 0,
    Balance: 0,
    TaxesTotalAmount: 0,
  };
  const formValues = useWatch<TCashPaymentDetailEntry[]>('voucherDetailList', form);
  const { t } = useTranslation();
  const [tableData, setTableData] = useAtom(addtableData);
  const { data: configData, isSuccess: isSuccessConfig } = useGetConfigration('ExpenseAccountAllowOnPaymentVoucher');
  const isExpenseAccountAllowed = configData?.data?.Data?.Result === 'True';
  const [refAccountId, setRefAccountId] = useState(0);
  const [filteredDebitAccounts, setfilteredDebitAccount] = useState<any>();
  const { data, isSuccess, isLoading } = useGetAccountsBalance(refAccountId);
  const { data: debit, isSuccess: isSuccessDebitAc, isLoading: isLoadingDeibtAc } = useGetDebitAccountSelect();
  const allowedAccountTypes = isExpenseAccountAllowed ? [2, 15] : [2, 11, 12, 13, 14, 15, 20, 21];

  useEffect(() => {
    if (isSuccessConfig && isSuccessDebitAc && !isLoadingDeibtAc) {
      const filteredDebitAccount = debit?.data?.Data?.Result.filter(
        (item: any) => !allowedAccountTypes.includes(item.AccountTypeId)
      );
      setfilteredDebitAccount(filteredDebitAccount);
    }
  }, [isSuccessConfig, isSuccessDebitAc, !isLoadingDeibtAc]);
  console.log(filteredDebitAccounts);

  const [isEditMode, setIsEditMode] = useState(false);
  const [rowIndex, setrowIndex] = useState<number | null>(-1);
  const { data: filter } = useGetWHTAgainstAcSelect();

  useEffect(() => {
    form.setFieldValue(['voucherDetailList', 0, 'PaymentTypeId'], 1);
    form.setFieldValue(['voucherDetailList', 0, 'PaymentType'], 'Regular');
    form.setFieldValue(['voucherDetailList', 0, 'DCheqDate'], dayjs(new Date()));
  }, []);

  useEffect(() => {
    console.log('OutsideTaxSucess');
    if (SharedStateIncludeWHT && ScheduleData) {
      console.log('InsideTaxSucess');
      form.setFieldValue(['voucherDetailList', 0, 'TaxPrcnt'], ScheduleData?.TaxPercent);
      form.setFieldValue(['voucherDetailList', 0, 'AgainstAccountId'], ScheduleData?.TaxGLAccountId);
      handleCalculations();
    } else {
      form.setFieldValue(['voucherDetailList', 0, 'TaxPrcnt'], 0);
      form.setFieldValue(['voucherDetailList', 0, 'AgainstAccountId'], null);
      handleCalculations();
    }
  }, [form, SharedStateIncludeWHT, ScheduleData]);

  const handleCalculations = () => {
    let DebitAmount = 0;
    tableData.map((item: any) => (DebitAmount += item.DebitAmount));
    const taxPercent = form.getFieldValue(['voucherDetailList', 0, 'TaxPrcnt']);
    console.log(taxPercent);
    const Amount = (DebitAmount / (100 - taxPercent)) * 100;
    const TaxAmount = taxPercent > 0 ? ((Amount * taxPercent) / 100).toFixed(2) : '0';
    const TotalAmount = (DebitAmount + parseFloat(TaxAmount)).toFixed(2);
    form.setFields([{ name: ['voucherDetailList', 0, 'Amount'], value: DebitAmount }]);
    form.setFields([{ name: ['voucherDetailList', 0, 'TaxAmount'], value: TaxAmount }]);
    form.setFields([{ name: ['voucherDetailList', 0, 'TotalAmount'], value: TotalAmount }]);
    form.setFieldValue('VoucherAmount', DebitAmount);
  };

  useEffect(() => {
    if (tableData.length > 0) {
      handleCalculations();
    }
  }, [form, tableData]);

  const handleCreditAccountChange = (accountId: number) => {
    setRefAccountId(accountId);
    const balance2 = numberFormatter(data?.data?.Data?.Result?.[0]?.Balance);

    if (data && isSuccess && !isLoading) {
      form.setFieldValue(['voucherDetailList', 0, 'Balance'], balance2);
    }
    const selectedAccount = filteredDebitAccounts.find((item: any) => item.Id === accountId);
    if (selectedAccount) {
      const accountTitle = selectedAccount.AccountTitle;
      form.setFieldValue(['voucherDetailList', 0, 'AccountTitle'], accountTitle);
    }
  };
  useEffect(() => {
    const balance2 = numberFormatter(data?.data?.Data?.Result?.[0]?.Balance);
    if (data && isSuccess && !isLoading) {
      form.setFieldValue(['voucherDetailList', 0, 'Balance'], balance2);
    }
  }, [data, isSuccess, !isLoading]);
  const handleAddToTable = () => {
    if (formValues[0].AccountId == null || formValues[0].AccountId == undefined) {
      const message = 'Please fill  Debit Account';
      notification.error({ message: message });
      return;
    }
    if (formValues[0].DebitAmount == null || formValues[0].DebitAmount == undefined) {
      const message = 'Please fill  Debit Amount';
      notification.error({ message: message });
      return;
    }

    const newData = formValues[0];
    console.log(newData);
    setRefAccountId(0);
    setTableData((prevData: any[]) => {
      const combinedData = [...prevData, newData];
      console.log('New tableData:', combinedData);
      return combinedData;
    });

    form.setFieldValue(['voucherDetailList', 0, 'AccountId'], null);
    form.setFieldValue(['voucherDetailList', 0, 'AccountTitle'], null);
    form.setFieldValue(['voucherDetailList', 0, 'JobLotId'], null);
    form.setFieldValue(['voucherDetailList', 0, 'JobLotDescription'], null);
    form.setFieldValue(['voucherDetailList', 0, 'DebitAmount'], null);
    form.setFieldValue(['voucherDetailList', 0, 'Comments'], null);
    setIsEditMode(false);
  };

  const handleUpdateToTable = () => {
    console.log('Form Values:', formValues);

    const newData = {
      PaymentTypeId: formValues[0].PaymentTypeId,
      PaymentType: formValues[0].PaymentType,
      AccountId: formValues[0].AccountId,
      AccountTitle: formValues[0].AccountTitle,
      JobLotId: formValues[0].JobLotId,
      JobLotDescription: formValues[0].JobLotDescription,
      DebitAmount: formValues[0].DebitAmount,
      Comments: formValues[0].Comments,
      CreditAmount: 0,
      IsTaxable: 'false',
    };

    if (newData.DebitAmount === null || newData.DebitAmount === undefined) {
      const message = 'Please fill  Debit Amount';
      notification.error({ message: message });
      return;
    }

    if (newData.AccountId === null || newData.AccountId === undefined) {
      const message = 'Please select a Debit account';
      notification.error({ message: message });
      return;
    }

    setTableData((prevData: any[]) => {
      return prevData.map((item, index) => {
        if (index === rowIndex) {
          return newData;
        } else {
          return item;
        }
      });
    });

    form.setFieldValue(['voucherDetailList', 0, 'AccountId'], null);
    form.setFieldValue(['voucherDetailList', 0, 'AccountTitle'], null);
    form.setFieldValue(['voucherDetailList', 0, 'JobLotId'], null);
    form.setFieldValue(['voucherDetailList', 0, 'JobLotDescription'], null);
    form.setFieldValue(['voucherDetailList', 0, 'DebitAmount'], null);
    form.setFieldValue(['voucherDetailList', 0, 'Comments'], null);
    setIsEditMode(false);
  };
  const handleResetForm = () => {
    form.setFieldValue(['voucherDetailList', 0, 'AccountId'], null);
    form.setFieldValue(['voucherDetailList', 0, 'AccountTitle'], null);
    form.setFieldValue(['voucherDetailList', 0, 'JobLotId'], null);
    form.setFieldValue(['voucherDetailList', 0, 'JobLotDescription'], null);
    form.setFieldValue(['voucherDetailList', 0, 'DebitAmount'], null);
    form.setFieldValue(['voucherDetailList', 0, 'Comments'], null);
    setIsEditMode(false);
  };

  const handleSelectjobLotChange = (obj: TjobLot, index: number) => {
    form.setFieldValue(['voucherDetailList', 0, 'JobLotDescription'], obj?.JobLotDescription);
  };

  const handlePaymentTypeChange = (value: any) => {
    if (value === 1) {
      form.setFieldValue(['voucherDetailList', 0, 'PaymentType'], 'Regular');
    } else if (value === 2) {
      form.setFieldValue(['voucherDetailList', 0, 'PaymentType'], 'Advance');
    }
  };

  const handleAgainstAccountChange = (accountId?: any) => {
    form.setFieldValue('AgainstAccountId', accountId);
  };

  const handleTaxChange = (obj: TTaxType, index: number) => {
    form.setFields([{ name: ['voucherDetailList', index, 'TaxName'], value: obj?.TaxName }]);
    handleTaxTypeChange(obj.Id);
  };

  return (
    <>
      <Row gutter={[16, 16]} style={{ marginTop: '0.8%' }}>
        <Col span={24}>
          <Card style={{ boxShadow: '2px 4px 12px 1px gray', paddingBottom: '0%' }}>
            <Form.List name="voucherDetailList" initialValue={[initialValues]}>
              {(fields, {}) => (
                <>
                  {fields.map((field) => (
                    <div key={field.key} className="form-list-container">
                      <Col
                        xs={{ span: 24, offset: 0 }}
                        sm={{ span: 21, offset: 1 }}
                        md={{ span: 11, offset: 0 }}
                        lg={{ span: 11, offset: 0 }}
                        xl={{ span: 5, offset: 0 }}
                        xxl={{ span: 4, offset: 0 }}
                        className="formfield type"
                        style={{ marginBottom: '1%' }}
                      >
                        <AntSelectDynamic
                          bordered={false}
                          label={t('payment_type')}
                          fieldValue="typeId"
                          fieldLabel="PaymentType"
                          options={map(type, (item: any) => ({
                            value: item.typeId,
                            label: item.PaymentType,
                          }))}
                          name={[field.name, 'PaymentTypeId']}
                          onChange={handlePaymentTypeChange}
                        />
                      </Col>

                      <Col
                        xs={{ span: 24, offset: 0 }}
                        sm={{ span: 21, offset: 1 }}
                        md={{ span: 11, offset: 1 }}
                        lg={{ span: 11, offset: 1 }}
                        xl={{ span: 6, offset: 1 }}
                        xxl={{ span: 7, offset: 1 }}
                        className="formfield debit"
                        style={{ marginTop: '-2.5rem', borderBottom: '1px solid gray', padding: '0px', height: '60px' }}
                      >
                        <p style={{ marginTop: 0, marginLeft: '60%' }} className="dr">
                          Dr : <b> {numberFormatter(data?.data?.Data?.Result?.[0]?.Balance)}</b>
                        </p>

                        <p style={{ marginTop: 0 }}>
                          <AntSelectDynamic
                            bordered={false}
                            label={t('debit_account')}
                            fieldValue="Id"
                            fieldLabel="AccountTitle"
                            name={[field.name, 'AccountId']}
                            onChange={handleCreditAccountChange}
                            options={map(filteredDebitAccounts, (item: any) => ({
                              value: item.Id,
                              label: item.AccountTitle,
                            }))}
                          />
                        </p>
                      </Col>

                      <Col
                        xs={{ span: 24, offset: 0 }}
                        sm={{ span: 21, offset: 1 }}
                        md={{ span: 11, offset: 0 }}
                        lg={{ span: 11, offset: 0 }}
                        xl={{ span: 4, offset: 1 }}
                        className="formfield"
                        style={{ marginBottom: '1%' }}
                      >
                        <AntSelectDynamic
                          bordered={false}
                          label={t('job_lot')}
                          fieldValue="Id"
                          fieldLabel="JobLotDescription"
                          name={[field.name, 'JobLotId']}
                          query={useGetBankPaymentJobLotSelect}
                          onSelectChange={(obj) => handleSelectjobLotChange(obj, field.name)}
                        />
                      </Col>

                      <Col
                        xs={{ span: 24, offset: 0 }}
                        sm={{ span: 21, offset: 1 }}
                        md={{ span: 11, offset: 1 }}
                        lg={{ span: 11, offset: 1 }}
                        xl={{ span: 5, offset: 1 }}
                        className="formfield"
                        style={{ marginBottom: '1%' }}
                      >
                        <AntInputNumber
                          bordered={false}
                          label={t('debit_amount')}
                          formItemProps={{ ...field, name: [field.name, 'DebitAmount'] }}
                        />
                      </Col>

                      <Col
                        xs={{ span: 24, offset: 0 }}
                        sm={{ span: 21, offset: 1 }}
                        md={{ span: 23, offset: 0 }}
                        lg={{ span: 23, offset: 0 }}
                        xl={{ span: 12, offset: 0 }}
                        style={{ marginBottom: '1%' }}
                        className="formfield"
                      >
                        <AntInput
                          bordered={false}
                          formItemProps={{ ...field, name: [field.name, 'Comments'] }}
                          label={t('remarks')}
                        />
                      </Col>
                      <AntInput
                        bordered={false}
                        label={''}
                        formItemProps={{ ...field, name: [field.name, 'PaymentType'] }}
                        style={{ display: 'none' }}
                      />
                      <AntInput
                        bordered={false}
                        label={''}
                        formItemProps={{ ...field, name: [field.name, 'AccountTitle'] }}
                        style={{ display: 'none' }}
                      />
                      <AntInput
                        bordered={false}
                        label={''}
                        formItemProps={{ ...field, name: [field.name, 'JobLotDescription'] }}
                        style={{ display: 'none' }}
                      />
                      <AntInputNumber
                        bordered={false}
                        label={t('')}
                        style={{ display: 'none' }}
                        formItemProps={{ ...field, name: [field.name, 'DebitAmount'] }}
                      />
                      <Col xxl={3} xl={4} lg={6} md={6} sm={7} xs={24}>
                        <Row
                          align={'top'}
                          gutter={10}
                          style={{ display: 'flex', border: ' ' }}
                          justify={'space-between'}
                        >
                          <Col span={12}>
                            <AntButton
                              onClick={isEditMode ? handleUpdateToTable : handleAddToTable}
                              label={isEditMode ? `${t('update')}` : `${t('add')}`}
                              style={{ marginLeft: 0 }}
                            ></AntButton>
                          </Col>
                          <Col span={12}>
                            <AntButton
                              onClick={() => handleResetForm()}
                              label={`${t('cancel')}`}
                              style={{ backgroundColor: '#FFAF0C' }}
                            ></AntButton>
                          </Col>
                        </Row>
                      </Col>
                      <DetailEntryTable form={form} t={t} setIsEditMode={setIsEditMode} setrowIndex={setrowIndex} />
                      <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
                        <Row gutter={10} style={{ marginTop: '2%' }}>
                          <>
                            <Card style={{ width: '100%' }}>
                              <Row justify={'space-between'}>
                                <Col
                                  xs={{ span: 24 }}
                                  sm={{ span: 24 }}
                                  md={{ span: 11 }}
                                  lg={{ span: 10 }}
                                  xl={{ span: 7 }}
                                  className="formfield"
                                >
                                  <AntSelectDynamic
                                    bordered={false}
                                    label={t('tax_type')}
                                    fieldValue="Id"
                                    fieldLabel="TaxName"
                                    name={[field.name, 'TaxTypeId']}
                                    query={useGetBankPaymentTaxType}
                                    onSelectChange={(obj) => handleTaxChange(obj, field.name)}
                                  />
                                </Col>
                                <Col
                                  xs={{ span: 24 }}
                                  sm={{ span: 24 }}
                                  md={{ span: 11 }}
                                  lg={{ span: 10 }}
                                  xl={{ span: 6 }}
                                  className="formfield"
                                >
                                  <AntInputNumber
                                    readOnly
                                    // disabled={!form.getFieldValue('IncludeWHT') /*isWithHoldingChecked*/}
                                    bordered={false}
                                    label={t('tax_percentage')}
                                    formItemProps={{ ...field, name: [field.name, 'TaxPrcnt'] }}
                                  />
                                </Col>
                                <Col
                                  xs={{ span: 24 }}
                                  sm={{ span: 24 }}
                                  md={{ span: 11 }}
                                  lg={{ span: 10 }}
                                  xl={{ span: 7 }}
                                  className="formfield"
                                >
                                  <AntSelectDynamic
                                    disabled={!SharedStateIncludeWHT}
                                    bordered={false}
                                    fieldValue="Id"
                                    fieldLabel="AccountTitle"
                                    name="AgainstAccountId"
                                    formItemProps={{ ...field, name: [field.name, 'AgainstAccountId'] }}
                                    label={t('wht_account')}
                                    options={map(filter, (item: any) => ({
                                      value: item.Id,
                                      label: item.AccountTitle,
                                    }))}
                                    onChange={(accountId) => handleAgainstAccountChange(accountId)}
                                  />
                                </Col>
                                <Col
                                  xs={{ span: 24 }}
                                  sm={{ span: 24 }}
                                  md={{ span: 11 }}
                                  lg={{ span: 10 }}
                                  xl={{ span: 7 }}
                                  className="formfield"
                                  style={{ marginTop: '0%' }}
                                >
                                  <AntInputNumber
                                    readOnly
                                    // disabled={!form.getFieldValue('IncludeWHT') /*isWithHoldingChecked*/}
                                    bordered={false}
                                    label={t('amount')}
                                    formItemProps={{ ...field, name: [field.name, 'Amount'] }}
                                  />
                                </Col>
                                <Col
                                  xs={{ span: 24 }}
                                  sm={{ span: 24 }}
                                  md={{ span: 11 }}
                                  lg={{ span: 10 }}
                                  xl={{ span: 6 }}
                                  style={{ marginTop: '0%' }}
                                  className="formfield"
                                >
                                  <AntInputNumber
                                    readOnly
                                    // disabled={!form.getFieldValue('IncludeWHT') /*isWithHoldingChecked*/}
                                    bordered={false}
                                    label={t('tax_amount')}
                                    formItemProps={{ ...field, name: [field.name, 'TaxAmount'] }}
                                  />
                                </Col>
                                <Col
                                  xs={{ span: 24 }}
                                  sm={{ span: 24 }}
                                  md={{ span: 11 }}
                                  lg={{ span: 10 }}
                                  xl={{ span: 7 }}
                                  style={{ marginTop: '0%' }}
                                  className="formfield"
                                >
                                  <AntInputNumber
                                    readOnly
                                    // disabled={!form.getFieldValue('IncludeWHT') /*isWithHoldingChecked*/}
                                    bordered={false}
                                    label={t('total_amount')}
                                    formItemProps={{ ...field, name: [field.name, 'TotalAmount'] }}
                                  />
                                </Col>
                              </Row>
                            </Card>
                          </>
                        </Row>
                      </Col>
                    </div>
                  ))}
                </>
              )}
            </Form.List>
          </Card>
        </Col>
      </Row>
    </>
  );
};
type TDynamicForm = {
  form: FormInstance;
  SharedStateIncludeWHT: boolean;
  handleTaxTypeChange: (Tax: number) => void;
  ScheduleData: any;
};

export default DynamicFormCPV;
