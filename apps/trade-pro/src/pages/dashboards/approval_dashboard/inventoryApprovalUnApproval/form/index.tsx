import { useEffect, useState } from 'react';
import DocNumber from './DocNumber';
import MainEntry from './MainEntry';
import { AntButton, AntDatePicker } from '@tradePro/components';
import { Card, Col, Form, Input, Row, notification } from 'antd';
import { SaveOutlined, SyncOutlined, RedoOutlined, PaperClipOutlined, PrinterFilled } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import DynamicForm from './DetailEntry';
import dayjs from 'dayjs';
import { TRequisitionOrder } from '../types';
import { useAtom } from 'jotai';
import { deleteData, addtableData, newTableData, editMode } from '../form/Atom';
import { useApproveRequisitionOrder } from '../query';

const { useForm } = Form;

function RequisitionOrderForm({
  selectedRecordId,
  requisitionById,
  refetch,
  isSuccess,
  isLoading,
  isError,
  setSelectedRecordId,
}: TAddUpdateRecord) {
  const [form] = useForm<TRequisitionOrder>();
  const DocumentTypeId = 105;
  const [printPreview, setPrintPreview] = useState(true);

  const [delettableData, setDeleteTableData] = useAtom(deleteData);
  const [newtableData, setNewTableData] = useAtom(newTableData);
  const [isEditMode, setIsEditMode] = useAtom(editMode);

  const { t } = useTranslation();
  const [tableData, setTableData] = useAtom(addtableData);
  const {
    mutate: approveRequisitionOrder,
    isSuccess: successApproval,
    data,
  } = useApproveRequisitionOrder(selectedRecordId, DocumentTypeId);
  const onFinish = (values: TRequisitionOrder) => {
    values.PrintPreview === printPreview;
    if (selectedRecordId) {
      const Ids = tableData?.map((item: any) => item.Id);
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
        values.WsRmRequisitionPoDetailsList = values.WsRmRequisitionPoDetailsList?.map((item: any) => {
          if (item.ApprovedQty === 0) {
            return { ...item, ApprovedQty: item.ReqQty };
          } else {
            return item;
          }
        });
        if (values.WsRmRequisitionPoDetailsList?.[0] === null || values.WsRmRequisitionPoDetailsList.length === 0) {
          const message = 'Please fill Detail!';
          notification.error({ message: message });
          return;
        } else if (isEditMode === true) {
          const message = "Can't Approve when Updating!";
          notification.error({ message: message });
          return;
        }
        approveRequisitionOrder(values);
        console.log(values);
      } else if (Ids?.[0] === 0) {
        values.WsRmRequisitionPoDetailsList = [...tableData];
        if (values.WsRmRequisitionPoDetailsList?.[0] === null || values.WsRmRequisitionPoDetailsList.length === 0) {
          const message = 'Please fill Detail!';
          notification.error({ message: message });
          return;
        }
        approveRequisitionOrder(values);
        console.log(values);
      }
    } else {
      values.WsRmRequisitionPoDetailsList = tableData;
      if (values.WsRmRequisitionPoDetailsList?.[0] === null || values.WsRmRequisitionPoDetailsList.length === 0) {
        const message = 'Please fill Detail!';
        notification.error({ message: message });
        return;
      }
      console.log(values);
    }
    if (successApproval && data?.data?.Status === true) {
      setTableData([]);
      setDeleteTableData([]);
      setNewTableData([]);
      form.setFieldValue('DocDate', dayjs(new Date()));
      form.setFieldValue('RemarksHeader', null);
    }
    // setSelectedRecordId(null);
  };

  useEffect(() => {
    if (selectedRecordId) {
      refetch();
      setDeleteTableData([]);
    } else {
      form.setFieldValue('DocDate', dayjs(new Date()));
      form.setFieldValue('RemarksHeader', null);
      setTableData([]);
    }
  }, [selectedRecordId]);
  console.log(delettableData);

  useEffect(() => {
    if (isSuccess && !isLoading) {
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
      form.setFieldValue('SourceLocationId', requisitionById?.data?.Data?.Result?.SourceLocationId);
      form.setFieldValue('DestinationLocationId', requisitionById?.data?.Data?.Result?.DestinationLocationId);
      form.setFieldValue('RemarksHeader', requisitionById?.data?.Data?.Result?.RemarksHeader);
      const DetailforTable = (requisitionById.data.Data.Result.WsRmRequisitionPoDetailsList =
        requisitionById?.data?.Data?.Result?.WsRmRequisitionPoDetailsList?.map((item: any) => ({
          ...item,
          DestinationLocationId: 2,
        })));
      setTableData(DetailforTable);
    }
  }, [isSuccess, !isLoading, selectedRecordId]);
  console.log(tableData);
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
            <Col xxl={8} xl={9} lg={12} style={{ marginTop: '0.5%' }}>
              <Row gutter={10} align="middle" style={{ border: '' }} justify={'space-between'}>
                <Col>
                  <b style={{ fontSize: 18 }}> {t('document_no')}</b> &nbsp;
                  <DocNumber
                    isError={isError}
                    refetch={refetch}
                    isLoading={isLoading}
                    data={isSuccess ? requisitionById?.data?.Data?.Result?.DocNo : null}
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
                <Row align="middle" gutter={10} style={{ marginTop: '1%' }}>
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
                      label={selectedRecordId ? t('approve') : t('save')}
                      htmlType="submit"
                      icon={<SaveOutlined />}
                    />
                  </Col>
                </Row>
              </Form.Item>
            </Col>
          </Row>

          <MainEntry form={form} />
          <DynamicForm form={form} selectedRecordId={selectedRecordId} />
        </Form>
      </Card>
    </>
  );
}
type TAddUpdateRecord = {
  selectedRecordId?: number | null;
  requisitionById?: any;
  refetch?: any;
  isSuccess?: any;
  isLoading?: any;
  isError?: any;
  setSelectedRecordId?: any;
};
export default RequisitionOrderForm;
