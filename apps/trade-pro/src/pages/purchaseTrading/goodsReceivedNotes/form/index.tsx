import MainForm from './MainForm';
import DocNumber from './DocNumber';
import GRNDetailTable from './table';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { TGRNDetailTableAdd } from './types';
import { useTranslation } from 'react-i18next';
import { useAddGoodsRecievedNotes } from './query';
import { Card, Col, Form, Input, Modal, Row } from 'antd';
import { useGetDocumentNumber } from '../queryOptions';
import { AntButton, AntDatePicker, AntTable } from '@tradePro/components';

import {
  SaveOutlined,
  SyncOutlined,
  ExportOutlined,
  RedoOutlined,
  PaperClipOutlined,
  PrinterFilled,
} from '@ant-design/icons';
import LoadOrderDetailForm from '../purchaseOrderLoad/LoadOrderForm';
import { useGetGRNById } from '../query';
import { useAtom } from 'jotai';
import { addtableData } from '../purchaseOrderLoad/loadOrderTable/Atom';

const { useForm } = Form;
interface Props {
  selectedRecordId: any;
  setSelectedRecordId: (id: number | null) => void;
  // handleLoadOrderButtonClick: (selectedRows: any) => void;
  // handleLoadButtonClick: () => void;
  // showGRNDetailTable: any;
  // selectedRows: any;
  isError: any;
  isLoading: any;
  isFetching: any;
  refetch: any;
}
function GRNDetailForm({
  selectedRecordId,
  setSelectedRecordId,
  // selectedRows,
  refetch,
  isError,
  isLoading,
  isFetching,
}: Props) {
  const [form] = useForm<TGRNDetailTableAdd>();
  const { t } = useTranslation();
  const {
    data,
    isSuccess,
    isError: isErrorDoc,
    refetch: refetchDocNo,
    isLoading: isLoadingDoc,
  } = useGetDocumentNumber();
  const { mutate } = useAddGoodsRecievedNotes();
  const [printPreview, setPrintPreview] = useState(true);
  const { setFields, getFieldValue } = form;
  form.setFieldValue('DocDate', dayjs(new Date()));
  const [tableData, setTableData] = useAtom(addtableData);

  useEffect(() => {
    if (isSuccess) form.setFieldValue('DocNo', data?.data?.Data?.Result);
  }, [data, isSuccess]);

  const [open, setOpen] = useState(false);
  const [showGRNDetailTable, setShowGRNDetailTable] = useState(false);
  const {
    data: GRNById,
    refetch: refetchGRN,
    isSuccess: isDataSuccess,
    isLoading: isDataLoading,
  } = useGetGRNById(selectedRecordId);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectFieldValues, setSelectFieldValues] = useState({
    WarehouseId: '',
    JobLotId: '',
    AreaCity: '',
  });

  // const [tableData, setTableData] = useState([]);

  const handleSelectFieldChange = (fieldName: string, value: string) => {
    setSelectFieldValues({
      ...selectFieldValues,
      [fieldName]: value,
    });
  };

  const handleTableDataChange = (newData: any) => {
    // setTableData(newData);
  };

  useEffect(() => {
    if (selectedRecordId) {
      refetchGRN();
    }
  }, [selectedRecordId]);
  useEffect(() => {
    if (isDataSuccess) {
      form.setFieldsValue(GRNById?.data?.Data?.Result);
      form.setFieldValue('DocDate', dayjs(GRNById?.data?.Data?.Result?.DocDate));
    }
  }, [isDataSuccess, !isDataLoading, selectedRecordId]);
  const onFinish = (values: TGRNDetailTableAdd) => {
    values.PrintPreview = printPreview;

    // console.log(values);
    // mutate(values);
    // const updatedInvGrnDetail = tableData.map((rowData: any) => ({
    //   ...rowData,
    //   WarehouseId: selectFieldValues.WarehouseId,
    //   JobLotId: selectFieldValues.JobLotId,
    //   AreaCity: selectFieldValues.AreaCity,
    // }));

    const invGrnDetailData = {
      ...values,
      invGrnDetail: tableData,
    };

    console.log('invGrnDetailData', invGrnDetailData);
    // mutate(updatedValues);
  };

  const handleLoadButtonClick = () => {
    setShowGRNDetailTable(true);
    handleClose();
  };

  const handleButtonClick = () => {
    setPrintPreview(!printPreview);
    console.log(printPreview);
  };
  const handleResetForm = () => {
    setSelectedRecordId(null);
    refetch();
    form.setFieldValue('DocDate', dayjs(new Date()));
  };
  return (
    <>
      <Card>
        <Form form={form} onFinish={onFinish} layout="horizontal" style={{ marginBottom: 25 }}>
          <Row justify="space-between" style={{ marginLeft: 10, marginRight: 10 }}>
            <Col xxl={8} xl={10} lg={17} sm={20} xs={24} style={{ marginTop: '0.5%' }}>
              <Row gutter={10} align="middle" style={{ border: '' }} justify={'space-between'}>
                <Col>
                  <b style={{ fontSize: 18 }}> {t('document_no')}</b> &nbsp;
                  <DocNumber
                    isError={isError}
                    refetch={refetch}
                    isLoading={isLoading}
                    data={isDataSuccess ? GRNById?.data?.Data?.Result?.DocNo : data?.data?.Data?.Result}
                  />
                  <Form.Item name="DocNo" style={{ display: 'none' }}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col xl={15} xxl={15} sm={15} lg={15} xs={20} md={15} className="formfield">
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
                    <AntButton
                      danger
                      ghost
                      htmlType="reset"
                      label={t('reset')}
                      onClick={handleResetForm}
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
                  <Col>
                    <AntButton
                      title={t('load_order')}
                      ghost
                      label={t('load_order')}
                      icon={<ExportOutlined />}
                      onClick={handleOpen}
                    />
                  </Col>
                  {
                    <Modal open={open} onCancel={handleClose} footer={null} width={1600}>
                      <LoadOrderDetailForm handleLoadButtonClick={handleLoadButtonClick} handleClose={handleClose} />
                    </Modal>
                  }
                </Row>
              </Form.Item>
            </Col>
          </Row>
          <MainForm form={form} />
        </Form>
        {showGRNDetailTable && (
          <GRNDetailTable
            // selectedRows={selectedRows}
            // refetch={refetch}
            isError={isError}
            isFetching={isFetching}
            isLoading={isLoading}
            onTableDataChange={handleTableDataChange}
            selectFieldValues={selectFieldValues}
            onSelectFieldChange={handleSelectFieldChange}
          />
        )}
      </Card>
    </>
  );
}

export default GRNDetailForm;
