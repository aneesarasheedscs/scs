import { useEffect } from 'react';
import DocNumber from './DocNumber';
import MainEntry from './MainEntry';
import { AntButton, AntTable } from '@tradePro/components';
import { Card, Col, Form, Input, Row } from 'antd';
import { useGetDocNumberSaleOrder } from '../queryOptions';
import { SyncOutlined, SaveOutlined } from '@ant-design/icons';
import DynamicForm from './DetailEntry';
import { saleOrderFormcolumns } from '../table/columns';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { isNumber } from 'lodash';
import dayjs from 'dayjs';
import { useAddSaleOrder, useGetSaleOrderById, useUpdateSaleOrder } from '../queries';
import { TSaleOrderDetail } from '../type';

const { useForm } = Form;

function SaleOrderForm({ selectedRecordId }: TAddUpdatedRecod) {
  const [form] = useForm();
  const { data, isError, refetch, isLoading, isSuccess } = useGetDocNumberSaleOrder();
  const {
    data: saleOrderData,
    refetch: refetchPurchase,
    isSuccess: isDataSuccess,
    isLoading: isDataLoading,
  } = useGetSaleOrderById(selectedRecordId);

  const { mutate: addSaleOrderDetail } = useAddSaleOrder();
  const { mutate: updateSaleOrder } = useUpdateSaleOrder(selectedRecordId);

  useEffect(() => {
    if (isSuccess) form.setFieldValue('DocNo', data?.data?.Data?.Result);
  }, [data, isSuccess]);

  const onFinish = (values: TSaleOrderDetail) => {
    console.log(values);
    if (isNumber(selectedRecordId)) {
      values.SaleOrderDetailList = values.SaleOrderDetailList.map((detail) => ({
        ...detail,
        ActionTypeId: 2,
      }));
      updateSaleOrder(values);
    } else {
      values.SaleOrderDetailList = values.SaleOrderDetailList.map((detail) => ({
        ...detail,
        ActionTypeId: 1,
      }));
      addSaleOrderDetail(values);
    }
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
  }, [isDataSuccess]);

  return (
    <>
      <Card>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row align="middle" justify="space-between">
            <Col>
              <Row gutter={10} align="middle">
                <Col style={{ fontSize: 18 }}>Document No.</Col>
                <Col>
                  <DocNumber
                    isError={isError}
                    refetch={refetch}
                    isLoading={isLoading}
                    data={data?.data?.Data?.Result}
                  />
                  <Form.Item name="DocNo" style={{ display: 'none' }}>
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </Col>

            <Col>
              <Form.Item>
                <Row align="middle" gutter={10}>
                  <Col>
                    <AntButton danger ghost htmlType="reset" label="Reset" icon={<SyncOutlined />} />
                  </Col>
                  <Col>
                    <AntButton label="Save and add more" htmlType="submit" />
                  </Col>
                  <Col>
                    <AntButton ghost label="Save" htmlType="submit" icon={<SaveOutlined />} />
                  </Col>
                </Row>
              </Form.Item>
            </Col>
          </Row>

          <MainEntry />
          <DynamicForm form={form} />
        </Form>
      </Card>
      <AntTable
        refetch={refetch}
        isError={isError}
        columns={saleOrderFormcolumns()}
        numberOfSkeletons={12}
        isLoading={isLoading}
        // data={data?.data?.Data?.Result || []}
        scroll={{ x: '', y: convertVhToPixels('15vh') }}
      />
    </>
  );
}
type TAddUpdatedRecod = {
  selectedRecordId?: number | null;
};
export default SaleOrderForm;
