import { useEffect, useState } from 'react';
import MainEntry from './MainEntry';
import { Card, Form } from 'antd';
import { isNumber } from 'lodash';
import dayjs from 'dayjs';
import { useAddBookingOrder, useGetBookingOrderById, useUpdateBookingOrder } from '../queries';
import { TBookingOrder, TPreBookingOrderDetailList } from '../type';
import { useTranslation } from 'react-i18next';
import '../style.scss';
import Buttons from './Buttons';

const { useForm, useWatch } = Form;

function BookingOrderForm({ selectedRecordId, setSelectedRecordId }: TAddUpdatedRecod) {
  const { t } = useTranslation();
  const [form] = useForm<TBookingOrder>();
  const [printPreview, setPrintPreview] = useState<boolean>(true);
  const [selectedItem, setSelectedItem] = useState<TPreBookingOrderDetailList[] | any>([]);
  const {
    data: bookingOrderData,
    refetch: refetchGetById,
    isSuccess: isDataSuccess,
    isLoading: isDataLoading,
  } = useGetBookingOrderById(selectedRecordId);

  const { mutate: addBookingOrder, isSuccess, data: saveData } = useAddBookingOrder();
  const { mutate: updateBookingOrder, data: updateData } = useUpdateBookingOrder(selectedRecordId);

  const onFinish = (values: TBookingOrder) => {
    console.log(values);
    if (isNumber(selectedRecordId)) {
      values.PreBookingOrderDetailList = selectedItem?.map((item: any) => ({
        ...item,
        ActionTypeId: 2,
      }));
      updateBookingOrder(values);
    } else {
      values.PreBookingOrderDetailList = selectedItem?.map((item: any) => ({
        ...item,
        ActionTypeId: 1,
      }));
      addBookingOrder(values);
    }
  };
  useEffect(() => {
    if (isNumber(selectedRecordId)) {
      refetchGetById();
    }
  }, [selectedRecordId]);

  useEffect(() => {
    if (isDataSuccess) {
      form.setFieldsValue(bookingOrderData?.data?.Data?.Result);
      form.setFieldValue('DocDate', dayjs(bookingOrderData?.data?.Data?.Result?.DocDate));
      form.setFieldValue('OrderDueDate', dayjs(bookingOrderData?.data?.Data?.Result?.OrderDueDate));
    }
    form.setFieldValue('DocDate', dayjs());
  }, [isDataSuccess]);
  return (
    <>
      <>
        <>
          <Card>
            <Form form={form} layout="horizontal" onFinish={onFinish}>
              <Buttons
                form={form}
                isSuccess={isSuccess}
                saveData={saveData}
                updateData={updateData}
                bookingOrderData={bookingOrderData}
                selectedRecordId={selectedRecordId}
                setSelectedRecordId={setSelectedRecordId}
                setPrintPreview={setPrintPreview}
                printPreview={printPreview}
              />

              <MainEntry selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
            </Form>
          </Card>
        </>
      </>
    </>
  );
}
type TAddUpdatedRecod = {
  selectedRecordId: number | null;
  setSelectedRecordId: (id: number | null) => void;
};
export default BookingOrderForm;
