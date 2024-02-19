import dayjs from 'dayjs';
import { useAtom } from 'jotai';
// import { column2 } from '../table/columns';
import { add, map } from 'lodash';
import { addtableData } from '../form/Atom';
// import {
//   useGetAccountsBalance,
//   useGetBankPaymentJobLotSelect,
//   useGetBankPaymentTaxType,
//   useGetChequeNoSelectBind,
//   useGetConfigration,
//   useGetDebitAccountSelect,
//   useGetWHTAgainstAcSelect,
// } from '../queries/queries';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { Card, Col, Row, Form, FormInstance, notification } from 'antd';
// import { TBankPaymentDetailEntry, TTaxType, TjobLot } from './types';
import { AntButton, AntDatePicker, AntInput, AntInputNumber, AntSelectDynamic, AntTable } from '@tradePro/components';
import { useGetAccountsBalance, useGetBPAJobLotSelect, useGetCreditAccountSelect } from '../query';
import { TJobLot, TvoucherDetailList } from '../types';

const { useWatch } = Form;
const DynamicForm = ({
  form,
  bankId,
  handleTaxTypeChange,
  setIsAddButtonClicked,
  SharedStateIncludeWHT,
  ScheduleData,
}: TDynamicForm) => {
  const formValues = useWatch<TvoucherDetailList[]>('voucherDetailList', form);
  const { t } = useTranslation();
  const [tableData, setTableData] = useAtom(addtableData);
  const [refAccountId, setRefAccountId] = useState(0);
  const { data } = useGetAccountsBalance(refAccountId);
  // const { data: configData } = useGetConfigration('CheqBook Enabled');
  // const isExpenseAccountAllowed = configData?.data?.Data?.Result === 'True';
  // const { data: debit } = useGetDebitAccountSelect();
  // const [counter, setCounter] = useState<any>(0);
  const [isEditMode, setIsEditMode] = useState(false);
  // const { data: chequeBooks } = useGetChequeNoSelectBind(bankId);
  // const allowedAccountTypes = isExpenseAccountAllowed ? [2, 15] : [2, 11, 12, 13, 14, 15, 20, 21];
  // const filteredDebitAccounts = debit?.data?.Data?.Result.filter(
  //   (item: any) => !allowedAccountTypes.includes(item.AccountTypeId)
  // );
  const RefAccountId = form.getFieldValue('RefAccountId');
  // console.log(RefAccountId);
  const { data: debit, isLoading } = useGetCreditAccountSelect();
  // const { data: chequeNoCompulsoryConfig } = useGetConfigration('ChequeNoCompulsoryOnBpv');
  // const isChequeNoCompulsory = chequeNoCompulsoryConfig?.data?.Data?.Result === 'True';

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
    DCheqDate: null,
    InvoiceNoRefId: null,
    CheqNoDetail: null,
    PayeeTitle: null,
    Comments: null,
    TaxName: '',
    CreditAmount: 0,
    TaxesTotalAmount: 0,
  };
  const { setFields, getFieldValue } = form;

  const handleDebitAccountChange = (accountId: number) => {
    setRefAccountId(accountId);

    if (!isLoading && Array.isArray(debit)) {
      const selectedAccount = debit.find((item: any) => item.Id === accountId);
      if (selectedAccount) {
        const accountTitle = selectedAccount.AccountTitle;
        console.log(accountTitle);
        form.setFieldValue(['voucherDetailList', 0, 'AccountTitle'], accountTitle);
      }
    }
  };
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
  // const handleEditRow2 = (record: any, index: number) => {
  //   console.log('Row Index: ', index);

  //   form.setFieldValue(['voucherDetailList', 0], record); // Update form values
  //   setIsEditMode(true);
  // };
  const handleEditRow = (record: any) => {
    setEdit(record);
    setTableData((prevData: any[]) => {
      const updatedData = [...prevData];
      const rowIndex = updatedData.findIndex((item: any) => item.CheqId === record.CheqId);

      if (rowIndex !== -1) {
        updatedData[rowIndex] = {
          ...updatedData[rowIndex],
          PaymentTypeId: record.PaymentType,
          AccountIdDebit: record.AccountTitle,
          JobLotId: record.JobLotDescription,
          DebitAmount: record.DebitAmount,
          DCheqDate: dayjs(record.DCheqDate),
          CheqNoDetail: record.CheqNoDetail,
          PayeeTitle: record.PayeeTitle,
          Comments: record.Comments,
        };
        form.setFieldValue(['voucherDetailList', 0], updatedData[rowIndex]);
        setIsEditMode(true);
      }
      console.log('New tableData:', updatedData);
      return updatedData;
    });
  };

  const handleSelectjobLotChange = (obj: TJobLot, index: number) => {
    form.setFieldValue(['voucherDetailList', 0, 'JobLotDescription'], obj?.JobLotDescription);
  };

  const handleAddToTable = () => {
    console.log('Form Values:', formValues);
    const newData = formValues.map((item) => ({
      AccountId: item.AccountId,
      AccountTitle: item.AccountTitle,
      AgainstAccountId: item.AgainstAccountId,
      JobLotDescription: item.JobLotDescription,
      JobLotId: item.JobLotId,
      QtyIn: item.QtyIn,
      ItemRate: item.ItemRate,
      ItemAmount: item.ItemAmount,
      DebitAmount: item.DebitAmount,
      RefInvoiceNo: item.RefInvoiceNo,
      Comments: item.Comments,
      IsTaxable: 'false',
    }));
    if (newData.some((item) => item.DebitAmount === null || item.DebitAmount === undefined)) {
      const message = 'Please fill  Debit Amount';
      notification.error({ message: message });
      return;
    }
    if (!RefAccountId) {
      const message = 'Please select Credit Account!';
      notification.error({ message: message });
      return;
    }
    if (newData.some((item) => item.AccountId === null || item.AccountId === undefined)) {
      const message = 'Please select Debit Account!';
      notification.error({ message: message });
      return;
    }

    form.setFieldValue(['voucherDetailList', 0, 'AccountIdDebit'], null);
    form.setFieldValue(['voucherDetailList', 0, 'AccountTitle'], null);
    form.setFieldValue(['voucherDetailList', 0, 'JobLotId'], null);
    form.setFieldValue(['voucherDetailList', 0, 'JobLotDescription'], null);
    form.setFieldValue(['voucherDetailList', 0, 'DebitAmount'], null);
    form.setFieldValue(['voucherDetailList', 0, 'Comments'], null);
    form.setFieldValue(['voucherDetailList', 0, 'CheqNoDetail'], null);
    form.setFieldValue(['voucherDetailList', 0, 'PayeeTitle'], null);
    setIsEditMode(false);
  };
  const handleUpdateToTable = () => {
    console.log('Form Values:', formValues);
    const newData = formValues.map((item) => ({
      AccountId: item.AccountId,
      AccountTitle: item.AccountTitle,
      AgainstAccountId: item.AgainstAccountId,
      JobLotDescription: item.JobLotDescription,
      JobLotId: item.JobLotId,
      QtyIn: item.QtyIn,
      ItemRate: item.ItemRate,
      ItemAmount: item.ItemAmount,
      DebitAmount: item.DebitAmount,
      RefInvoiceNo: item.RefInvoiceNo,
      Comments: item.Comments,
      IsTaxable: 'false',
    }));
    if (newData.some((item) => item.DebitAmount === null || item.DebitAmount === undefined)) {
      const message = 'Please fill  Debit Amount';
      notification.error({ message: message });
      return;
    }
    if (!RefAccountId) {
      const message = 'Please select Credit Account!';
      notification.error({ message: message });
      return;
    }
    if (newData.some((item) => item.AccountId === null || item.AccountId === undefined)) {
      const message = 'Please select Debit Account!';
      notification.error({ message: message });
      return;
    }
    const editedRowIndex = tableData.findIndex((row: any) => row.CheqId === edit?.CheqId);
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

    form.setFieldValue(['voucherDetailList', 0, 'AccountIdDebit'], null);
    form.setFieldValue(['voucherDetailList', 0, 'AccountTitle'], null);
    form.setFieldValue(['voucherDetailList', 0, 'JobLotId'], null);
    form.setFieldValue(['voucherDetailList', 0, 'JobLotDescription'], null);
    form.setFieldValue(['voucherDetailList', 0, 'DebitAmount'], null);
    form.setFieldValue(['voucherDetailList', 0, 'Comments'], null);
    form.setFieldValue(['voucherDetailList', 0, 'CheqNoDetail'], null);
    form.setFieldValue(['voucherDetailList', 0, 'PayeeTitle'], null);
    setIsEditMode(false);
  };
  const handleResetForm = () => {
    form.setFieldValue(['voucherDetailList', 0, 'AccountIdDebit'], null);
    form.setFieldValue(['voucherDetailList', 0, 'AccountTitle'], null);
    form.setFieldValue(['voucherDetailList', 0, 'JobLotId'], null);
    form.setFieldValue(['voucherDetailList', 0, 'JobLotDescription'], null);
    form.setFieldValue(['voucherDetailList', 0, 'DebitAmount'], null);
    form.setFieldValue(['voucherDetailList', 0, 'Comments'], null);
    form.setFieldValue(['voucherDetailList', 0, 'CheqNoDetail'], null);
    form.setFieldValue(['voucherDetailList', 0, 'PayeeTitle'], null);
    setIsEditMode(false);
  };
  const handleDeleteRow = (record: any) => {
    console.log(record);
    setTableData((prevData: any[]) => {
      const updatedData = prevData.filter((item: any) => item.CheqId !== record.CheqId);
      console.log('New tableData:', updatedData);
      return updatedData;
    });
  };
  const handleAgainstAccountChange = (accountId?: any) => {
    form.setFieldValue('AgainstAccountId', accountId);
  };
  useEffect(() => {
    form.setFieldValue(['voucherDetailList', 0, 'PaymentTypeId'], 'Regular');
    form.setFieldValue(['voucherDetailList', 0, 'PaymentType'], 'Regular');
    form.setFieldValue(['voucherDetailList', 0, 'DCheqDate'], dayjs(new Date()));
  }, [form]);
  // const [isWithHoldingChecked, setIsWithHoldingChecked] = useAtom(isWithHoldingCheckedAtom);
  const handleItemChange = (obj: any, index: number) => {
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
    // if (RefAccountId) {
    //   form.setFieldValue(['voucherDetailList', 0, 'AgainstAccountId'], RefAccountId);
    // }
  }, [form, SharedStateIncludeWHT, ScheduleData]);
  useEffect(() => {
    if (tableData.length > 0) {
      handleCalculations();
    }
  }, [form, tableData]);
  const calculateWeight = (itemQty: number, equivalentRate: number) => itemQty * equivalentRate;
  const handleItemQtyChange = (itemQty: number | string | null, index: number) => {
    const equivalentRate = getFieldValue(['voucherDetailList', index, 'ItemRate']);

    if (itemQty && typeof itemQty === 'number' && equivalentRate) {
      const amount = calculateWeight(itemQty, equivalentRate);
      setFields([{ name: ['voucherDetailList', index, 'DebitAmount'], value: amount }]);
    } else {
      setFields([{ name: ['voucherDetailList', index, 'DebitAmount'], value: null }]);
    }
  };
  const handleItemRateChange = (itemRate: number | string | null, index: number) => {
    const QtyIn = getFieldValue(['voucherDetailList', index, 'QtyIn']);

    if (itemRate && typeof itemRate === 'number' && QtyIn) {
      const amount = calculateWeight(itemRate, QtyIn);
      setFields([{ name: ['voucherDetailList', index, 'DebitAmount'], value: amount }]);
    } else {
      setFields([{ name: ['voucherDetailList', index, 'DebitAmount'], value: null }]);
    }
  };
  // useEffect(() => {
  //   const balance2 = data?.data?.Data?.Result?.[0]?.Balance;
  //   if (balance2 !== undefined) {
  //     form.setFieldValue(['voucherDetailList', 0, 'Balance'], numberFormatter(balance2));
  //   }
  // }, [form, tableData, data?.data?.Data?.Result]);
  return (
    <>
      <Row gutter={[16, 16]} style={{ marginTop: '0.8%' }}>
        <Col xs={24} sm={24} md={24} lg={{ span: 24 }} xl={{ span: 24 }}>
          <Card style={{ boxShadow: '2px 4px 12px 1px gray', paddingBottom: '0%' }}>
            <Form.List name="voucherDetailList" initialValue={[initialValues]}>
              {(fields, {}) => (
                <>
                  {fields.map((field) => (
                    <div
                      key={field.key}
                      className="form-list-container"
                      style={{ paddingTop: 5, display: 'flex', justifyContent: 'space-between' }}
                    >
                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 23 }}
                        md={{ span: 12 }}
                        lg={{ span: 12 }}
                        xl={{ span: 9 }}
                        xxl={{ span: 7 }}
                        className="formfield debit"
                        style={{ marginTop: '-2.5rem', borderBottom: '1px solid gray', padding: '0px', height: '60px' }}
                      >
                        <p style={{ marginTop: 0, marginLeft: '65%' }} className="dr">
                          Dr :<b> {numberFormatter(data?.data?.Data?.Result?.[0]?.Balance)}</b>
                        </p>
                        <p style={{ marginTop: 0 }}>
                          <AntSelectDynamic
                            bordered={false}
                            label={t('debit_account')}
                            fieldValue="Id"
                            fieldLabel="AccountTitle"
                            name={[field.name, 'AccountId']}
                            options={map(debit, (item: any) => ({
                              value: item.Id,
                              label: item.AccountTitle,
                            }))}
                            onChange={handleDebitAccountChange}
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
                        style={{ marginBottom: '1%' }}
                      >
                        <AntSelectDynamic
                          bordered={false}
                          label={t('job_lot')}
                          fieldValue="Id"
                          fieldLabel="JobLotDescription"
                          name={[field.name, 'JobLotId']}
                          query={useGetBPAJobLotSelect}
                          onSelectChange={(obj) => handleSelectjobLotChange(obj, field.name)}
                        />
                      </Col>
                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 23 }}
                        md={{ span: 11 }}
                        lg={{ span: 11 }}
                        xl={{ span: 9 }}
                        xxl={{ span: 4 }}
                        className="formfield"
                        style={{ marginBottom: '1%' }}
                      >
                        <AntInputNumber
                          type="number"
                          bordered={false}
                          label={t('bill_invoice_no')}
                          formItemProps={{ ...field, name: [field.name, 'RefInvoiceNo'] }}
                        />
                      </Col>
                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 23 }}
                        md={{ span: 12 }}
                        lg={{ span: 12 }}
                        xl={{ span: 7 }}
                        xxl={{ span: 3 }}
                        className="formfield"
                        style={{ marginBottom: '1%' }}
                      >
                        <AntInputNumber
                          type="number"
                          bordered={false}
                          label={t('qty')}
                          onChange={(itemQty) => handleItemQtyChange(itemQty, field.name)}
                          formItemProps={{ ...field, name: [field.name, 'QtyIn'] }}
                        />
                      </Col>

                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 23 }}
                        md={{ span: 12 }}
                        lg={{ span: 12 }}
                        xl={{ span: 6 }}
                        xxl={{ span: 4 }}
                        className="formfield"
                        style={{ marginBottom: '1%' }}
                      >
                        <AntInputNumber
                          min={0}
                          type="number"
                          bordered={false}
                          label={t('rate')}
                          onChange={(itemQty) => handleItemRateChange(itemQty, field.name)}
                          formItemProps={{ ...field, name: [field.name, 'ItemRate'] }}
                        />
                      </Col>

                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 23 }}
                        md={{ span: 11 }}
                        lg={{ span: 11 }}
                        xl={{ span: 7 }}
                        xxl={{ span: 4 }}
                        className="formfield"
                        style={{ marginBottom: '1%' }}
                      >
                        <AntInputNumber
                          min={0}
                          type="number"
                          bordered={false}
                          label={t('debit_amount')}
                          formItemProps={{ ...field, name: [field.name, 'DebitAmount'] }}
                        />
                      </Col>
                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 23 }}
                        md={{ span: 12 }}
                        lg={{ span: 12 }}
                        xl={{ span: 16 }}
                        xxl={{ span: 12 }}
                        style={{ marginBottom: '1%' }}
                        className="formfield"
                      >
                        <AntInput
                          bordered={false}
                          formItemProps={{ ...field, name: [field.name, 'Comments'] }}
                          label={t('remarks')}
                        />
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
                          type="number"
                          bordered={false}
                          label={''}
                          formItemProps={{ ...field, name: [field.name, 'ItemAmount'] }}
                          style={{ display: 'none' }}
                        />
                        <AntInput
                          bordered={false}
                          label={''}
                          formItemProps={{ ...field, name: [field.name, 'JobLotDescription'] }}
                          style={{ display: 'none' }}
                        />
                      </Col>
                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 24 }}
                        md={{ span: 24 }}
                        lg={{ span: 24 }}
                        xl={{ span: 24 }}
                        xxl={{ span: 7 }}
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
                      <Row gutter={[16, 16]} style={{ marginTop: '1%' }}>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
                          <AntTable
                            numberOfSkeletons={12}
                            scroll={{ x: '', y: convertVhToPixels('15vh') }}
                            data={tableData}
                            // columns={column2(t, handleDeleteRow, handleEditRow)}
                          />
                        </Col>
                      </Row>
                      <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
                        <Row gutter={14} style={{ marginTop: '1%' }}>
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
                                    // query={useGetBankPaymentTaxType}
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
                                  xl={{ span: 7 }}
                                  className="formfield"
                                >
                                  <AntSelectDynamic
                                    disabled={!SharedStateIncludeWHT}
                                    bordered={false}
                                    fieldValue="Id"
                                    fieldLabel="AccountTitle"
                                    formItemProps={{ ...field, name: [field.name, 'AgainstAccountId'] }}
                                    label={t('wht_account')}
                                    // options={map(filter, (item: any) => ({
                                    //   value: item.Id,
                                    //   label: item.AccountTitle,
                                    // }))}
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
                                  xl={{ span: 7 }}
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
  bankId: any;
  handleTaxTypeChange: any;
  setIsAddButtonClicked: any;
  SharedStateIncludeWHT: boolean;
  ScheduleData: any;
};

export default DynamicForm;
