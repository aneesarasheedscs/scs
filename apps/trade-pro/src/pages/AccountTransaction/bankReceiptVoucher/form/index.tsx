import { useEffect, useState } from 'react';
import { AntButton } from '@tradePro/components';
import { Card, Col, Form, Input, Row } from 'antd';
import '../style.scss';
import { SaveOutlined, SyncOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
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
import MainEntry from './MainEntry';
import DynamicForm from './DetailEntry';
import FormListt from './FormList';
import { listAtomforTax, addtableData } from './Atom';

const { useForm } = Form;

function BankPaymentVoucherForm({ selectedRecordId }: TAddUpdateRecord) {
  const [form] = useForm<TSaveBankReceipt>();
  const { t } = useTranslation();
  const [bankId, setBankId] = useState<number | null>(null);
  const { data, isError, refetch, isLoading, isSuccess } = useGetVoucherNo();
  const [voucherDetailList, setVoucherDetailList] = useAtom(listAtom);
  const [voucherDetailListforTax, setVoucherDetailListforTax] = useAtom(listAtomforTax);
  const [tableData, setTableData] = useAtom(addtableData);

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
      values.voucherDetailList = values.voucherDetailList && voucherDetailList;
      updateBankReceiptVoucher(values);
    } else {
      values.voucherDetailList = values.voucherDetailList && voucherDetailList;
      addBankReceiptVoucher(values);
    }
  };

  useEffect(() => {
    if (isNumber(selectedRecordId)) {
      refetchBankReceipt();
    }
  }, [selectedRecordId]);

  useEffect(() => {
    if (isDataSuccess) {
      // form.setFieldsValue(addBankReceipt?.data?.Data?.Result);
      form.setFieldValue('ChequeDate', dayjs(addBankReceipt?.data?.Data?.Result?.ChequeDate));
      form.setFieldValue('VoucherDate', dayjs(addBankReceipt?.data?.Data?.Result?.VoucherDate));
      form.setFieldValue('RefAccountId', addBankReceipt?.data?.Data?.Result?.RefAccountId);
      form.setFieldValue('Id', addBankReceipt?.data?.Data?.Result?.Id);
      form.setFieldValue('Remarks', addBankReceipt?.data?.Data?.Result?.Remarks);
      setTableData(addBankReceipt?.data?.Data?.Result?.voucherDetailList);
    }
  }, [isDataSuccess]);

  return (
    <Card>
      <Form form={form} initialValues={{ remember: true }} layout="horizontal" onFinish={onFinish}>
        <Row align="middle">
          <Col xl={20}>
            <Row gutter={10} align="middle">
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
                <Form.Item name="VoucherCode" style={{ display: 'none' }}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 5 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 4 }}>
            <Form.Item>
              <Row align="middle" style={{ marginTop: '6%' }} gutter={10}>
                <Col>
                  <AntButton danger ghost htmlType="reset" label={t('reset')} icon={<SyncOutlined />} />
                </Col>
                <Col>
                  <AntButton label={t('save')} htmlType="submit" icon={<SaveOutlined />} />
                </Col>
              </Row>
            </Form.Item>
          </Col>
        </Row>

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
