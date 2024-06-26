import dayjs from 'dayjs';
import { useEffect } from 'react';
import { AntButton, AntDatePicker, AntInput, AntSelectDynamic } from '@tradePro/components';
import { Badge, Col, Form, FormInstance, Input, Row } from 'antd';
import { SaveOutlined, SyncOutlined, RedoOutlined, PrinterFilled, PaperClipOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import DocNumber from './DocNumber';
import { useGetDocumentNumber } from '../queries';
import { map } from 'lodash';
import { TAccountsPrematureReceiptsHistory, TAccountsPrematureReceiptsList } from '../types';

function Buttons({
  form,
  selectedTrackingSlip,
  setSelectedTrackingSlip,
  setSelectedRecordId,
  DocumentTypeId,
  isDataSuccess,
  getByTrackingNo,
  isSuccess,
  printPreview,

  setPrintPreview,
  setTableData,
}: TButtonsProps) {
  const { t } = useTranslation();
  const { data, isError, refetch, isLoading, isSuccess: isSuccessDocNo } = useGetDocumentNumber(DocumentTypeId);
  const handleButtonClick = () => {
    setPrintPreview(!printPreview);
    console.log(printPreview);
  };
  const handleResetForm = () => {
    setSelectedRecordId(null);
    setSelectedTrackingSlip(null);
    setTableData([]);
    refetch();
    form.resetFields();
    form.setFieldValue('DocDate', dayjs(new Date()));
  };
  useEffect(() => {
    if (isSuccessDocNo) form.setFieldValue('DocNo', data?.data?.Data?.Result);
    form.setFieldValue('DocDate', dayjs(new Date()));
  }, [data, isSuccessDocNo]);
  useEffect(() => {
    if (isSuccess) {
      handleResetForm();
    }
  }, [isSuccess]);
  const voucherType: TVoucherType[] = [
    {
      Id: 3,
      Name: 'CRV',
    },
    {
      Id: 4,
      Name: 'BRV',
    },
    {
      Id: 5,
      Name: 'JV',
    },
  ];
  const handleVoucherTypeChange = (Id: number) => {
    if (Id === 3) {
      form.setFieldValue('VoucherType', 'CRV');
    } else if (Id === 4) {
      form.setFieldValue('VoucherType', 'BRV');
    } else if (Id === 5) {
      form.setFieldValue('VoucherType', 'JV');
    } else {
      form.setFieldValue('VoucherType', '');
    }
  };
  return (
    <>
      <Row justify="space-between" className="buttons_row">
        <Col xxl={11} xl={15} lg={16} style={{ marginTop: '0%' }}>
          <Row gutter={[0, 6]} align="middle" justify={'space-between'}>
            <Col xl={6} xxl={7} lg={9} md={9} sm={9} xs={18}>
              <b style={{ fontSize: 18 }}> {t('document_no')}</b> &nbsp;
              <DocNumber
                isError={isError}
                refetch={refetch}
                isLoading={isLoading}
                data={isDataSuccess ? getByTrackingNo?.[0]?.DocNo : data?.data?.Data?.Result}
                // data={data?.data?.Data?.Result}
              />
              <Form.Item name="DocNo" style={{ display: 'none' }}>
                <Input />
              </Form.Item>
            </Col>
            <Col xl={9} xxl={9} sm={15} lg={15} xs={23} md={15} className="formfield">
              <AntDatePicker autoFocus required name="DocDate" label={t('document_date')} bordered={false} />
            </Col>
            <Col xl={8} xxl={7} sm={18} lg={11} xs={24} md={11} className="formfield">
              <AntSelectDynamic
                bordered={false}
                label={t('voucher_type')}
                fieldValue="Id"
                fieldLabel="Name"
                name="VouchersId"
                options={map(voucherType, (item) => ({
                  value: item.Id,
                  label: item.Name,
                }))}
                onSelect={(Id) => handleVoucherTypeChange(Id)}
              />
              <AntInput name="VoucherType" label="" style={{ display: 'none' }} />
            </Col>
          </Row>
        </Col>

        <Col>
          <Form.Item>
            <Row align="middle" gutter={10} style={{ marginTop: '0%' }}>
              <Col>
                <AntButton
                  title="PrintPreview"
                  onClick={handleButtonClick}
                  icon={<PrinterFilled />}
                  style={{ backgroundColor: printPreview ? '#21E298' : 'red' }}
                />
              </Col>
              <Col>
                <Badge count={1}>
                  <AntButton className="attachmentbtn" title="Attachment" icon={<PaperClipOutlined />} />
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
                  ghost
                  label={selectedTrackingSlip ? t('update') : t('save')}
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

export default Buttons;
interface TButtonsProps {
  form: FormInstance;
  selectedTrackingSlip: number | null;
  setSelectedTrackingSlip: (id: number | null) => void;
  setSelectedRecordId: (id: number | null) => void;
  DocumentTypeId: number;
  isDataSuccess: boolean;
  getByTrackingNo: TAccountsPrematureReceiptsHistory[];
  isSuccess: boolean;
  printPreview: boolean;
  setPrintPreview: (id: boolean) => void;
  setTableData: (ary: TAccountsPrematureReceiptsList[] | any) => void;
}
interface TVoucherType {
  Id: number;
  Name: string;
}
