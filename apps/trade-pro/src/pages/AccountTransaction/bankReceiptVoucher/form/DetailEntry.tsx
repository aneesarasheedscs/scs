import { Card, Col, Row, Form, FormInstance, theme, notification } from 'antd';
import { AntButton, AntInput, AntInputNumber, AntSelectDynamic, AntTable } from '@tradePro/components';
import { map, sumBy } from 'lodash';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useGetAccountsBalance,
  useGetBankReceiptJobLotSelect,
  useGetConfigration,
  useGetCreditAccountSelect,
} from '../queries/queries';
import { TBankReceiptDetailEntry, TjobLot } from './types';
import { column2 } from '../table/columns';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { listAtom, totalValue } from './Atom';
import { useAtom } from 'jotai';
import { listAtomforTax } from '@tradePro/pages/bankPaymentVoucher/form/Atom';

const { useWatch } = Form;

const DynamicForm = ({ form }: TDynamicForm) => {
  const formValues = useWatch<TBankReceiptDetailEntry[]>('voucherDetailList', form);
  const { t } = useTranslation();
  const [tableData, setTableData] = useState<any>([]);
  const [totalCreditAmounts, setTotalCreditAmounts] = useAtom(totalValue);
  const [voucherDetailList, setVoucherDetailList] = useAtom(listAtom);
  const [refAccountId, setRefAccountId] = useState(0);
  const { data } = useGetAccountsBalance(refAccountId);
  const { data: configData } = useGetConfigration('CheqBook Enabled');
  const isExpenseAccountAllowed = configData?.data?.Data?.Result === 'True';
  const { data: credit } = useGetCreditAccountSelect();
  const [counter, setCounter] = useState<any>(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const allowedAccountTypes = isExpenseAccountAllowed ? [2, 15] : [2, 11, 12, 13, 14, 15, 20, 21];
  const filteredCreditAccounts = credit?.data?.Data?.Result.filter(
    (item: any) => !allowedAccountTypes.includes(item.AccountTypeId)
  );
  const [voucherDetailListforTax, setVoucherDetailListforTax] = useAtom(listAtomforTax);

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
    JobLotDescription: null,
    JobLotId: null,
    CreditAmount: null,
    DCheqDate: null,
    InvoiceNoRefId: null,
    CheqNoDetail: null,
    PayeeTitle: null,
    Comments: null,
  };

  const {
    token: { colorPrimary },
  } = theme.useToken();

  const handleRefAccountChange = async (accountId: any) => {
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

  const handleEditRow = (record: any) => {
    setTableData((prevData: any[]) => {
      const updatedData = prevData.filter((item: any) => item.CheqId !== record.CheqId);
      form.setFieldValue(['voucherDetailList', 0, 'PaymentTypeId'], record.PaymentType);
      form.setFieldValue(['voucherDetailList', 0, 'AccountId'], record.AccountTitle);
      form.setFieldValue(['voucherDetailList', 0, 'JobLotId'], record.JobLotDescription);
      form.setFieldValue(['voucherDetailList', 0, 'CreditAmount'], record.CreditAmount);
      form.setFieldValue(['voucherDetailList', 0, 'Comments'], record.Comments);
      setIsEditMode(true);
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

  const handleAddToTable = () => {
    console.log('Form Values:', formValues);
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
      const message = 'Please fill   Credit Amount';
      notification.error({ message: message });
      return;
    }
    if (newData.some((item) => item.AccountId === null || item.AccountId === undefined)) {
      const message = 'Please select a Credit Account';
      notification.error({ message: message });
      return;
    }

    setCounter((prevCounter: any) => prevCounter - 1);
    setTableData((prevData: any[]) => {
      const updatedData = newData.map((item) => ({
        ...item,
        CheqId: counter,
        ChequeNo: counter,
        TaxTypeId: voucherDetailListforTax,
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

  const handleUpdateToTable = () => {
    console.log('Form Values:', formValues);
    const newData = formValues.map((item, index) => ({
      PaymentType: item.PaymentTypeId,
      AccountId: item.AccountId,
      AccountTitle: item.AccountTitle,
      JobLotDescription: item.JobLotDescription,
      JobLotId: item.JobLotId,
      CreditAmount: item.CreditAmount,
      Comments: item.Comments,
    }));
    if (newData.some((item) => item.CreditAmount === null || item.CreditAmount === undefined)) {
      const message = 'Please fill   Credit Amount';
      notification.error({ message: message });
      return;
    }
    if (newData.some((item) => item.AccountId === null || item.AccountId === undefined)) {
      const message = 'Please select a Credit Account';
      notification.error({ message: message });
      return;
    }

    setCounter((prevCounter: any) => prevCounter - 1);
    setTableData((prevData: any[]) => {
      const updatedData = newData.map((item) => ({
        ...item,
        CheqId: counter,
        ChequeNo: counter,
        TaxTypeId: voucherDetailListforTax,
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
    console.log(record);
    setTableData((prevData: any[]) => {
      const updatedData = prevData.filter((item: any) => item.CheqId !== record.CheqId);
      console.log('New tableData:', updatedData);
      return updatedData;
    });
  };

  const list = tableData.map((item: any) => item);
  console.log(list);
  const CreditAmount = tableData.map((item: any) => item.CreditAmount);
  const totalCreditAmount = sumBy(CreditAmount);
  useEffect(() => {
    setTotalCreditAmounts(totalCreditAmount);
    setVoucherDetailList(list);
  }, [tableData]);

  useEffect(() => {
    form.setFieldValue(['voucherDetailList', 0, 'PaymentTypeId'], 'Regular');
    form.setFieldValue(['voucherDetailList', 0, 'PaymentType'], 'Regular');
  }, [form]);

  return (
    <>
      <Row gutter={[16, 16]} style={{ marginTop: '0.8%' }}>
        <Col span={24}>
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
                        md={{ span: 11 }}
                        lg={{ span: 11 }}
                        xl={{ span: 7 }}
                        xxl={{ span: 5 }}
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
                        xs={{ span: 24 }}
                        sm={{ span: 23 }}
                        md={{ span: 12 }}
                        lg={{ span: 12 }}
                        xl={{ span: 9 }}
                        xxl={{ span: 7 }}
                        className="formfield credit"
                        style={{ marginTop: '-2.5rem', borderBottom: '1px solid gray', padding: '0px', height: '60px' }}
                      >
                        <p style={{ marginTop: 0, marginLeft: '55%' }} className="dr">
                          Cr : <b> {data?.data?.Data?.Result?.[0]?.Balance.toFixed(2)}</b>
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
                            onChange={handleRefAccountChange}
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
                        style={{ marginBottom: '1%' }}
                      >
                        <AntInputNumber
                          min={0}
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
                        xl={{ span: 9 }}
                        xxl={{ span: 12 }}
                        style={{ marginBottom: '1%' }}
                        className="formfield"
                      >
                        <AntInput
                          bordered={false}
                          label={t('remarks')}
                          formItemProps={{ ...field, name: [field.name, 'Comments'] }}
                        />
                      </Col>
                      <Col
                        xs={{ span: 7, offset: 11 }}
                        sm={{ span: 5, offset: 11 }}
                        md={{ span: 4, offset: 11 }}
                        lg={{ span: 4, offset: 11 }}
                        xl={{ span: 2, offset: 1 }}
                        xxl={{ span: 2, offset: 0 }}
                        className="add"
                      >
                        <AntButton
                          // style={{ marginLeft: -40 }}
                          onClick={isEditMode ? handleUpdateToTable : handleAddToTable}
                          label={isEditMode ? <>{t('update')}</> : <>{t('add')}</>}
                          style={{ marginLeft: -32 }}
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
                        formItemProps={{ ...field, name: [field.name, 'CreditAmount'] }}
                      />
                    </div>
                  ))}

                  <Row gutter={[16, 16]} style={{ marginTop: '1.5%' }}>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
                      <AntTable
                        numberOfSkeletons={12}
                        scroll={{ x: '', y: convertVhToPixels('15vh') }}
                        data={tableData}
                        columns={column2(t, handleDeleteRow, handleEditRow)}
                      />
                    </Col>
                  </Row>
                </>
              )}
            </Form.List>
          </Card>
        </Col>
      </Row>
    </>
  );
};

type TDynamicForm = { form: FormInstance };

export default DynamicForm;
