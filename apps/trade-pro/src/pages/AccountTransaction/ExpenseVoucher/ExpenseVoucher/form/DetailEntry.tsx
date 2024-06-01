import '../style.scss';
import dayjs from 'dayjs';
import { useAtom } from 'jotai';
import { map, sumBy } from 'lodash';
import {
  useGetAccountsBalance,
  useGetExpenseJobLotSelect,
  useGetExpenseFetchDebitAccountSelect,
} from '../queries/queries';
import { addtableData } from './Atom';
import { columns2 } from '../table/columns';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TExpenseDetailEntry, TjobLot } from './types';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { Card, Col, FormInstance, Row, Form, notification, theme, Tooltip, Space } from 'antd';
import { AntButton, AntInput, AntInputNumber, AntSelectDynamic } from '@tradePro/components';
import { DeleteOutlined, EditFilled } from '@ant-design/icons';

const { useWatch } = Form;

const DynamicForm = ({ form }: TDynamicForm) => {
  const { t } = useTranslation();
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const [refAccountId, setRefAccountId] = useState<number>(0);
  const { data } = useGetAccountsBalance(refAccountId);
  const [tableData, setTableData] = useAtom(addtableData);
  const formValues = useWatch<TExpenseDetailEntry[]>('voucherDetailList', form);
  const [edit, setEdit] = useState<any>([]);
  const initialValues = {
    AccountId: null,
    AccountTitle: null,
    JobLotDescription: null,
    DebitAmount: null,
    Comments: null,
  };
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const { data: filteredDebitAccounts, isLoading } = useGetExpenseFetchDebitAccountSelect();
  const [rowIndex, setrowIndex] = useState<number | null>(-1);

  const handleDebitAccountChange = async (value: any) => {
    setRefAccountId(value);
    if (!isLoading && Array.isArray(filteredDebitAccounts)) {
      const selectedAccount = filteredDebitAccounts.find((item: any) => item.Id === value);
      if (selectedAccount) {
        const accountTitle = selectedAccount.AccountTitle;
        console.log(accountTitle);
        form.setFieldValue(['voucherDetailList', 0, 'AccountTitle'], accountTitle);
      }
    }
  };
  const AgainstAccountId = form.getFieldValue('RefAccountId');
  const [counter, setCounter] = useState<number>(0);
  const handleAddToTable = () => {
    const newData = formValues.map((item, index) => ({
      AccountId: item.AccountId,
      AccountTitle: item.AccountTitle,
      JobLotDescription: item.JobLotDescription,
      JobLotId: item.JobLotId,
      DebitAmount: item.DebitAmount,
      CreditAmount: 0,
      Comments: item.Comments,
    }));
    if (newData.some((item) => item.DebitAmount === null || item.DebitAmount === undefined)) {
      const message = 'Please fill  Debit Amount';
      notification.error({ message: message });
      return;
    }
    if (newData.some((item) => item.AccountId === null || item.AccountId === undefined)) {
      const message = 'Please select  Debit account';
      notification.error({ message: message });
      return;
    }
    if (AgainstAccountId === null || AgainstAccountId === undefined) {
      const message = 'Please select  Credit account';
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
    form.setFieldValue(['voucherDetailList', 0], null);
    form.setFieldValue(['voucherDetailList', 0, 'DCheqDate'], dayjs(new Date()));
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
      CreditAmount: 0,
      Comments: item.Comments,
    }));
    if (newData.some((item) => item.DebitAmount === null || item.DebitAmount === undefined)) {
      const message = 'Please fill  Debit Amount';
      notification.error({ message: message });
      return;
    }
    if (newData.some((item) => item.AccountId === null || item.AccountId === undefined)) {
      const message = 'Please select  Debit account';
      notification.error({ message: message });
      return;
    }
    if (AgainstAccountId === null || AgainstAccountId === undefined) {
      const message = 'Please select  Credit account';
      notification.error({ message: message });
      return;
    }
    const editedRowIndex = tableData.findIndex((row: any, index) => row.LineId === edit?.LineId || index === rowIndex);
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
    form.setFieldValue(['voucherDetailList', 0], null);
    form.setFieldValue(['voucherDetailList', 0, 'DCheqDate'], dayjs(new Date()));
    setIsEditMode(false);
    setRefAccountId(0);
  };
  const handleResetForm = () => {
    form.setFieldValue(['voucherDetailList', 0], null);
    form.setFieldValue(['voucherDetailList', 0, 'DCheqDate'], dayjs(new Date()));
    setRefAccountId(0);
  };
  const handleDeleteRow = (record: TExpenseDetailEntry, rowIndex: number) => {
    setTableData((prevData: any[]) => {
      const updatedData = prevData.filter((item: any, index) => item.LineId !== record.LineId || index !== rowIndex);
      console.log('New tableData:', updatedData);
      return updatedData;
    });
  };

  const handleEditRow = (record: TExpenseDetailEntry, rowIndexes: number) => {
    setEdit(record);
    setrowIndex(rowIndexes);
    setTableData((prevData: any[]) => {
      const updatedData = [...prevData];
      const rowIndex = updatedData.findIndex(
        (item: any, index) => item.LineId === record.LineId || index === rowIndexes
      );
      if (rowIndex !== -1) {
        updatedData[rowIndex] = {
          ...updatedData[rowIndex],
          AccountId: record.AccountId,
          AccountTitle: record.AccountTitle,
          JobLotId: record.JobLotId,
          JobLotDescription: record.JobLotDescription,
          AgainstAccountId: record.AgainstAccountId,
          LineId: record.LineId,
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
  }, [form, tableData, 'VoucherAmount']);
  return (
    <>
      <Row gutter={[16, 16]} style={{ marginTop: '0%' }}>
        <Col xs={24} sm={24} md={24} lg={{ span: 24 }} xl={{ span: 24 }}>
          <Card bordered={false}>
            <Form.List name="voucherDetailList" initialValue={[initialValues]}>
              {(fields, {}) => (
                <>
                  {fields.map((field) => (
                    <Row justify={'space-between'} key={field.key} style={{ marginTop: '-2%' }}>
                      <Col
                        xs={{ span: 23 }}
                        sm={{ span: 23 }}
                        md={{ span: 11 }}
                        lg={{ span: 11 }}
                        xl={{ span: 9 }}
                        xxl={{ span: 6 }}
                        className="formfield debit"
                      >
                        <p style={{ color: 'blue' }} className="dr">
                          {data ? (
                            <b>Dr: {numberFormatter(data?.data?.Data?.Result?.[0]?.Balance)}</b>
                          ) : (
                            <b style={{ visibility: 'hidden' }}>Balance</b>
                          )}
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
                        xs={{ span: 23 }}
                        sm={{ span: 23 }}
                        md={{ span: 11 }}
                        lg={{ span: 11 }}
                        xl={{ span: 7 }}
                        xxl={{ span: 4 }}
                        className="formfield"
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
                        xxl={{ span: 7 }}
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
                        xxl={2}
                        xl={7}
                        lg={6}
                        md={6}
                        sm={7}
                        xs={24}
                        style={{ display: 'flex', justifyContent: 'start' }}
                      >
                        <Row align={'middle'} gutter={4}>
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
                    </Row>
                  ))}
                </>
              )}
            </Form.List>
            <Row gutter={[16, 0]} style={{ maxHeight: '26vh', marginBottom: 10, marginTop: 15, border: ' ' }}>
              <Col span={24}>
                <Card
                  // style={{ height: '26vh', boxShadow: '2px 2px 12px 2px lightgrey' }}
                  style={{ height: '26vh', boxShadow: '', overflowY: 'auto', border: `1px solid ${colorPrimary}` }}
                  cover={
                    <>
                      <div style={{ maxHeight: '26vh' }}>
                        <div
                          style={{
                            // backgroundColor: '#85C1E9',
                            borderBottom: '1px solid grey',
                            borderTopLeftRadius: 5,
                            borderTopRightRadius: 5,
                            gridTemplateColumns: 'repeat(12, 1fr)', // Adjust based on the number of columns
                            position: 'sticky',
                            top: 0,
                            zIndex: 1,
                            paddingTop: 0,
                            paddingBottom: 5,
                            paddingLeft: 5,
                            paddingRight: 5,
                          }}
                        >
                          <Row
                            justify={'space-between'}
                            style={{
                              position: 'sticky',
                              top: 0,
                              left: 0,
                              zIndex: 1,
                              // backgroundColor: '#85C1E9',
                              borderTopLeftRadius: 5,
                              borderTopRightRadius: 5,
                              paddingTop: 5,
                              paddingLeft: 5,
                              paddingRight: 5,
                            }}
                          >
                            <Col xl={7} sm={10} xs={10} xxl={7} lg={6} md={6}>
                              <h4 className="captions"> {t('debit_account')} </h4>
                            </Col>
                            <Col xl={1} xxl={1} lg={1} md={1} sm={0} xs={0}></Col>
                            <Col
                              xl={2}
                              xxl={2}
                              lg={3}
                              md={3}
                              sm={3}
                              style={{ borderLeft: '1px solid grey', paddingLeft: 3 }}
                            >
                              <h4 className="captions"> {t('job_lot')} </h4>
                            </Col>
                            <Col xl={1} md={0} xxl={1} lg={0} sm={0}></Col>
                            <Col
                              xl={3}
                              md={4}
                              xxl={3}
                              lg={4}
                              sm={5}
                              style={{
                                borderLeft: '1px solid grey',
                                paddingRight: 0,
                              }}
                            >
                              <h4 className="captions" style={{ textAlign: 'right' }}>
                                {t('debit_amount')}
                              </h4>
                            </Col>
                            <Col
                              xl={8}
                              xxl={8}
                              lg={8}
                              md={8}
                              sm={8}
                              xs={8}
                              style={{ borderLeft: '1px solid grey', marginLeft: 0, paddingLeft: 3 }}
                            >
                              <h4 className="captions" style={{}}>
                                {t('remarks')}
                              </h4>
                            </Col>

                            <Col
                              xl={1}
                              xxl={1}
                              lg={2}
                              md={2}
                              sm={5}
                              xs={5}
                              style={{ borderLeft: '1px solid grey', paddingLeft: 3 }}
                            >
                              <h4 className="captions" style={{ textAlign: 'center' }}>
                                {' '}
                                {t('action')}{' '}
                              </h4>
                            </Col>
                          </Row>
                        </div>
                        {map(tableData, (item, index) => (
                          <>
                            <Row
                              justify={'space-between'}
                              style={{
                                paddingLeft: 5,
                                paddingRight: 5,
                                paddingTop: 2,
                                borderBottom: '1px solid lightgrey',
                                backgroundColor: index % 2 !== 0 ? '#EBF5FB' : '',
                              }}
                            >
                              <Col xl={7} sm={10} xs={10} xxl={7} lg={6} md={6} style={{ border: ' ', paddingLeft: 3 }}>
                                <p className="dataIndexes"> {item.AccountTitle} </p>
                              </Col>
                              <Col xl={1} xxl={1} lg={1} md={1} sm={0} xs={0} style={{ border: ' ', paddingLeft: 5 }}>
                                <p className="dataIndexes"> </p>
                              </Col>

                              <Col xl={2} xxl={2} lg={3} md={3} sm={3} style={{ border: ' ', paddingLeft: 5 }}>
                                <p className="dataIndexes">{item.JobLotDescription} </p>
                              </Col>
                              <Col xl={1} md={0} xxl={1} lg={0} sm={0} style={{ border: ' ' }}>
                                <p className="dataIndexes"></p>
                              </Col>
                              <Col xl={3} md={4} xxl={3} lg={4} sm={5} style={{ border: ' ', paddingRight: 5 }}>
                                <p className="dataIndexes" style={{ textAlign: 'right' }}>
                                  {item.DebitAmount}
                                </p>
                              </Col>

                              <Col xl={8} xxl={8} lg={8} md={8} sm={8} xs={8} style={{ border: ' ', paddingLeft: 5 }}>
                                <p className="dataIndexes">{item.Comments} </p>
                              </Col>
                              <Col xl={1} xxl={1} lg={2} md={2} sm={5} xs={5} style={{ border: ' ', paddingLeft: 0 }}>
                                <Row gutter={[0, 0]} justify={'center'}>
                                  <Col xxl={10} xl={10} lg={5} md={5}>
                                    <Tooltip title="Edit">
                                      <Space style={{ border: '', paddingTop: 5, height: 20 }}>
                                        <AntButton
                                          type="text"
                                          icon={<EditFilled style={{ color: '#006640' }} />}
                                          onClick={() => handleEditRow(item, index)}
                                        />
                                      </Space>
                                    </Tooltip>
                                  </Col>
                                  <Col xxl={10} xl={10} lg={6} md={6}>
                                    <Tooltip title="Delete">
                                      <Space style={{ border: '', paddingTop: 5, height: 22 }}>
                                        <AntButton
                                          type="text"
                                          icon={<DeleteOutlined style={{ color: 'red' }} />}
                                          onClick={() => handleDeleteRow(item, index)}
                                        />
                                      </Space>
                                    </Tooltip>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </>
                        ))}
                      </div>
                    </>
                  }
                ></Card>
                <Row
                  justify={'space-between'}
                  style={{
                    position: 'sticky',
                    bottom: 0,
                    zIndex: 2,
                    backgroundColor: '#ffff',
                    borderTop: '1px solid lightgrey',
                    marginTop: -24,
                    borderBottomLeftRadius: 5,
                    borderBottomRightRadius: 5,
                    marginLeft: 2,
                    marginRight: 2,
                  }}
                >
                  <Col xl={7} sm={10} xs={10} xxl={7} lg={6} md={6} style={{ border: ' ', paddingLeft: 3 }}>
                    <p className="dataIndexes"> </p>
                  </Col>
                  <Col xl={1} xxl={1} lg={1} md={1} sm={0} xs={0} style={{ border: ' ', paddingLeft: 5 }}>
                    <p className="dataIndexes"> </p>
                  </Col>

                  <Col xl={2} xxl={2} lg={3} md={3} sm={3} style={{ border: ' ', paddingLeft: 5 }}>
                    <p className="dataIndexes"> </p>
                  </Col>
                  <Col xl={1} md={0} xxl={1} lg={0} sm={0} style={{ border: ' ' }}>
                    <p className="dataIndexes"></p>
                  </Col>
                  <Col xl={3} md={4} xxl={3} lg={4} sm={5} style={{ border: ' ', paddingRight: 5 }}>
                    <p className="dataIndexes" style={{ textAlign: 'right' }}>
                      {totalDebitAmount}
                    </p>
                  </Col>

                  <Col xl={8} xxl={8} lg={8} md={8} sm={8} xs={8} style={{ border: ' ', paddingLeft: 5 }}>
                    <p className="dataIndexes"> </p>
                  </Col>
                  <Col xl={1} xxl={1} lg={2} md={2} sm={5} xs={5} style={{ border: ' ', paddingLeft: 0 }}></Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
};

type TDynamicForm = { form: FormInstance };

export default DynamicForm;
