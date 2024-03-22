import dayjs from 'dayjs';
import { useAtom } from 'jotai';
import Buttons from './Buttons';
import MainEntry from './MainEntry';
import DynamicForm from './DetailEntry';
import { TStockAdjustment } from '../types';
import { useEffect, useState } from 'react';
import { Card, Form, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { deleteData, addtableData, newTableData } from '../form/Atom';
import { useAddStockAdjustment, useUpdateStockAdjustment } from '../quries';

const { useForm } = Form;

function StockAdjustmentForm({
  selectedRecordId,
  stockAdjustmentById,
  isDataSuccess,
  isDataLoading,
  setSelectedRecordId,
}: TAddUpdateRecord) {
  const [form] = useForm<TStockAdjustment>();
  const DocumentTypeId = 70;
  const { t } = useTranslation();
  const [printPreview, setPrintPreview] = useState<boolean>(true);
  const [delettableData, setDeleteTableData] = useAtom(deleteData);
  const [newtableData, setNewTableData] = useAtom(newTableData);
  const [tableData, setTableData] = useAtom(addtableData);
  const [AdjustmentTypeId, setAjusmentTypeId] = useState<number>();
  const {
    mutate: addStockAdjustment,
    isSuccess: successAdd,
    data: addRequisition,
  } = useAddStockAdjustment(DocumentTypeId);
  const {
    mutate: updateStockAdjustment,
    isSuccess: successUpdate,
    data: updateRequistion,
  } = useUpdateStockAdjustment(selectedRecordId, DocumentTypeId);
  const handleUpdateStockAdjustment = (values: TStockAdjustment) => {
    const AdjustmentTypeId = form.getFieldValue('AdjustmentTypeId');

    const Ids = tableData?.map((item) => item.Id);
    if (Ids?.[0] >= 0) {
      const newRecord = newtableData?.map((item) => ({
        ...item,
        ActionTypeId: 1,
      }));
      const updatedRecord = tableData
        ?.map((item) => ({
          ...item,
          ActionTypeId: 2,
        }))
        ?.filter((item) => item.Id > 0);
      const deletedRecord = delettableData?.map((item) => ({
        ...item,
        ActionTypeId: 3,
      }));

      values.InvStockAdjustmentDetailslist = [...newRecord, ...updatedRecord, ...deletedRecord];
      if (AdjustmentTypeId === 1) {
        const newData = values.InvStockAdjustmentDetailslist.map((item: any) => ({
          ...item,
          CreditAccountId: item.CreditAccountId,
          DebitAccountId: null,
        }));
        values.InvStockAdjustmentDetailslist = newData;
        console.log(values);
      } else {
        values.InvStockAdjustmentDetailslist = values.InvStockAdjustmentDetailslist;
        console.log(values);
      }
      if (values.InvStockAdjustmentDetailslist?.[0] === null || values.InvStockAdjustmentDetailslist.length === 0) {
        const message = 'Please fill Detail!';
        notification.error({ message: message });
        return;
      }
      updateStockAdjustment(values);
      console.log(values);
    }
    setSelectedRecordId(null);
  };
  const handleAddStockAdjustment = (values: TStockAdjustment) => {
    values.InvStockAdjustmentDetailslist = tableData;
    const AdjustmentTypeId = form.getFieldValue('AdjustmentTypeId');
    if (AdjustmentTypeId === 1) {
      const newData = tableData.map((item: any) => ({
        ...item,
        CreditAccountId: item.DebitAccountId,
        DebitAccountId: null,
      }));
      values.InvStockAdjustmentDetailslist = newData;
      console.log(values);
    } else {
      values.InvStockAdjustmentDetailslist = tableData;
      console.log(values);
    }
    if (values.InvStockAdjustmentDetailslist?.[0] === null || values.InvStockAdjustmentDetailslist.length === 0) {
      const message = 'Please fill Detail!';
      notification.error({ message: message });
      return;
    }
    addStockAdjustment(values);
    console.log(values);
  };
  const onFinish = (values: TStockAdjustment) => {
    values.PrintPreview = printPreview;
    if (selectedRecordId) {
      handleUpdateStockAdjustment(values);
    } else {
      handleAddStockAdjustment(values);
    }
  };
  useEffect(() => {
    if (successAdd && addRequisition?.data?.Status === true) {
      setTableData([]);
      setSelectedRecordId(null);
      setDeleteTableData([]);
      setNewTableData([]);
      form.setFieldValue('DocDate', dayjs(new Date()));
      form.setFieldValue('RemarksHeader', null);
    }
    if (successUpdate && updateRequistion?.data?.Status === true) {
      setTableData([]);
      setSelectedRecordId(null);
      setDeleteTableData([]);
      setNewTableData([]);
      // form.setFieldValue('DocDate', dayjs(new Date()));
      form.setFieldValue('RemarksHeader', null);
    }
  }, [successAdd, addRequisition, successUpdate, updateRequistion]);

  useEffect(() => {
    if (isDataSuccess && !isDataLoading) {
      form.setFieldValue('DocNo', stockAdjustmentById?.DocNo);
      form.setFieldValue('AdjustmentTypeId', stockAdjustmentById?.AdjustmentTypeId);
      form.setFieldValue('DocDate', dayjs(stockAdjustmentById?.DocDate));
      setAjusmentTypeId(stockAdjustmentById?.AdjustmentTypeId);
      form.setFieldValue('RemarksHeader', stockAdjustmentById?.RemarksHeader);
      setTableData(stockAdjustmentById?.InvStockAdjustmentDetailslist);
    }
    if (selectedRecordId) {
      setDeleteTableData([]);
    }
  }, [isDataSuccess, isDataLoading, selectedRecordId]);

  return (
    <>
      <Card>
        <Form form={form} onFinish={onFinish} layout="horizontal" style={{ marginBottom: 20 }}>
          <Buttons
            form={form}
            selectedRecordId={selectedRecordId}
            setSelectedRecordId={setSelectedRecordId}
            DocumentTypeId={DocumentTypeId}
            stockAdjustmentById={stockAdjustmentById}
            isDataSuccess={isDataSuccess}
            printPreview={printPreview}
            setPrintPreview={setPrintPreview}
          />
          <MainEntry form={form} setAjusmentTypeId={setAjusmentTypeId} />
          <DynamicForm form={form} AdjustmentTypeId={AdjustmentTypeId} />
        </Form>
      </Card>
    </>
  );
}
type TAddUpdateRecord = {
  selectedRecordId: number | null;
  stockAdjustmentById: TStockAdjustment;
  isDataSuccess: boolean;
  isDataLoading: boolean;
  setSelectedRecordId: (id: number | null) => void;
};
export default StockAdjustmentForm;
