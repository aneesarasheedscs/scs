import { AntButton, AntInput, AntInputNumber, AntSelectDynamic, AntTable } from '@tradePro/components';
import { Card, Col, FormInstance, Row, Form, notification } from 'antd';
import { sumBy } from 'lodash';
import '../style.scss';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useAtom } from 'jotai';
import { addtableData2, expenseAmount, listAtom, totalValue } from './Atom';
import { useGetOtherItemsNameSelect } from '../queries/queries';
import { StockTransferExpense } from './types';
import { column3 } from '../table/columns';

const { useWatch } = Form;

const ExpenseGridEntry = ({ form }: TDynamicForm) => {
  const { t } = useTranslation();
  const formValues = useWatch<StockTransferExpense[]>('WsRmStockTransferNotesExpensesList', form);
  const [totalAmounts, setTotalAmounts] = useAtom(totalValue);
  const [WsRmStockTransferNotesExpensesList, setWsRmStockTransferNotesExpensesList] = useAtom(listAtom);
  const [isEditMode, setIsEditMode] = useState(false);
  const [counter, setCounter] = useState<any>(0);
  const { setFields, getFieldValue } = form;
  const [tableData2, setTableData2] = useAtom(addtableData2);
  const [edit, setEdit] = useState<any>([]);
  const [ExpenseAmounts, setExpenseAmounts] = useAtom(expenseAmount);

  const initialValues = {
    ItemId: null,
    OtherItemName: null,
    Qty: null,
    Rate: null,
    Amount: null,
    Remarks: null,
  };

  const handleAddToTable = () => {
    const newData = formValues.map((item) => ({
      ItemId: item.ItemId,
      OtherItemName: item.OtherItemName,
      Qty: item.Qty,
      Rate: item.Rate,
      Amount: item.Qty && item.Rate ? item.Qty * item.Rate : null,
      Remarks: item.Remarks,
    }));
    if (newData.some((item) => item.Amount === null || item.Amount === undefined)) {
      const message = 'Please fill  Amount';
      notification.error({ message: message });
      return;
    }
    setCounter((prevCounter: any) => prevCounter + 1);
    setTableData2((prevData: any[]) => {
      const updatedData = newData.map((item) => ({
        ...item,
        ItemId: counter,
      }));

      const combinedData = [...prevData, ...updatedData];
      console.log('New tableData:', combinedData);
      return combinedData;
    });
    form.setFieldValue(['WsRmStockTransferNotesExpensesList', 0, 'ItemId'], null);
    form.setFieldValue(['WsRmStockTransferNotesExpensesList', 0, 'Qty'], null);
    form.setFieldValue(['WsRmStockTransferNotesExpensesList', 0, 'Rate'], null);
    form.setFieldValue(['WsRmStockTransferNotesExpensesList', 0, 'Amount'], null);
    form.setFieldValue(['WsRmStockTransferNotesExpensesList', 0, 'Remarks'], null);
    setIsEditMode(false);
  };

  const handleUpdateToTable = () => {
    const newData = formValues.map((item) => ({
      ItemId: item.ItemId,
      OtherItemName: item.OtherItemName,
      Qty: item.Qty,
      Rate: item.Rate,
      Amount: item.Qty * item.Rate,
      Remarks: item.Remarks,
    }));
    if (newData.some((item) => item.Amount === null || item.Amount === undefined)) {
      const message = 'Please fill Amount';
      notification.error({ message: message });
      return;
    }

    setTableData2((prevData: any[]) => {
      const updatedData = newData.map((item) => {
        const editedRowIndex = prevData.findIndex((row) => row.ItemId === edit.ItemId);
        if (editedRowIndex >= 0) {
          return {
            ...item,
            ItemId: edit.ItemId,
          };
        }
        return item;
      });

      const combinedData = [...prevData.filter((row) => row.ItemId !== edit.ItemId), ...updatedData];
      console.log('New tableData:', combinedData);
      return combinedData;
    });
    setIsEditMode(false);
    form.setFieldValue(['WsRmStockTransferNotesExpensesList', 0, 'ItemId'], null);
    form.setFieldValue(['WsRmStockTransferNotesExpensesList', 0, 'Qty'], null);
    form.setFieldValue(['WsRmStockTransferNotesExpensesList', 0, 'Rate'], null);
    form.setFieldValue(['WsRmStockTransferNotesExpensesList', 0, 'Amount'], null);
    form.setFieldValue(['WsRmStockTransferNotesExpensesList', 0, 'Remarks'], null);
  };
  const handleResetForm = () => {
    form.setFieldValue(['WsRmStockTransferNotesExpensesList', 0, 'ItemId'], null);
    form.setFieldValue(['WsRmStockTransferNotesExpensesList', 0, 'Qty'], null);
    form.setFieldValue(['WsRmStockTransferNotesExpensesList', 0, 'Rate'], null);
    form.setFieldValue(['WsRmStockTransferNotesExpensesList', 0, 'Amount'], null);
    form.setFieldValue(['WsRmStockTransferNotesExpensesList', 0, 'Remarks'], null);
  };
  const handleDeleteRow = (record: any) => {
    setTableData2((prevData: any[]) => {
      const updatedData = prevData.filter((item: any) => item.ItemId !== record.ItemId);
      console.log('New tableData:', updatedData);
      return updatedData;
    });
  };

  const handleEditRow = (record: any) => {
    setEdit(record);
    setTableData2((prevData: any[]) => {
      form.setFieldValue(['WsRmStockTransferNotesExpensesList', 0, 'ItemId'], record.OtherItemName);
      form.setFieldValue(['WsRmStockTransferNotesExpensesList', 0, 'Qty'], record.Qty);
      form.setFieldValue(['WsRmStockTransferNotesExpensesList', 0, 'Rate'], record.Rate);
      form.setFieldValue(['WsRmStockTransferNotesExpensesList', 0, 'Amount'], record.Amount);
      form.setFieldValue(['WsRmStockTransferNotesExpensesList', 0, 'Remarks'], record.Remarks);
      setIsEditMode(true);

      return prevData;
    });
  };

  const list = tableData2.map((item: any) => item);

  const Amount = tableData2.map((item: any) => item.Amount);
  const totalAmount = sumBy(Amount);
  useEffect(() => {
    setTotalAmounts(totalAmount);
    setWsRmStockTransferNotesExpensesList(list);
    setExpenseAmounts(totalAmount);
  }, [tableData2]);
  console.log('TOTAL:' + totalAmount);
  const handleSelectOtherItemsChange = (obj: any, index: number) => {
    form.setFieldValue(['WsRmStockTransferNotesExpensesList', index, 'OtherItemName'], obj?.OtherItemName);
  };

  const calculateAmount = (Qty: number, Rate: number) => {
    return Qty * Rate;
  };
  const handleItemRateChange = (Rate: number | string | null, index: number) => {
    const Qty = getFieldValue(['WsRmStockTransferNotesExpensesList', index, 'Qty']);
    if (Qty && Qty > 0) {
      if (Rate && typeof Rate === 'number' && Rate > 0) {
        const amount = calculateAmount(Qty, Rate);
        setFields([{ name: ['WsRmStockTransferNotesExpensesList', index, 'Amount'], value: amount }]);
      } else {
        setFields([{ name: ['WsRmStockTransferNotesExpensesList', index, 'Amount'], value: null }]);
      }
    }
  };

  return (
    <>
      {/* <br /> */}
      {/* <h2 className="form-heading">{t('other_items_expense_grid')}</h2> */}
      <Row gutter={[16, 16]} style={{ marginTop: '0.2%' }}>
        <Col xs={24} sm={24} md={24} lg={{ span: 24 }} xl={{ span: 24 }}>
          <Card style={{ boxShadow: '2px 4px 12px 1px gray', paddingBottom: '0%' }}>
            <Form.List name="WsRmStockTransferNotesExpensesList" initialValue={[initialValues]}>
              {(fields, {}) => (
                <>
                  {fields.map((field) => (
                    <div
                      key={field.key}
                      className="form-list-container"
                      style={{ display: 'flex', justifyContent: 'space-between', marginTop: -10 }}
                    >
                      <Col
                        xs={{ span: 23 }}
                        sm={{ span: 21 }}
                        md={{ span: 11 }}
                        lg={{ span: 11 }}
                        xl={{ span: 7 }}
                        xxl={{ span: 5 }}
                        className="formfield"
                      >
                        <AntSelectDynamic
                          bordered={false}
                          label={t('other_item_name')}
                          fieldValue="Id"
                          fieldLabel="OtherItemName"
                          name={[field.name, 'ItemId']}
                          query={useGetOtherItemsNameSelect}
                          onSelectChange={(obj) => handleSelectOtherItemsChange(obj, field.name)}
                        />
                      </Col>

                      <Col
                        xs={{ span: 23 }}
                        sm={{ span: 21 }}
                        md={{ span: 11 }}
                        lg={{ span: 11 }}
                        xl={{ span: 4 }}
                        xxl={{ span: 3 }}
                        className="formfield"
                      >
                        <AntInputNumber
                          bordered={false}
                          label={t('qty')}
                          formItemProps={{ ...field, name: [field.name, 'Qty'] }}
                        />
                      </Col>

                      <Col
                        xs={{ span: 23 }}
                        sm={{ span: 21 }}
                        md={{ span: 11 }}
                        lg={{ span: 11 }}
                        xl={{ span: 5 }}
                        xxl={{ span: 3 }}
                        className="formfield rate"
                      >
                        <AntInputNumber
                          bordered={false}
                          label={t('rate')}
                          formItemProps={{ ...field, name: [field.name, 'Rate'] }}
                          onChange={(Rate) => handleItemRateChange(Rate, field.name)}
                        />
                      </Col>

                      <Col
                        xs={{ span: 23 }}
                        sm={{ span: 21 }}
                        md={{ span: 11 }}
                        lg={{ span: 11 }}
                        xl={{ span: 5 }}
                        xxl={{ span: 3 }}
                        className="formfield amount"
                      >
                        <AntInputNumber
                          readOnly
                          bordered={false}
                          label={t('amount')}
                          formItemProps={{ ...field, name: [field.name, 'Amount'] }}
                        />
                      </Col>

                      <Col
                        xs={{ span: 23 }}
                        sm={{ span: 21 }}
                        md={{ span: 24 }}
                        lg={{ span: 24 }}
                        xl={{ span: 12 }}
                        xxl={{ span: 6 }}
                        className="formfield"
                        // style={{ marginTop: '0.8rem' }}
                      >
                        <AntInput
                          bordered={false}
                          label={t('remarks')}
                          formItemProps={{ ...field, name: [field.name, 'Remarks'] }}
                        />
                      </Col>

                      <Col
                        xs={{ span: 12 }}
                        sm={{ span: 12 }}
                        md={{ span: 5 }}
                        lg={{ span: 5 }}
                        xl={{ span: 3 }}
                        xxl={{ span: 3 }}
                      >
                        <Row style={{ marginTop: '0%' }} gutter={10}>
                          <Col
                            xs={{ span: 12 }}
                            sm={{ span: 8 }}
                            md={{ span: 12 }}
                            lg={{ span: 12 }}
                            xl={{ span: 11 }}
                            xxl={12}
                          >
                            <AntButton
                              style={{ marginTop: 15 }}
                              onClick={isEditMode ? handleUpdateToTable : handleAddToTable}
                              label={isEditMode ? t('update') : t('add')}
                            ></AntButton>
                          </Col>
                          <Col
                            xs={{ span: 12 }}
                            sm={{ span: 8 }}
                            md={{ span: 12 }}
                            lg={{ span: 12 }}
                            xl={{ span: 13 }}
                            xxl={12}
                          >
                            <AntButton
                              ghost
                              style={{ marginTop: 15 }}
                              onClick={() => {
                                handleResetForm();
                                setIsEditMode(false);
                              }}
                              label={t('cancel')}
                            ></AntButton>
                          </Col>
                        </Row>
                      </Col>
                      <AntInput
                        bordered={false}
                        label={''}
                        formItemProps={{ ...field, name: [field.name, 'OtherItemName'] }}
                        style={{ display: 'none', visibility: 'hidden' }}
                      />
                      <AntInput
                        bordered={false}
                        label={''}
                        formItemProps={{ ...field, name: [field.name, 'Qty'] }}
                        style={{ display: 'none', visibility: 'hidden' }}
                      />
                      <AntInput
                        bordered={false}
                        label={''}
                        formItemProps={{ ...field, name: [field.name, 'Rate'] }}
                        style={{ display: 'none', visibility: 'hidden' }}
                      />
                      <AntInput
                        bordered={false}
                        label={''}
                        formItemProps={{ ...field, name: [field.name, 'Amount'] }}
                        style={{ display: 'none', visibility: 'hidden' }}
                      />
                      <AntInput
                        bordered={false}
                        label={''}
                        formItemProps={{ ...field, name: [field.name, 'Remarks'] }}
                        style={{ display: 'none', visibility: 'hidden' }}
                      />
                    </div>
                  ))}
                </>
              )}
            </Form.List>
          </Card>
          {/* <br /> */}
          {/* <h2 className="form-heading">{t('detail')}</h2> */}
          <br />
          {/* <Card style={{ boxShadow: '2px 4px 12px 1px gray', textAlign: 'left' }}> */}
          <AntTable
            numberOfSkeletons={12}
            scroll={{ x: '', y: convertVhToPixels('15vh') }}
            data={tableData2 || []}
            columns={column3(t, handleDeleteRow, handleEditRow)}
          />
          {/* </Card> */}
        </Col>
      </Row>
    </>
  );
};

type TDynamicForm = { form: FormInstance };

export default ExpenseGridEntry;
