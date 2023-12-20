import { AntButton, AntInput, AntInputNumber, AntSelectDynamic, AntTable } from '@tradePro/components';
import { Card, Col, FormInstance, Row, Form, notification } from 'antd';
import { map, sumBy } from 'lodash';
import '../style.scss';
import { useGetAccountsBalance, useGetExpenseFetchAccountSelect2, useGetExpenseJobLotSelect } from '../queries/queries';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TExpenseDetailEntry, TjobLot } from './types';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { columns2 } from '../table/columns';
import { useAtom } from 'jotai';
import { addtableData, listAtom, totalValue } from './Atom';

const { useWatch } = Form;

const DynamicForm = ({ form, againstAccountId }: TDynamicForm) => {
  const { t } = useTranslation();
  const [totalDebitAmounts, setTotalDebitAmounts] = useAtom(totalValue);
  const [voucherDetailList, setVoucherDetailList] = useAtom(listAtom);
  const [refAccountId, setRefAccountId] = useState(0);
  const { data } = useGetAccountsBalance(refAccountId);
  const [tableData, setTableData] = useAtom(addtableData);
  const formValues = useWatch<TExpenseDetailEntry[]>('voucherDetailList', form);
  const initialValues = {
    AccountId: null,
    AccountTitle: null,
    JobLotId: null,
    JobLotDescription: null,
    DebitAmount: null,
    Comments: null,
  };
  const [isEditMode, setIsEditMode] = useState(false);
  const { data: debit } = useGetExpenseFetchAccountSelect2();

  // For Debit Account
  const handleDebitAccountChange = (value: any) => {
    setRefAccountId(value);

    if (value === 21605) {
      form.setFieldValue(['voucherDetailList', 0, 'AccountTitle'], 'GENERAL EXPENSE A/C');
    } else if (value === 21608) {
      form.setFieldValue(['voucherDetailList', 0, 'AccountTitle'], 'SALE DISCOUNT A/C');
    } else if (value === 21614) {
      form.setFieldValue(['voucherDetailList', 0, 'AccountTitle'], 'MISCELLANOUS EXPENSE A/C');
    } else if (value === 21622) {
      form.setFieldValue(['voucherDetailList', 0, 'AccountTitle'], 'KITCHEN EXPENSE');
    } else if (value === 21655) {
      form.setFieldValue(['voucherDetailList', 0, 'AccountTitle'], 'IRT AKBARI TRUST A/C');
    } else if (value === 21692) {
      form.setFieldValue(['voucherDetailList', 0, 'AccountTitle'], 'RATE & WEIGHT DIFFERENCE A/C');
    } else if (value === 21740) {
      form.setFieldValue(['voucherDetailList', 0, 'AccountTitle'], 'STAFF SALARIES EXPENSE A/C');
    } else if (value === 21895) {
      form.setFieldValue(['voucherDetailList', 0, 'AccountTitle'], 'TRADE WITH ALLAH');
    } else if (value === 21899) {
      form.setFieldValue(['voucherDetailList', 0, 'AccountTitle'], 'MARKETING EXPENSES');
    }
  };

  const [counter, setCounter] = useState<any>(0);

  const handleAddToTable = () => {
    const newData = formValues.map((item, index) => ({
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
    setCounter((prevCounter: any) => prevCounter + 1);
    setTableData((prevData: any[]) => {
      const updatedData = newData.map((item) => ({
        ...item,
        key: counter,
        AgainstAccountId: againstAccountId,
      }));
      const combinedData = [...prevData, ...updatedData];
      console.log('New tableData:', combinedData);
      return combinedData;
    });
    form.setFieldValue(['voucherDetailList', 0, 'AccountId'], null);
    form.setFieldValue(['voucherDetailList', 0, 'JobLotId'], null);
    form.setFieldValue(['voucherDetailList', 0, 'DebitAmount'], null);
    form.setFieldValue(['voucherDetailList', 0, 'Comments'], null);
    setIsEditMode(false);
  };

  const handleUpdateToTable = () => {
    const newData = formValues.map((item, index) => ({
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
    setCounter((prevCounter: any) => prevCounter - 1);
    setTableData((prevData: any[]) => {
      const updatedData = newData.map((item) => ({
        ...item,
        key: counter,
        AgainstAccountId: againstAccountId,
      }));

      const combinedData = [...prevData, ...updatedData];
      console.log('New tableData:', combinedData);
      return combinedData;
    });
    form.setFieldValue(['voucherDetailList', 0, 'AccountId'], null);
    form.setFieldValue(['voucherDetailList', 0, 'JobLotId'], null);
    form.setFieldValue(['voucherDetailList', 0, 'DebitAmount'], null);
    form.setFieldValue(['voucherDetailList', 0, 'Comments'], null);
    setIsEditMode(false);
  };
  const handleDeleteRow = (record: any) => {
    setTableData((prevData: any[]) => {
      const updatedData = prevData.filter((item: any) => item.key !== record.key);
      console.log('New tableData:', updatedData);
      return updatedData;
    });
  };

  const handleEditRow = (record: any) => {
    setTableData((prevData: any[]) => {
      const updatedData = prevData.filter((item: any) => item.key !== record.key);
      form.setFieldValue(['voucherDetailList', 0, 'AccountId'], record.AccountTitle);
      form.setFieldValue(['voucherDetailList', 0, 'JobLotId'], record.JobLotDescription);
      form.setFieldValue(['voucherDetailList', 0, 'DebitAmount'], record.DebitAmount);
      form.setFieldValue(['voucherDetailList', 0, 'Comments'], record.Remarks);
      setIsEditMode(true);
      console.log('New tableData:', updatedData);
      return updatedData;
    });
  };

  const handleSelectjobLotChange = (obj: TjobLot, index: number) => {
    form.setFieldValue(['voucherDetailList', 0, 'JobLotDescription'], obj?.JobLotDescription);
  };

  const list = tableData.map((item: any) => item);

  const DebitAmount = tableData.map((item: any) => item.DebitAmount);
  const totalDebitAmount = sumBy(DebitAmount);
  useEffect(() => {
    setTotalDebitAmounts(totalDebitAmount);
    setVoucherDetailList(list);
  }, [tableData]);

  return (
    <>
      <Row gutter={[16, 16]} style={{ marginTop: '-2%' }}>
        <Col xs={24} sm={24} md={24} lg={{ span: 24 }} xl={{ span: 24 }}>
          <Card style={{ boxShadow: '2px 4px 12px 1px gray', paddingBottom: '1%' }}>
            <Form.List name="voucherDetailList" initialValue={[initialValues]}>
              {(fields, {}) => (
                <>
                  {fields.map((field) => (
                    <div key={field.key} className="form-list-container">
                      <Col
                        xs={{ span: 23, offset: 0 }}
                        sm={{ span: 23, offset: 0 }}
                        md={{ span: 11, offset: 0 }}
                        lg={{ span: 11, offset: 0 }}
                        xl={{ span: 7, offset: 0 }}
                        className="formfield debit"
                      >
                        <p style={{ marginTop: -18, marginLeft: '50%' }} className="cr">
                          Dr : <b> {data?.data?.Data?.Result?.[0]?.Balance.toFixed(2)}</b>
                        </p>

                        <p style={{ marginTop: -4 }}>
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
                        xs={{ span: 23, offset: 0 }}
                        sm={{ span: 23, offset: 0 }}
                        md={{ span: 11, offset: 1 }}
                        lg={{ span: 11, offset: 1 }}
                        xl={{ span: 7, offset: 1 }}
                        className="formfield job"
                        // style={{ marginTop: '1%' }}
                      >
                        <AntSelectDynamic
                          bordered={false}
                          label={t('job_lot')}
                          fieldValue="Id"
                          fieldLabel="JobLotDescription"
                          name={[field.name, 'JobLotId']}
                          query={useGetExpenseJobLotSelect}
                          onSelectChange={(obj) => handleSelectjobLotChange(obj, field.name)}
                        />
                      </Col>

                      <Col
                        xs={{ span: 23, offset: 0 }}
                        sm={{ span: 23, offset: 0 }}
                        md={{ span: 11, offset: 0 }}
                        lg={{ span: 11, offset: 0 }}
                        xl={{ span: 7, offset: 1 }}
                        className="formfield debit-amount"
                        // style={{ marginTop: '1%' }}
                      >
                        <AntInputNumber
                          bordered={false}
                          label={t('debit_amount')}
                          formItemProps={{ ...field, name: [field.name, 'DebitAmount'] }}
                        />
                        <AntInputNumber
                          bordered={false}
                          label={t('')}
                          style={{ display: 'none' }}
                          formItemProps={{ ...field, name: [field.name, 'DebitAmount'] }}
                        />
                      </Col>

                      <Col
                        xs={{ span: 23, offset: 0 }}
                        sm={{ span: 23, offset: 0 }}
                        md={{ span: 11, offset: 1 }}
                        lg={{ span: 11, offset: 1 }}
                        xl={{ span: 15, offset: 0 }}
                        style={{ marginBottom: '0.5%', marginTop: '1%' }}
                        className="formfield remark"
                      >
                        <AntInput
                          bordered={false}
                          label={t('remarks')}
                          formItemProps={{ ...field, name: [field.name, 'Comments'] }}
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
                      </Col>
                      <Col
                        xs={{ span: 8, offset: 8 }}
                        sm={{ span: 5, offset: 10 }}
                        md={{ span: 4, offset: 10 }}
                        lg={{ span: 4, offset: 10 }}
                        xl={{ span: 2, offset: 1 }}
                        style={{ marginTop: '1%' }}
                        className="add"
                      >
                        <AntButton
                          onClick={isEditMode ? handleUpdateToTable : handleAddToTable}
                          label={isEditMode ? <>{t('update')}</> : <>{t('add')}</>}
                        />
                      </Col>
                    </div>
                  ))}
                </>
              )}
            </Form.List>
          </Card>

          <br />

          <AntTable
            numberOfSkeletons={12}
            scroll={{ x: '', y: convertVhToPixels('15vh') }}
            data={tableData}
            columns={columns2(t, handleDeleteRow, handleEditRow)}
          />
        </Col>
      </Row>
    </>
  );
};

type TDynamicForm = { form: FormInstance; againstAccountId: any };

export default DynamicForm;
