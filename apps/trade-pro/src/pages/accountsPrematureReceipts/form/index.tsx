import { Card, Form, Row, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import MainEntry from './MainEntry';
import { TAccountsPrematureReceiptsList } from '../types';
import Buttons from './Buttons';
import AccountsPrematureTable from './table';
import {
  useAddAccountsPrematureReceipts,
  useGetDocumentNumber,
  useGetReadByTrackingNo,
  useUpdateAccountsPrematureReceipts,
} from '../queries';
import _, { isNumber } from 'lodash';
import dayjs from 'dayjs';

const { useForm, useWatch } = Form;

function AccountsPrematureForm({
  selectedTrackingSlip,
  setSelectedTrackingSlip,
  selectedRecordId,
  setSelectedRecordId,
}: TForm) {
  const [form] = useForm<TAccountsPrematureReceiptsList>();
  const formValues = useWatch<TAccountsPrematureReceiptsList>([], form);
  const [tableData, setTableData] = useState<TAccountsPrematureReceiptsList[] | any>([]);

  const DocumentTypeId = 159;
  const {
    data: getByTrackingNo,
    isSuccess: isDataSuccess,
    isLoading,
    refetch: refetchTrackingNo,
  } = useGetReadByTrackingNo(selectedTrackingSlip);
  const { data, isError, refetch } = useGetDocumentNumber(DocumentTypeId);
  const { mutate: addAccountsPrematureReceipts, isSuccess } = useAddAccountsPrematureReceipts(DocumentTypeId);
  const { mutate: updateAccountsPrematureReceipts } = useUpdateAccountsPrematureReceipts(
    DocumentTypeId,

    selectedRecordId,

    selectedTrackingSlip
  );
  const [printPreview, setPrintPreview] = useState<boolean>(true);

  const totalAmount = _.sumBy(tableData, 'Amount');

  const handleAddAccountsPremature = (values: TAccountsPrematureReceiptsList[] | any) => {
    if (tableData?.length > 0 && tableData?.[0]?.SlipAmount != totalAmount) {
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
        addAccountsPrematureReceipts(values);
      }
    }
  };
  const handleUpdateAccountsPremature = (values: TAccountsPrematureReceiptsList[] | any) => {
    if (tableData?.length > 0 && tableData?.[0]?.SlipAmount != totalAmount) {
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
        updateAccountsPrematureReceipts(values);
      }
    }
  };
  const onFinish = (values: TAccountsPrematureReceiptsList[] | any) => {
    values = tableData;
    if (selectedTrackingSlip) {
      handleUpdateAccountsPremature(values);
    } else {
      handleAddAccountsPremature(values);
    }
    // if (tableData?.length > 0 && tableData?.[0]?.SlipAmount !== totalAmount) {
    //   notification.error({
    //     message: 'Error',
    //     description: 'SlipAmount  is not equal to Total Amount! ',
    //   });
    //   return;
    // } else {
    //   if (tableData?.length === 0) {
    //     notification.error({
    //       message: 'Error',
    //       description: 'AccountsPrematureReceiptsList not found! ',
    //     });
    //     return;
    //   } else {
    //     // mutate(values);
    //   }
    // }

    console.log(values);
  };

  useEffect(() => {
    if (selectedTrackingSlip) {
      refetchTrackingNo();
    }
  }, [selectedTrackingSlip]);
  useEffect(() => {
    if (isDataSuccess) {
      // setTableData(getByTrackingNo?.data?.Data?.Result);
      const updatedTableData = getByTrackingNo?.data?.Data?.Result?.map((item: any) => ({
        ...item,
        // Add more properties here if needed
        TrackingSlipRef: item.TrakingNo,
        ReceiverAccount: item.ReceiverAc,
        SenderAccount: item.SenderAc,
        RepresentativeAccount: item.RepresentativeAc,
        RemarksHeader: item.Remarks,
        EntryStatus: item.Status,
        SenderBank: item.BankName,
        VouchersId: item.VoucherTypeId,
        SupplierCustomerIdSalesMan: item.RepresentativeAcId,
        ChartOfAccountIdSender: item.SenderAcId,
        ChartOfAccountIdReceiver: item.ReceiverAcId,
      }));

      setTableData(updatedTableData);
      form.setFieldValue('DocDate', dayjs(getByTrackingNo?.data?.Data?.Result?.[0]?.DocDate));
      form.setFieldValue('DocNo', getByTrackingNo?.data?.Data?.Result?.[0]?.DocNo);
      form.setFieldValue('VouchersId', getByTrackingNo?.data?.Data?.Result?.[0]?.VoucherTypeId);
      form.setFieldValue('VoucherType', getByTrackingNo?.data?.Data?.Result?.[0]?.VoucherType);
      form.setFieldValue('SlipAmount', getByTrackingNo?.data?.Data?.Result?.[0]?.SlipAmount);
    }
  }, [isDataSuccess]);
  return (
    <>
      <>
        <Card>
          <Form form={form} onFinish={onFinish} layout="horizontal" style={{ marginBottom: 20 }}>
            <Buttons
              form={form}
              selectedTrackingSlip={selectedTrackingSlip}
              setSelectedTrackingSlip={setSelectedTrackingSlip}
              setSelectedRecordId={setSelectedRecordId}
              DocumentTypeId={DocumentTypeId}
              isDataSuccess={isDataSuccess}
              getByTrackingNo={getByTrackingNo?.data?.Data?.Result}
              isSuccess={isSuccess}
              printPreview={printPreview}
              setPrintPreview={setPrintPreview}
              setTableData={setTableData}
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
  selectedTrackingSlip: number | null;
  setSelectedTrackingSlip: (id: number | null) => void;
  selectedRecordId: number | null;
  setSelectedRecordId: (id: number | null) => void;
}
