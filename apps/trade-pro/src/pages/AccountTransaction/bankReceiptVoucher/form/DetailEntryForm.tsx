import dayjs from 'dayjs';
import { useAtom } from 'jotai';
import { map } from 'lodash';
import { addtableData } from '../form/Atom';
import {
  useGetAccountsBalance,
  useGetBankReceiptJobLotSelect,
  useGetBankReceiptTaxType,
  useGetConfigration,
  useGetCreditAccountSelect,
  useGetWHTAgainstAcSelect,
} from '../queries/queries';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DetailEntryTable from './DetailEntryTable';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { Card, Col, Row, Form, FormInstance, notification } from 'antd';
import { TBankReceiptDetailEntry, TTaxType, TjobLot } from './types';
import { AntButton, AntInput, AntInputNumber, AntSelectDynamic } from '@tradePro/components';

const { useWatch } = Form;
const DynamicForm = ({ form, handleTaxTypeChange, SharedStateIncludeWHT, ScheduleData }: TDynamicForm) => {
  const formValues = useWatch<TBankReceiptDetailEntry[]>('voucherDetailList', form);
  const { t } = useTranslation();
  const [tableData, setTableData] = useAtom(addtableData);
  const [refAccountId, setRefAccountId] = useState(0);
  const [rowIndex, setrowIndex] = useState<number>(-1);

  const { data } = useGetAccountsBalance(refAccountId);
  const { data: configData, isSuccess: isSuccessConfig } = useGetConfigration('CheqBook Enabled');
  const isExpenseAccountAllowed = configData?.data?.Data?.Result === 'True';
  const [counter, setCounter] = useState<any>(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [filteredCreditAccounts, setfilteredCreditAccounts] = useState<any>();
  const allowedAccountTypes = isExpenseAccountAllowed ? [2, 15] : [2, 11, 12, 13, 14, 15, 20, 21];
  const { data: credit, isSuccess: isSuccessCreditAc, isLoading: isLoadingCreditAc } = useGetCreditAccountSelect();

  useEffect(() => {
    if (isSuccessConfig && isSuccessCreditAc && !isLoadingCreditAc) {
      const filteredCreditAccount = credit?.data?.Data?.Result.filter(
        (item: any) => !allowedAccountTypes.includes(item.AccountTypeId)
      );
      setfilteredCreditAccounts(filteredCreditAccount);
    }
  }, [isSuccessConfig, isSuccessCreditAc, !isLoadingCreditAc]);
  console.log(filteredCreditAccounts);
  const RefAccountId = form.getFieldValue('RefAccountId');
  const AgainstAccountId = form.getFieldValue('AgainstAccountId');
  const { data: filter } = useGetWHTAgainstAcSelect();
  const { data: chequeNoCompulsoryConfig } = useGetConfigration('ChequeNoCompulsoryOnBpv');
  const isChequeNoCompulsory = chequeNoCompulsoryConfig?.data?.Data?.Result === 'True';
  const [edit, setEdit] = useState<any>([]);
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
    PaymentType: null,
    AccountId: null,
    AccountTitle: null,
    JobLotDescription: null,
    JobLotId: null,
    DebitAmount: null,
    InvoiceNoRefId: null,
    Comments: null,
    TaxName: '',
    CreditAmount: 0,
    TaxesTotalAmount: 0,
  };
  const handleCreditAccountChange = (accountId: number) => {
    setRefAccountId(accountId);
    const selectedAccount = filteredCreditAccounts.find((item: any) => item.Id === accountId);
    if (selectedAccount) {
      const accountTitle = selectedAccount.AccountTitle;
      console.log(accountTitle);
      form.setFieldValue(['voucherDetailList', 0, 'AccountTitle'], accountTitle);
    }
  };
  const handleCalculations = () => {
    let DebitAmount = 0;
    tableData.map((item: any) => (DebitAmount += item.CreditAmount));
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
  const handleAddToTable = () => {
    console.log('Form Values:', formValues);
    const newData = formValues.map((item) => ({
      PaymentTypeId: item.PaymentTypeId,
      PaymentType: item.PaymentType,
      AccountId: item.AccountId,
      AccountTitle: item.AccountTitle,
      AgainstAccountId: item.AgainstAccountId,
      JobLotDescription: item.JobLotDescription,
      JobLotId: item.JobLotId,
      DebitAmount: 0,
      CreditAmount: item.CreditAmount,
      InvoiceNoRefId: item.InvoiceNoRefId,
      Comments: item.Comments,
      IsTaxable: 'false',
    }));
    if (newData.some((item) => item.CreditAmount === null || item.CreditAmount === undefined)) {
      const message = 'Please fill  Credit Amount';
      notification.error({ message: message });
      return;
    }
    if (!RefAccountId) {
      const message = 'Please select  Debit Account';
      notification.error({ message: message });
      return;
    }
    if (newData.some((item) => item.AccountId === null || item.AccountId === undefined)) {
      const message = 'Please select Credit Account';
      notification.error({ message: message });
      return;
    }

    setRefAccountId(0);
    setCounter((prevCounter: any) => prevCounter + 1);
    setTableData((prevData: any[]) => {
      const updatedData = newData.map((item) => ({
        ...item,
        CheqId: counter,
      }));
      const combinedData = [...prevData, ...updatedData];
      console.log('New tableData:', combinedData);
      return combinedData;
    });
    form.setFieldValue(['voucherDetailList', 0], null);
    form.setFieldValue(['voucherDetailList', 0, 'DCheqDate'], dayjs(new Date()));
    form.setFieldValue(['voucherDetailList', 0, 'PaymentTypeId'], 'Regular');
    form.setFieldValue(['voucherDetailList', 0, 'PaymentType'], 'Regular');
    setIsEditMode(false);
  };
  const handleUpdateToTable = () => {
    console.log('Form Values:', formValues);
    const newData = formValues.map((item) => ({
      PaymentTypeId: item.PaymentTypeId,
      PaymentType: item.PaymentType,
      AccountId: item.AccountId,
      AccountTitle: item.AccountTitle,
      AgainstAccountId: item.AgainstAccountId,
      JobLotDescription: item.JobLotDescription,
      JobLotId: item.JobLotId,
      DebitAmount: 0,
      CreditAmount: item.CreditAmount,
      InvoiceNoRefId: item.InvoiceNoRefId,
      Comments: item.Comments,
      IsTaxable: 'false',
    }));
    if (newData.some((item) => item.CreditAmount === null || item.CreditAmount === undefined)) {
      const message = 'Please fill Credit Amount';
      notification.error({ message: message });
      return;
    }
    if (newData.some((item) => item.AccountId === null || item.AccountId === undefined)) {
      const message = 'Please select Credit Account';
      notification.error({ message: message });
      return;
    }
    if (newData.some((item) => item.JobLotId === null || item.JobLotId === undefined)) {
      const message = 'Please select  Job Lot';
      notification.error({ message: message });
      return;
    }
    setRefAccountId(0);
    // const editedRowIndex = tableData.findIndex((row: any) => row.CheqId === edit?.CheqId);
    // if (editedRowIndex >= 0) {
    //   setTableData((prevData: any[]) => {
    //     const updatedData = [...prevData];
    //     updatedData[editedRowIndex] = {
    //       ...newData[0],
    //       CheqId: edit.CheqId,
    //     };
    //     console.log('New tableData:', updatedData);
    //     return updatedData;
    //   });
    // }
    const editedRowIndex = tableData.findIndex((row: any, index) => index === rowIndex);
    if (editedRowIndex >= 0) {
      setTableData((prevData: any[]) => {
        const updatedData = [...prevData];
        updatedData[editedRowIndex] = {
          ...newData[0],
          CheqId: edit.CheqId,
        };
        console.log('New tableData:', updatedData);
        return updatedData;
      });
    }
    form.setFieldValue(['voucherDetailList', 0], null);
    form.setFieldValue(['voucherDetailList', 0, 'DCheqDate'], dayjs(new Date()));
    form.setFieldValue(['voucherDetailList', 0, 'PaymentTypeId'], 'Regular');
    form.setFieldValue(['voucherDetailList', 0, 'PaymentType'], 'Regular');
    setIsEditMode(false);
  };
  const handleResetForm = () => {
    setRefAccountId(0);
    form.setFieldValue(['voucherDetailList', 0], null);
    form.setFieldValue(['voucherDetailList', 0, 'DCheqDate'], dayjs(new Date()));
    form.setFieldValue(['voucherDetailList', 0, 'PaymentTypeId'], 'Regular');
    form.setFieldValue(['voucherDetailList', 0, 'PaymentType'], 'Regular');
    setIsEditMode(false);
  };

  const handleAgainstAccountChange = (accountId?: any) => {
    form.setFieldValue('AgainstAccountId', accountId);
  };
  useEffect(() => {
    form.setFieldValue(['voucherDetailList', 0, 'PaymentTypeId'], 'Regular');
    form.setFieldValue(['voucherDetailList', 0, 'PaymentType'], 'Regular');
    form.setFieldValue(['voucherDetailList', 0, 'DCheqDate'], dayjs(new Date()));
  }, [form]);

  const handleItemChange = (obj: TTaxType, index: number) => {
    form.setFields([{ name: ['voucherDetailList', index, 'TaxName'], value: obj?.TaxName }]);
    handleTaxTypeChange(obj.Id);
  };

  console.log('table Data', tableData);
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
    if (AgainstAccountId) {
      form.setFieldValue(['voucherDetailList', 0, 'AgainstAccountId'], AgainstAccountId);
    }
  }, [form, SharedStateIncludeWHT, ScheduleData]);
  useEffect(() => {
    if (tableData.length > 0) {
      handleCalculations();
    }
  }, [form, tableData]);
  useEffect(() => {
    const balance2 = data?.data?.Data?.Result?.[0]?.Balance;
    if (balance2 !== undefined) {
      form.setFieldValue(['voucherDetailList', 0, 'Balance'], numberFormatter(balance2));
    }
  }, [form, tableData, data?.data?.Data?.Result]);
  return (
    <>
      <Row gutter={[16, 6]} style={{ marginTop: '0%' }}>
        <Col xs={24} sm={24} md={24} lg={{ span: 24 }} xl={{ span: 24 }}>
          <Card bordered={false}>
            <Form.List name="voucherDetailList" initialValue={[initialValues]}>
              {(fields, {}) => (
                <>
                  {fields.map((field) => (
                    <Row
                      justify={'space-between'}
                      key={field.key}
                      style={{ marginTop: '-2.5%' }}
                      // className="form-list-container"
                      // style={{ paddingTop: 5, display: 'flex', justifyContent: 'space-between' }}
                    >
                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 23 }}
                        md={{ span: 11 }}
                        lg={{ span: 11 }}
                        xl={{ span: 7 }}
                        xxl={{ span: 5 }}
                        className="formfield type"
                        // style={{ marginBottom: '1%' }}
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
                        <AntInput
                          bordered={false}
                          label={''}
                          formItemProps={{ ...field, name: [field.name, 'PaymentType'] }}
                          style={{ display: 'none' }}
                        />
                      </Col>
                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 23 }}
                        md={{ span: 12 }}
                        lg={{ span: 12 }}
                        xl={{ span: 9 }}
                        xxl={{ span: 8 }}
                        className="formfield2 debit"
                        style={{ marginTop: '-1.5rem', borderBottom: '1px solid gray', padding: '0px', height: '53px' }}
                      >
                        <p style={{ marginLeft: '85%', color: 'blue' }} className="dr">
                          {data ? (
                            <b>Cr: {numberFormatter(data?.data?.Data?.Result?.[0]?.Balance)}</b>
                          ) : (
                            <p style={{ visibility: 'hidden' }}> Balance </p>
                          )}
                        </p>
                        <p style={{ marginTop: 0 }}>
                          <AntSelectDynamic
                            bordered={false}
                            label={t('credit_account')}
                            fieldValue="Id"
                            fieldLabel="AccountTitle"
                            name={[field.name, 'AccountId']}
                            options={map(filteredCreditAccounts, (item: any) => ({
                              value: item.Id,
                              label: item.AccountTitle,
                            }))}
                            onChange={handleCreditAccountChange}
                          />
                        </p>
                      </Col>

                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 23 }}
                        md={{ span: 11 }}
                        lg={{ span: 11 }}
                        xl={{ span: 6 }}
                        xxl={{ span: 5 }}
                        className="formfield"
                      >
                        <AntSelectDynamic
                          bordered={false}
                          label={t('job_lot')}
                          fieldValue="Id"
                          fieldLabel="JobLotDescription"
                          name={[field.name, 'JobLotId']}
                          query={useGetBankReceiptJobLotSelect}
                          onSelectChange={(obj) => handleSelectjobLotChange(obj, field.name)}
                        />
                      </Col>
                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 23 }}
                        md={{ span: 12 }}
                        lg={{ span: 12 }}
                        xl={{ span: 7 }}
                        xxl={{ span: 5 }}
                        className="formfield"
                      >
                        <AntInputNumber
                          type="number"
                          bordered={false}
                          label={t('amount')}
                          formItemProps={{ ...field, name: [field.name, 'CreditAmount'] }}
                        />
                      </Col>

                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 23 }}
                        md={{ span: 24 }}
                        lg={{ span: 24 }}
                        xl={{ span: 16 }}
                        xxl={{ span: 13 }}
                        className="formfield"
                        style={{ marginTop: 3 }}
                      >
                        <p className="formfield detail_remarks">
                          <AntInput
                            bordered={false}
                            formItemProps={{ ...field, name: [field.name, 'Comments'] }}
                            label={t('remarks')}
                          />
                        </p>
                      </Col>
                      <Col span={0}>
                        <AntInput
                          bordered={false}
                          label={''}
                          formItemProps={{ ...field, name: [field.name, 'PaymentType'] }}
                          style={{ display: 'none', visibility: 'hidden' }}
                        />
                        <AntInput
                          bordered={false}
                          label={''}
                          formItemProps={{ ...field, name: [field.name, 'AccountTitle'] }}
                          style={{ display: 'none', visibility: 'hidden' }}
                        />
                        <AntInput
                          bordered={false}
                          label={''}
                          formItemProps={{ ...field, name: [field.name, 'JobLotDescription'] }}
                          style={{ display: 'none', visibility: 'hidden' }}
                        />
                      </Col>

                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 24 }}
                        md={{ span: 24 }}
                        lg={{ span: 24 }}
                        xl={{ span: 24 }}
                        xxl={{ span: 10 }}
                        style={{ marginTop: 3 }}
                      >
                        <Col xxl={8} xl={5} lg={8} md={8} sm={8} xs={24}>
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
                      </Col>
                      <Col span={24}>
                        <DetailEntryTable
                          form={form}
                          t={t}
                          setIsEditMode={setIsEditMode}
                          setEdit={setEdit}
                          setRefAccountId={setRefAccountId}
                          setrowIndex={setrowIndex}
                        />
                      </Col>
                      <Col span={24}>
                        <Row gutter={14}>
                          <Col span={24}>
                            <Card bordered={false}>
                              <Row gutter={10} justify={'space-between'} style={{ marginTop: '-0.5%' }}>
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
                                    query={useGetBankReceiptTaxType}
                                    onSelectChange={(obj) => handleItemChange(obj, field.name)}
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
                                  xl={{ span: 8 }}
                                  className="formfield"
                                >
                                  <AntSelectDynamic
                                    disabled={!SharedStateIncludeWHT}
                                    bordered={false}
                                    fieldValue="Id"
                                    fieldLabel="AccountTitle"
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
                                  xl={{ span: 8 }}
                                  style={{ marginTop: '0%' }}
                                  className="formfield"
                                >
                                  <AntInputNumber
                                    readOnly
                                    bordered={false}
                                    label={t('total_amount')}
                                    formItemProps={{ ...field, name: [field.name, 'TotalAmount'] }}
                                  />
                                </Col>
                              </Row>
                            </Card>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
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
  handleTaxTypeChange: (id: number) => void;
  SharedStateIncludeWHT: boolean;
  ScheduleData: any;
};

export default DynamicForm;
