import { map, sumBy } from 'lodash';
import '../style.scss';
import { useAtom } from 'jotai';
import { addtableData } from './Atom';
import { columns2 } from '../table/columns';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TContraDetailEntry, TjobLot } from './types';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { Card, Col, FormInstance, Row, Form, Button, notification } from 'antd';
import { AntButton, AntInput, AntInputNumber, AntSelectDynamic, AntTable } from '@tradePro/components';
import { useGetAccountsBalances, useGetContraCreditAccountSelect, useGetContraJobLotSelect } from '../queries/queries';

const { useWatch } = Form;

const DynamicForm = ({ form }: TDynamicForm) => {
  const [refAccountId, setRefAccountId] = useState(0);
  const { data } = useGetAccountsBalances(refAccountId);
  const [tableData, setTableData] = useAtom(addtableData);
  const formValues = useWatch<TContraDetailEntry[]>('voucherDetailList', form);
  const [edit, setEdit] = useState<any>([]);
  const initialValues = {
    AccountId: null,
    AccountTitle: null,
    JobLotDescription: null,
    DebitAmount: null,
    Comments: null,
  };
  const [isEditMode, setIsEditMode] = useState(false);
  const { data: filteredDebitAccounts } = useGetContraCreditAccountSelect();
  const { t } = useTranslation();
  const handleDebitAccountChange = async (value: any) => {
    setRefAccountId(value);
    const selectedAccount = filteredDebitAccounts?.find((item: any) => item.Id === value);
    if (selectedAccount) {
      const accountTitle = selectedAccount.AccountTitle;
      console.log(accountTitle);
      form.setFieldValue(['voucherDetailList', 0, 'AccountTitle'], accountTitle);
    }
  };
  const AgainstAccountId = form.getFieldValue('RefAccountId');
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
    if (newData.some((item) => item.AccountId === null || item.AccountId === undefined)) {
      const message = 'Please select a Debit account';
      notification.error({ message: message });
      return;
    }
    setCounter((prevCounter: any) => prevCounter + 1);
    setTableData((prevData: any[]) => {
      const updatedData = newData.map((item) => ({
        ...item,
        LineId: counter,
        AgainstAccountId: AgainstAccountId,
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
    setRefAccountId(0);
  };
  const handleUpdateToTable = () => {
    console.log('Form Values:', formValues);
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
    if (newData.some((item) => item.AccountId === null || item.AccountId === undefined)) {
      const message = 'Please select a Debit account';
      notification.error({ message: message });
      return;
    }
    const editedRowIndex = tableData.findIndex((row: any) => row.LineId === edit?.LineId);
    if (editedRowIndex >= 0) {
      setTableData((prevData: any[]) => {
        const updatedData = [...prevData];
        updatedData[editedRowIndex] = {
          ...newData[0],
          LineId: edit.LineId,
          AgainstAccountId: AgainstAccountId,
        };
        console.log('New tableData:', updatedData);
        return updatedData;
      });
    }
    form.setFieldValue(['voucherDetailList', 0, 'AccountId'], null);
    form.setFieldValue(['voucherDetailList', 0, 'JobLotId'], null);
    form.setFieldValue(['voucherDetailList', 0, 'DebitAmount'], null);
    form.setFieldValue(['voucherDetailList', 0, 'Comments'], null);
    setIsEditMode(false);
    setRefAccountId(0);
  };
  const handleResetForm = () => {
    form.setFieldValue(['voucherDetailList', 0, 'AccountId'], null);
    form.setFieldValue(['voucherDetailList', 0, 'JobLotId'], null);
    form.setFieldValue(['voucherDetailList', 0, 'DebitAmount'], null);
    form.setFieldValue(['voucherDetailList', 0, 'Comments'], null);
    setRefAccountId(0);
  };
  const handleDeleteRow = (record: any) => {
    setTableData((prevData: any[]) => {
      const updatedData = prevData.filter((item: any) => item.LineId !== record.LineId);
      console.log('New tableData:', updatedData);
      return updatedData;
    });
  };

  const handleEditRow = (record: any) => {
    setEdit(record);
    setTableData((prevData: any[]) => {
      const updatedData = [...prevData];
      const rowIndex = updatedData.findIndex((item: any) => item.LineId === record.LineId);
      if (rowIndex !== -1) {
        updatedData[rowIndex] = {
          ...updatedData[rowIndex],
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

  const DebitAmount = tableData.map((item: any) => item.DebitAmount);
  const totalDebitAmount = sumBy(DebitAmount);
  useEffect(() => {
    form.setFieldValue('VoucherAmount', totalDebitAmount);
  }, [form]);
  return (
    <>
      <Row gutter={[16, 16]} style={{ marginTop: '0%' }}>
        <Col xs={24} sm={24} md={24} lg={{ span: 24 }} xl={{ span: 24 }}>
          <Card style={{ boxShadow: '2px 4px 12px 1px gray', paddingBottom: '1%' }}>
            <Form.List name="voucherDetailList" initialValue={[initialValues]}>
              {(fields, {}) => (
                <>
                  {fields.map((field) => (
                    <div
                      key={field.key}
                      className="form-list-container"
                      style={{ display: 'flex', justifyContent: 'space-between' }}
                    >
                      <Col
                        xs={{ span: 23 }}
                        sm={{ span: 23 }}
                        md={{ span: 11 }}
                        lg={{ span: 11 }}
                        xl={{ span: 9 }}
                        xxl={{ span: 6 }}
                        className="formfield1 debit"
                        // style={{ marginTop: '0rem', borderBottom: '1px solid gray', padding: '0px', height: '60px' }}
                      >
                        <p style={{ marginTop: -18, marginLeft: '50%' }} className="dr">
                          Dr : <b> {numberFormatter(data?.data?.Data?.Result?.[0]?.Balance)}</b>
                        </p>
                        <p style={{ marginTop: -4 }}>
                          <AntSelectDynamic
                            bordered={false}
                            label={t('debit_account')}
                            fieldValue="Id"
                            fieldLabel="AccountTitle"
                            name={[field.name, 'AccountId']}
                            options={map(filteredDebitAccounts, (item: any) => ({
                              value: item.Id,
                              label: item.AccountTitle,
                            }))}
                            onChange={handleDebitAccountChange}
                          />
                        </p>
                      </Col>
                      <Col
                        xs={{ span: 23 }}
                        sm={{ span: 23 }}
                        md={{ span: 11 }}
                        lg={{ span: 11 }}
                        xl={{ span: 7 }}
                        xxl={{ span: 4 }}
                        className="formfield job"
                        // style={{ marginTop: '0.8rem' }}
                      >
                        <AntSelectDynamic
                          bordered={false}
                          label={t('job_lot')}
                          fieldValue="Id"
                          fieldLabel="JobLotDescription"
                          name={[field.name, 'JobLotId']}
                          query={useGetContraJobLotSelect}
                          onSelectChange={(obj) => handleSelectjobLotChange(obj, field.name)}
                        />
                      </Col>

                      <Col
                        xs={{ span: 23 }}
                        sm={{ span: 23 }}
                        md={{ span: 11 }}
                        lg={{ span: 11 }}
                        xl={{ span: 7 }}
                        xxl={{ span: 4 }}
                        className="formfield"
                        // style={{ marginTop: '0.8rem' }}
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
                          formItemProps={{ ...field, name: [field.name, 'CreditAmount'] }}
                        />
                      </Col>

                      <Col
                        xs={{ span: 23 }}
                        sm={{ span: 23 }}
                        md={{ span: 11 }}
                        lg={{ span: 11 }}
                        xl={{ span: 16 }}
                        xxl={{ span: 6 }}
                        className="formfield"
                      >
                        <AntInput
                          bordered={false}
                          label={t('remarks')}
                          formItemProps={{ ...field, name: [field.name, 'Comments'] }}
                          style={{ width: '102.5%' }}
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
                        xxl={3}
                        xl={7}
                        lg={6}
                        md={6}
                        sm={7}
                        xs={24}
                        style={{ display: 'flex', justifyContent: 'start', border: '' }}
                      >
                        <Row align={'middle'} gutter={10}>
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
                    </div>
                  ))}
                </>
              )}
            </Form.List>
          </Card>
          <br />

          <AntTable
            // isError={isError}
            numberOfSkeletons={12}
            // isLoading={isLoading}
            scroll={{ x: '', y: convertVhToPixels('15vh') }}
            data={tableData}
            columns={columns2(t, handleDeleteRow, handleEditRow)}
          />
        </Col>
      </Row>
    </>
  );
};

type TDynamicForm = { form: FormInstance };

export default DynamicForm;
