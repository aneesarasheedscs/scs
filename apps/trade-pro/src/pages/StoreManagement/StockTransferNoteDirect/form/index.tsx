import { useEffect, useState } from 'react';
import { AntButton, AntDatePicker } from '@tradePro/components';
import { Card, Col, Form, Input, Row } from 'antd';
import '../style.scss';
import { SaveOutlined, SyncOutlined, PrinterFilled, PaperClipOutlined, RedoOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import MainEntry from './MainEntry';
import { useGetRequestStatusSelect, useGetSourceSelect, useGetVoucherNo } from '../queries/queries';
import { isNumber } from 'lodash';
import dayjs from 'dayjs';
import {
  useAddStockTransferNoteDirect,
  useGetStockTransferNoteDirectById,
  useUpdateStockTransferNoteDirect,
} from '../queries/querySave';
import { useAtom } from 'jotai';
import { addtableData, listAtom } from './Atom';
import { DocumentInfo } from './types';
import TabsPortion from './Tabs';
import DocNumber from './DocNumber';

const { useForm } = Form;

function StockTransferNoteDirectForm({ selectedRecordId, setSelectedRecordId }: TAddUpdateRecord) {
  const [form] = useForm<DocumentInfo>();
  const { t } = useTranslation();
  const [tableData, setTableData] = useAtom(addtableData);
  const { data, isError, refetch, isLoading, isSuccess } = useGetVoucherNo();
  const { data: source } = useGetSourceSelect();
  const { data: request } = useGetRequestStatusSelect();
  const [WsRmStockTransferNotesDetailsList, setWsRmStockTransferNotesDetailsList] = useAtom(listAtom);
  const [printPreview, setPrintPreview] = useState(true);
  const {
    data: addStockTransfer,
    refetch: refetchStockTransfer,
    isSuccess: isDataSuccess,
  } = useGetStockTransferNoteDirectById(selectedRecordId);

  const { mutate: addStockTransferNoteDirect } = useAddStockTransferNoteDirect();
  const { mutate: updateStockTransferNoteDirect } = useUpdateStockTransferNoteDirect(selectedRecordId);

  useEffect(() => {
    if (isSuccess) form.setFieldValue('DocNo', data?.data?.Data?.Result);
    form.setFields([{ name: 'DocDate', value: dayjs(new Date()) }]);
    form.setFields([{ name: 'SourceLocationId', value: source?.[0]?.Id }]);
    form.setFieldValue('ReqStatus', request?.data?.Data?.Result?.[2]?.Id);
  }, [data, isSuccess]);

  const onFinish = (values: DocumentInfo) => {
    console.log(values);
    values.WsRmStockTransferNotesDetailsList =
      values.WsRmStockTransferNotesDetailsList && WsRmStockTransferNotesDetailsList;
    console.log(values);
    if (isNumber(selectedRecordId)) {
      values.WsRmStockTransferNotesDetailsList =
        values.WsRmStockTransferNotesDetailsList && WsRmStockTransferNotesDetailsList;
      updateStockTransferNoteDirect(values);
    } else {
      values.WsRmStockTransferNotesDetailsList =
        values.WsRmStockTransferNotesDetailsList && WsRmStockTransferNotesDetailsList;
      addStockTransferNoteDirect(values);
    }
  };

  useEffect(() => {
    if (isNumber(selectedRecordId)) {
      refetchStockTransfer();
    }
  }, [selectedRecordId]);

  useEffect(() => {
    if (isDataSuccess) {
      setTableData(addStockTransfer?.data?.Data?.Result?.WsRmStockTransferNotesDetailsList);
    }
  }, [isDataSuccess]);
  const handleButtonClick = () => {
    setPrintPreview(!printPreview);
    console.log(printPreview);
  };
  const handleResetForm = () => {
    setSelectedRecordId(null);
    setTableData([]);
    form.setFieldValue('DocNo', data?.data?.Data?.Result);
    form.setFieldValue('DocDate', dayjs(new Date()));
    form.setFieldValue('RemarksHeader', null);
  };
  return (
    <Card>
      <Form initialValues={{ remember: true }} form={form} layout="horizontal" onFinish={onFinish}>
        <Row justify="space-between" style={{ marginLeft: 10, marginRight: 10 }}>
          <Col xxl={8} xl={9} lg={12} style={{ marginTop: '0.5%' }}>
            <Row gutter={10} align="middle" style={{ border: '' }} justify={'space-between'}>
              <Col>
                <b style={{ fontSize: 18 }}> {t('document_no')}</b> &nbsp;
                <DocNumber isError={isError} refetch={refetch} isLoading={isLoading} data={data?.data?.Data?.Result} />
                <Form.Item name="DocNo" style={{ display: 'none' }}>
                  <Input />
                </Form.Item>
              </Col>
              <Col xxl={15} xl={15} sm={18} lg={15} xs={23} md={15} className="formfield">
                <AntDatePicker autoFocus required name="DocDate" label={t('document_date')} bordered={false} />
              </Col>
            </Row>
          </Col>

          <Col
            style={{
              marginTop: '0%',
            }}
          >
            <Form.Item>
              <Row align="middle" gutter={10} style={{ marginTop: '1%', border: '' }}>
                <Col>
                  <AntButton
                    title="PrintPreview"
                    onClick={handleButtonClick}
                    icon={<PrinterFilled />}
                    style={{ backgroundColor: printPreview ? 'lightgreen' : 'red' }}
                  />
                </Col>
                <Col>
                  <AntButton title="Attachment" label={'(0)'} icon={<PaperClipOutlined />} />
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
        <MainEntry form={form} />
        <TabsPortion form={form} />
      </Form>
    </Card>
  );
}

type TAddUpdateRecord = {
  selectedRecordId?: number | null;
  setSelectedRecordId: (id: number | null) => void;
};

export default StockTransferNoteDirectForm;
