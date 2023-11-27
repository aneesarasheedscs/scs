import { AntButton, AntDatePicker, AntInput, AntInputNumber, AntSelectDynamic, AntTable } from '@tradePro/components';
import { Card, Col, Row, Form, FormInstance, theme, notification } from 'antd';
import { add, map, sortBy, sumBy } from 'lodash';
import dayjs from 'dayjs';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import {
  useGetAccountsBalance,
  useGetBankPaymentJobLotSelect,
  useGetBankPaymentTaxType,
  useGetChequeNoSelectBind,
  useGetConfigration,
  useGetDebitAccountSelect,
  useGetWHTAgainstAcSelect,
} from '../queries/queries';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { TBankPaymentDetailEntry, TTaxType, TjobLot } from './types';
import { column2 } from '../table/columns';
import { useAtom } from 'jotai';
import { selectedCreditAccountAtom, totalValue, selectedAgainstAccountAtom, isWithHoldingCheckedAtom } from './Atom';
import { addtableData } from '../form/Atom';

const { useWatch } = Form;

const DynamicForm = ({ form, bankId }: TDynamicForm) => {
  const [chequeBookEnabled, setChequeBookEnabled] = useState(false);

  const formValues = useWatch<TBankPaymentDetailEntry[]>('voucherDetailList', form);
  const { t } = useTranslation();
  const [tableData, setTableData] = useAtom(addtableData);
  const [totalDebitAmounts, setTotalDebitAmounts] = useAtom(totalValue);
  const [selectedCreditAccount, setSelectedCreditAccount] = useAtom(selectedCreditAccountAtom);
  const [againstAccountAtom, setAgainstAccountAtom] = useAtom(selectedAgainstAccountAtom);
  const [refAccountId, setRefAccountId] = useState(0);
  const { data } = useGetAccountsBalance(refAccountId);
  const { data: configData } = useGetConfigration('CheqBook Enabled');
  const isExpenseAccountAllowed = configData?.data?.Data?.Result === 'True';
  const { data: debit } = useGetDebitAccountSelect();
  const [counter, setCounter] = useState<any>(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const { data: chequeBooks } = useGetChequeNoSelectBind(bankId);
  const allowedAccountTypes = isExpenseAccountAllowed ? [2, 15] : [2, 11, 12, 13, 14, 15, 20, 21];
  const filteredDebitAccounts = debit?.data?.Data?.Result.filter(
    (item: any) => !allowedAccountTypes.includes(item.AccountTypeId)
  );
  const { data: filter } = useGetWHTAgainstAcSelect();
  console.log(againstAccountAtom);
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
    DCheqDate: null,
    InvoiceNoRefId: null,
    CheqNoDetail: null,
    PayeeTitle: null,
    Comments: null,
    CreditAmount: 0,
    TaxesTotalAmount: 0,
  };
  const handleCreditAccountChange = (accountId: number) => {
    setRefAccountId(accountId);

    const selectedAccount = filteredDebitAccounts.find((item: any) => item.Id === accountId);

    if (selectedAccount) {
      const accountTitle = selectedAccount.AccountTitle;
      console.log(accountTitle);
      form.setFieldValue(['voucherDetailList', 0, 'AccountTitle'], accountTitle);
    }
  };

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

  const {
    token: { colorPrimary },
  } = theme.useToken();

  const chequeBookOptions =
    chequeBooks?.data?.Data?.Result?.map((chequeBook: any) => ({
      label: chequeBook.CheqNo,
      value: chequeBook.CheqNo,
    })) || [];

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
    const newData = formValues.map((item, index) => ({
      PaymentType: item.PaymentType,
      AccountId: item.AccountIdDebit,
      AccountTitle: item.AccountTitle,
      JobLotDescription: item.JobLotDescription,
      JobLotId: item.JobLotId,
      DebitAmount: item.DebitAmount,
      CreditAmount: item.DebitAmount,
      DCheqDate: `${dayjs(item.DCheqDate)}`,
      InvoiceNoRefId: item.InvoiceNoRefId,
      CheqNoDetail: item.CheqNoDetail,
      PayeeTitle: item.PayeeTitle,
      Comments: item.Comments,
      IsTaxable: 'false',
    }));

    if (newData.some((item) => item.DebitAmount === null || item.DebitAmount === undefined)) {
      const message = 'Please fill  Debit Amount';
      notification.error({ message: message });
      return;
    }
    if (!selectedCreditAccount) {
      const message = 'Please select a Credit Account';
      notification.error({ message: message });
      return;
    }
    if (newData.some((item) => item.AccountId === null || item.AccountId === undefined)) {
      const message = 'Please select a Debit account';
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
    const newData = formValues.map((item, index) => ({
      PaymentType: item.PaymentType,
      AccountId: item.AccountIdDebit,
      AccountTitle: item.AccountTitle,
      JobLotDescription: item.JobLotDescription,
      JobLotId: item.JobLotId,
      DebitAmount: item.DebitAmount,
      CreditAmount: item.DebitAmount,
      DCheqDate: `${dayjs(item.DCheqDate)}`,
      InvoiceNoRefId: item.InvoiceNoRefId,
      CheqNoDetail: item.CheqNoDetail,
      PayeeTitle: item.PayeeTitle,
      Comments: item.Comments,
      IsTaxable: 'false',
    }));
    if (newData.some((item) => item.DebitAmount === null || item.DebitAmount === undefined)) {
      const message = 'Please fill  Debit Amount';
      notification.error({ message: message });
      return;
    }

    if (newData.some((item) => item.AccountId === null || item.AccountId === undefined)) {
      const message = 'Please select a Debit account';
      notification.error({ message: message });
      return;
    }

    setCounter((prevCounter: any) => prevCounter - 1);
    setTableData((prevData: any[]) => {
      const updatedData = newData.map((item, index) => {
        const editedRowIndex = prevData.findIndex((row) => row.CheqId === edit.CheqId);
        if (editedRowIndex >= 0) {
          return {
            ...item,
            CheqId: edit.CheqId,
          };
        }
        return item;
      });

      const combinedData = [...prevData.filter((row) => row.CheqId !== edit.CheqId), ...updatedData];
      console.log('New tableData:', combinedData);
      return combinedData;
    });
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
  const [isWithHoldingChecked, setIsWithHoldingChecked] = useAtom(isWithHoldingCheckedAtom);

  const handleItemChange = (obj: TTaxType, index: number) => {
    form.setFields([{ name: ['voucherDetailList', index, 'TaxPrcnt'], value: obj?.Id }]);
  };
  useEffect(() => {
    const CreditAmount = form.getFieldValue('CreditAmount');
    const DebitAmount = tableData.map((item: any) => item.DebitAmount);
    const totalDebitAmount = sumBy(DebitAmount);
    const TaxesTotalAmount = add(totalDebitAmount, CreditAmount);
    console.log(totalDebitAmount);
    console.log(TaxesTotalAmount);
    form.setFields([{ name: ['voucherDetailList', 0, 'Amount'], value: totalDebitAmount }]);
    form.setFields([{ name: ['voucherDetailList', 0, 'TaxesTotalAmount'], value: TaxesTotalAmount }]);
  }, [form, tableData, totalDebitAmounts]);
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
                        sm={{ span: 21 }}
                        md={{ span: 11 }}
                        lg={{ span: 11 }}
                        xl={{ span: 5 }}
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
                        <AntInput
                          bordered={false}
                          label={''}
                          formItemProps={{ ...field, name: [field.name, 'PaymentType'] }}
                          style={{ width: '102.5%', display: 'none' }}
                        />
                      </Col>

                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 21 }}
                        md={{ span: 11 }}
                        lg={{ span: 12 }}
                        xl={{ span: 8 }}
                        xxl={{ span: 8 }}
                        className="formfield"
                        style={{ marginTop: '-2.5rem', borderBottom: '1px solid gray', padding: '0px', height: '60px' }}
                      >
                        <p style={{ marginTop: 0, marginLeft: '55%' }}>
                          Dr : <b> {data?.data?.Data?.Result?.[0]?.Balance.toFixed(2)}</b>
                        </p>
                        <p style={{ marginTop: 0 }}>
                          <AntSelectDynamic
                            bordered={false}
                            label={t('debit_account')}
                            fieldValue="Id"
                            fieldLabel="AccountTitle"
                            name={[field.name, 'AccountIdDebit']}
                            options={map(filteredDebitAccounts, (item: any) => ({
                              value: item.Id,
                              label: item.AccountTitle,
                            }))}
                            onChange={handleCreditAccountChange}
                          />
                        </p>
                      </Col>

                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 21 }}
                        md={{ span: 11 }}
                        lg={{ span: 11 }}
                        xl={{ span: 4 }}
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
                        xs={{ span: 24 }}
                        sm={{ span: 21 }}
                        md={{ span: 11 }}
                        lg={{ span: 12 }}
                        xl={{ span: 5 }}
                        xxl={{ span: 5 }}
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
                        xs={{ span: 24 }}
                        sm={{ span: 21 }}
                        md={{ span: 11 }}
                        lg={{ span: 11 }}
                        xl={{ span: 6 }}
                        xxl={{ span: 5 }}
                        className="formfield"
                        style={{ marginBottom: '1%' }}
                      >
                        <AntDatePicker
                          bordered={false}
                          label={t('cheque_date')}
                          formItemProps={{ ...field, name: [field.name, 'DCheqDate'] }}
                        />
                      </Col>

                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 21 }}
                        md={{ span: 11 }}
                        lg={{ span: 12 }}
                        xl={{ span: 5 }}
                        xxl={{ span: 5 }}
                        className="formfield"
                        style={{ marginBottom: '1%' }}
                      >
                        {chequeBookEnabled ? (
                          <AntInput
                            bordered={false}
                            label={t('cheque_no')}
                            formItemProps={{ ...field, name: [field.name, 'CheqNoDetail'] }}
                            required={isChequeNoCompulsory}
                          />
                        ) : (
                          <AntSelectDynamic
                            bordered={false}
                            label={t('cheque_no')}
                            required={isChequeNoCompulsory}
                            fieldValue="Id"
                            fieldLabel="CheqNo"
                            options={chequeBookOptions}
                            name={[field.name, 'CheqNoDetail']}
                          />
                        )}
                      </Col>
                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 21 }}
                        md={{ span: 11 }}
                        lg={{ span: 11 }}
                        xl={{ span: 12 }}
                        xxl={{ span: 13 }}
                        className="formfield payment"
                        style={{ marginBottom: '1%' }}
                      >
                        <AntInput
                          formItemProps={{ ...field, name: [field.name, 'PayeeTitle'] }}
                          bordered={false}
                          label={t('payee_title')}
                        />
                      </Col>

                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 21 }}
                        md={{ span: 11 }}
                        lg={{ span: 12 }}
                        xl={{ span: 12 }}
                        xxl={{ span: 11 }}
                        style={{ marginBottom: '1%' }}
                        className="formfield"
                      >
                        <AntInput
                          bordered={false}
                          formItemProps={{ ...field, name: [field.name, 'Comments'] }}
                          label={t('remarks')}
                          style={{ width: '102.5%' }}
                        />
                        <AntInput
                          bordered={false}
                          label={''}
                          formItemProps={{ ...field, name: [field.name, 'PaymentType'] }}
                          style={{ width: '102.5%', display: 'none' }}
                        />
                        <AntInput
                          bordered={false}
                          label={''}
                          formItemProps={{ ...field, name: [field.name, 'AccountTitle'] }}
                          style={{ width: '102.5%', display: 'none' }}
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
                        lg={{ span: 12 }}
                        xl={{ span: 11 }}
                        xxl={{ span: 12 }}
                      >
                        <Row style={{ marginTop: '' }}>
                          <Col xs={{ span: 24 }} sm={{ span: 4 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 3 }}>
                            <AntButton
                              onClick={isEditMode ? handleUpdateToTable : handleAddToTable}
                              label={isEditMode ? `${t('update')}` : `${t('add')}`}
                              style={{ marginLeft: -10 }}
                            ></AntButton>
                          </Col>
                        </Row>
                      </Col>
                      <Row gutter={[16, 16]} style={{ marginTop: '1%' }}>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
                          <Card style={{ boxShadow: '2px 4px 12px 1px gray', textAlign: 'left' }}>
                            <AntTable
                              // isError={isError}
                              numberOfSkeletons={12}
                              // isLoading={isLoading}
                              scroll={{ x: '', y: convertVhToPixels('15vh') }}
                              data={tableData}
                              columns={column2(t, handleDeleteRow, handleEditRow)}
                            />
                          </Card>
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
                                  xs={{ span: 20 }}
                                  sm={{ span: 20 }}
                                  md={{ span: 9 }}
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
                                    onSelectChange={(obj) => handleItemChange(obj, field.name)}
                                  />
                                </Col>

                                <Col
                                  xs={{ span: 20 }}
                                  sm={{ span: 20 }}
                                  md={{ span: 9 }}
                                  lg={{ span: 10 }}
                                  xl={{ span: 6 }}
                                  className="formfield"
                                >
                                  <AntInputNumber
                                    readOnly
                                    disabled={!isWithHoldingChecked}
                                    bordered={false}
                                    label={t('tax_percentage')}
                                    formItemProps={{ ...field, name: [field.name, 'TaxPrcnt'] }}
                                  />
                                </Col>
                                <Col
                                  xs={{ span: 20 }}
                                  sm={{ span: 20 }}
                                  md={{ span: 9 }}
                                  lg={{ span: 10 }}
                                  xl={{ span: 7 }}
                                  className="formfield"
                                >
                                  <AntSelectDynamic
                                    disabled={!isWithHoldingChecked}
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
                                  xs={{ span: 20 }}
                                  sm={{ span: 20 }}
                                  md={{ span: 9 }}
                                  lg={{ span: 10 }}
                                  xl={{ span: 7 }}
                                  className="formfield"
                                  style={{ marginTop: '0%' }}
                                >
                                  <AntInputNumber
                                    readOnly
                                    disabled={!isWithHoldingChecked}
                                    bordered={false}
                                    label={t('amount')}
                                    formItemProps={{ ...field, name: [field.name, 'Amount'] }}
                                  />
                                </Col>
                                <Col
                                  xs={{ span: 20 }}
                                  sm={{ span: 20 }}
                                  md={{ span: 9 }}
                                  lg={{ span: 10 }}
                                  xl={{ span: 6 }}
                                  style={{ marginTop: '0%' }}
                                  className="formfield"
                                >
                                  <AntInputNumber
                                    readOnly
                                    disabled={!isWithHoldingChecked}
                                    bordered={false}
                                    label={t('tax_amount')}
                                    formItemProps={{ ...field, name: [field.name, 'CreditAmount'] }}
                                  />
                                </Col>
                                <Col
                                  xs={{ span: 20 }}
                                  sm={{ span: 20 }}
                                  md={{ span: 9 }}
                                  lg={{ span: 10 }}
                                  xl={{ span: 7 }}
                                  style={{ marginTop: '0%' }}
                                  className="formfield"
                                >
                                  <AntInputNumber
                                    readOnly
                                    disabled={!isWithHoldingChecked}
                                    bordered={false}
                                    label={t('total_amount')}
                                    formItemProps={{ ...field, name: [field.name, 'TaxesTotalAmount'] }}
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
          </Card>
        </Col>
      </Row>
    </>
  );
};

type TDynamicForm = { form: FormInstance; bankId: any };

export default DynamicForm;
