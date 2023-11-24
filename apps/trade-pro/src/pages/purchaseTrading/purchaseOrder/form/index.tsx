import { useEffect, useState } from 'react';
import DocNumber from './DocNumber';
import MainEntry from './MainEntry';
import DynamicForm from './DetailEntry';
import { TPurchaseOrderEntry } from '../type';
import { AntButton } from '@tradePro/components';
import { useAddPurchaseOrder, useGetPurchaseOrderById, useUpdatePurchaseOrder } from '../queries';
import { Card, Col, Form, Input, Row } from 'antd';
import { useGetDocumentNumber } from '../queryOptions';
import { SaveOutlined, SyncOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { isNumber } from 'lodash';
import dayjs from 'dayjs';

const { useForm } = Form;

function PurchaseOrderForm({ selectedRecordId }: TAddUpdateRecord) {
  const [form] = useForm<TPurchaseOrderEntry>();
  const { data, isError, refetch, isLoading, isSuccess } = useGetDocumentNumber();

  const { t } = useTranslation();
  const {
    data: purchaseOrderData,
    refetch: refetchPurchase,
    isSuccess: isDataSuccess,
    isLoading: isDataLoading,
  } = useGetPurchaseOrderById(selectedRecordId);
  const { mutate: addPurchaseOrder } = useAddPurchaseOrder();
  const { mutate: updatePurchaseOrder } = useUpdatePurchaseOrder(selectedRecordId);

  useEffect(() => {
    if (isSuccess) form.setFieldValue('DocNo', data?.data?.Data?.Result);
  }, [data, isSuccess]);

  const onFinish = (values: TPurchaseOrderEntry) => {
    console.log(values);
    if (isNumber(selectedRecordId)) {
      values.purchaseOrderDetailList = values.purchaseOrderDetailList.map((detail) => ({
        ...detail,
        ActionTypeId: 2,
      }));
      updatePurchaseOrder(values);
    } else {
      values.purchaseOrderDetailList = values.purchaseOrderDetailList.map((detail) => ({
        ...detail,
        ActionTypeId: 1,
      }));
      addPurchaseOrder(values);
    }
  };

  useEffect(() => {
    if (isNumber(selectedRecordId)) {
      refetchPurchase();
    }
  }, [selectedRecordId]);

  useEffect(() => {
    if (isDataSuccess) {
      form.setFieldsValue(purchaseOrderData?.data?.Data?.Result);
      form.setFieldValue('DocDate', dayjs(purchaseOrderData?.data?.Data?.Result?.DocDate));
      form.setFieldValue('OrderDueDate', dayjs(purchaseOrderData?.data?.Data?.Result?.OrderDueDate));
      form.setFieldValue('DeliveryStartDate', dayjs(purchaseOrderData?.data?.Data?.Result?.DeliveryStartDate));
    }
  }, [isDataSuccess]);

  return (
    <Card>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row align="middle" justify="space-between">
          <Col>
            <Row gutter={10} align="middle">
              <Col style={{ fontSize: 18 }}> {t('document_no')}</Col>
              <Col>
                <DocNumber isError={isError} refetch={refetch} isLoading={isLoading} data={data?.data?.Data?.Result} />
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
                  <AntButton danger ghost htmlType="reset" label={t('reset')} icon={<SyncOutlined />} />
                </Col>
                <Col>
                  <AntButton label={t('save_and_more')} htmlType="submit" />
                </Col>
                <Col>
                  <AntButton ghost label={t('save')} htmlType="submit" icon={<SaveOutlined />} />
                </Col>
              </Row>
            </Form.Item>
          </Col>
        </Row>

        <MainEntry form={form} />
        <DynamicForm form={form} />
      </Form>
    </Card>
  );
}
type TAddUpdateRecord = {
  selectedRecordId?: number | null;
};
export default PurchaseOrderForm;
