import { useEffect } from 'react';
// import { TPurchaseOrderEntry } from '../type';
import { AntButton } from '@tradePro/components';
import { Card, Col, Form, Input, Row } from 'antd';
// import { useGetDocumentNumber } from '../queryOptions';
import { SaveOutlined, SyncOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

// import { useGetVoucherNo } from '../queries/queries';
import { isNumber, map } from 'lodash';
// import VoucherNo from './VoucherNo';
import dayjs from 'dayjs';
import MainEntry from './MainEntry';
import CustomerInfo from './CustomerInfo';
import TabsPortion from './Tabs';
// import { useAddSaleInvoice, useGetSaleInvoiceById, useUpdateSaleInvoice } from '../queries/querySave';
// import { useAddContraVoucher, useGetContraVoucherById, useUpdateContraVoucher } from '../queries/querySave';
const { useForm } = Form;

function SaleInvoice({ selectedRecordId }: TAddUpdateRecord) {
  const [form] = useForm<any>();
  const { t } = useTranslation();

  //   const { data, isError, refetch, isLoading, isSuccess } = useGetVoucherNo();

  // const {
  //   data: addSale,
  //   refetch: refetchSaleInvoice,
  //   isSuccess: isDataSuccess,
  //   isLoading: isDataLoading,
  // } = useGetSaleInvoiceById(selectedRecordId);

  // const { mutate: addSaleInvoice } = useAddSaleInvoice();
  // const { mutate: updateSaleInvoice } = useUpdateSaleInvoice(selectedRecordId);

  //   useEffect(() => {
  //     if (isSuccess)
  //       form.setFieldValue(
  //         'VoucherNo',
  //         map(data?.data?.Data?.Result, (item) => item.VoucherNo)
  //       );
  //     // form.setFieldValue('ChequeDate',  map(data?.data?.Data?.Result, (item) => item.ChequeDate));
  //   }, [data, isSuccess]);

  // const onFinish = (
  //   values: any
  //   // TSaveContraVoucher
  // ) => {
  //   console.log(values);
  //   if (isNumber(selectedRecordId)) {
  //     values.voucherDetailList = values.voucherDetailList.map((detail: any) => ({
  //       ...detail,
  //     }));
  //     updateSaleInvoice(values);
  //   } else {
  //     values.voucherDetailList = values.voucherDetailList.map((detail: any) => ({
  //       ...detail,
  //     }));
  //     addSaleInvoice(values);
  //   }
  // };

  // useEffect(() => {
  //   if (isNumber(selectedRecordId)) {
  //     refetchSaleInvoice();
  //   }
  // }, [selectedRecordId]);

  //   useEffect(() => {
  //     if (isDataSuccess) {
  //       form.setFieldsValue(addContra?.data?.Data?.Result);
  //       form.setFieldValue('VoucherDate', dayjs(addContra?.data?.Data?.Result?.VoucherDate));
  //       form.setFieldValue('ChequeDate', dayjs(addContra?.data?.Data?.Result?.ChequeDate));
  //     }
  //   }, [isDataSuccess]);

  return (
    <>
      <Form
        labelCol={{ span: 0 }}
        wrapperCol={{ span: 24 }} // Full width on small screens
        initialValues={{ remember: true }}
        autoComplete="off"
        form={form}
        layout="horizontal"
        // onFinish={onFinish}
      >
        <div style={{ marginLeft: '1%', marginTop: '1%' }}>
          <Row align="middle" justify="space-between">
            <Col span={24}>
              <Row gutter={10} align="middle">
                <Col style={{ fontSize: 18 }}>{t('voucher_no ')}</Col>
                <Col>
                  {/* <VoucherNo
                  isError={isError}
                  refetch={refetch}
                  isLoading={isLoading}
                  data={map(data?.data?.Data?.Result, (item) => item.VoucherCode)}
                /> */}
                  <Form.Item name="VoucherNo" style={{ display: 'none' }}>
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </Col>

            <Col
              xs={{ span: 24, offset: 1 }}
              sm={{ span: 15, offset: 11 }}
              md={{ span: 15, offset: 14 }}
              lg={{ span: 15, offset: 14 }}
              xl={{ span: 10, offset: 18 }}
            >
              <Form.Item>
                <Row align="middle" style={{ marginLeft: '-2.5%', marginTop: '-6%' }} gutter={10}>
                  <Col>
                    <AntButton danger ghost htmlType="reset" label={t('reset')} icon={<SyncOutlined />} />
                  </Col>
                  <Col>
                    <AntButton label={t('save_and_add_more')} htmlType="submit" />
                  </Col>
                  <Col>
                    <AntButton ghost label={t('save')} htmlType="submit" icon={<SaveOutlined />} />
                  </Col>
                </Row>
              </Form.Item>
            </Col>
          </Row>

          <MainEntry form={form} />
          <TabsPortion />
          {/* <CustomerInfo form={form} /> */}
          {/* <DynamicForm form={form} /> */}
        </div>
      </Form>
    </>
  );
}

type TAddUpdateRecord = {
  selectedRecordId?: number | null;
};

export default SaleInvoice;
