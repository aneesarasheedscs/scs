import { useEffect, useState } from 'react';
import DocNumber from './DocNumber';
import MainEntry from './MainEntry';
import { AntButton, AntDatePicker } from '@tradePro/components';
import { Badge, Card, Col, Form, Input, Row, notification, theme } from 'antd';
import { SaveOutlined, SyncOutlined, RedoOutlined, PrinterFilled, PaperClipOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import DynamicForm from './DetailEntry';
import dayjs from 'dayjs';
import { useAddRequisitionOrder, useGetDocumentNumber, useUpdateRequisitionOrder } from '../quries';
import { TRequisitionOrder } from '../types';
import { useAtom } from 'jotai';
import { deleteData, addtableData, newTableData } from '../form/Atom';

const { useForm } = Form;

function RequisitionOrderForm({
  selectedRecordId,
  requisitionById,
  refetchReqesition,
  isDataSuccess,
  isDataLoading,
  setSelectedRecordId,
}: TAddUpdateRecord) {
  const [form] = useForm<TRequisitionOrder>();
  const DocumentTypeId = 105;
  const [printPreview, setPrintPreview] = useState(true);

  const { data, isError, refetch, isLoading, isSuccess } = useGetDocumentNumber(DocumentTypeId);
  const [delettableData, setDeleteTableData] = useAtom(deleteData);
  const [newtableData, setNewTableData] = useAtom(newTableData);

  const { t } = useTranslation();
  const [tableData, setTableData] = useAtom(addtableData);
  const {
    mutate: addRequisitionOrder,
    isSuccess: successAdd,
    data: addRequisition,
  } = useAddRequisitionOrder(DocumentTypeId);
  const {
    mutate: updateRequisitionOrder,
    isSuccess: successUpdate,
    data: updateRequistion,
  } = useUpdateRequisitionOrder(selectedRecordId, DocumentTypeId);
  const onFinish = (values: TRequisitionOrder) => {
    values.PrintPreview = printPreview;

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
        values.WsRmRequisitionPoDetailsList = [...newRecord, ...updatedRecord, ...deletedRecord];
        if (values.WsRmRequisitionPoDetailsList?.[0] === null || values.WsRmRequisitionPoDetailsList.length === 0) {
          const message = 'Please fill Detail!';
          notification.error({ message: message });
          return;
        }
        updateRequisitionOrder(values);
        console.log(values);
      } else if (Ids?.[0] === 0) {
        values.WsRmRequisitionPoDetailsList = [...tableData];
        if (values.WsRmRequisitionPoDetailsList?.[0] === null || values.WsRmRequisitionPoDetailsList.length === 0) {
          const message = 'Please fill Detail!';
          notification.error({ message: message });
          return;
        }
        updateRequisitionOrder(values);
        console.log(values);
      }
      setSelectedRecordId(null);
    } else {
      values.WsRmRequisitionPoDetailsList = tableData;
      if (values.WsRmRequisitionPoDetailsList?.[0] === null || values.WsRmRequisitionPoDetailsList.length === 0) {
        const message = 'Please fill Detail!';
        notification.error({ message: message });
        return;
      }
      addRequisitionOrder(values);
      console.log(values);
    }
  };
  useEffect(() => {
    if (successAdd && addRequisition?.data?.Status === true) {
      setTableData([]);
      setSelectedRecordId(null);
      setDeleteTableData([]);
      setNewTableData([]);
      form.setFieldValue('DocDate', dayjs(new Date()));
      form.setFieldValue('RemarksHeader', null);
    }
    if (successUpdate && updateRequistion?.data?.Status === true) {
      setTableData([]);
      setSelectedRecordId(null);
      setDeleteTableData([]);
      setNewTableData([]);
      form.setFieldValue('DocDate', dayjs(new Date()));
      form.setFieldValue('RemarksHeader', null);
    }
  }, [successAdd, addRequisition, successUpdate, updateRequistion]);
  useEffect(() => {
    if (selectedRecordId) {
      setDeleteTableData([]);
    }
  }, [selectedRecordId]);
  console.log(delettableData);

  useEffect(() => {
    if (isDataSuccess && !isDataLoading) {
      form.setFieldValue('DocNo', requisitionById?.data?.Data?.Result?.DocNo);
      form.setFieldValue('DocDate', dayjs(requisitionById?.data?.Data?.Result?.DocDate));
      if (requisitionById?.data?.Data?.Result?.ReqStatus === '1') {
        form.setFieldValue('ReqStatus', 1);
      } else if (requisitionById?.data?.Data?.Result?.ReqStatus === '2') {
        form.setFieldValue('ReqStatus', 2);
      } else if (requisitionById?.data?.Data?.Result?.ReqStatus === '3') {
        form.setFieldValue('ReqStatus', 3);
      } else if (requisitionById?.data?.Data?.Result?.ReqStatus === '4') {
        form.setFieldValue('ReqStatus', 4);
      }
      form.setFieldValue('DestinationLocationId', requisitionById?.data?.Data?.Result?.DestinationLocationId);
      form.setFieldValue('SourceLocationId', requisitionById?.data?.Data?.Result?.SourceLocationId);
      form.setFieldValue('RemarksHeader', requisitionById?.data?.Data?.Result?.RemarksHeader);
      setTableData(requisitionById?.data?.Data?.Result?.WsRmRequisitionPoDetailsList);
    }
  }, [isDataSuccess, !isDataLoading, selectedRecordId]);
  useEffect(() => {
    if (isSuccess) form.setFieldValue('DocNo', data?.data?.Data?.Result);
  }, [data, isSuccess]);
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
  return (
    <>
      <Card>
        <Form form={form} onFinish={onFinish} layout="horizontal" style={{ marginBottom: 20 }}>
          <Row justify="space-between" style={{ marginLeft: 10, marginRight: 10 }}>
            <Col xxl={8} xl={11} lg={16} style={{ marginTop: '0.5%' }}>
              <Row gutter={10} align="middle" style={{ border: '' }} justify={'space-between'}>
                <Col xl={9} xxl={7} lg={9} md={9} sm={9} xs={18}>
                  <b style={{ fontSize: 18 }}> {t('document_no')}</b> &nbsp;
                  <DocNumber
                    isError={isError}
                    refetch={refetch}
                    isLoading={isLoading}
                    data={isDataSuccess ? requisitionById?.data?.Data?.Result?.DocNo : data?.data?.Data?.Result}
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

            <Col
              style={{
                marginTop: '0%',
              }}
            >
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
                </Row>
              </Form.Item>
            </Col>
          </Row>

          <MainEntry form={form} />
          <DynamicForm form={form} />
        </Form>
      </Card>
    </>
  );
}
type TAddUpdateRecord = {
  selectedRecordId?: number | null;
  requisitionById?: any;
  refetchReqesition?: any;
  isDataSuccess?: any;
  isDataLoading?: any;
  setSelectedRecordId?: any;
};
export default RequisitionOrderForm;
