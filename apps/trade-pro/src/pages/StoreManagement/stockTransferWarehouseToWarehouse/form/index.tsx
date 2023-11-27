import { useEffect, useState } from 'react';
import DocNumber from './DocNumber';
import MainEntry from './MainEntry';
import { AntButton } from '@tradePro/components';
import { Card, Col, Form, Input, Row } from 'antd';
import { SaveOutlined, SyncOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { isNumber } from 'lodash';
import DynamicForm from './DetailEntry';
import dayjs from 'dayjs';
import { useAddStocktransfer, useGetDocumentNumber, useUpdateStocktransfer } from '../quries';
import { TStockTransfer } from '../types';
import { useAtom } from 'jotai';
import { listAtom, addtableData } from '../form/Atom';

const { useForm } = Form;

function StockTransferForm({
  selectedRecordId,
  stockTransfergetById,
  refetchStock,
  isDataSuccess,
  isDataLoading,
}: TAddUpdateRecord) {
  const [form] = useForm<TStockTransfer>();
  const { data, isError, refetch, isLoading, isSuccess } = useGetDocumentNumber();

  const { t } = useTranslation();
  const [tableData, setTableData] = useAtom(addtableData);
  const [stockTransferDetailList, setStocKTransferDetailList] = useAtom(listAtom);
  const { mutate: addStocktransfer } = useAddStocktransfer();
  const { mutate: updateStocktransfer } = useUpdateStocktransfer(selectedRecordId);

  const onFinish = (values: TStockTransfer) => {
    console.log(values);
    if (isNumber(selectedRecordId)) {
      values.WsRmWareHouseToWareHouseStocTransferDetailList =
        values.WsRmWareHouseToWareHouseStocTransferDetailList && stockTransferDetailList;
      updateStocktransfer(values);
    } else {
      values.WsRmWareHouseToWareHouseStocTransferDetailList =
        values.WsRmWareHouseToWareHouseStocTransferDetailList && stockTransferDetailList;

      addStocktransfer(values);
    }
  };

  useEffect(() => {
    if (isNumber(selectedRecordId)) {
      refetchStock();
    }
  }, [selectedRecordId]);

  useEffect(() => {
    if (isDataSuccess && !isDataLoading) {
      form.setFieldValue('DocNo', stockTransfergetById?.data?.Data?.Result?.DocNo);
      form.setFieldValue('DocDate', dayjs(stockTransfergetById?.data?.Data?.Result?.DocDate));
      form.setFieldValue('Remarks', stockTransfergetById?.data?.Data?.Result?.Remarks);
      setTableData(stockTransfergetById?.data?.Data?.Result?.WsRmWareHouseToWareHouseStocTransferDetailList);
    }
  }, [isDataSuccess, !isDataLoading]);
  useEffect(() => {
    if (isSuccess) form.setFieldValue('DocNo', data?.data?.Data?.Result);
  }, [data, isSuccess]);
  return (
    <>
      <Card>
        <Form form={form} onFinish={onFinish} layout="horizontal" style={{ marginBottom: 20 }}>
          <Card className="grn-card">
            <Row align="middle" justify="space-between" style={{ marginLeft: 10, marginRight: 60 }}>
              <Col>
                <Row gutter={10} align="middle">
                  <Col style={{ fontSize: 18 }}> {t('document_no')}</Col>
                  <Col>
                    <DocNumber
                      isError={isError}
                      refetch={refetch}
                      isLoading={isLoading}
                      data={isDataSuccess ? stockTransfergetById?.data?.Data?.Result?.DocNo : data?.data?.Data?.Result}
                    />
                    <Form.Item name="DocNo" style={{ display: 'none' }}>
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>

              <Col>
                <Form.Item>
                  <Row align="middle" gutter={10}>
                    <Col>
                      <AntButton danger ghost htmlType="reset" label={t('reset')} icon={<SyncOutlined />} />
                    </Col>

                    <Col>
                      <AntButton ghost label={t('save')} htmlType="submit" icon={<SaveOutlined />} />
                    </Col>
                  </Row>
                </Form.Item>
              </Col>
            </Row>

            <MainEntry form={form} />
            <DynamicForm form={form} />
          </Card>
        </Form>
      </Card>
    </>
  );
}
type TAddUpdateRecord = {
  selectedRecordId?: number | null;
  stockTransfergetById?: any;
  refetchStock?: any;
  isDataSuccess?: any;
  isDataLoading?: any;
};
export default StockTransferForm;
