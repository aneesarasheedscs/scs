import { AntButton, AntInput, AntInputNumber, AntSelectDynamic, AntTable } from '@tradePro/components';
import { Card, Col, Row, Form, FormInstance, Button, theme, notification, Modal } from 'antd';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import { expenseColumns } from './column';
import { useGetOtherItemsInExpense } from '../quries';
import { useAtom } from 'jotai';
import { expenseList } from './Atom';
import { TOtherItem, TWsRmStockTransferNotesExpensesList } from '../types';

const { useWatch } = Form;

const ExpenseEntryForm = ({ form }: TDynamicForm) => {
  const [disablefields, setDisablefields] = useState(true);
  const formValues = useWatch<TWsRmStockTransferNotesExpensesList[]>('WsRmStockTransferNotesExpensesList', form);
  const { t } = useTranslation();
  const { setFields, getFieldValue } = form;

  const antSelectRef = useRef<any>(null);

  const [expenseTableData, setExpenseTableData] = useAtom(expenseList);
  const [isEditMode, setIsEditMode] = useState(false);
  const [useFocus, setUseFocus] = useState(false);
  const [edit, setEdit] = useState<any>([]);
  const initialValues = {
    ItemId: null,
    ItemName: null,
    Qty: null,
    Rate: null,
    Amount: null,
  };
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const [counter, setCounter] = useState<any>(0);

  const handleAddToTable = () => {
    const newData = formValues.map((item, index) => ({
      ItemId: item.ItemId,
      ItemName: item.ItemName,
      Qty: item.Qty,
      Rate: item.Rate,
      Amount: item.Amount,
      Remarks: item.Remarks,
    }));

    if (newData.some((item) => item.ItemId === null || item.ItemId === undefined)) {
      const message = 'Please select Item!';
      notification.error({ message: message });
      return;
    } else if (newData.some((item) => item.Amount === null || item.Amount === undefined)) {
      const message = 'Please fill  Amount!';
      notification.error({ message: message });
      return;
    }
    setUseFocus(true);
    setCounter((prevCounter: any) => prevCounter + 1);
    setExpenseTableData((prevData: any[]) => {
      const updatedData = newData.map((item) => ({
        ...item,
        LineId: counter,
      }));
      const combinedData = [...prevData, ...updatedData];
      console.log('New tableData:', combinedData);
      return combinedData;
    });

    if (antSelectRef.current) {
      antSelectRef.current.focus();
    }

    setFields([
      { name: ['WsRmStockTransferNotesExpensesList', 0, 'ItemId'], value: null },
      { name: ['WsRmStockTransferNotesExpensesList', 0, 'ItemName'], value: null },
      { name: ['WsRmStockTransferNotesExpensesList', 0, 'Rate'], value: null },
      { name: ['WsRmStockTransferNotesExpensesList', 0, 'Qty'], value: null },
      { name: ['WsRmStockTransferNotesExpensesList', 0, 'Amount'], value: null },
      { name: ['WsRmStockTransferNotesExpensesList', 0, 'Remarks'], value: null },
    ]);
    setIsEditMode(false);
  };

  const handleUpdateToTable = () => {
    const newData = formValues.map((item, index) => ({
      ItemId: item.ItemId,
      ItemName: item.ItemName,
      Qty: item.Qty,
      Rate: item.Rate,
      Amount: item.Amount,
      Remarks: item.Remarks,
    }));

    if (newData.some((item) => item.ItemId === null || item.ItemId === undefined)) {
      const message = 'Please select Item!';
      notification.error({ message: message });
      return;
    } else if (newData.some((item) => item.Amount === null || item.Amount === undefined)) {
      const message = 'Please fill  Amount!';
      notification.error({ message: message });
      return;
    }
    const editedRowIndex = expenseTableData.findIndex((row: any) => row.LineId === edit?.LineId);

    if (editedRowIndex >= 0) {
      setExpenseTableData((prevData: any[]) => {
        const updatedData = [...prevData];
        updatedData[editedRowIndex] = {
          ...newData[0],
          LineId: edit.LineId,
        };
        console.log('New tableData:', updatedData);
        return updatedData;
      });
    }

    setUseFocus(true);
    setIsEditMode(false);
    setFields([
      { name: ['WsRmStockTransferNotesExpensesList', 0, 'ItemId'], value: null },
      { name: ['WsRmStockTransferNotesExpensesList', 0, 'Rate'], value: null },
      { name: ['WsRmStockTransferNotesExpensesList', 0, 'ItemName'], value: null },
      { name: ['WsRmStockTransferNotesExpensesList', 0, 'Qty'], value: null },
      { name: ['WsRmStockTransferNotesExpensesList', 0, 'Amount'], value: null },
      { name: ['WsRmStockTransferNotesExpensesList', 0, 'Remarks'], value: null },
    ]);
  };
  const handleResetForm = () => {
    setFields([
      { name: ['WsRmStockTransferNotesExpensesList', 0, 'ItemId'], value: null },
      { name: ['WsRmStockTransferNotesExpensesList', 0, 'ItemName'], value: null },
      { name: ['WsRmStockTransferNotesExpensesList', 0, 'Rate'], value: null },
      { name: ['WsRmStockTransferNotesExpensesList', 0, 'Qty'], value: null },
      { name: ['WsRmStockTransferNotesExpensesList', 0, 'Amount'], value: null },
      { name: ['WsRmStockTransferNotesExpensesList', 0, 'Remarks'], value: null },
    ]);
  };
  const handleDeleteRow = (record: any | any[]) => {
    console.log(record);
    setExpenseTableData((prevData: any[]) => {
      const updatedData = prevData.filter((item: any) => item.LineId !== record?.LineId);
      console.log('New tableData:', updatedData);
      return updatedData;
    });
  };
  // console.log(edit);
  const handleEditRow = (record: any | any[]) => {
    setEdit(record);
    setExpenseTableData((prevData: any[]) => {
      const updatedData = [...prevData];
      const rowIndex = updatedData.findIndex((item: any) => item.LineId === record.LineId);

      if (rowIndex !== -1) {
        updatedData[rowIndex] = {
          ...updatedData[rowIndex],
          Id: record.Id,
          ItemName: record.ItemName,
          ItemId: record.ItemId,
          Qty: record.Qty,
          Rate: record.Rate,
          Amount: record.Amount,
          Remarks: record.Remarks,
          LineId: record.LineId,
        };

        form.setFieldValue(['WsRmStockTransferNotesExpensesList', 0], updatedData[rowIndex]); // Update form values
        setIsEditMode(true);
      }
      console.log('New tableData:', updatedData);
      return updatedData;
    });
  };

  const calculateAmount = (IssuedQty: number, equivalentRate: number) => IssuedQty * equivalentRate;

  const handleItemChange = (obj: TOtherItem, index: number) => {
    console.log(obj);

    setFields([{ name: ['WsRmStockTransferNotesExpensesList', index, 'ItemName'], value: obj?.OtherItemName }]);
  };
  const handleQtyChange = (Qty: number | string | null, index: number) => {
    const Rate = getFieldValue(['WsRmStockTransferNotesExpensesList', index, 'Rate']);
    if (Qty && typeof Qty === 'number' && Rate) {
      const amount = calculateAmount(Qty, Rate);
      setFields([{ name: ['WsRmStockTransferNotesExpensesList', index, 'Amount'], value: amount }]);
    } else {
      setFields([{ name: ['WsRmStockTransferNotesExpensesList', index, 'Amount'], value: null }]);
    }
  };

  const handleRateChange = (itemRate: number | string | null, index: number) => {
    const qty = getFieldValue(['WsRmStockTransferNotesExpensesList', index, 'Qty']);
    if (itemRate && typeof itemRate === 'number' && qty) {
      const amount = calculateAmount(qty, itemRate);

      setFields([{ name: ['WsRmStockTransferNotesExpensesList', index, 'Amount'], value: amount }]);
    } else {
      setFields([{ name: ['WsRmStockTransferNotesExpensesList', index, 'Amount'], value: null }]);
    }
  };

  useEffect(() => {
    // Set focus to AntSelectDynamic after it has been rendered
    if (antSelectRef.current) {
      antSelectRef.current.focus();
    }
  }, [antSelectRef]);

  return (
    <>
      <Row gutter={[10, 10]} style={{ marginTop: '0%' }}>
        <Col xs={24} sm={24} md={24} lg={{ span: 24 }} xl={{ span: 24 }}>
          <Card style={{ boxShadow: '2px 4px 12px 1px gray', paddingTop: '-10%' }}>
            <Form.List name="WsRmStockTransferNotesExpensesList" initialValue={[initialValues]}>
              {(fields, {}) => (
                <>
                  {fields.map((field) => (
                    <div
                      key={field.key}
                      className="form-list-container"
                      style={{ display: 'flex', justifyContent: 'space-between', marginTop: -15 }}
                    >
                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 20 }}
                        md={{ span: 12 }}
                        lg={{ span: 12 }}
                        xl={{ span: 8 }}
                        xxl={{ span: 6 }}
                        className="formfield"
                        style={{ marginTop: 15 }}
                      >
                        <AntSelectDynamic
                          // ref={antSelectRef}
                          autoFocus={useFocus}
                          bordered={false}
                          label={t('other_item_name')}
                          fieldValue="Id"
                          fieldLabel="OtherItemName"
                          query={useGetOtherItemsInExpense}
                          name={[field.name, 'ItemId']}
                          onSelectChange={(obj) => handleItemChange(obj, field.name)}
                        />
                      </Col>

                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 20 }}
                        md={{ span: 11 }}
                        lg={{ span: 11 }}
                        xl={{ span: 5 }}
                        xxl={{ span: 3 }}
                        className="formfield"
                        style={{ marginTop: 15 }}
                      >
                        <AntInputNumber
                          bordered={false}
                          onChange={(Qty) => handleQtyChange(Qty, field.name)}
                          formItemProps={{ ...field, name: [field.name, 'Qty'] }}
                          label={t('item_qty')}
                        />
                      </Col>

                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 20 }}
                        md={{ span: 12 }}
                        lg={{ span: 12 }}
                        xl={{ span: 4 }}
                        xxl={{ span: 3 }}
                        className="formfield"
                        style={{ marginTop: 15 }}
                      >
                        <p>
                          <AntInputNumber
                            bordered={false}
                            label={t('rate')}
                            formItemProps={{ ...field, name: [field.name, 'Rate'] }}
                            onChange={(itemRate) => handleRateChange(itemRate, field.name)}
                          />
                        </p>
                      </Col>
                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 20 }}
                        md={{ span: 11 }}
                        lg={{ span: 11 }}
                        xl={{ span: 4 }}
                        xxl={{ span: 4 }}
                        className="formfield"
                        style={{ marginTop: 15 }}
                      >
                        <p>
                          <AntInputNumber
                            bordered={false}
                            readOnly
                            label={t('amount')}
                            formItemProps={{ ...field, name: [field.name, 'Amount'] }}
                            disabled={disablefields}
                          />
                        </p>
                      </Col>

                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 20 }}
                        md={{ span: 18 }}
                        lg={{ span: 18 }}
                        xl={{ span: 15 }}
                        xxl={{ span: 7 }}
                        className="formfield"
                        style={{ marginTop: 15 }}
                      >
                        <AntInput
                          bordered={false}
                          label={t('remarks')}
                          formItemProps={{ ...field, name: [field.name, 'Remarks'] }}
                        />
                      </Col>
                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 21 }}
                        md={{ span: 4 }}
                        lg={{ span: 4 }}
                        xl={{ span: 8 }}
                        xxl={{ span: 9 }}
                      >
                        <Row style={{ marginTop: '0%' }} gutter={10}>
                          <Col
                            xs={{ span: 10 }}
                            sm={{ span: 6 }}
                            md={{ span: 20 }}
                            lg={{ span: 20 }}
                            xl={{ span: 6 }}
                            xxl={4}
                          >
                            <AntButton
                              style={{ marginTop: 15 }}
                              onClick={isEditMode ? handleUpdateToTable : handleAddToTable}
                              label={isEditMode ? t('update') : t('add')}
                            ></AntButton>
                          </Col>
                          <Col
                            xs={{ span: 10 }}
                            sm={{ span: 6 }}
                            md={{ span: 20 }}
                            lg={{ span: 20 }}
                            xl={{ span: 6 }}
                            xxl={4}
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
                    </div>
                  ))}
                </>
              )}
            </Form.List>
          </Card>

          <Row gutter={[16, 16]} style={{ marginTop: 10 }}>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
              <AntTable
                numberOfSkeletons={12}
                scroll={{ x: '', y: convertVhToPixels('20vh') }}
                data={expenseTableData || []}
                columns={expenseColumns(t, handleDeleteRow, handleEditRow)}
              />
            </Col>
          </Row>
          <br />
        </Col>
      </Row>
    </>
  );
};
type TDynamicForm = { form: FormInstance };
export default ExpenseEntryForm;
