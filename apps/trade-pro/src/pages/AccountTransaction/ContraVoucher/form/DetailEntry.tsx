import { AntButton, AntInput, AntInputNumber, AntSelectDynamic, AntTable } from '@tradePro/components';
import { Card, Col, FormInstance, Row, Form, Button, notification } from 'antd';
import { map, size, sumBy } from 'lodash';
import '../style.scss';
import dayjs from 'dayjs';
import { useGetAccountsBalances, useGetContraCreditAccountSelect, useGetContraJobLotSelect } from '../queries/queries';
import { useEffect, useState } from 'react';
import { TContraDetailEntry, TjobLot } from './types';
import { useTranslation } from 'react-i18next';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { columns2 } from '../table/columns';
import { useAtom } from 'jotai';
import { totalValue, listAtom, addtableData } from './Atom';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
const { useWatch } = Form;

const DynamicForm = ({ form, againstAccountId }: TDynamicForm) => {
  const [totalDebitAmounts, setTotalDebitAmounts] = useAtom(totalValue);
  const [voucherDetailList, setVoucherDetailList] = useAtom(listAtom);
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
  const { data: filter } = useGetContraCreditAccountSelect();
  const { t } = useTranslation();

  const handleDebitAccountChange = async (value: any) => {
    setRefAccountId(value);

    if (value === 21493) {
      form.setFieldValue(['voucherDetailList', 0, 'AccountTitle'], 'ABL BANK');
    } else if (value === 21494) {
      form.setFieldValue(['voucherDetailList', 0, 'AccountTitle'], 'ALHABIB ISLAMIC BANK');
    } else if (value === 21495) {
      form.setFieldValue(['voucherDetailList', 0, 'AccountTitle'], 'BANK ALFALAH');
    } else if (value === 21496) {
      form.setFieldValue(['voucherDetailList', 0, 'AccountTitle'], 'FAYSAL BANK');
    } else if (value === 21497) {
      form.setFieldValue(['voucherDetailList', 0, 'AccountTitle'], 'HBL CIRCULAR ROAD AKBARI');
    } else if (value === 21498) {
      form.setFieldValue(['voucherDetailList', 0, 'AccountTitle'], 'MCB BANK');
    } else if (value === 21499) {
      form.setFieldValue(['voucherDetailList', 0, 'AccountTitle'], 'MEZAN BANK');
    } else if (value === 21500) {
      form.setFieldValue(['voucherDetailList', 0, 'AccountTitle'], 'SONERI BANK(UMAIR RICE)');
    } else if (value === 21657) {
      form.setFieldValue(['voucherDetailList', 0, 'AccountTitle'], 'SONERI BANK');
    } else if (value === 21658) {
      form.setFieldValue(['voucherDetailList', 0, 'AccountTitle'], 'MEZAN BANK(UMAIR RICE)');
    } else if (value === 21894) {
      form.setFieldValue(['voucherDetailList', 0, 'AccountTitle'], 'BANK ALFALAH BAGHBAN PURA');
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

    setCounter((prevCounter: any) => prevCounter - 1);
    setTableData((prevData: any[]) => {
      const updatedData = newData.map((item, index) => {
        const editedRowIndex = prevData.findIndex((row) => row.LineId === edit.LineId);
        if (editedRowIndex >= 0) {
          return {
            ...item,
            LineId: counter,
            AgainstAccountId: againstAccountId,
          };
        }
        return item;
      });

      const combinedData = [...prevData.filter((row) => row.LineId !== edit.LineId), ...updatedData];
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
  const list = tableData.map((item: any) => item);
  // console.log(list);
  const DebitAmount = tableData.map((item: any) => item.DebitAmount);
  const totalDebitAmount = sumBy(DebitAmount);
  useEffect(() => {
    setTotalDebitAmounts(totalDebitAmount);
    setVoucherDetailList(list);
    // console.log(totalDebitAmount);
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
                        className="formfield1 debit"
                        style={{ marginTop: '0rem', borderBottom: '1px solid gray', padding: '0px', height: '60px' }}
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
                            options={map(filter, (item: any) => ({
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
                        style={{ marginTop: '0.8rem' }}
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
                        xs={{ span: 23, offset: 0 }}
                        sm={{ span: 23, offset: 0 }}
                        md={{ span: 11, offset: 0 }}
                        lg={{ span: 11, offset: 0 }}
                        xl={{ span: 7, offset: 1 }}
                        className="formfield"
                        style={{ marginTop: '0.8rem' }}
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
                        className="formfield remarks"
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

type TDynamicForm = { form: FormInstance; againstAccountId: any };

export default DynamicForm;
