import { useEffect, useState } from 'react';
import { AntButton, AntDatePicker } from '@tradePro/components';
import { Badge, Card, Col, Form, Input, Row } from 'antd';
import '../style.scss';
import { SaveOutlined, SyncOutlined, PaperClipOutlined, ReloadOutlined, PrinterFilled } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import MainEntry from '@tradePro/pages/AccountTransaction/bankReceiptVoucher/form/MainEntry';
import DynamicForm from '@tradePro/pages/AccountTransaction/bankReceiptVoucher/form/DetailEntry';
import FormListt from '@tradePro/pages/AccountTransaction/bankReceiptVoucher/form/FormList';
import VoucherNo from './VoucherNo';
import { useGetVoucherNo } from '../queries/queries';
import { isNumber, map } from 'lodash';
import { TSaveBankReceipt } from './types';
import {
  useAddBankReceiptVoucher,
  useGetBankReceiptVoucherById,
  useUpdateBankReceiptVoucher,
} from '../queries/querySave';
import dayjs from 'dayjs';
import { useAtom } from 'jotai';
import { listAtom } from './Atom';
import { listAtomforTax } from '@tradePro/pages/AccountTransaction/bankPaymentVoucher/form/Atom';

const { useForm } = Form;

function BankPaymentVoucherForm({ selectedRecordId }: TAddUpdateRecord) {
  const [form] = useForm<TSaveBankReceipt>();
  const { t } = useTranslation();
  const [bankId, setBankId] = useState<number | null>(null);
  const { data, isError, refetch, isLoading, isSuccess } = useGetVoucherNo();
  const [voucherDetailList, setVoucherDetailList] = useAtom(listAtom);
  // const [voucherDetailListforTax, setVoucherDetailListforTax] = useAtom(listAtomforTax);
  const [isTaxable, setIsTaxable] = useState(false);
  const {
    data: addBankReceipt,
    refetch: refetchBankReceipt,
    isSuccess: isDataSuccess,
  } = useGetBankReceiptVoucherById(selectedRecordId);

  const { mutate: addBankReceiptVoucher } = useAddBankReceiptVoucher();
  const { mutate: updateBankReceiptVoucher } = useUpdateBankReceiptVoucher(selectedRecordId);

  useEffect(() => {
    if (isSuccess)
      form.setFieldValue(
        'VoucherNo',
        map(data?.data?.Data?.Result, (item) => item.VoucherCode)
      );
    form.setFieldValue('VoucherCode', data?.data?.Data?.Result?.[0]?.VoucherCode);
    form.setFields([{ name: 'VoucherDate', value: dayjs(new Date()) }]);
    form.setFields([{ name: 'ChequeDate', value: dayjs(new Date()) }]);
  }, [data, isSuccess]);

  const onFinish = (values: TSaveBankReceipt) => {
    values.voucherDetailList = values.voucherDetailList && voucherDetailList;
    console.log(values);
    if (isNumber(selectedRecordId)) {
      values.voucherDetailList = values.voucherDetailList.map((detail) => ({
        ...detail,
      }));
      // updateBankReceiptVoucher(values);
    } else {
      values.voucherDetailList = values.voucherDetailList && voucherDetailList;
      // addBankReceiptVoucher(values);
    }
  };

  useEffect(() => {
    if (isNumber(selectedRecordId)) {
      refetchBankReceipt();
    }
  }, [selectedRecordId]);

  useEffect(() => {
    if (isDataSuccess) {
      form.setFieldsValue(addBankReceipt?.data?.Data?.Result);
      form.setFieldValue('ChequeDate', dayjs(addBankReceipt?.data?.Data?.Result?.ChequeDate));
      form.setFieldValue('VoucherDate', dayjs(addBankReceipt?.data?.Data?.Result?.VoucherDate));
    }
  }, [isDataSuccess]);

  const handleButtonClick = () => {
    setIsTaxable(!isTaxable);
    console.log(isTaxable);
  };

  return (
    <Card className="main_card">
      <Form form={form} initialValues={{ remember: true }} layout="horizontal" onFinish={onFinish}>
        <div style={{ marginTop: '-0.5%' }}>
          <Row align="middle" justify="space-between">
            <Col span={24}>
              <Row gutter={10} align="middle">
                <Col style={{ fontSize: 18, fontWeight: 'bold', marginLeft: '0.5%' }} className="formfield1 voucherNo">
                  {t('voucher_no')}:
                </Col>
                <Col className="formfield1 voucherNo">
                  <VoucherNo
                    isError={isError}
                    refetch={refetch}
                    isLoading={isLoading}
                    data={map(data?.data?.Data?.Result, (item) => item.VoucherCode)}
                  />
                  <Form.Item name="VoucherNo" style={{ display: 'none' }}>
                    <Input />
                  </Form.Item>
                  <Form.Item name="VoucherCode" style={{ display: 'none' }}>
                    <Input />
                  </Form.Item>
                </Col>

                <Col
                  xs={{ span: 11, offset: 1 }}
                  sm={{ span: 11, offset: 1 }}
                  md={{ span: 11, offset: 1 }}
                  lg={{ span: 11, offset: 1 }}
                  xl={{ span: 6, offset: 1 }}
                  xxl={{ span: 4, offset: 1 }}
                  className="formfield voucherDate"
                >
                  <AntDatePicker bordered={false} name="VoucherDate" label={t('voucher_date')} />
                </Col>
              </Row>
            </Col>
            <Col style={{ display: 'flex', justifyContent: 'end' }} span={24}>
              <Form.Item>
                <Row style={{ marginLeft: '-3%', marginTop: '-12%' }} gutter={[10, 10]} className="btns">
                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 2 }}
                    md={{ span: 2 }}
                    lg={{ span: 2 }}
                    xl={{ span: 2 }}
                    xxl={{ span: 2 }}
                    style={{ marginRight: '2%' }}
                    className="checkbox"
                  >
                    <AntButton
                      onClick={handleButtonClick}
                      icon={<PrinterFilled />}
                      style={{ backgroundColor: isTaxable ? 'red' : 'lightgreen' }}
                    />
                  </Col>
                  <Col className="icon">
                    <Badge size="small" count={1}>
                      <AntButton label={t('')} icon={<PaperClipOutlined />} />
                    </Badge>
                  </Col>
                  <Col>
                    <AntButton
                      danger
                      ghost
                      htmlType="reset"
                      // onClick={() => setTableData([])}
                      label={t('reset')}
                      icon={<SyncOutlined />}
                    />
                  </Col>
                  <Col>
                    <AntButton danger ghost label={t('refresh')} icon={<ReloadOutlined />} />
                  </Col>
                  <Col>
                    <AntButton label={t('save')} htmlType="submit" icon={<SaveOutlined />} />
                  </Col>
                </Row>
              </Form.Item>
            </Col>
          </Row>
        </div>

        <MainEntry form={form} setBankId={setBankId} bankId={bankId} />
        <DynamicForm form={form} />
        <FormListt form={form} />
      </Form>
    </Card>
  );
}

type TAddUpdateRecord = {
  selectedRecordId?: number | null;
};

export default BankPaymentVoucherForm;
