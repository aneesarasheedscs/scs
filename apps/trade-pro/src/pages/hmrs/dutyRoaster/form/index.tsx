import { useEffect } from 'react';
// import { TPurchaseOrderEntry } from '../type';
import { AntButton } from '@tradePro/components';
import { Card, Col, Form, Input, Row } from 'antd';
// import { useGetDocumentNumber } from '../queryOptions';
import { SaveOutlined, SyncOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import DutyRoaster from './DutyRoaster';
// import '../../style.scss';

const { useForm } = Form;

function Main() {
  // { selectedRecordId }: TAddUpdateRecord
  //   const [form] = useForm<TSaveContraVoucher>();
  const { t } = useTranslation();

  //   const { data, isError, refetch, isLoading, isSuccess } = useGetVoucherNo();

  //   const {
  //     data: addContra,
  //     refetch: refetchContra,
  //     isSuccess: isDataSuccess,
  //     isLoading: isDataLoading,
  //   } = useGetContraVoucherById(selectedRecordId);

  //   const { mutate: addContraVoucher } = useAddContraVoucher();
  //   const { mutate: updateContraVoucher } = useUpdateContraVoucher(selectedRecordId);

  //   useEffect(() => {
  //     if (isSuccess)
  //       form.setFieldValue(
  //         'VoucherNo',
  //         map(data?.data?.Data?.Result, (item) => item.VoucherNo)
  //       );
  //     form.setFields([{ name: 'VoucherDate', value: dayjs(new Date()) }]);
  //     form.setFields([{ name: 'ChequeDate', value: dayjs(new Date()) }]);
  //   }, [data, isSuccess]);

  //   const onFinish = (values: TSaveContraVoucher) => {
  //     console.log(values);
  //     if (isNumber(selectedRecordId)) {
  //       values.voucherDetailList = values.voucherDetailList.map((detail) => ({
  //         ...detail,
  //       }));
  //       updateContraVoucher(values);
  //     } else {
  //       values.voucherDetailList = values.voucherDetailList.map((detail) => ({
  //         ...detail,
  //       }));
  //       addContraVoucher(values);
  //     }
  //   };

  //   useEffect(() => {
  //     if (isNumber(selectedRecordId)) {
  //       refetchContra();
  //     }
  //   }, [selectedRecordId]);

  //   useEffect(() => {
  //     if (isDataSuccess) {
  //       form.setFieldsValue(addContra?.data?.Data?.Result);
  //       form.setFieldValue('VoucherDate', dayjs(addContra?.data?.Data?.Result?.VoucherDate));
  //       form.setFieldValue('ChequeDate', dayjs(addContra?.data?.Data?.Result?.ChequeDate));
  //     }
  //   }, [isDataSuccess]);

  return (
    <Form
      labelCol={{ span: 0 }}
      wrapperCol={{ span: 24 }} // Full width on small screens
      initialValues={{ remember: true }}
      autoComplete="off"
      //   form={form}
      layout="horizontal"
      //   onFinish={onFinish}
    >
      <Card className="">
        <Row align="middle" justify="space-between">
          <Col span={24}>
            {/* <Row gutter={10} align="middle">
              <Col style={{ fontSize: 18 }}>{t('voucher_no')}</Col>
              <Col>
                <VoucherNo
                  isError={isError}
                  refetch={refetch}
                  isLoading={isLoading}
                  data={map(data?.data?.Data?.Result, (item) => item.VoucherCode)}
                />
                <Form.Item name="VoucherNo" style={{ display: 'none' }}>
                  <Input />
                </Form.Item>
              </Col>
            </Row> */}
          </Col>

          <Col
            xs={{ span: 24, offset: 1 }}
            sm={{ span: 15, offset: 11 }}
            md={{ span: 15, offset: 14 }}
            lg={{ span: 15, offset: 14 }}
            xl={{ span: 10, offset: 18 }}
          >
            <Form.Item>
              <Row align="middle" gutter={10}>
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

        <DutyRoaster />
      </Card>
    </Form>
  );
}

type TAddUpdateRecord = {
  selectedRecordId?: null | string;
};

export default Main;
