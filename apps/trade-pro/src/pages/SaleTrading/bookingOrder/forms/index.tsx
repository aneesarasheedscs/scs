import { useEffect, useState } from 'react';
import DocNumber from './DocNumber';
import MainEntry from './MainEntry';
import { AntButton, AntDatePicker, AntTable } from '@tradePro/components';
import { Badge, Card, Checkbox, Col, Form, Input, Row } from 'antd';
import { SyncOutlined, SaveOutlined, PaperClipOutlined, ReloadOutlined } from '@ant-design/icons';
// import DynamicForm from './DetailEntry';
import { saleOrderFormcolumns } from '../table/columns';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { isNumber } from 'lodash';
import dayjs from 'dayjs';
import { useAddSaleOrder,  useGetBookingOrder,  useGetSaleOrderById, useUpdateSaleOrder } from '../queries';
import { TBookingOrder, TPreBookingOrderDetailList, TSaleOrder, TSaleOrderDetail } from '../type';
import { useTranslation } from 'react-i18next';
import { useAtom } from 'jotai';
import { tableDataList } from './Atom';
// import SalesPersonalInfo from './SalesInfo';
import '../style.scss';
import Buttons from './Buttons';
 
const { useForm , useWatch} = Form;

function BookingOrderForm({ selectedRecordId, setSelectedRecordId }: TAddUpdatedRecod) {
  const { t } = useTranslation();
  const [form] = useForm<TBookingOrder>();
  // const formValues = useWatch(TBookingO[], form)
  // const formValues = useWatch<TBookingOrder>([], form);
  const [printPreview, setPrintPreview] = useState<boolean>(true);
  // const { data, isError, refetch, isLoading, isSuccess } = useGetDocNumberSaleOrder();
  const { data: add, refetch: addRefetch, isError: addisError, isLoading: addisLoading } = useGetBookingOrder(true);
  const [selectedItem, setSelectedItem]=useState<TPreBookingOrderDetailList[] | any>([])
  const {
    data: saleOrderData,
    refetch: refetchPurchase,
    isSuccess: isDataSuccess,
    isLoading: isDataLoading,
  } = useGetSaleOrderById(selectedRecordId);

  const { mutate: addSaleOrderDetail , isSuccess, data: saveData} = useAddSaleOrder();
  const { mutate: updateSaleOrder, data: updateData } = useUpdateSaleOrder(selectedRecordId);
  const [tableData, setTableData] = useAtom(tableDataList);

  // useEffect(() => {
  //   if (isSuccess) form.setFieldValue('DocNo', data?.data?.Data?.Result);
  // }, [data, isSuccess]);
  const onFinish = (values: TBookingOrder  ) => {
    values.PreBookingOrderDetailList = selectedItem
    // values.PreBookingOrderDetailList ?.map((item: any)=> ({
    //   ...item,
    //   PreBookingOrderDetailList : selectedItem
    // })

    // )
    console.log(values);
    addSaleOrderDetail(values)
    // if (isNumber(selectedRecordId)) {
    //   values.SaleOrderDetailList = values.SaleOrderDetailList.map((detail) => ({
    //     ...detail,
    //     ActionTypeId: 2,
    //   }));
    //   updateSaleOrder(values);
    // } else {
    //   values.SaleOrderDetailList = values.SaleOrderDetailList.map((detail) => ({
    //     ...detail,
    //     ActionTypeId: 1,
    //   }));
    //   addSaleOrderDetail(values);
    // }
  };
  useEffect(() => {
    if (isNumber(selectedRecordId)) {
      refetchPurchase();
    }
  }, [selectedRecordId]);

  useEffect(() => {
    if (isDataSuccess) {
      form.setFieldsValue(saleOrderData?.data?.Data?.Result);
      form.setFieldValue('DocDate', dayjs(saleOrderData?.data?.Data?.Result?.DocDate));
      form.setFieldValue('OrderDueDate', dayjs(saleOrderData?.data?.Data?.Result?.OrderDueDate));
    }
    form.setFieldValue('DocDate', dayjs());
  }, [isDataSuccess]);
  console.log(tableData);
  return (
    <>
      <>
        <>
          <Card>
            <Form form={form}   layout="horizontal" onFinish={onFinish}>
              
<Buttons 
  form={form}
 
  isSuccess={isSuccess}
  saveData={saveData}
  updateData={updateData}
  saleOrderData={saleOrderData}
  
  selectedRecordId={selectedRecordId}
  setSelectedRecordId={setSelectedRecordId}
  setPrintPreview={setPrintPreview}
  printPreview={printPreview}
  
/>
 
        <MainEntry form={form} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
      
              {/* <DynamicForm form={form} /> */}
            </Form>
          </Card>
        </>
      </>
    </>
  );
}
type TAddUpdatedRecod = {
  selectedRecordId: number | null;
  setSelectedRecordId: (id : number | null) => void
};
export default BookingOrderForm;
