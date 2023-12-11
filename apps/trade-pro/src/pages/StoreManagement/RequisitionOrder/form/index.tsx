import { useEffect, useState } from 'react';
import DocNumber from './DocNumber';
import MainEntry from './MainEntry';
import { AntButton } from '@tradePro/components';
import { Card, Col, Form, Input, Row, notification } from 'antd';
import { SaveOutlined, SyncOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { isNumber, merge } from 'lodash';
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

  const { data, isError, refetch, isLoading, isSuccess } = useGetDocumentNumber(DocumentTypeId);

  const [delettableData, setDeleteTableData] = useAtom(deleteData);
  const [newtableData, setNewTableData] = useAtom(newTableData);

  const { t } = useTranslation();
  const [tableData, setTableData] = useAtom(addtableData);
  const { mutate: addRequisitionOrder } = useAddRequisitionOrder(DocumentTypeId);
  const { mutate: updateRequisitionOrder } = useUpdateRequisitionOrder(selectedRecordId, DocumentTypeId);
  const onFinish = (values: TRequisitionOrder) => {
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
    setTableData([]);
    setSelectedRecordId(null);
    setDeleteTableData([]);
    setNewTableData([]);
  };

  useEffect(() => {
    // if (isNumber(selectedRecordId)) {
    //   refetchReqesition();
    // }
    if (selectedRecordId) {
      // refetchReqesition();
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
      form.setFieldValue('IsApproved', requisitionById?.data?.Data?.Result?.IsApproved);
      form.setFieldValue('RemarksHeader', requisitionById?.data?.Data?.Result?.RemarksHeader);
      setTableData(requisitionById?.data?.Data?.Result?.WsRmRequisitionPoDetailsList);
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
                      data={isDataSuccess ? requisitionById?.data?.Data?.Result?.DocNo : data?.data?.Data?.Result}
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
                      <AntButton
                        danger
                        ghost
                        // htmlType="reset"
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
          </Card>
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
