import { AntButton } from '@tradePro/components';
import { Card, Col, Form, Input, Row } from 'antd';
import '../style.scss';
import { SaveOutlined, SyncOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { TSaveExpenseVoucher } from './types';
import { isNumber, map } from 'lodash';
import { useEffect, useState } from 'react';
import { useGetExpenseVoucherNo } from '../queries/queries';
import VoucherNo from './VoucherNo';
import dayjs from 'dayjs';
import { useAddExpenseVoucher, useGetExpenseVoucherById, useUpdateExpenseVoucher } from '../queries/querySave';
import { useAtom } from 'jotai';
import { listAtom, addtableData } from './Atom';
import MainEntry from './MainEntry';
import DynamicForm from './DetailEntry';

const { useForm } = Form;

function ExpenseVoucherForm({ selectedRecordId }: TAddUpdateRecord) {
  const [form] = useForm<TSaveExpenseVoucher>();
  const { t } = useTranslation();
  const [voucherDetailList, setVoucherDetailList] = useAtom(listAtom);
  const { data, isError, refetch, isLoading, isSuccess } = useGetExpenseVoucherNo();
  const [againstAccountId, setAgainstAccountId] = useState('');
  const [tableData, setTableData] = useAtom(addtableData);
  const {
    data: addExpense,
    refetch: refetchExpense,
    isSuccess: isDataSuccess,
    isLoading: isDataLoading,
  } = useGetExpenseVoucherById(selectedRecordId);

  const { mutate: addExpenseVoucher } = useAddExpenseVoucher();
  const { mutate: updateExpenseVoucher } = useUpdateExpenseVoucher(selectedRecordId);

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

  const onFinish = (values: TSaveExpenseVoucher) => {
    console.log(values);
    if (isNumber(selectedRecordId)) {
      values.voucherDetailList = values.voucherDetailList && voucherDetailList;
      updateExpenseVoucher(values);
    } else {
      values.voucherDetailList = values.voucherDetailList && voucherDetailList;
      addExpenseVoucher(values);
    }
  };

  useEffect(() => {
    if (isNumber(selectedRecordId)) {
      refetchExpense();
    }
  }, [selectedRecordId]);

  useEffect(() => {
    if (isDataSuccess) {
      // form.setFieldsValue(addExpense?.data?.Data?.Result);
      form.setFieldValue('VoucherDate', dayjs(addExpense?.data?.Data?.Result?.VoucherDate));
      form.setFieldValue('ChequeDate', dayjs(addExpense?.data?.Data?.Result?.ChequeDate));
      form.setFieldValue('RefAccountId', addExpense?.data?.Data?.Result?.RefAccountId);
      form.setFieldValue('ChequeNo', addExpense?.data?.Data?.Result?.ChequeNo);
      form.setFieldValue('PayTitle', addExpense?.data?.Data?.Result?.PayTitle);
      form.setFieldValue('Remarks', addExpense?.data?.Data?.Result?.Remarks);
      setTableData(addExpense?.data?.Data?.Result?.voucherDetailList);
    }
  }, [isDataSuccess]);

  return (
    <Card>
      <Form initialValues={{ remember: true }} autoComplete="off" form={form} layout="horizontal" onFinish={onFinish}>
        <div style={{ marginLeft: '1%', marginTop: '0' }}>
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

            <Col span={24}>
              <Form.Item>
                <Row
                  align="middle"
                  style={{ display: 'flex', justifyContent: 'end', marginLeft: '-2.5%', marginTop: '-3%' }}
                  gutter={10}
                >
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

          <MainEntry form={form} setAgainstAccountId={setAgainstAccountId} />
          <DynamicForm form={form} againstAccountId={againstAccountId} />
        </div>
      </Form>
    </Card>
  );
}

type TAddUpdateRecord = {
  selectedRecordId?: number | null;
};
export default ExpenseVoucherForm;
