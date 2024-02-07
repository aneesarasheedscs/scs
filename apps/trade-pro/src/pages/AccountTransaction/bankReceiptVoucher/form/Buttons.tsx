import dayjs from 'dayjs';
import { useAtom } from 'jotai';
import { map } from 'lodash';
import VoucherNo from './VoucherNo';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { addtableData } from '../form/Atom';
import { useGetVoucherNo } from '../queries/queries';
import { AntButton, AntDatePicker } from '@tradePro/components';
import { Badge, Col, Form, FormInstance, Input, Row, notification } from 'antd';
import { SaveOutlined, SyncOutlined, RedoOutlined, PaperClipOutlined, PrinterFilled } from '@ant-design/icons';

function Buttons({
  form,
  setBankId,
  isSuccess,
  saveData,
  addBankReceipt,
  selectedRecordId,
  setSelectedRecordId,
  setPrintPreview,
  printPreview,
  DocumentTypeId,
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
    form.setFieldValue('Remarks', null);
    form.setFieldValue('IncludeWHT', false);
    form.setFieldValue('Balance', null);
    form.setFieldValue('PayeeTitle', null);
    form.setFieldValue('CheqNoDetail', null);
    form.setFieldValue(['voucherDetailList', 0, 'TaxTypeId'], null);
    form.setFieldValue(['voucherDetailList', 0, 'Amount'], null);
    form.setFieldValue(['voucherDetailList', 0, 'TotalAmount'], null);
  };
  useEffect(() => {
    if (successVoucherNo) form.setFieldValue('VoucherCode', data?.data?.Data?.Result?.[0]?.VoucherCode);
    form.setFields([{ name: 'VoucherDate', value: dayjs(new Date()) }]);
    form.setFields([{ name: 'ChequeDate', value: dayjs(new Date()) }]);
  }, [data, successVoucherNo]);
  useEffect(() => {
    if (isSuccess && saveData?.data?.Status === true) {
      handleResetForm();
    }
  }, [saveData, isSuccess]);
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
      <Row justify="space-between" gutter={[10, 16]} style={{ marginLeft: 0, marginRight: 10 }}>
        <Col xxl={8} xl={9} lg={18} md={18} sm={18} xs={24} style={{ marginTop: '0%' }}>
          <Row gutter={10} align="middle" style={{ border: '' }} justify={'space-evenly'}>
            <Col xl={9} xxl={7} lg={8} md={7} sm={18} xs={18} className="formfield1 voucherNo">
              <b style={{ fontSize: 18 }}> {t('voucher_no')}</b> &nbsp;
              <VoucherNo
                isError={isError}
                refetch={refetch}
                isLoading={isLoading}
                data={
                  selectedRecordId
                    ? addBankReceipt?.data?.Data?.Result?.VoucherCode
                    : data?.data?.Data?.Result?.[0]?.VoucherCode
                }
              />
              <Form.Item name="VoucherCode" style={{ display: 'none' }}>
                <Input />
              </Form.Item>
            </Col>
            <Col xl={15} xxl={15} sm={18} lg={15} xs={18} md={15} className="formfield">
              <AntDatePicker bordered={false} name="VoucherDate" label={t('voucher_date')} />
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
  setBankId: any;
  isSuccess: any;
  saveData: any;
  addBankReceipt: any;
  DocumentTypeId: number;
  selectedRecordId: any;
  setSelectedRecordId: (id: number | null) => void;
  setPrintPreview: any;
  printPreview: any;
  setSharedStateIncludeWHT: any;
};
export default Buttons;
