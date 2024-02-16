import _ from 'lodash';
import { sumBy } from 'lodash';
import { useAtom } from 'jotai';
import { columns } from './column';
import { addtableData } from './Atom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TAccountsCombo, TVoucherDetailList } from '../types';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { Card, Col, Row, Form, FormInstance, notification } from 'antd';
import { useGetAccountsBalances, useGetAccountsCombo } from '../quries';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { AntButton, AntInput, AntInputNumber, AntSelectDynamic, AntTable } from '@tradePro/components';

const { useWatch } = Form;

const DynamicForm = ({ form }: TDynamicForm) => {
  const formValues = useWatch<TVoucherDetailList[]>('voucherDetailList', form);
  const [refAccountId, setRefAccountId] = useState(0);
  const [refAccountIdforDebit, setRefAccountIdforDebit] = useState(0);
  const { t } = useTranslation();
  const { data } = useGetAccountsBalances(refAccountId);
  const { data: balanceforDebitAccount } = useGetAccountsBalances(refAccountIdforDebit);
  const [tableData, setTableData] = useAtom(addtableData);
  const [isEditMode, setIsEditMode] = useState(false);
  const [edit, setEdit] = useState<any>([]);
  const initialValues = {
    AgainstAccountId: null,
    AccountId: null,
    AccountTitle: null,
    DebitAmount: null,
    CreditAmount: 0.0,
    CheqNoDetail: null,
    Comments: null,
  };

  const handleCreditAccountChange = (obj: TAccountsCombo, index: number) => {
    setRefAccountId(obj?.Id);
    form.setFieldValue(['voucherDetailList', index, 'AccountTitleC'], obj?.AccountTitle);
  };
  const handleDebitAccountChange = (obj: TAccountsCombo, index: number) => {
    setRefAccountIdforDebit(obj?.Id);
    form.setFieldValue(['voucherDetailList', index, 'AccountTitleD'], obj?.AccountTitle);
  };

  const handleAddToTable = () => {
    if (formValues.some((item) => item.AccountIdD === null || item.AccountIdD === undefined)) {
      const message = 'Please select debit account';
      notification.warning({ message: message });
      return;
    } else if (formValues.some((item) => item.AccountIdC === null || item.AccountIdC === undefined)) {
      const message = 'Please select Credit account';
      notification.warning({ message: message });
      return;
    } else if (formValues.some((item) => item.Comments === null || item.Comments === undefined)) {
      const message = 'Please enter Cr / Dr  Comments';
      notification.warning({ message: message });
      return;
    } else if (formValues.some((item) => item.DebitAmount === null || item.DebitAmount === undefined)) {
      const message = 'Please enter  Debit Amount';
      notification.warning({ message: message });
      return;
    }
    const newData = formValues.map((item, index) => ({
      AccountId: item.AccountIdD,
      AccountTitle: item.AccountTitleD,
      AgainstAccountId: item.AccountIdC,
      CheqNoDetail: item.CheqNoDetail,
      DebitAmount: item.DebitAmount,
      CreditAmount: item.CreditAmount,
      Comments: item.Comments,
    }));

    const newData2 = formValues.map((item, index) => ({
      AccountId: item.AccountIdC,
      AccountTitle: item.AccountTitleC,
      AgainstAccountId: item.AccountIdD,
      CheqNoDetail: item.CheqNoDetail,
      DebitAmount: item.CreditAmount,
      CreditAmount: item.DebitAmount,
      Comments: item.Comments,
    }));

    setTableData((prevData: any[]) => {
      let maxLineId = 0;
      if (prevData?.length > 0) {
        maxLineId = _.maxBy(prevData, 'LineId').LineId;
        maxLineId++;
      }
      const updatedData = newData.map((item) => ({
        ...item,
        LineId: maxLineId,
      }));
      const updatedData2 = newData2.map((item) => ({
        ...item,
        LineId: maxLineId + 1,
      }));
      const combinedData = [...prevData, ...updatedData, ...updatedData2];
      console.log('New tableData:', combinedData);
      return combinedData;
    });
    form.setFieldValue(['voucherDetailList', 0, 'AccountIdC'], null);
    form.setFieldValue(['voucherDetailList', 0, 'AccountIdD'], null);
    form.setFieldValue(['voucherDetailList', 0, 'CheqNoDetail'], null);
    form.setFieldValue(['voucherDetailList', 0, 'DebitAmount'], null);
    form.setFieldValue(['voucherDetailList', 0, 'Comments'], null);
    setRefAccountId(0);
    setRefAccountIdforDebit(0);
    setIsEditMode(false);
  };
  const handleResetForm = () => {
    form.setFieldValue(['voucherDetailList', 0, 'AccountIdC'], null);
    form.setFieldValue(['voucherDetailList', 0, 'AccountIdD'], null);
    form.setFieldValue(['voucherDetailList', 0, 'CheqNoDetail'], null);
    form.setFieldValue(['voucherDetailList', 0, 'DebitAmount'], null);
    form.setFieldValue(['voucherDetailList', 0, 'Comments'], null);
    setRefAccountId(0);
    setRefAccountIdforDebit(0);
    setIsEditMode(false);
  };
  const handleUpdateToTable = () => {
    const newData = formValues.map((item) => ({
      AccountId: item.AccountIdD,
      AccountTitle: item.AccountTitleD,
      AgainstAccountId: item.AccountIdC,
      CheqNoDetail: item.CheqNoDetail,
      DebitAmount: item.DebitAmount,
      CreditAmount: item.CreditAmount,
      Comments: item.Comments,
    }));

    const newData2 = formValues.map((item) => ({
      AccountId: item.AccountIdC,
      AccountTitle: item.AccountTitleC,
      AgainstAccountId: item.AccountIdD,
      CheqNoDetail: item.CheqNoDetail,
      DebitAmount: item.CreditAmount,
      CreditAmount: item.DebitAmount,
      Comments: item.Comments,
    }));

    if (
      formValues.some((item) => item.AccountIdD === null || item.AccountIdD === undefined) ||
      formValues.some((item) => item.AccountIdC === null || item.AccountIdC === undefined) ||
      formValues.some((item) => item.DebitAmount === null || item.DebitAmount === undefined) ||
      formValues.some((item) => item.Comments === null || item.Comments === undefined)
    ) {
      const message = 'Please fill all required fields';
      notification.warning({ message: message });
      return;
    }
    setTableData((prevData: any[]) => {
      const updatedData = prevData.map((row, index) => {
        console.log(index);
        if (index === edit.LineId || index === edit.LineId - 1) {
          console.log(index);
          if (index === edit.LineId) {
            return {
              ...row,
              ...newData2[0],
            };
          }
          if (index === edit.LineId - 1) {
            return {
              ...row,
              ...newData[0],
            };
          }
        }
        return row;
      });

      console.log('New tableData:', updatedData);
      return updatedData;
    });

    form.setFieldValue(['voucherDetailList', 0, 'AccountIdC'], null);
    form.setFieldValue(['voucherDetailList', 0, 'AccountIdD'], null);
    form.setFieldValue(['voucherDetailList', 0, 'CheqNoDetail'], null);
    form.setFieldValue(['voucherDetailList', 0, 'DebitAmount'], null);
    form.setFieldValue(['voucherDetailList', 0, 'Comments'], null);
    setRefAccountId(0);
    setIsEditMode(false);
    setRefAccountIdforDebit(0);
  };

  const handleDeleteRow = (record: any) => {
    setTableData((prevData: any[]) => {
      const updatedData = prevData.filter(
        (item: any) => item.LineId !== record.LineId && item.LineId !== record.LineId - 1
      );
      console.log('New tableData:', updatedData);
      return updatedData;
    });
  };
  const handleEditRow = (record: any) => {
    console.log(record);
    setEdit(record);
    setTableData((prevData: any[]) => {
      const editedRowIndex = prevData.findIndex((item: any) => item.LineId === record.LineId);

      if (editedRowIndex >= 0) {
        const currentRow = { ...prevData[editedRowIndex] };

        if (editedRowIndex > 0) {
          const aboveRow = { ...prevData[editedRowIndex - 1] };
          form.setFieldValue(['voucherDetailList', 0, 'AccountIdD'], aboveRow.AccountId);
          form.setFieldValue(['voucherDetailList', 0, 'AccountTitleD'], aboveRow.AccountTitle);
        } else {
          form.setFieldValue(['voucherDetailList', 0, 'AccountIdD'], '');
          form.setFieldValue(['voucherDetailList', 0, 'AccountTitleD'], '');
        }

        form.setFieldValue(['voucherDetailList', 0, 'AccountIdC'], currentRow.AccountId);
        form.setFieldValue(['voucherDetailList', 0, 'AccountTitleC'], currentRow.AccountTitle);
        form.setFieldValue(['voucherDetailList', 0, 'CheqNoDetail'], record.CheqNoDetail);
        form.setFieldValue(['voucherDetailList', 0, 'DebitAmount'], record.CreditAmount);
        form.setFieldValue(['voucherDetailList', 0, 'Comments'], record.Comments);
      }

      setIsEditMode(true);
      console.log('New tableData:', prevData);
      return prevData;
    });
  };
  const handleChange = (value: any) => {
    if (value < 0) {
      notification.error({ description: 'Amount must be non-negative!', message: '' });
    } else if (typeof value !== 'number') {
      notification.error({ description: 'Amount must be number!', message: '' });
    }
  };

  const DebitAmount = tableData.map((item: any) => item.DebitAmount);
  const totalDebitAmount = sumBy(DebitAmount);
  console.log(totalDebitAmount);
  useEffect(() => {
    form.setFieldValue('VoucherAmount', totalDebitAmount);
  }, [form, tableData, 'VoucherAmount']);
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
                      style={{ display: 'flex', justifyContent: 'space-between', marginTop: 0 }}
                    >
                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 20 }}
                        md={{ span: 12 }}
                        lg={{ span: 12 }}
                        xl={{ span: 7 }}
                        className="formfield"
                      >
                        <p style={{ marginTop: 0 }}>
                          <AntSelectDynamic
                            bordered={false}
                            label={t('debit_account')}
                            fieldValue="Id"
                            fieldLabel="AccountTitle"
                            name={[field.name, 'AccountIdD']}
                            query={useGetAccountsCombo}
                            onSelectChange={(obj) => handleDebitAccountChange(obj, field.name)}
                          />
                        </p>
                      </Col>
                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 20 }}
                        md={{ span: 11 }}
                        lg={{ span: 11 }}
                        xl={{ span: 5 }}
                        xxl={{ span: 3 }}
                        className="formfield"
                      >
                        <p style={{ marginTop: 10, marginLeft: '0%' }}>
                          Dr:
                          <b> {numberFormatter(balanceforDebitAccount?.data?.Data?.Result?.[0]?.Balance)}</b>
                        </p>
                      </Col>
                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 20 }}
                        md={{ span: 11 }}
                        lg={{ span: 12 }}
                        xl={{ span: 7 }}
                        className="formfield"
                      >
                        <p style={{ marginTop: 0 }}>
                          <AntInput
                            bordered={false}
                            formItemProps={{ ...field, name: [field.name, 'Comments'] }}
                            label={'Cr Comments'}
                          />
                        </p>
                      </Col>

                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 20 }}
                        md={{ span: 12 }}
                        lg={{ span: 5 }}
                        xl={{ span: 4 }}
                        xxl={{ span: 3 }}
                        className="formfield"
                      >
                        <p style={{ marginTop: 0 }}>
                          <AntInput
                            bordered={false}
                            formItemProps={{ ...field, name: [field.name, 'CheqNoDetail'] }}
                            label={'Cheq / Ref'}
                          />
                        </p>
                      </Col>

                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 20 }}
                        md={{ span: 11 }}
                        lg={{ span: 6 }}
                        xl={{ span: 4 }}
                        xxl={{ span: 3 }}
                        className="formfield"
                      >
                        <p style={{ marginTop: 0 }}>
                          <AntInputNumber
                            bordered={false}
                            label={t('amount')}
                            formItemProps={{ ...field, name: [field.name, 'DebitAmount'] }}
                            onChange={(value) => handleChange(value)}
                          />
                        </p>
                      </Col>

                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 20 }}
                        md={{ span: 12 }}
                        lg={{ span: 12 }}
                        xl={{ span: 7 }}
                        className="formfield"
                      >
                        <p style={{ marginTop: 0 }}>
                          <AntSelectDynamic
                            bordered={false}
                            label={t('credit_account')}
                            fieldValue="Id"
                            fieldLabel="AccountTitle"
                            query={useGetAccountsCombo}
                            name={[field.name, 'AccountIdC']}
                            onSelectChange={(obj) => handleCreditAccountChange(obj, field.name)}
                          />
                        </p>
                      </Col>
                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 20 }}
                        md={{ span: 11 }}
                        lg={{ span: 11 }}
                        xl={{ span: 5 }}
                        xxl={{ span: 3 }}
                        className="formfield"
                      >
                        <p style={{ marginTop: 10, marginLeft: '0%' }}>
                          Cr:
                          <b> {numberFormatter(data?.data?.Data?.Result?.[0]?.Balance)}</b>
                        </p>
                      </Col>

                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 20 }}
                        md={{ span: 12 }}
                        lg={{ span: 12 }}
                        xl={{ span: 7 }}
                        xxl={{ span: 7 }}
                        className="formfield"
                      >
                        <p>
                          <AntInput
                            bordered={false}
                            formItemProps={{ ...field, name: [field.name, 'Comments'] }}
                            label={'Dr Comments'}
                          />
                        </p>
                      </Col>

                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 21 }}
                        md={{ span: 11 }}
                        lg={{ span: 11 }}
                        xl={{ span: 11 }}
                        xxl={{ span: 6 }}
                      >
                        <Row style={{ marginTop: '0%' }} gutter={10}>
                          <Col
                            xs={{ span: 10 }}
                            sm={{ span: 6 }}
                            md={{ span: 6 }}
                            lg={{ span: 6 }}
                            xl={{ span: 4 }}
                            xxl={6}
                          >
                            <AntButton
                              style={{ marginTop: 15 }}
                              onClick={isEditMode ? handleUpdateToTable : handleAddToTable}
                              label={isEditMode ? 'Update' : 'Add'}
                            ></AntButton>
                          </Col>
                          <Col
                            xs={{ span: 10 }}
                            sm={{ span: 6 }}
                            md={{ span: 6 }}
                            lg={{ span: 6 }}
                            xl={{ span: 4 }}
                            xxl={6}
                          >
                            <AntButton
                              onClick={() => handleResetForm()}
                              label={`${t('cancel')}`}
                              style={{ backgroundColor: '#FFAF0C', marginTop: 15 }}
                            ></AntButton>
                          </Col>
                          <AntInput
                            bordered={false}
                            label={''}
                            formItemProps={{ ...field, name: [field.name, 'AccountTitleC'] }}
                            style={{ width: '102.5%', display: 'none' }}
                          />
                          <AntInput
                            bordered={false}
                            label={''}
                            formItemProps={{ ...field, name: [field.name, 'AccountTitleD'] }}
                            style={{ width: '102.5%', display: 'none' }}
                          />
                        </Row>
                      </Col>
                    </div>
                  ))}
                </>
              )}
            </Form.List>
          </Card>

          <Row gutter={[16, 16]} style={{ marginTop: 10 }}>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
              <Card style={{ boxShadow: '2px 4px 12px 1px gray', textAlign: 'left' }}>
                <AntTable
                  numberOfSkeletons={12}
                  scroll={{ x: '', y: convertVhToPixels('20vh') }}
                  data={tableData || []}
                  columns={columns(t, handleDeleteRow, handleEditRow)}
                />
              </Card>
            </Col>
          </Row>
          <br />
        </Col>
      </Row>
    </>
  );
};

type TDynamicForm = { form: FormInstance };

export default DynamicForm;