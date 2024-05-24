import { Card, Form, Row, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import MainEntry from './MainEntry';
import { TAccountsPrematureReceiptsList } from '../types';
import Buttons from './Buttons';
import AccountsPrematureTable from './table';
import { useAddAccountsPrematureReceipts, useGetDocumentNumber, useGetReadByTrackingNo } from '../queries';
import _, { isNumber } from 'lodash';
const { useForm, useWatch } = Form;

function AccountsPrematureForm({ selectedRecordId, setSelectedRecordId }: TForm) {
  const [form] = useForm<TAccountsPrematureReceiptsList>();
  const formValues = useWatch<TAccountsPrematureReceiptsList>([], form);
  const [tableData, setTableData] = useState<TAccountsPrematureReceiptsList[] | any>([]);

  const DocumentTypeId = 159;
  const {
    data: getByTrackingNo,
    isSuccess: isDataSuccess,
    refetch: refetchTrackingNo,
  } = useGetReadByTrackingNo(selectedRecordId);
  const { data, isError, refetch } = useGetDocumentNumber(DocumentTypeId);
  const { mutate, isSuccess } = useAddAccountsPrematureReceipts(DocumentTypeId);
  const [printPreview, setPrintPreview] = useState<boolean>(true);

  const totalAmount = _.sumBy(tableData, 'Amount');
  const onFinish = (values: TAccountsPrematureReceiptsList[] | any) => {
    values = tableData;

    if (tableData?.length > 0 && tableData?.[0]?.SlipAmount !== totalAmount) {
      notification.error({
        message: 'Error',
        description: 'SlipAmount  is not equal to Total Amount! ',
      });
      return;
    } else {
      if (tableData?.length === 0) {
        notification.error({
          message: 'Error',
          description: 'AccountsPrematureReceiptsList not found! ',
        });
        return;
      } else {
        // mutate(values);
      }
    }

    console.log(values);
  };

  useEffect(() => {
    if (selectedRecordId) {
      refetchTrackingNo();
    }
  }, [selectedRecordId]);
  useEffect(() => {
    if (isDataSuccess) {
      setTableData(getByTrackingNo?.data?.Data?.Result);
      // form.setFieldsValue(purchaseOrderData?.data?.Data?.Result);
      // form.setFieldValue('DocDate', dayjs(purchaseOrderData?.data?.Data?.Result?.DocDate));
      // form.setFieldValue('OrderDueDate', dayjs(purchaseOrderData?.data?.Data?.Result?.OrderDueDate));
      // form.setFieldValue('DeliveryStartDate', dayjs(purchaseOrderData?.data?.Data?.Result?.DeliveryStartDate));
    }
  }, [isDataSuccess]);
  return (
    <>
      <>
        <Card>
          <Form form={form} onFinish={onFinish} layout="horizontal" style={{ marginBottom: 20 }}>
            <Buttons
              form={form}
              selectedRecordId={selectedRecordId}
              setSelectedRecordId={setSelectedRecordId}
              DocumentTypeId={DocumentTypeId}
              // requisitionById={requisitionById}
              isSuccess={isSuccess}
              printPreview={printPreview}
              setPrintPreview={setPrintPreview}
            />
            <MainEntry form={form} refetch={refetch} tableData={tableData} setTableData={setTableData} />
            <AccountsPrematureTable />
          </Form>
        </Card>
      </>
    </>
  );
}

export default AccountsPrematureForm;
interface TForm {
  selectedRecordId: number | null;
  setSelectedRecordId: (id: number | null) => void;
}
