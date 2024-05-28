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
import { FormRowGutter } from '@tradePro/globalAtoms';

function Buttons({
  form,
  setBankId,
  isSuccess,
  saveData,
  updateData,
  addBankReceipt,
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
    form.setFieldValue('Remarks', null);
    form.setFieldValue('CheqId', null);
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
      <Row justify="space-between" style={{ marginLeft: 0, marginRight: 10 }}>
        <Col xxl={7} xl={9} lg={12} md={12} sm={24} xs={24} style={{ marginTop: '0.5%', border: '  ' }}>
          <Row gutter={FormRowGutter} align="middle" style={{ border: '', marginLeft: 25 }} justify={'space-between'}>
            <Col xl={9} xxl={10} lg={9} md={8} sm={12} xs={18} className="formfield">
              <span style={{ fontSize: 15 }}> {t('voucher_no')}: &nbsp; </span>
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
            <Col xl={15} xxl={14} sm={12} lg={15} xs={23} md={15} className="formfield" style={{ marginRight: -10 }}>
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
                  icon={<PrinterFilled />}
                  style={{ backgroundColor: printPreview ? 'lightgreen' : 'red' }}
                />
              </Col>
              <Col>
                <Badge count={'1'}>
                  <AntButton style={{ backgroundColor: '#FFAF0C' }} title="Attachment" icon={<PaperClipOutlined />} />
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
  addBankReceipt: any;
  DocumentTypeId: number;
  selectedRecordId: number | null;
  setSelectedRecordId: (id: number | null) => void;
  setPrintPreview: (id: boolean) => void;
  printPreview: boolean;
  setSharedStateIncludeWHT: (id: boolean) => void;
};
export default Buttons;
