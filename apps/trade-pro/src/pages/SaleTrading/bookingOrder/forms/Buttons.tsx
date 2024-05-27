import dayjs from 'dayjs';
import DocNumber from './DocNumber';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AntButton, AntDatePicker, AntInput, AntSelectDynamic } from '@tradePro/components';
import { Badge, Col, Form, FormInstance, Input, Row } from 'antd';
import { SaveOutlined, SyncOutlined, RedoOutlined, PaperClipOutlined, PrinterFilled } from '@ant-design/icons';
import { useGetDocNumberBookingOrder, useGetSupplierCustomer } from '../queries';
import { FormRowGutter } from '@tradePro/globalAtoms';

function Buttons({
  form,
  isSuccess,
  saveData,
  updateData,
  selectedRecordId,
  setSelectedRecordId,
  setPrintPreview,
  printPreview,
}: TAddUpdateRecord) {
  const { t } = useTranslation();

  const { data, isError, refetch, isLoading, isSuccess: successDocNo } = useGetDocNumberBookingOrder();

  const handleButtonClick = () => {
    setPrintPreview(!printPreview);
    console.log(printPreview);
  };
  const handleResetForm = () => {
    setSelectedRecordId(null);
    // setTableData([]);
    refetch();
    // setBankId(null);
    // setSharedStateIncludeWHT(false);
    // form.setFieldValue('VoucherNo', data?.data?.Data?.Result);
    form.setFieldValue('RefAccountId', null);
    form.setFieldValue('VoucherDate', dayjs(new Date()));
    form.setFieldValue('Remarks', null);
    form.setFieldValue('IncludeWHT', false);
    form.setFieldValue('Balance', null);
    form.setFieldValue(['voucherDetailList', 0, 'TaxTypeId'], null);
  };
  useEffect(() => {
    if (successDocNo) form.setFieldValue('DocNo', data?.data?.Data?.Result);
  }, [data, successDocNo]);

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
      <Row justify="space-between" gutter={FormRowGutter} style={{ marginLeft: 0, marginBottom: 5, marginRight: 10 }}>
        <Col xxl={7} xl={9} lg={18} md={18} sm={18} xs={24} style={{ marginTop: '0%' }}>
          <Row gutter={[0, 0]} align="middle" style={{ border: '' }} justify={'space-evenly'}>
            <Col xl={9} xxl={9} lg={8} md={7} sm={18} xs={18} className="formfield voucherNo">
              <b style={{ fontSize: 18 }}> {t('document_no')}</b> &nbsp;
              <DocNumber isError={isError} refetch={refetch} isLoading={isLoading} data={data?.data?.Data?.Result} />
              <Form.Item name="DocNo" style={{ display: 'none' }}>
                <Input />
              </Form.Item>
            </Col>
            <Col xl={15} xxl={13} sm={18} lg={15} xs={23} md={11} className="formfield">
              <AntDatePicker bordered={false} name="DocDate" label={t('document date')} />
            </Col>
          </Row>
        </Col>
        <Col xxl={10} xl={6} lg={24}>
          <Row justify={'space-between'}>
            <Col xs={24} sm={12} md={10} lg={10} xl={24} xxl={9} className="formfields">
              <AntSelectDynamic
                bordered={false}
                required
                fieldValue="Id"
                label="Party Name"
                name="OrderSupCustId"
                fieldLabel="CompanyName"
                query={useGetSupplierCustomer}
              />
            </Col>

            <Col xs={24} sm={12} md={13} lg={13} xl={24} xxl={14} className="formfields">
              <AntInput name="RemarksHeader" label="Remarks" bordered={false} />
            </Col>
          </Row>
        </Col>

        <Col
          style={{
            marginTop: '0%',
          }}
        >
          <Form.Item>
            <Row align="middle" gutter={10} style={{ marginTop: '0%', border: '' }}>
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
  isSuccess: boolean;
  saveData: any;
  updateData: any;
  bookingOrderData: any;
  selectedRecordId: number | null;
  setSelectedRecordId: (id: number | null) => void;
  setPrintPreview: (id: boolean) => void;
  printPreview: boolean;
};
export default Buttons;
