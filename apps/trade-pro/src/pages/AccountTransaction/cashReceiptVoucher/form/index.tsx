import { useEffect, useState } from 'react';
import { AntButton, AntDatePicker } from '@tradePro/components';
import { Badge, Card, Col, Form, Input, Row } from 'antd';
import '../style.scss';
import { SaveOutlined, SyncOutlined, PaperClipOutlined, ReloadOutlined, PrinterFilled } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import VoucherNo from './VoucherNo';
import { useGetTaxSchedule, useGetVoucherNo } from '../queries/queries';
import { isNumber, map } from 'lodash';
import dayjs from 'dayjs';
import MainEntry from './MainEntry';
import FormListt from './FormList';
import { TSaveCashReceipt } from './types';
import {
  useAddCashReceiptVoucher,
  useGetCashReceiptVoucherById,
  useUpdateCashReceiptVoucher,
} from '../queries/querySave';
import { useAtom } from 'jotai';
import { listAtom } from './Atom';
import Buttons from './Buttons';
import DynamicForm from './DetailEntryForm';

const { useForm } = Form;

function CashReceiptVoucherForm({
  selectedRecordId,
  setSelectedRecordId,
  refetchCashReceipt,
  addCashReceipt,
}: TAddUpdateRecord) {
  const [form] = useForm<TSaveCashReceipt>();
  const { t } = useTranslation();
  const [voucherDetailList, setVoucherDetailList] = useAtom(listAtom);
  const [bankId, setBankId] = useState<number | null>(null);
  const [againstAccountId, setAgainstAccountId] = useState('');
  const [printPreview, setPrintPreview] = useState(true);
  const [SharedStateIncludeWHT, setSharedStateIncludeWHT] = useState(false);

  const DocumentTypeId = 3;
  const {
    data: addBankPayment,
    refetch: refetchBankPayment,
    isSuccess: isDataSuccess,
  } = useGetCashReceiptVoucherById(selectedRecordId);
  const [TaxTypeId, setTaxTypeId] = useState<number | undefined>();
  const [VoucherDate, setVoucherDate] = useState<Date>(new Date());

  const {
    data: getTaxSchedule,
    isSuccess: TaxSuccess,
    refetch: TaxScheduleRefetch,
    isLoading: TaxLoading,
  } = useGetTaxSchedule(VoucherDate, TaxTypeId);
  const { mutate: addBankPaymentVoucher, isSuccess, data: saveData } = useAddCashReceiptVoucher();
  const { mutate: updateBankPaymentVoucher } = useUpdateCashReceiptVoucher(selectedRecordId);

  const onFinish = (values: TSaveCashReceipt) => {
    console.log(values);
    if (isNumber(selectedRecordId)) {
      values.voucherDetailList = values.voucherDetailList.map((detail) => ({
        ...detail,
      }));
      // updateBankPaymentVoucher(values);
    } else {
      values.voucherDetailList = values.voucherDetailList && voucherDetailList;
      // addBankPaymentVoucher(values);
    }
  };
  const handleTaxTypeChange = (TaxId: number) => {
    setTaxTypeId(TaxId);
  };
  // useEffect(() => {
  //   if (isNumber(selectedRecordId)) {
  //     refetchBankPayment();
  //   }
  // }, [selectedRecordId]);

  useEffect(() => {
    if (isDataSuccess) {
      form.setFieldsValue(addBankPayment?.data?.Data?.Result);
      form.setFieldValue('VoucherDate', dayjs(addBankPayment?.data?.Data?.Result?.VoucherDate));
    }
  }, [isDataSuccess]);

  return (
    <Card className="main_card">
      <Form initialValues={{ remember: true }} form={form} layout="horizontal" onFinish={onFinish}>
        {/* <div style={{ marginTop: '-0.5%' }}>
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
        </div> */}
        <Buttons
          form={form}
          setBankId={setBankId}
          isSuccess={isSuccess}
          saveData={saveData}
          addCashReceipt={addCashReceipt}
          DocumentTypeId={DocumentTypeId}
          selectedRecordId={selectedRecordId}
          setSelectedRecordId={setSelectedRecordId}
          setPrintPreview={setPrintPreview}
          printPreview={printPreview}
          setSharedStateIncludeWHT={setSharedStateIncludeWHT}
        />
        <MainEntry
          form={form}
          setBankId={setBankId}
          setSharedStateIncludeWHT={setSharedStateIncludeWHT}
          SharedStateIncludeWHT={SharedStateIncludeWHT}
          ScheduleData={getTaxSchedule?.data?.Data?.Result?.[0]}
          bankId={bankId}
        />
        {/* <MainEntryForm form={form} setBankId={setBankId} bankId={bankId} setAgainstAccountId={setAgainstAccountId} /> */}

        <DynamicForm
          form={form}
          handleTaxTypeChange={handleTaxTypeChange}
          SharedStateIncludeWHT={SharedStateIncludeWHT}
          ScheduleData={getTaxSchedule?.data?.Data?.Result?.[0]}
        />
        {/* <FormListt form={form} /> */}
      </Form>
    </Card>
  );
}

type TAddUpdateRecord = {
  selectedRecordId?: number | null;
  setSelectedRecordId: (id: number | null) => void;
  refetchCashReceipt: any;
  addCashReceipt: any;
};

export default CashReceiptVoucherForm;
