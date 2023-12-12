import { useEffect, useState } from 'react';
import DocNumber from './DocNumber';
import MainEntry from './MainEntry';
import { AntButton } from '@tradePro/components';
import { Card, Col, Form, Input, Row, Tooltip, notification } from 'antd';
import { SaveOutlined, SyncOutlined, RedoOutlined, UploadOutlined, PaperClipOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { isNumber } from 'lodash';
import DynamicForm from './DetailEntry';
import dayjs from 'dayjs';
import { useAddStocktransfer, useGetDocumentNumber, useUpdateStocktransfer } from '../quries';
import { TStockTransfer } from '../types';
import { useAtom } from 'jotai';
import { listAtom, addtableData, deleteData, newTableData } from '../form/Atom';

const { useForm } = Form;

function StockTransferForm({
  selectedRecordId,
  setSelectedRecordId,
  stockTransfergetById,
  refetchStock,
  isDataSuccess,
  isDataLoading,
}: TAddUpdateRecord) {
  const [form] = useForm<TStockTransfer>();
  const { data, isError, refetch, isLoading, isSuccess } = useGetDocumentNumber();

  const { t } = useTranslation();
  const [tableData, setTableData] = useAtom(addtableData);
  const [delettableData, setDeleteTableData] = useAtom(deleteData);
  const [newtableData, setNewTableData] = useAtom(newTableData);
  const [stockTransferDetailList, setStocKTransferDetailList] = useAtom(listAtom);
  const { mutate: addStocktransfer } = useAddStocktransfer();
  const { mutate: updateStocktransfer } = useUpdateStocktransfer(selectedRecordId);

  const onFinish = (values: TStockTransfer) => {
    console.log(values);
    if (selectedRecordId) {
      const Ids = tableData?.map((item: any) => item.Id);
      console.log(Ids);
      if (Ids?.[0] >= 0) {
        const newRecord = newtableData?.map((item: any) => ({
          ...item,
          ActionTypeId: 1,
        }));
        const updatedRecord = tableData
          ?.map((item: any) => ({
            ...item,
            ActionTypeId: 2,
          }))
          ?.filter((item: any) => item.Id > 0);
        const deletedRecord = delettableData?.map((item: any) => ({
          ...item,
          ActionTypeId: 3,
        }));
        values.WsRmWareHouseToWareHouseStocTransferDetailList = [...newRecord, ...updatedRecord, ...deletedRecord];
        if (
          values.WsRmWareHouseToWareHouseStocTransferDetailList?.[0] === null ||
          values.WsRmWareHouseToWareHouseStocTransferDetailList.length === 0
        ) {
          const message = 'Please fill Detail!';
          notification.error({ message: message });
          return;
        }
        updateStocktransfer(values);
        console.log(values);
      } else if (Ids?.[0] === 0) {
        values.WsRmWareHouseToWareHouseStocTransferDetailList = [...tableData];
        if (
          values.WsRmWareHouseToWareHouseStocTransferDetailList?.[0] === null ||
          values.WsRmWareHouseToWareHouseStocTransferDetailList.length === 0
        ) {
          const message = 'Please fill Detail!';
          notification.error({ message: message });
          return;
        }
        updateStocktransfer(values);
        console.log(values);
      }
      setSelectedRecordId(null);
    } else {
      values.WsRmWareHouseToWareHouseStocTransferDetailList = tableData;
      if (
        values.WsRmWareHouseToWareHouseStocTransferDetailList?.[0] === null ||
        values.WsRmWareHouseToWareHouseStocTransferDetailList.length === 0
      ) {
        const message = 'Please fill Detail!';
        notification.error({ message: message });
        return;
      }
      addStocktransfer(values);
      console.log(values);
    }
    setTableData([]);
    setSelectedRecordId(null);
    setDeleteTableData([]);
    setNewTableData([]);
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
        <Form form={form} onFinish={onFinish} layout="horizontal" style={{ marginBottom: 20, marginTop: '-1%' }}>
          {/* <Card className="grn-card"> */}
          <Row align="middle" justify="space-between" style={{ marginLeft: 10, marginRight: 0 }}>
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

            <Col style={{ marginTop: '0.5%' }}>
              <Form.Item>
                <Row align="middle" gutter={10}>
                  <Tooltip title="Attachment">
                    <Col>
                      <AntButton label={t('')} icon={<PaperClipOutlined />} />
                    </Col>
                  </Tooltip>
                  <Col>
                    <AntButton
                      danger
                      ghost
                      htmlType="reset"
                      label={t('reset')}
                      onClick={() => {
                        setSelectedRecordId(null);
                        setTableData([]);
                        refetch();
                      }}
                      icon={<SyncOutlined />}
                    />
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
          <DynamicForm form={form} />
          {/* </Card> */}
        </Form>
      </Card>
    </>
  );
}
type TAddUpdateRecord = {
  selectedRecordId?: number | null;
  setSelectedRecordId?: any;
  stockTransfergetById?: any;
  refetchStock?: any;
  isDataSuccess?: any;
  isDataLoading?: any;
};
export default StockTransferForm;
