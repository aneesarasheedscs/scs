import { useEffect, useState } from 'react';
import { AntButton, AntDatePicker } from '@tradePro/components';
import { Badge, Card, Col, Form, Input, Row } from 'antd';
import { SaveOutlined, SyncOutlined, PaperClipOutlined, ReloadOutlined, PrinterFilled } from '@ant-design/icons';
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
  const [isTaxable, setIsTaxable] = useState(false);
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

  const handleButtonClick = () => {
    setIsTaxable(!isTaxable);
    console.log(isTaxable);
  };

  return (
    <Card className="main_card">
      <Form initialValues={{ remember: true }} form={form} layout="horizontal" onFinish={onFinish}>
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
                  >
                    <AntButton
                      onClick={handleButtonClick}
                      icon={<PrinterFilled />}
                      style={{ backgroundColor: isTaxable ? 'red' : 'lightgreen' }}
                    />
                  </Col>
                  <Col>
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
        <MainEntry form={form} setAgainstAccountId={setAgainstAccountId} />
        <DynamicForm form={form} againstAccountId={againstAccountId} />
      </Form>
    </Card>
  );
}

type TAddUpdateRecord = {
  selectedRecordId?: null | string;
};

export default ContraVoucherForm;
