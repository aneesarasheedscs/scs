import dayjs from 'dayjs';
import { useAtom } from 'jotai';
import VoucherNo from './VoucherNo';
import { useEffect } from 'react';
import { useGetVoucherNo } from '../query';
import { useTranslation } from 'react-i18next';
import { addtableData } from '../form/Atom';
import { AntButton, AntDatePicker } from '@tradePro/components';
import { Badge, Col, Form, FormInstance, Input, Row } from 'antd';
import { SaveOutlined, SyncOutlined, RedoOutlined, PaperClipOutlined, PrinterFilled } from '@ant-design/icons';

function Buttons({
  form,
  setBankId,
  isSuccess,
  saveData,
  updateData,
  addBillsPayable,
  DocumentTypeId,
  selectedRecordId,
  setSelectedRecordId,
  setPrintPreview,
  printPreview,
  setSharedStateIncludeWHT,
}: TAddUpdateRecord) {
  const { t } = useTranslation();
  const [tableData, setTableData] = useAtom(addtableData);
  const { data, isError, refetch, isLoading, isSuccess: successVoucherNo } = useGetVoucherNo(DocumentTypeId);

  console.log(tableData);
  const handleButtonClick = () => {
    setPrintPreview(!printPreview);
    console.log(printPreview);
  };
  const handleResetForm = () => {
    setSelectedRecordId(null);
    setTableData([]);
    refetch();
    setBankId(null);
    setSharedStateIncludeWHT(false);
    form.setFieldValue('VoucherNo', data?.data?.Data?.Result);
    form.setFieldValue('RefAccountId', null);
    form.setFieldValue('VoucherDate', dayjs(new Date()));
    form.setFieldValue('ManualBillNo', null);
    form.setFieldValue('Remarks', null);
    form.setFieldValue('Balance', null);
    form.setFieldValue(['voucherDetailList', 0], null);
    form.setFieldValue(['PaymentDuesSchedules', 0], null);
  };
  useEffect(() => {
    if (successVoucherNo) form.setFieldValue('VoucherCode', data?.data?.Data?.Result?.[0]?.VoucherCode);
    form.setFields([{ name: 'VoucherDate', value: dayjs(new Date()) }]);
  }, [data, successVoucherNo]);
  useEffect(() => {
    if (isSuccess && saveData?.data?.Status === true) {
      handleResetForm();
    } else if (updateData?.data?.Status === true) {
      handleResetForm();
    }
  }, [saveData, updateData, isSuccess]);
  const handleKeyDown = (event: any) => {
    if (event.key === 'Escape') {
      handleResetForm();
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [form]);
  return (
    <>
      <Row justify="space-between" style={{ marginRight: 10 }}>
        <Col xxl={8} xl={9} lg={18} md={18} sm={18} xs={24}>
          <Row gutter={10} align="middle" justify={'space-evenly'}>
            <Col xl={9} xxl={7} lg={8} md={7} sm={18} xs={18} className="voucherNo">
              <b style={{ fontSize: 18 }}> {t('voucher_no')}</b> &nbsp;
              <VoucherNo
                isError={isError}
                refetch={refetch}
                isLoading={isLoading}
                data={
                  selectedRecordId
                    ? addBillsPayable?.data?.Data?.Result?.VoucherCode
                    : data?.data?.Data?.Result?.[0]?.VoucherCode
                }
              />
              <Form.Item name="VoucherCode" style={{ display: 'none' }}>
                <Input />
              </Form.Item>
            </Col>
            <Col xl={15} xxl={15} sm={18} lg={15} xs={23} md={15} className="formfield">
              <AntDatePicker bordered={false} name="VoucherDate" label={t('voucher_date')} />
            </Col>
          </Row>
        </Col>

        <Col>
          <Form.Item>
            <Row align="middle" gutter={10}>
              <Col>
                <AntButton
                  title="PrintPreview"
                  onClick={handleButtonClick}
                  icon={<PrinterFilled style={{ fontSize: 18 }} />}
                  style={{ backgroundColor: printPreview ? 'lightgreen' : 'red' }}
                />
              </Col>
              <Col>
                <Badge count={'1'}>
                  <AntButton
                    style={{ backgroundColor: '#FFAF0C' }}
                    title="Attachment"
                    icon={<PaperClipOutlined style={{ fontSize: 20 }} />}
                  />
                </Badge>
              </Col>

              <Col>
                <AntButton danger ghost label={t('reset')} onClick={handleResetForm} icon={<SyncOutlined />} />
              </Col>
              <Col>
                <AntButton danger ghost label={t('referesh')} icon={<RedoOutlined />} />
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
    </>
  );
}
type TAddUpdateRecord = {
  form: FormInstance;
  setBankId: (id: number | null) => void;
  isSuccess: boolean;
  saveData: any;
  updateData: any;
  addBillsPayable: any;
  DocumentTypeId: number;
  selectedRecordId: number | null;
  setSelectedRecordId: (id: number | null) => void;
  setPrintPreview: (id: boolean) => void;
  printPreview: boolean;
  setSharedStateIncludeWHT: (id: boolean) => void;
};
export default Buttons;
