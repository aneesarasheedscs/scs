import { useEffect, useState } from 'react';
import { AntButton } from '@tradePro/components';
import { Card, Col, Form, Input, Row } from 'antd';
import '../style.scss';
import { SaveOutlined, SyncOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import VoucherNo from './VoucherNo';
import { useGetVoucherNo } from '../queries/queries';
import { isNumber, map } from 'lodash';
import { TSaveBankPaymentVoucher } from './types';
import { useAddBankPaymentVoucher, useUpdateBankPaymentVoucher } from '../queries/querySave';
import dayjs from 'dayjs';
import MainEntry from './MainEntry';
import DynamicForm from './DetailEntry';
import { useAtom } from 'jotai';
import { addtableData, isWithHoldingCheckedAtom } from './Atom';

const { useForm } = Form;

function BankPaymentVoucherForm({
  selectedRecordId,
  refetchBankPayment,
  isDataSuccess,
  addBankPayment,
}: TAddUpdateRecord) {
  const [form] = useForm<TSaveBankPaymentVoucher>();
  const { t } = useTranslation();
  const [bankId, setBankId] = useState<number | null>(null);
  const DocumentTypeId = 2;
  const { data, isError, refetch, isLoading, isSuccess } = useGetVoucherNo(DocumentTypeId);
  const [tableData, setTableData] = useAtom(addtableData);
  const [isWithHoldingChecked, setIsWithHoldingChecked] = useAtom(isWithHoldingCheckedAtom);

  const { mutate: addBankPaymentVoucher } = useAddBankPaymentVoucher(DocumentTypeId);
  const { mutate: updateBankPaymentVoucher } = useUpdateBankPaymentVoucher(DocumentTypeId, selectedRecordId);

  useEffect(() => {
    if (isSuccess)
      form.setFieldValue(
        'VoucherNo',
        map(data?.data?.Data?.Result, (item) => item.VoucherCode)
      );
    form.setFields([{ name: 'VoucherDate', value: dayjs(new Date()) }]);
    form.setFields([{ name: 'ChequeDate', value: dayjs(new Date()) }]);
  }, [data, isSuccess]);

  const onFinish = (values: TSaveBankPaymentVoucher) => {
    const AgainstAccountId = values.voucherDetailList?.[0]?.AgainstAccountId;
    const AccountId = values.voucherDetailList?.[0]?.AccountId;
    const Amount = values.voucherDetailList?.[0]?.Amount;
    const TaxTypeId = values.voucherDetailList?.[0]?.TaxTypeId;
    const TaxPrcnt = values.voucherDetailList?.[0]?.TaxPrcnt;
    const CreditAmount = values.voucherDetailList?.[0]?.CreditAmount;
    const TaxesTotalAmount = values.voucherDetailList?.[0]?.TaxesTotalAmount;
    const Comments = values.voucherDetailList?.[0]?.Comments;
    const IsTaxable = 'true';
    const includeWHTList = [
      { AgainstAccountId, AccountId, TaxTypeId, TaxPrcnt, Amount, CreditAmount, IsTaxable, TaxesTotalAmount, Comments },
    ];
    const includeWHTListEntry = includeWHTList.map((item) => ({
      ...item,
    }));

    if (isWithHoldingChecked) {
      const voucherDetailListwithWHT = tableData.map((item: any) => ({
        ...item,
        includeWHTListEntry,
      }));
      values.voucherDetailList = values.voucherDetailList && voucherDetailListwithWHT;
    } else {
      values.voucherDetailList = values.voucherDetailList && tableData;
    }
    console.log(values);
    if (isNumber(selectedRecordId)) {
      updateBankPaymentVoucher(values);
    } else {
      addBankPaymentVoucher(values);
    }
    setTableData([]);
    setBankId(0);
    form.resetFields();
  };

  useEffect(() => {
    if (isNumber(selectedRecordId)) {
      refetchBankPayment();
    }
  }, [selectedRecordId]);

  useEffect(() => {
    if (isDataSuccess) {
      form.setFieldValue('VoucherDate', dayjs(addBankPayment?.data?.Data?.Result?.VoucherDate));
      form.setFieldValue('RefAccountId', addBankPayment?.data?.Data?.Result?.RefAccountId);
      form.setFieldValue('Remarks', addBankPayment?.data?.Data?.Result?.Remarks);
      form.setFieldValue(
        ['voucherDetailList', 0, 'DCheqDate'],
        dayjs(addBankPayment?.data?.Data?.Result?.voucherDetailList?.DCheqDate)
      );
      setTableData(addBankPayment?.data?.Data?.Result?.voucherDetailList);
    }
  }, [isDataSuccess]);

  return (
    <Card className="main_card">
      <Form initialValues={{ remember: true }} form={form} layout="horizontal" onFinish={onFinish}>
        <div style={{ marginLeft: '0%', marginTop: '-0.5%' }}>
          <Row align="middle" justify="space-between">
            <Col span={24}>
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

        <MainEntry form={form} setBankId={setBankId} bankId={bankId} />
        <DynamicForm form={form} bankId={bankId} />
      </Form>
    </Card>
  );
}

type TAddUpdateRecord = {
  selectedRecordId?: number | null;
  refetchBankPayment: any;
  isDataSuccess: any;
  addBankPayment: any;
};

export default BankPaymentVoucherForm;
