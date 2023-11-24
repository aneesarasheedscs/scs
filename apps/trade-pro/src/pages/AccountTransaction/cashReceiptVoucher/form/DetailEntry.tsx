import { AntButton, AntInput, AntInputNumber, AntSelectDynamic, AntTable } from '@tradePro/components';
import { Card, Col, Row, Form, FormInstance, theme, notification } from 'antd';
import { map, sumBy } from 'lodash';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import {
  useGetAccountsBalance,
  useGetCashReceiptJobLotSelect,
  useGetConfigration,
  useGetDebitAccountSelect,
} from '../queries/queries';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { TCashReceiptDetailEntry, TjobLot } from './types';
import { column2 } from '../table/columns';
import { useAtom } from 'jotai';
import { addtableData, listAtom, selectedCreditAccountAtom, totalValue } from './Atom';
import dayjs from 'dayjs';

const { useWatch } = Form;

const DynamicForm = ({ form, againstAccountId }: TDynamicForm) => {
  const { t } = useTranslation();
  const [totalCreditAmounts, setTotalCreditAmounts] = useAtom(totalValue);
  const [voucherDetailList, setVoucherDetailList] = useAtom(listAtom);
  const [refAccountId, setRefAccountId] = useState(0);
  const { data } = useGetAccountsBalance(refAccountId);
  const [selectedCreditAccount] = useAtom(selectedCreditAccountAtom);
  const [tableData, setTableData] = useAtom(addtableData);
  const formValues = useWatch<TCashReceiptDetailEntry[]>('voucherDetailList', form);
  const { data: configData } = useGetConfigration('CheqBook Enabled');
  const isExpenseAccountAllowed = configData?.data?.Data?.Result === 'True';
  const { data: debit } = useGetDebitAccountSelect();
  const allowedAccountTypes = isExpenseAccountAllowed ? [2, 15] : [2, 11, 12, 13, 14, 15, 20, 21];
  const filteredDebitAccounts = debit?.data?.Data?.Result.filter(
    (item: any) => !allowedAccountTypes.includes(item.AccountTypeId)
  );
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
    PaymentTypeId: null,
    PaymentType: null,
    AccountId: null,
    AccountTitle: null,
    JobLotId: null,
    JobLotDescription: null,
    CreditAmount: null,
    Comments: null,
  };

  const {
    token: { colorPrimary },
  } = theme.useToken();

  const [isEditMode, setIsEditMode] = useState(false);

  // For Debit Account
  const handleCreditAccountChange = (accountId: number) => {
    setRefAccountId(accountId);

    if (accountId === 21321) {
      form.setFieldValue(['voucherDetailList', 0, 'AccountTitle'], 'RK INTERNATIONAL ');
    } else if (accountId === 21322) {
      form.setFieldValue(['voucherDetailList', 0, 'AccountTitle'], 'ABDUL AHAD DAAL MILS FSD');
    } else if (accountId === 21323) {
      form.setFieldValue(['voucherDetailList', 0, 'AccountTitle'], 'AAA FOODS SARGODHA');
    } else if (accountId === 21324) {
      form.setFieldValue(['voucherDetailList', 0, 'AccountTitle'], 'ABDUL HAMEED & SONS');
    } else if (accountId === 21325) {
      form.setFieldValue(['voucherDetailList', 0, 'AccountTitle'], 'ABDUL MAJEED DAAL FACTORY');
    } else if (accountId === 21326) {
      form.setFieldValue(['voucherDetailList', 0, 'AccountTitle'], 'ABDULLAH TRADERS - MANDI SADIC');
    } else if (accountId === 21327) {
      form.setFieldValue(['voucherDetailList', 0, 'AccountTitle'], 'ABDUL RAHEEM TRADERS FSD');
    } else if (accountId === 21328) {
      form.setFieldValue(['voucherDetailList', 0, 'AccountTitle'], 'ADNAN DAAL MILL');
    } else if (accountId === 21329) {
      form.setFieldValue(['voucherDetailList', 0, 'AccountTitle'], 'ADAN TRADERS - FSD');
    }
  };

  const [counter, setCounter] = useState<any>(0);

  const handleAddToTable = () => {
    const newData = formValues.map((item, index) => ({
      PaymentType: item.PaymentType,
      AccountId: item.AccountId,
      AccountTitle: item.AccountTitle,
      JobLotDescription: item.JobLotDescription,
      JobLotId: item.JobLotId,
      DebitAmount: item.CreditAmount,
      CreditAmount: item.CreditAmount,
      Comments: item.Comments,
    }));
    if (newData.some((item) => item.CreditAmount === null || item.CreditAmount === undefined)) {
      const message = 'Please fill  Credit Amount';
      notification.error({ message: message });
      return;
    }
    if (!selectedCreditAccount) {
      const message = 'Please select a Debit Account';
      notification.error({ message: message });
      return;
    }
    if (newData.some((item) => item.AccountId === null || item.AccountId === undefined)) {
      const message = 'Please fill  Credit Account';
      notification.error({ message: message });
      return;
    }
    setCounter((prevCounter: any) => prevCounter + 1);
    setTableData((prevData: any[]) => {
      const updatedData = newData.map((item) => ({
        ...item,
        CheqId: counter,
        ChequeNo: counter,
        AgainstAccountId: againstAccountId,
      }));
      const combinedData = [...prevData, ...updatedData];
      console.log('New tableData:', combinedData);
      return combinedData;
    });

    form.setFieldValue(['voucherDetailList', 0, 'AccountId'], null);
    form.setFieldValue(['voucherDetailList', 0, 'JobLotId'], null);
    form.setFieldValue(['voucherDetailList', 0, 'CreditAmount'], null);
    form.setFieldValue(['voucherDetailList', 0, 'Comments'], null);
    setIsEditMode(false);
  };

  const handleDeleteRow = (record: any) => {
    setTableData((prevData: any[]) => {
      const updatedData = prevData.filter((item: any) => item.CheqId !== record.CheqId);
      console.log('New tableData:', updatedData);
      return updatedData;
    });
  };

  const handleUpdateToTable = () => {
    console.log('Form Values:', formValues);
    const newData = formValues.map((item, index) => ({
      PaymentType: item.PaymentType,
      AccountId: item.AccountId,
      AccountTitle: item.AccountTitle,
      JobLotDescription: item.JobLotDescription,
      JobLotId: item.JobLotId,
      DebitAmount: item.DebitAmount,
      CreditAmount: item.DebitAmount,
      Comments: item.Comments,
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
            CheqId: counter,
            ChequeNo: counter,
            AgainstAccountId: againstAccountId,
          };
        }
        return item;
      });

      const combinedData = [...prevData.filter((row) => row.CheqId !== edit.CheqId), ...updatedData];
      console.log('New tableData:', combinedData);
      return combinedData;
    });
    form.setFieldValue(['voucherDetailList', 0, 'AccountId'], null);
    form.setFieldValue(['voucherDetailList', 0, 'JobLotId'], null);
    form.setFieldValue(['voucherDetailList', 0, 'CreditAmount'], null);
    form.setFieldValue(['voucherDetailList', 0, 'Comments'], null);
    setIsEditMode(false);
  };
  const handleEditRow = (record: any) => {
    setEdit(record);
    setTableData((prevData: any[]) => {
      const updatedData = [...prevData]; // Create a copy of the array
      const rowIndex = updatedData.findIndex((item: any) => item.CheqId === record.CheqId);
      if (rowIndex !== -1) {
        updatedData[rowIndex] = {
          ...updatedData[rowIndex],
          PaymentTypeId: record.PaymentType,
          AccountId: record.AccountTitle,
          JobLotId: record.JobLotDescription,
          DebitAmount: record.DebitAmount,
          Comments: record.Comments,
        };
        form.setFieldValue(['voucherDetailList', 0], updatedData[rowIndex]); // Update form values
        setIsEditMode(true);
      }
      console.log('New tableData:', updatedData);
      return updatedData;
    });
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

  const list = tableData.map((item: any) => item);

  const DebitAmount = tableData.map((item: any) => item.DebitAmount);
  const totalDebitAmount = sumBy(DebitAmount);
  useEffect(() => {
    setTotalCreditAmounts(totalDebitAmount);
    setVoucherDetailList(list);
  }, [tableData]);

  useEffect(() => {
    form.setFieldValue(['voucherDetailList', 0, 'PaymentTypeId'], 'Regular');
    form.setFieldValue(['voucherDetailList', 0, 'PaymentType'], 'Regular');
    form.setFieldValue(['voucherDetailList', 0, 'DCheqDate'], dayjs(new Date()));
  }, [form]);

  return (
    <>
      <Row gutter={[16, 16]} style={{ marginTop: '-2%' }}>
        <Col xs={24} sm={24} md={24} lg={{ span: 24 }} xl={{ span: 24 }}>
          <Card style={{ boxShadow: '2px 4px 12px 1px gray', paddingBottom: '1%' }}>
            <br />

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
                        className="formfield type"
                        style={{ marginBottom: '1%' }}
                      >
                        <AntSelectDynamic
                          defaultValue={1}
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
                        xl={{ span: 5, offset: 1 }}
                        className="formfield balance"
                        style={{ marginTop: '-2.5rem', borderBottom: '1px solid gray', padding: '0px', height: '60px' }}
                      >
                        <p style={{ marginTop: -10 }}>
                          {t('credit_account_balance')} : <b> {data?.data?.Data?.Result?.[0]?.Balance.toFixed(2)}</b>
                        </p>
                        <p style={{ marginTop: 12 }}>
                          <AntSelectDynamic
                            bordered={false}
                            label={t('credit_account')}
                            fieldValue="Id"
                            fieldLabel="AccountTitle"
                            name={[field.name, 'AccountId']}
                            options={map(filteredDebitAccounts, (item: any) => ({
                              value: item.Id,
                              label: item.AccountTitle,
                            }))}
                            onChange={handleCreditAccountChange}
                          />
                        </p>
                      </Col>

                      <Col
                        xs={{ span: 24, offset: 0 }}
                        sm={{ span: 21, offset: 1 }}
                        md={{ span: 11, offset: 0 }}
                        lg={{ span: 11, offset: 0 }}
                        xl={{ span: 5, offset: 1 }}
                        className="formfield"
                        style={{ marginBottom: '1%' }}
                      >
                        <AntSelectDynamic
                          bordered={false}
                          label={t('job_lot')}
                          fieldValue="Id"
                          fieldLabel="JobLotDescription"
                          name={[field.name, 'JobLotId']}
                          query={useGetCashReceiptJobLotSelect}
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
                          label={t('credit_amount')}
                          formItemProps={{ ...field, name: [field.name, 'CreditAmount'] }}
                        />
                      </Col>

                      <Col
                        xs={{ span: 24, offset: 0 }}
                        sm={{ span: 21, offset: 1 }}
                        md={{ span: 20, offset: 0 }}
                        lg={{ span: 19, offset: 0 }}
                        xl={{ span: 14, offset: 0 }}
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

                      <Col xs={{ span: 1 }} sm={{ span: 1 }} md={{ span: 25 }} lg={{ span: 2 }} xl={{ span: 5 }}>
                        <AntButton
                          className="add"
                          onClick={isEditMode ? handleUpdateToTable : handleAddToTable}
                          label={isEditMode ? <>{t('update')}</> : <>{t('add')}</>}
                        />
                      </Col>
                    </div>
                  ))}
                </>
              )}
            </Form.List>
            <br />
            <Card style={{ boxShadow: '2px 4px 12px 1px gray', textAlign: 'left' }}>
              <AntTable
                numberOfSkeletons={12}
                scroll={{ x: '', y: convertVhToPixels('15vh') }}
                data={tableData}
                columns={column2(t, handleDeleteRow, handleEditRow)}
              />
            </Card>
          </Card>

          <br />
        </Col>
      </Row>
    </>
  );
};

type TDynamicForm = { form: FormInstance; againstAccountId: any };

export default DynamicForm;