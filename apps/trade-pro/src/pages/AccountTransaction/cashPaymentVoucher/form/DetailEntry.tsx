import { AntButton, AntInput, AntInputNumber, AntSelectDynamic, AntTable } from '@tradePro/components';
import { Card, Col, Row, Form, FormInstance, theme, notification } from 'antd';
import { add, map, sumBy } from 'lodash';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import {
  useGetAccountsBalance,
  useGetCashPaymentJobLotSelect,
  useGetCashPaymentTaxType,
  useGetConfigration,
  useGetDebitAccountSelect,
  useGetWHTAgainstAcSelect,
} from '../queries/queries';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { TCashPaymentDetailEntry, TTaxType, TjobLot } from './types';
import { column2 } from '../table/columns';
import { useAtom } from 'jotai';
import {
  addtableData,
  isWithHoldingCheckedAtom,
  selectedAgainstAccountAtom,
  selectedCreditAccountAtom,
  totalValue,
} from './Atom';
import dayjs from 'dayjs';

const { useWatch } = Form;

const DynamicForm = ({ form, SharedStateIncludeWHT, handleTaxTypeChange, ScheduleData }: TDynamicForm) => {
  const formValues = useWatch<TCashPaymentDetailEntry[]>('voucherDetailList', form);

  const { t } = useTranslation();
  const [tableData, setTableData] = useAtom(addtableData);

  const [totalDebitAmounts, setTotalDebitAmounts] = useAtom(totalValue);
  const [selectedCreditAccount, setSelectedCreditAccount] = useAtom(selectedCreditAccountAtom);
  const [againstAccountAtom, setAgainstAccountAtom] = useAtom(selectedAgainstAccountAtom);
  const [isWithHoldingChecked, setIsWithHoldingChecked] = useAtom(isWithHoldingCheckedAtom);

  // const { data: configData } = useGetConfigration('CheqBook Enabled');
  const { data: configData } = useGetConfigration('ExpenseAccountAllowOnPaymentVoucher');
  const isExpenseAccountAllowed = configData?.data?.Data?.Result === 'True';

  const [refAccountId, setRefAccountId] = useState(0);
  const { data } = useGetAccountsBalance(refAccountId);
  const { data: debit } = useGetDebitAccountSelect();

  const allowedAccountTypes = isExpenseAccountAllowed ? [2, 15] : [2, 11, 12, 13, 14, 15, 20, 21];
  const filteredDebitAccounts = debit?.data?.Data?.Result.filter(
    (item: any) => !allowedAccountTypes.includes(item.AccountTypeId)
  );

  const [isEditMode, setIsEditMode] = useState(false);
  const [rowIndex, setrowIndex] = useState(-1);

  const {
    token: { colorPrimary },
  } = theme.useToken();

  const { data: filter } = useGetWHTAgainstAcSelect();

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
    InvoiceNoRefId: null,
    CheqNoDetail: null,
    // CheqId: null,
    PayeeTitle: null,
    Comments: null,
    CreditAmount: 0,
    TaxesTotalAmount: 0,
  };

  useEffect(() => {
    form.setFieldValue(['voucherDetailList', 0, 'PaymentTypeId'], '1');
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

  // For Debit Account
  const handleCreditAccountChange = (accountId: number) => {
    setRefAccountId(accountId);
    const balance2 = data?.data?.Data?.Result?.[0]?.Balance.toFixed(2);
    form.setFieldValue(['voucherDetailList', 0, 'Balance'], balance2);
    const selectedAccount = filteredDebitAccounts.find((item: any) => item.Id === accountId);
    if (selectedAccount) {
      const accountTitle = selectedAccount.AccountTitle;
      form.setFieldValue(['voucherDetailList', 0, 'AccountTitle'], accountTitle);
    }
  };

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
    // const newData = {
    //   PaymentType: formValues.PaymentType,
    //   AccountId: formValues.AccountId,
    //   AccountTitle: formValues.AccountTitle,
    //   JobLotDescription: formValues.JobLotDescription,
    //   JobLotId: formValues.JobLotId,
    //   DebitAmount: formValues.DebitAmount,
    //   // CreditAmount: item.DebitAmount,
    //   CreditAmount: 0,
    //   InvoiceNoRefId: formValues.InvoiceNoRefId,
    //   CheqNoDetail: formValues.CheqNoDetail,
    //   // CheqId: item.CheqId,
    //   PayeeTitle: formValues.PayeeTitle,
    //   Comments: formValues.Comments,
    //   IsTaxable: 'false',
    // };

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
    // form.setFieldValue(['voucherDetailList', 0, 'JobLotId'], null);
    // form.setFieldValue(['voucherDetailList', 0, 'JobLotDescription'], null);
    form.setFieldValue(['voucherDetailList', 0, 'DebitAmount'], null);
    form.setFieldValue(['voucherDetailList', 0, 'Comments'], null);
    // form.setFieldValue(['voucherDetailList', 0, 'CheqNoDetail'], null);
    // form.setFieldValue(['voucherDetailList', 0, 'PayeeTitle'], null);
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
          // Update the item at rowIndex
          return newData;
        } else {
          // Keep other items unchanged
          return item;
        }
      });
    });

    // setCounter((prevCounter: any) => prevCounter - 1);

    // setTableData((prevData: any[]) => {
    //   const updatedData = newData.map((item, index) => {
    //     if (rowIndex >= 0) {
    //       return {
    //         ...item,
    //         // ChequeNo: counter,
    //         // AgainstAccountId: againstAccountId,
    //       };
    //     }
    //     return item;
    //   });

    //   const combinedData = [...prevData.filter((row) => row.CheqId !== edit.CheqId), ...updatedData];
    //   console.log('New tableData:', combinedData);
    //   return combinedData;
    // })
    form.setFieldValue(['voucherDetailList', 0, 'AccountId'], null);
    form.setFieldValue(['voucherDetailList', 0, 'AccountTitle'], null);
    form.setFieldValue(['voucherDetailList', 0, 'JobLotId'], null);
    form.setFieldValue(['voucherDetailList', 0, 'JobLotDescription'], null);
    form.setFieldValue(['voucherDetailList', 0, 'DebitAmount'], null);
    form.setFieldValue(['voucherDetailList', 0, 'Comments'], null);
    // form.setFieldValue(['voucherDetailList', 0, 'CheqNoDetail'], null);
    // form.setFieldValue(['voucherDetailList', 0, 'PayeeTitle'], null);
    setIsEditMode(false);
  };

  const handleDeleteRow = (record: any, rowIndex: number) => {
    setTableData((prevData: any[]) => {
      const updatedData = prevData.filter((item: any, index) => index !== rowIndex);
      console.log('New tableData:', updatedData);
      return updatedData;
    });
  };

  const handleEditRow = (record: any, index: number) => {
    console.log('Row Index: ', index);
    setrowIndex(index);
    // setEdit(record);
    form.setFieldValue(['voucherDetailList', 0], record); // Update form values
    setIsEditMode(true);

    // setTableData((prevData: any[]) => {
    //   const updatedData = [...prevData]; // Create a copy of the array

    //   // const rowIndex = updatedData.findIndex((item: any) => item.CheqId === record.CheqId);
    //   const rowIndex = index;
    //   if (rowIndex !== -1) {
    //     updatedData[rowIndex] = {
    //       ...updatedData[rowIndex],
    //       PaymentTypeId: record.PaymentType,
    //       AccountId: record.AccountTitle,
    //       JobLotId: record.JobLotDescription,
    //       DebitAmount: record.DebitAmount,
    //       Comments: record.Comments,
    //     };
    //   }
    //   console.log('New tableData:', updatedData);
    //   return updatedData;
    // });
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
  // const list = tableData.map((item: any) => item);
  // const DebitAmount = tableData.map((item: any) => item.DebitAmount);
  // const totalDebitAmount = sumBy(DebitAmount);
  // useEffect(() => {
  //   setTotalDebitAmounts(totalDebitAmount);
  //   setVoucherDetailList(list);
  // }, [tableData]);

  const handleTaxChange = (obj: TTaxType, index: number) => {
    // form.setFields([{ name: ['voucherDetailList', index, 'TaxPrcnt'], value: obj?.Id }]);
    form.setFields([{ name: ['voucherDetailList', index, 'TaxName'], value: obj?.TaxName }]);
    handleTaxTypeChange(obj.Id);
  };

  return (
    <>
      <Row gutter={[16, 16]}>
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
                          Dr : <b> {data?.data?.Data?.Result?.[0]?.Balance.toFixed(2)}</b>
                        </p>
                        {/* <p style={{ marginTop: -10 }}>
                          {t('debit_account_balance')} : <b> {data?.data?.Data?.Result?.[0]?.Balance.toFixed(2)}</b>
                        </p> */}
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
                          query={useGetCashPaymentJobLotSelect}
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
                      {/* <Col span={10}> */}
                      <Col
                        xs={{ span: 7, offset: 10 }}
                        sm={{ span: 5, offset: 10 }}
                        md={{ span: 4, offset: 10 }}
                        lg={{ span: 4, offset: 10 }}
                        xl={{ span: 3, offset: 1 }}
                        xxl={{ span: 2, offset: 1 }}
                        className="add"
                      >
                        <AntButton
                          onClick={isEditMode ? handleUpdateToTable : handleAddToTable}
                          label={isEditMode ? `${t('update')}` : `${t('add')}`}
                          style={{ marginLeft: -10 }}
                        ></AntButton>
                      </Col>
                      {/* </Col> */}

                      <Row gutter={[16, 16]} style={{ marginTop: '1%' }}>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
                          {/* <Card style={{ boxShadow: '2px 4px 12px 1px gray', textAlign: 'left' }}> */}
                          <AntTable
                            numberOfSkeletons={12}
                            scroll={{ x: '', y: convertVhToPixels('15vh') }}
                            data={tableData}
                            columns={column2(t, handleDeleteRow, handleEditRow)}
                          />
                          {/* </Card> */}
                        </Col>
                      </Row>
                      <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
                        <Row style={{ marginTop: '2%' }}>
                          <Col
                            xs={{ span: 24 }}
                            sm={{ span: 24 }}
                            md={{ span: 24 }}
                            lg={{ span: 24 }}
                            xl={{ span: 24 }}
                          >
                            <Card>
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
                                    query={useGetCashPaymentTaxType}
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
                                    disabled={!SharedStateIncludeWHT /* isWithHoldingChecked*/}
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
                          </Col>
                        </Row>
                      </Col>
                    </div>
                  ))}
                </>
              )}
            </Form.List>
            <br />
          </Card>
          <br />
        </Col>
      </Row>
    </>
  );
};

type TDynamicForm = { form: FormInstance; SharedStateIncludeWHT: boolean; handleTaxTypeChange: any; ScheduleData: any };

export default DynamicForm;
