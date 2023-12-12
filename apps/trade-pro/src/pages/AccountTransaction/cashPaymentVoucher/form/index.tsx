import { useEffect, useState } from 'react';
import { AntButton, AntDatePicker } from '@tradePro/components';
import { Badge, Card, Checkbox, Col, Form, Input, Row, notification } from 'antd';
import '../style.scss';
import { SaveOutlined, SyncOutlined, PaperClipOutlined, ReloadOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import VoucherNo from './VoucherNo';
import { useGetVoucherNo } from '../queries/queries';
import { map } from 'lodash';
import dayjs from 'dayjs';
import MainEntry from './MainEntry';
import DynamicForm from './DetailEntry';
import { TSaveCashPaymentVoucher } from './types';
import { useAddCashPaymentVoucher, useUpdateCashPaymentVoucher } from '../queries/querySave';
import { useAtom } from 'jotai';
import { addtableData, isWithHoldingCheckedAtom } from './Atom';

const { useForm } = Form;

function CashPaymentVoucherForm({
  selectedRecordId,
  refetchCashPayment,
  isDataSuccess,
  addCashPayment,
  setSelectedRecordId,
}: TAddUpdateRecord) {
  const [form] = useForm<TSaveCashPaymentVoucher>();
  const { t } = useTranslation();
  const [bankId, setBankId] = useState<number | null>(null);
  const DocumentTypeId = 1;
  const { data, isError, refetch, isLoading, isSuccess } = useGetVoucherNo(DocumentTypeId);

  const [tableData, setTableData] = useAtom(addtableData);
  const [isWithHoldingChecked, setIsWithHoldingChecked] = useAtom(isWithHoldingCheckedAtom);
  const [isAddButtonClicked, setIsAddButtonClicked] = useState(true);
  const { mutate: addCashPaymentVoucher, isSuccess: isEntrySuccessful, data: entryData } = useAddCashPaymentVoucher();
  const {
    mutate: updateCashPaymentVoucher,
    isSuccess: isUpdateEntrySuccessful,
    data: UpdateData,
  } = useUpdateCashPaymentVoucher(selectedRecordId);

  useEffect(() => {
    setTableData([]);
    if (selectedRecordId) {
      form.resetFields();
    } else {
      if (isSuccess) form.setFieldValue('VoucherCode', data?.data?.Data?.Result[0]?.VoucherCode);
      form.setFields([{ name: 'VoucherDate', value: dayjs(new Date()) }]);
    }
  }, [selectedRecordId]);

  const onFinish = (values: TSaveCashPaymentVoucher) => {
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
      //Above Line Meant This
      // if (!values.voucherDetailList) {
      //   values.voucherDetailList = tableData;
      // }
    }
    values.voucherDetailList = values.voucherDetailList = values.voucherDetailList.map((item) => ({
      ...item, // Copy all existing properties of the item
      AgainstAccountId: values.RefAccountId, // Update the specific field
    }));
    console.log(values);

    if (selectedRecordId) {
      updateCashPaymentVoucher(values);
      if (isUpdateEntrySuccessful) {
      }
    } else if (tableData.length === 0) {
      notification.error({
        message: 'Error',
        description: 'Please Enter Data in the Grid before Saving.',
      });
    } else {
      console.log(values);
      addCashPaymentVoucher(values);
      if (isEntrySuccessful == true && entryData?.data?.Status == true) {
      }
    }
    handleReset();
  };

  const handleReset = () => {
    setSelectedRecordId(null);
    setTableData([]);
    refetch();
    setBankId(0);
  };

  const handleCheckboxChange = (isChecked: boolean, fieldName: string) => {
    form.setFieldsValue({
      [fieldName]: isChecked,
    });
  };

  useEffect(() => {
    if (isDataSuccess) {
      form.setFieldValue('VoucherCode', addCashPayment?.data?.Data?.Result?.VoucherCode);
      form.setFieldValue('VoucherDate', dayjs(addCashPayment?.data?.Data?.Result?.VoucherDate));
      form.setFieldValue('RefAccountId', addCashPayment?.data?.Data?.Result?.RefAccountId);
      form.setFieldValue('Remarks', addCashPayment?.data?.Data?.Result?.Remarks);
      form.setFieldValue('JobLotId', addCashPayment?.data?.Data?.Result?.JobLotDescription);

      form.setFieldValue(
        ['voucherDetailList', 0, 'DCheqDate'],
        dayjs(addCashPayment?.data?.Data?.Result?.voucherDetailList?.DCheqDate)
      );
      const DetailList = addCashPayment?.data?.Data?.Result?.voucherDetailList.filter(
        (row: any) => row.DebitAmount > 0
      );
      setTableData(DetailList);
    }
  }, [isDataSuccess]);

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
                    data={
                      selectedRecordId
                        ? addCashPayment?.data?.Data?.Result?.VoucherCode
                        : data?.data?.Data?.Result?.[0]?.VoucherCode
                    }
                  />
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
                <Row style={{ marginLeft: '-25%', marginTop: '-10%' }} gutter={10} className="btns">
                  <Col
                    xs={{ span: 24, offset: 4 }}
                    sm={{ span: 5, offset: 4 }}
                    md={{ span: 6, offset: 4 }}
                    lg={{ span: 6, offset: 4 }}
                    xl={{ span: 6, offset: 4 }}
                    xxl={{ span: 6, offset: 4 }}
                    className="checkbox"
                  >
                    <Form.Item name="IsTaxable" valuePropName="checked" initialValue={true}>
                      <Checkbox onChange={(e) => handleCheckboxChange(e.target.checked, 'IsTaxable')}>
                        {t('print_preview')}
                      </Checkbox>
                    </Form.Item>
                  </Col>
                  <Col className="icon">
                    <Badge size="small" count={0}>
                      <AntButton label={t('')} icon={<PaperClipOutlined />} />
                    </Badge>
                  </Col>
                  <Col>
                    <AntButton
                      danger
                      ghost
                      htmlType="reset"
                      onClick={() => handleReset()}
                      label={t('reset')}
                      icon={<SyncOutlined />}
                    />
                  </Col>
                  <Col>
                    <AntButton danger ghost label={t('refresh')} icon={<ReloadOutlined />} />
                  </Col>
                  <Col>
                    <AntButton
                      label={selectedRecordId ? t('update') : t('save')}
                      htmlType="submit"
                      icon={<SaveOutlined />}
                    />
                  </Col>
                </Row>
              </Form.Item>
            </Col>
          </Row>
        </div>

        <MainEntry form={form} isAddButtonClicked={isAddButtonClicked} setBankId={setBankId} bankId={bankId} />
        <DynamicForm form={form} bankId={bankId} setIsAddButtonClicked={setIsAddButtonClicked} />
      </Form>
    </Card>
  );
}

type TAddUpdateRecord = {
  selectedRecordId?: number | null;
  refetchCashPayment: any;
  isDataSuccess: any;
  addCashPayment: any;
  setSelectedRecordId: any;
};

export default CashPaymentVoucherForm;
