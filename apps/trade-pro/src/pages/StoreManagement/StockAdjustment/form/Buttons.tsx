import dayjs from 'dayjs';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import DocNumber from './DocNumber';
import { addtableData } from './Atom';
import { useTranslation } from 'react-i18next';
import { useGetDocumentNumber } from '../quries';
import { AntButton, AntDatePicker } from '@tradePro/components';
import { Badge, Col, Form, FormInstance, Input, Row } from 'antd';
import { SaveOutlined, SyncOutlined, RedoOutlined, PrinterFilled, PaperClipOutlined } from '@ant-design/icons';
import { TStockAdjustment } from '../types';

function Buttons({
  form,
  selectedRecordId,
  setSelectedRecordId,
  DocumentTypeId,
  stockAdjustmentById,
  isDataSuccess,
  printPreview,
  setPrintPreview,
}: TButtonsProps) {
  const { t } = useTranslation();
  const [tableData, setTableData] = useAtom(addtableData);
  const { data, isError, refetch, isLoading, isSuccess } = useGetDocumentNumber(DocumentTypeId);
  const handleButtonClick = () => {
    setPrintPreview(!printPreview);
    console.log(printPreview);
  };
  const handleResetForm = () => {
    setSelectedRecordId(null);
    setTableData([]);
    refetch();
    form.setFieldValue('DocDate', dayjs(new Date()));
    form.setFieldValue('RemarksHeader', null);
  };
  useEffect(() => {
    if (isSuccess) form.setFieldValue('DocNo', data?.data?.Data?.Result);
  }, [data, isSuccess]);
  return (
    <>
      <Row justify="space-between" className="buttons_row">
        <Col xxl={8} xl={11} lg={16} style={{ marginTop: '0.5%' }}>
          <Row gutter={10} align="middle" justify={'space-between'}>
            <Col xl={9} xxl={9} lg={9} md={9} sm={9} xs={18}>
              <b style={{ fontSize: 18 }}> {t('document_no')}</b> &nbsp;
              <DocNumber
                isError={isError}
                refetch={refetch}
                isLoading={isLoading}
                data={isDataSuccess ? stockAdjustmentById?.DocNo : data?.data?.Data?.Result}
              />
              <Form.Item name="DocNo" style={{ display: 'none' }}>
                <Input />
              </Form.Item>
            </Col>
            <Col xl={15} xxl={15} sm={15} lg={15} xs={23} md={15} className="formfield">
              <AntDatePicker autoFocus required name="DocDate" label={t('document_date')} bordered={false} />
            </Col>
          </Row>
        </Col>

        <Col>
          <Form.Item>
            <Row align="middle" gutter={10} style={{ marginTop: '1%' }}>
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

export default Buttons;
interface TButtonsProps {
  form: FormInstance;
  selectedRecordId: number | null;
  setSelectedRecordId: (id: number | null) => void;
  DocumentTypeId: number;
  stockAdjustmentById: TStockAdjustment;
  isDataSuccess: boolean;
  printPreview: boolean;
  setPrintPreview: (id: boolean) => void;
}
