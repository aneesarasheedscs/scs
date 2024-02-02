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
  entryData,
  isEntrySuccessful,
  addCashPayment,
  selectedRecordId,
  setSelectedRecordId,
  setPrintPreview,
  printPreview,
  DocumentTypeId,
  setBankId,
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
    setBankId();
    setSharedStateIncludeWHT(false);
    form.setFieldValue('VoucherNo', data?.data?.Data?.Result);
    form.setFieldValue('IncludeWHT', false);
    form.setFieldValue('RefAccountId', null);
    form.setFieldValue('VoucherDate', dayjs(new Date()));
    form.setFieldValue('Remarks', null);
    form.setFieldValue(['voucherDetailList', 0], null);
  };
  useEffect(() => {
    if (successVoucherNo)
      form.setFieldValue(
        'VoucherNo',
        map(data?.data?.Data?.Result, (item) => item.VoucherCode)
      );
    form.setFields([{ name: 'VoucherDate', value: dayjs(new Date()) }]);
    if (isEntrySuccessful && entryData?.data?.Status === true) {
      // refetch();
      handleResetForm();
    }
  }, [data, successVoucherNo, entryData, isEntrySuccessful]);
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
                    ? addCashPayment?.data?.Data?.Result?.VoucherCode
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
  entryData: any;
  isEntrySuccessful: any;
  addCashPayment: any;
  DocumentTypeId: number;
  selectedRecordId: any;
  setSelectedRecordId: (id: number | null) => void;
  setPrintPreview: any;
  printPreview: any;
  setBankId: any;
  setSharedStateIncludeWHT: any;
};
export default Buttons;
