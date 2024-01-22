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
  useAddStockTransferNotes,
  useGetAvailableStock,
  useGetDocumentNumber,
  useUpdateStockTransferNotes,
} from '../quries';
import { TStockTransferNotes } from '../types';
import { useAtom } from 'jotai';
import { deleteData, addtableData, newTableData, expenseList } from '../form/Atom';
import ROLoadOrder from '../loadOrder';
import DetailGrids from './DetailGrids';

const { useForm } = Form;

function StockTransferNoteForm({
  selectedRecordId,
  stockTransferById,
  refetchStock,
  isDataSuccess,
  isDataLoading,
  setSelectedRecordId,
}: TAddUpdateRecord) {
  const [form] = useForm<TStockTransferNotes>();
  const DocumentTypeId = 107;
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
  const { mutate: addStockTransferNotes } = useAddStockTransferNotes(DocumentTypeId);
  const {
    mutate: updateStockTransferNotes,
    isSuccess: successStock,
    data: stockData,
  } = useUpdateStockTransferNotes(selectedRecordId, DocumentTypeId);
  const warehouseId = stockTransferById?.data?.Data?.Result?.WsRmStockTransferNotesDetailsList?.[0]?.WarehouseId;
  const {
    data: stockBillWeight,
    isSuccess: weightSuccess,
    isLoading: isLoadingWeight,
  } = useGetAvailableStock(true, itemId, warehouseId);
  useEffect(() => {
    if (stockTransferById) {
      setItemId(stockTransferById?.data?.Data?.Result?.WsRmStockTransferNotesDetailsList?.[0]?.ItemId);
      console.log(stockTransferById?.data?.Data?.Result?.WsRmStockTransferNotesDetailsList?.[0]?.ItemId);
    }
  }, [stockTransferById]);
  console.log(itemId);
  const onFinish = (values: TStockTransferNotes) => {
    values.PrintPreview = printPreview;
    values.WsRmStockTransferNotesExpensesList = expenseTableData;
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
        values.WsRmStockTransferNotesDetailsList = [...newRecord, ...updatedRecord, ...deletedRecord];
        if (
          values.WsRmStockTransferNotesDetailsList?.[0] === null ||
          values.WsRmStockTransferNotesDetailsList.length === 0
        ) {
          const message = 'Please fill Detail!';
          notification.error({ message: message });
          return;
        }
        updateStockTransferNotes(values);
        console.log(values);
      } else if (Ids?.[0] === 0) {
        values.WsRmStockTransferNotesDetailsList = [...tableData];
        if (
          values.WsRmStockTransferNotesDetailsList?.[0] === null ||
          values.WsRmStockTransferNotesDetailsList.length === 0
        ) {
          const message = 'Please fill Detail!';
          notification.error({ message: message });
          return;
        }
        updateStockTransferNotes(values);
        console.log(values);
      }
      setSelectedRecordId(null);
    } else {
      values.WsRmStockTransferNotesDetailsList = tableData;
      if (
        values.WsRmStockTransferNotesDetailsList?.[0] === null ||
        values.WsRmStockTransferNotesDetailsList.length === 0
      ) {
        const message = 'Please fill Detail!';
        notification.error({ message: message });
        return;
      }
      addStockTransferNotes(values);
      console.log(values);
    }
    if (successStock && stockData?.data?.Status === true) {
      setTableData(null);
      setSelectedRecordId(null);
      setDeleteTableData([]);
      setNewTableData([]);
      form.setFieldValue('DocDate', dayjs(new Date()));
      form.setFieldValue('RemarksHeader', null);
    }
  };

  useEffect(() => {
    if (selectedRecordId) {
      setDeleteTableData([]);
    }
  }, [selectedRecordId]);
  console.log(delettableData);

  useEffect(() => {
    if (isDataSuccess && !isDataLoading) {
      form.setFieldValue('DocNo', stockTransferById?.data?.Data?.Result?.DocNo);
      form.setFieldValue('DocDate', dayjs(stockTransferById?.data?.Data?.Result?.DocDate));
      if (stockTransferById?.data?.Data?.Result?.ReqStatus === '1') {
        form.setFieldValue('ReqStatus', 1);
      } else if (stockTransferById?.data?.Data?.Result?.ReqStatus === '2') {
        form.setFieldValue('ReqStatus', 2);
      } else if (stockTransferById?.data?.Data?.Result?.ReqStatus === '3') {
        form.setFieldValue('ReqStatus', 3);
      } else if (stockTransferById?.data?.Data?.Result?.ReqStatus === '4') {
        form.setFieldValue('ReqStatus', 4);
      }
      form.setFieldValue('DestinationLocationId', stockTransferById?.data?.Data?.Result?.DestinationLocationId);
      form.setFieldValue('SourceLocationId', stockTransferById?.data?.Data?.Result?.SourceLocationId);
      form.setFieldValue('RemarksHeader', stockTransferById?.data?.Data?.Result?.RemarksHeader);
      if (weightSuccess && !isLoadingWeight) {
        const ListwithStockandWeight = stockTransferById?.data?.Data?.Result?.WsRmStockTransferNotesDetailsList?.map(
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
  // useEffect(() => {
  //   if (isSuccess) form.setFieldValue('DocNo', data?.data?.Data?.Result);
  // }, [data, isSuccess]);
  console.log(tableData);
  const handleButtonClick = () => {
    setPrintPreview(!printPreview);
    console.log(printPreview);
  };
  const handleResetForm = () => {
    setSelectedRecordId(null);
    setTableData(null);
    refetch();
    setExpenseTableData([]);
    form.setFieldValue('DocDate', dayjs(new Date()));
    form.setFieldValue('RemarksHeader', null);
  };
  return (
    <>
      <Card>
        <Form form={form} onFinish={onFinish} layout="horizontal" style={{ marginBottom: 20 }}>
          <Row justify="space-between" style={{ marginLeft: 10, marginRight: 10 }}>
            <Col xxl={8} xl={9} lg={12} style={{ marginTop: '0.5%' }}>
              <Row gutter={10} align="middle" style={{ border: '' }} justify={'space-between'}>
                <Col>
                  <b style={{ fontSize: 18 }}> {t('document_no')}</b> &nbsp;
                  <DocNumber
                    isError={isError}
                    refetch={refetch}
                    isLoading={isLoading}
                    data={isDataSuccess ? stockTransferById?.data?.Data?.Result?.DocNo : data?.data?.Data?.Result}
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
                    </Badge>{' '}
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
                      title={t('load_requisition_order')}
                      ghost
                      label={t('load_ro')}
                      icon={<ExportOutlined />}
                      onClick={handleOpen}
                    />
                  </Col>
                  {
                    <Modal open={open} onCancel={handleClose} footer={null} width={1600}>
                      <ROLoadOrder handleClose={handleClose} />
                    </Modal>
                  }
                </Row>
              </Form.Item>
            </Col>
          </Row>

          <MainEntry form={form} />
          <DetailGrids form={form} selectedRecordId={selectedRecordId} />
        </Form>
      </Card>
    </>
  );
}
type TAddUpdateRecord = {
  selectedRecordId?: number | null;
  stockTransferById?: any;
  refetchStock?: any;
  isDataSuccess?: any;
  isDataLoading?: any;
  setSelectedRecordId?: any;
};
export default StockTransferNoteForm;
