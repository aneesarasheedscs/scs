import { useEffect } from 'react';
import { AntButton } from '@tradePro/components';
import { Card, Col, Form, Input, Row } from 'antd';
import '../style.scss';
import { SaveOutlined, SyncOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import MainEntry from './MainEntry';
import { useGetRequestStatusSelect, useGetSourceSelect, useGetVoucherNo } from '../queries/queries';
import { isNumber } from 'lodash';
import dayjs from 'dayjs';
import VoucherNo from './VoucherNo';
import {
  useAddStockTransferNoteDirect,
  useGetStockTransferNoteDirectById,
  useUpdateStockTransferNoteDirect,
} from '../queries/querySave';
import { useAtom } from 'jotai';
import { addtableData, listAtom } from './Atom';
import { DocumentInfo } from './types';
import TabsPortion from './Tabs';

const { useForm } = Form;

function StockTransferNoteDirectForm({ selectedRecordId }: TAddUpdateRecord) {
  const [form] = useForm<DocumentInfo>();
  const { t } = useTranslation();
  const [tableData, setTableData] = useAtom(addtableData);
  const { data, isError, refetch, isLoading, isSuccess } = useGetVoucherNo();
  const { data: source } = useGetSourceSelect();
  const { data: request } = useGetRequestStatusSelect();
  const [WsRmStockTransferNotesDetailsList, setWsRmStockTransferNotesDetailsList] = useAtom(listAtom);

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

  return (
    <Card>
      <Form initialValues={{ remember: true }} form={form} layout="horizontal" onFinish={onFinish}>
        <div>
          <Row align="middle" justify="space-between">
            <Col span={24}>
              <Row gutter={10} align="middle">
                <Col style={{ fontSize: 18 }}>{t('Document_no')}</Col>
                <Col>
                  <VoucherNo
                    isError={isError}
                    refetch={refetch}
                    isLoading={isLoading}
                    data={data?.data?.Data?.Result}
                  />
                  <Form.Item name="DocNo" style={{ display: 'none' }}>
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col style={{ display: 'flex', justifyContent: 'end' }} span={24}>
              <Form.Item>
                <Row align="middle" style={{ marginLeft: '-2.5%', marginTop: '-20%' }} gutter={10}>
                  <Col>
                    <AntButton danger ghost htmlType="reset" label={t('reset')} icon={<SyncOutlined />} />
                  </Col>
                  <Col>
                    <AntButton label={t('save')} htmlType="submit" icon={<SaveOutlined />} />
                  </Col>
                </Row>
              </Form.Item>
            </Col>
          </Row>
        </div>

        <MainEntry form={form} />
        <br />
        <TabsPortion form={form} />
      </Form>
    </Card>
  );
}

type TAddUpdateRecord = {
  selectedRecordId?: number | null;
};

export default StockTransferNoteDirectForm;
