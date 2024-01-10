import { useEffect, useState } from 'react';
import { AntButton } from '@tradePro/components';
import { Col, Form, Input, Row } from 'antd';
import { SaveOutlined, SyncOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { TSaveContraVoucher } from './types';
import { useGetVoucherNo } from '../queries/queries';
import { isNumber, map } from 'lodash';
import VoucherNo from './VoucherNo';
import dayjs from 'dayjs';
import { useAddContraVoucher, useGetContraVoucherById, useUpdateContraVoucher } from '../queries/querySave';
import MainEntry from './MainEntry';
import DynamicForm from './DetailEntry';
import { useAtom } from 'jotai';
const { useForm } = Form;
import { addtableData, listAtom } from './Atom';

function ContraVoucherForm({ selectedRecordId }: TAddUpdateRecord) {
  const [form] = useForm<TSaveContraVoucher>();
  const { t } = useTranslation();
  const [voucherDetailList, setVoucherDetailList] = useAtom(listAtom);
  const [againstAccountId, setAgainstAccountId] = useState('');
  const { data, isError, refetch, isLoading, isSuccess } = useGetVoucherNo();
  const [tableData, setTableData] = useAtom(addtableData);
  const {
    data: addContra,
    refetch: refetchContra,
    isSuccess: isDataSuccess,
    isLoading: isDataLoading,
  } = useGetContraVoucherById(selectedRecordId);

  const { mutate: addContraVoucher } = useAddContraVoucher();
  const { mutate: updateContraVoucher } = useUpdateContraVoucher(selectedRecordId);
  useEffect(() => {
    if (isSuccess) form.setFieldValue('VoucherNo', data?.data?.Data?.Result?.[0]?.VoucherCode);
    form.setFieldValue('VoucherCode', data?.data?.Data?.Result?.[0]?.VoucherCode);
    form.setFields([{ name: 'VoucherDate', value: dayjs(new Date()) }]);
    form.setFields([{ name: 'ChequeDate', value: dayjs(new Date()) }]);
  }, [data, isSuccess]);

  const onFinish = (values: TSaveContraVoucher) => {
    console.log(values);
    if (isNumber(selectedRecordId)) {
      values.voucherDetailList = values.voucherDetailList && voucherDetailList;
      updateContraVoucher(values);
    } else {
      values.voucherDetailList = values.voucherDetailList && voucherDetailList;
      addContraVoucher(values);
    }
  };

  useEffect(() => {
    if (isNumber(selectedRecordId)) {
      refetchContra();
    }
  }, [selectedRecordId]);

  useEffect(() => {
    if (isDataSuccess) {
      // form.setFieldsValue(addContra?.data?.Data?.Result);
      setTableData(addContra?.data?.Data?.Result?.voucherDetailList);
      form.setFieldValue('VoucherDate', dayjs(addContra?.data?.Data?.Result?.VoucherDate));
      form.setFieldValue('ChequeDate', dayjs(addContra?.data?.Data?.Result?.ChequeDate));
      form.setFieldValue('CheqId', addContra?.data?.Data?.Result?.CheqId);
      form.setFieldValue('PayTitle', addContra?.data?.Data?.Result?.PayTitle);
      form.setFieldValue('AgainstAccountId', addContra?.data?.Data?.Result?.AgainstAccountId);
      form.setFieldValue('Remarks', addContra?.data?.Data?.Result?.Remarks);
    }
  }, [isDataSuccess]);

  return (
    <Form initialValues={{ remember: true }} form={form} layout="horizontal" onFinish={onFinish}>
      <div style={{ marginLeft: '1%', marginTop: '1%' }}>
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
      </div>
      <MainEntry form={form} setAgainstAccountId={setAgainstAccountId} />
      <DynamicForm form={form} againstAccountId={againstAccountId} />
    </Form>
  );
}

type TAddUpdateRecord = {
  selectedRecordId?: null | string;
};

export default ContraVoucherForm;
