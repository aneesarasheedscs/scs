import { useEffect, useState } from 'react';
import DocNumber from './DocNumber';
import MainEntry from './MainEntry';
import { AntButton, AntDatePicker } from '@tradePro/components';
import { Badge, Card, Col, Form, Input, Modal, Row, Tooltip, notification } from 'antd';
import {
  SaveOutlined,
  SyncOutlined,
  ExportOutlined,
  RedoOutlined,
  PaperClipOutlined,
  PrinterFilled,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import {
  useAddStockReceivedNotes,
  useGetAvailableStock,
  useGetDocumentNumber,
  useUpdateStockReceivedNotes,
} from '../quries';
import { TStockReceivedNotes } from '../types';
import { useAtom } from 'jotai';
import { deleteData, addtableData, newTableData, expenseList } from '../form/Atom';
import ROLoadOrder from '../loadOrder';
import DetailGrids from './DetailGrids';

const { useForm } = Form;

function StockTransferNoteForm({
  selectedRecordId,
  stockReceivedById,
  refetchStock,
  isDataSuccess,
  isDataLoading,
  setSelectedRecordId,
}: TAddUpdateRecord) {
  const [form] = useForm<TStockReceivedNotes>();
  const DocumentTypeId = 108;
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [printPreview, setPrintPreview] = useState(true);
  const { data, isError, refetch, isLoading, isSuccess } = useGetDocumentNumber(DocumentTypeId);
  const [delettableData, setDeleteTableData] = useAtom(deleteData);
  const [newtableData, setNewTableData] = useAtom(newTableData);
  const [expenseTableData, setExpenseTableData] = useAtom(expenseList);

  const [itemId, setItemId] = useState<any>();
  const { t } = useTranslation();
  const [tableData, setTableData] = useAtom(addtableData);
  const { mutate: addStockReceivedNotes } = useAddStockReceivedNotes(DocumentTypeId);
  const {
    mutate: updateStockReceivedNotes,
    isSuccess: successStock,
    data: stockData,
  } = useUpdateStockReceivedNotes(selectedRecordId, DocumentTypeId);
  const warehouseId = stockReceivedById?.data?.Data?.Result?.WsRmStockReceivedNotesDetailList?.[0]?.WarehouseId;
  const {
    data: stockBillWeight,
    isSuccess: weightSuccess,
    isLoading: isLoadingWeight,
  } = useGetAvailableStock(true, itemId, warehouseId);
  useEffect(() => {
    if (stockReceivedById) {
      setItemId(stockReceivedById?.data?.Data?.Result?.WsRmStockReceivedNotesDetailList?.[0]?.ItemId);
      console.log(stockReceivedById?.data?.Data?.Result?.WsRmStockReceivedNotesDetailList?.[0]?.ItemId);
    }
  }, [stockReceivedById]);
  console.log(itemId);
  const onFinish = (values: TStockReceivedNotes) => {
    values.PrintPreview = printPreview;
    values.WsRmStockReceivedNotesExpensesList = expenseTableData;
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
        values.WsRmStockReceivedNotesDetailList = [...newRecord, ...updatedRecord, ...deletedRecord];
        if (
          values.WsRmStockReceivedNotesDetailList?.[0] === null ||
          values.WsRmStockReceivedNotesDetailList.length === 0
        ) {
          const message = 'Please fill Detail!';
          notification.error({ message: message });
          return;
        }
        updateStockReceivedNotes(values);
        console.log(values);
      } else if (Ids?.[0] === 0) {
        values.WsRmStockReceivedNotesDetailList = [...tableData];
        if (
          values.WsRmStockReceivedNotesDetailList?.[0] === null ||
          values.WsRmStockReceivedNotesDetailList.length === 0
        ) {
          const message = 'Please fill Detail!';
          notification.error({ message: message });
          return;
        }
        updateStockReceivedNotes(values);
        console.log(values);
      }
      setSelectedRecordId(null);
    } else {
      values.WsRmStockReceivedNotesDetailList = tableData;
      if (
        values.WsRmStockReceivedNotesDetailList?.[0] === null ||
        values.WsRmStockReceivedNotesDetailList.length === 0
      ) {
        const message = 'Please fill Detail!';
        notification.error({ message: message });
        return;
      }
      addStockReceivedNotes(values);
      console.log(values);
    }
    if (successStock && stockData?.data?.Status === true) {
      setTableData([]);
      setSelectedRecordId(null);
      setDeleteTableData([]);
      setNewTableData([]);
      form.setFieldValue('DocDate', dayjs(new Date()));
    }
  };

  useEffect(() => {
    if (selectedRecordId) {
      // refetchStock();
      setDeleteTableData([]);
    }
  }, [selectedRecordId]);
  console.log(delettableData);

  useEffect(() => {
    if (isDataSuccess && !isDataLoading) {
      form.setFieldValue('DocNo', stockReceivedById?.data?.Data?.Result?.DocNo);
      form.setFieldValue('DocDate', dayjs(stockReceivedById?.data?.Data?.Result?.DocDate));
      if (stockReceivedById?.data?.Data?.Result?.ReqStatus === '1') {
        form.setFieldValue('ReqStatus', 1);
      } else if (stockReceivedById?.data?.Data?.Result?.ReqStatus === '2') {
        form.setFieldValue('ReqStatus', 2);
      } else if (stockReceivedById?.data?.Data?.Result?.ReqStatus === '3') {
        form.setFieldValue('ReqStatus', 3);
      } else if (stockReceivedById?.data?.Data?.Result?.ReqStatus === '4') {
        form.setFieldValue('ReqStatus', 4);
      }
      form.setFieldValue('DestinationLocationId', stockReceivedById?.data?.Data?.Result?.DestinationLocationId);
      form.setFieldValue('SourceLocationId', stockReceivedById?.data?.Data?.Result?.SourceLocationId);
      form.setFieldValue('RemarksHeader', stockReceivedById?.data?.Data?.Result?.RemarksHeader);
      setExpenseTableData(stockReceivedById?.data?.Data?.Result?.WsRmStockReceivedNotesExpensesList);
      if (weightSuccess && !isLoadingWeight) {
        const ListwithStockandWeight = stockReceivedById?.data?.Data?.Result?.WsRmStockReceivedNotesDetailList?.map(
          (item: any) => ({
            ...item,
            AvailableStock: stockBillWeight?.data?.Data?.Result?.[0]?.BalQty,
            AvailableWeight: stockBillWeight?.data?.Data?.Result?.[0]?.BalWeight,
          })
        );
        setTableData(ListwithStockandWeight);
      }
    }
  }, [isDataSuccess, !isDataLoading, weightSuccess]);
  useEffect(() => {
    if (isSuccess && !isLoading) form.setFieldValue('DocNo', data?.data?.Data?.Result);
  }, [data, isSuccess, !isLoading]);
  console.log(tableData);
  const handleButtonClick = () => {
    setPrintPreview(!printPreview);
    console.log(printPreview);
  };
  const handleResetForm = () => {
    setSelectedRecordId(null);
    setTableData([]);
    refetch();
    setExpenseTableData([]);
    form.setFieldValue('DocNo', data?.data?.Data?.Result);
    form.setFieldValue('DocDate', dayjs(new Date()));
    form.setFieldValue('RemarksHeader', null);
  };
  return (
    <>
      <Card>
        <Form form={form} onFinish={onFinish} layout="horizontal" style={{ marginBottom: 20 }}>
          {/* <Card className="grn-card"> */}
          <Row justify="space-between" style={{ marginLeft: 10, marginRight: 10 }}>
            <Col xxl={8} xl={9} lg={12} style={{ marginTop: '0.5%' }}>
              <Row gutter={10} align="middle" style={{ border: '' }} justify={'space-between'}>
                <Col>
                  <b style={{ fontSize: 18 }}> {t('document_no')}</b> &nbsp;
                  <DocNumber
                    isError={isError}
                    refetch={refetch}
                    isLoading={isLoading}
                    data={isDataSuccess ? stockReceivedById?.data?.Data?.Result?.DocNo : data?.data?.Data?.Result}
                  />
                  <Form.Item name="DocNo" style={{ display: 'none' }}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col xl={15} xxl={15} sm={18} lg={15} xs={23} md={15} className="formfield">
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
                    <Badge count={'1'}>
                      <AntButton
                        style={{ backgroundColor: '#FFAF0C' }}
                        title="Attachment"
                        icon={<PaperClipOutlined />}
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
                      ghost
                      label={selectedRecordId ? t('update') : t('save')}
                      htmlType="submit"
                      icon={<SaveOutlined />}
                    />
                  </Col>
                  <Col>
                    <AntButton
                      title={t('load_stock_transfer_notes')}
                      ghost
                      label={t('load_stn')}
                      icon={<ExportOutlined />}
                      onClick={handleOpen}
                    />
                  </Col>
                  {
                    <Modal open={open} onCancel={handleClose} footer={null} width={1600}>
                      <ROLoadOrder handleClose={handleClose} selectedRecordId={selectedRecordId} />
                    </Modal>
                  }
                </Row>
              </Form.Item>
            </Col>
          </Row>

          <MainEntry form={form} />
          <DetailGrids form={form} selectedRecordId={selectedRecordId} />
          {/* </Card> */}
        </Form>
      </Card>
    </>
  );
}
type TAddUpdateRecord = {
  selectedRecordId?: number | null;
  stockReceivedById?: any;
  refetchStock?: any;
  isDataSuccess?: any;
  isDataLoading?: any;
  setSelectedRecordId?: any;
};
export default StockTransferNoteForm;
