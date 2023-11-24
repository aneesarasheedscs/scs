import { useEffect, useState } from 'react';
import { AntButton } from '@tradePro/components';
import { Card, Col, Form, Input, Row } from 'antd';
import '../style.scss';
import { SaveOutlined, SyncOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import VoucherNo from './VoucherNo';
import { useGetVoucherNo } from '../queries/queries';
import { isNumber, map } from 'lodash';
import dayjs from 'dayjs';
import MainEntry from './MainEntry';
import DynamicForm from './DetailEntry';
import FormListt from './FormList';
import { TSaveCashReceipt, TSaveCashReceiptVoucher } from './types';
import {
  useAddCashReceiptVoucher,
  useGetCashReceiptVoucherById,
  useUpdateCashReceiptVoucher,
} from '../queries/querySave';
import { useAtom } from 'jotai';
import { listAtom, addtableData } from './Atom';

const { useForm } = Form;

function CashReceiptVoucherForm({ selectedRecordId }: TAddUpdateRecord) {
  const [form] = useForm<TSaveCashReceipt>();
  const { t } = useTranslation();
  const [voucherDetailList, setVoucherDetailList] = useAtom(listAtom);
  const [bankId, setBankId] = useState<number | null>(null);
  const [againstAccountId, setAgainstAccountId] = useState('');
  const { data, isError, refetch, isLoading, isSuccess } = useGetVoucherNo(1);
  const [tableData, setTableData] = useAtom(addtableData);
  const {
    data: addBankPayment,
    refetch: refetchBankPayment,
    isSuccess: isDataSuccess,
  } = useGetCashReceiptVoucherById(selectedRecordId);

  const { mutate: addBankPaymentVoucher } = useAddCashReceiptVoucher();
  const { mutate: updateBankPaymentVoucher } = useUpdateCashReceiptVoucher(selectedRecordId);

  useEffect(() => {
    if (isSuccess)
      form.setFieldValue(
        'VoucherNo',
        map(data?.data?.Data?.Result, (item) => item.VoucherCode)
      );
    form.setFieldValue('VoucherCode', data?.data?.Data?.Result?.[0]?.VoucherCode);
    form.setFields([{ name: 'VoucherDate', value: dayjs(new Date()) }]);
  }, [data, isSuccess]);

  const onFinish = (values: TSaveCashReceiptVoucher) => {
    console.log(values);
    if (isNumber(selectedRecordId)) {
      values.voucherDetailList = values.voucherDetailList && voucherDetailList;
      updateBankPaymentVoucher(values);
    } else {
      values.voucherDetailList = values.voucherDetailList && voucherDetailList;
      addBankPaymentVoucher(values);
    }
  };

  useEffect(() => {
    if (isNumber(selectedRecordId)) {
      refetchBankPayment();
    }
  }, [selectedRecordId]);

  useEffect(() => {
    if (isDataSuccess) {
      // form.setFieldsValue(addBankPayment?.data?.Data?.Result);
      form.setFieldValue('VoucherDate', dayjs(addBankPayment?.data?.Data?.Result?.VoucherDate));
      form.setFieldValue('RefAccountId', addBankPayment?.data?.Data?.Result?.RefAccountId);
      form.setFieldValue('Id', addBankPayment?.data?.Data?.Result?.Id);
      setTableData(addBankPayment?.data?.Data?.Result?.voucherDetailList);
    }
  }, [isDataSuccess]);

  return (
    <Card>
      <Form initialValues={{ remember: true }} form={form} layout="horizontal" onFinish={onFinish}>
        <div style={{ marginLeft: '0%', marginTop: '1%' }}>
          <Row align="middle" justify="space-between">
            <Col span={24}>
              <Row gutter={10} align="middle">
                <Col style={{ fontSize: 18 }}>{t('voucher_no')}</Col>
                <Col>
                  <VoucherNo
                    isError={isError}
                    refetch={refetch}
                    isLoading={isLoading}
                    data={data?.data?.Data?.Result?.[0]?.VoucherCode}
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
            <Col style={{ display: 'flex', justifyContent: 'end' }} span={24}>
              <Form.Item>
                <Row align="middle" style={{ marginLeft: '-2.5%', marginTop: '-6%' }} gutter={10}>
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
        </div>

        <MainEntry form={form} setBankId={setBankId} bankId={bankId} setAgainstAccountId={setAgainstAccountId} />
        <DynamicForm form={form} againstAccountId={againstAccountId} />
        <FormListt form={form} />
      </Form>
    </Card>
  );
}

type TAddUpdateRecord = {
  selectedRecordId?: number | null;
};

export default CashReceiptVoucherForm;
