import { AntButton, AntTable } from '@tradePro/components';
import { Card, Col, Form, Input, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { SaveOutlined, SyncOutlined, ExportOutlined } from '@ant-design/icons';
import MainForm from './MainForm';
import { useEffect, useState } from 'react';
import { useGetDocumentNumber } from '../queryOptions';
import DocNumber from './DocNumber';
import GRNDetailTable from './table';
import { useAddGoodsRecievedNotes } from './query';
import { TGRNDetailTableAdd } from './types';

const { useForm } = Form;
interface Props {
  handleLoadOrderButtonClick: (selectedRows: any) => void;
  showGRNDetailTable: any;
  selectedRows: any;
  isError: any;
  isLoading: any;
  isFetching: any;
  refetch: any;
}
function GRNDetailForm({
  showGRNDetailTable,
  selectedRows,
  refetch,
  isError,
  isLoading,
  isFetching,
  handleLoadOrderButtonClick,
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
  useEffect(() => {
    if (isSuccess) form.setFieldValue('DocNo', data?.data?.Data?.Result);
  }, [data, isSuccess]);

  const [selectFieldValues, setSelectFieldValues] = useState({
    WarehouseId: '',
    JobLotId: '',
    AreaCity: '',
  });

  const [tableData, setTableData] = useState([]);

  const handleSelectFieldChange = (fieldName: string, value: string) => {
    setSelectFieldValues({
      ...selectFieldValues,
      [fieldName]: value,
    });
  };

  const handleTableDataChange = (newData: any) => {
    setTableData(newData);
  };

  const onFinish = (values: TGRNDetailTableAdd) => {
    // console.log(values);
    // mutate(values);
    const updatedInvGrnDetail = tableData.map((rowData: any) => ({
      ...rowData,
      WarehouseId: selectFieldValues.WarehouseId,
      JobLotId: selectFieldValues.JobLotId,
      AreaCity: selectFieldValues.AreaCity,
    }));

    const updatedValues = {
      ...values,
      invGrnDetail: updatedInvGrnDetail,
    };

    console.log(updatedValues);
    // mutate(updatedValues);
  };

  const handleLoadButtonClick3 = () => {
    handleLoadOrderButtonClick(selectedRows);
  };
  return (
    <>
      <Card>
        <Form form={form} onFinish={onFinish} layout="horizontal" style={{ marginBottom: 25 }}>
          <Card className="grn-card">
            <Row align="middle" justify="space-between" style={{ marginLeft: 10, marginRight: 60 }}>
              <Col>
                <Row gutter={10} align="middle">
                  <Col style={{ fontSize: 18 }}> {t('document_no')}</Col>
                  <Col>
                    <DocNumber
                      isError={isErrorDoc}
                      refetch={refetchDocNo}
                      isLoading={isLoadingDoc}
                      data={data?.data?.Data?.Result}
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
                      <AntButton label={t('save_and_more')} htmlType="submit" />
                    </Col>
                    <Col>
                      <AntButton ghost label={t('save')} htmlType="submit" icon={<SaveOutlined />} />
                    </Col>
                    <Col>
                      <AntButton
                        ghost
                        label={t('load_order')}
                        icon={<ExportOutlined />}
                        style={{ width: '150px' }}
                        onClick={handleLoadButtonClick3}
                      />
                    </Col>
                  </Row>
                </Form.Item>
              </Col>
            </Row>

            <MainForm form={form} />
          </Card>
          {showGRNDetailTable && (
            // <GRNDetailTable
            //   selectedRows={selectedRows}
            //   refetch={refetch}
            //   isError={isError}
            //   isFetching={isFetching}
            //   isLoading={isLoading}
            // />
            <GRNDetailTable
              selectedRows={selectedRows}
              refetch={refetch}
              isError={isError}
              isFetching={isFetching}
              isLoading={isLoading}
              onTableDataChange={handleTableDataChange}
              selectFieldValues={selectFieldValues}
              onSelectFieldChange={handleSelectFieldChange}
            />
          )}
        </Form>
      </Card>
    </>
  );
}

export default GRNDetailForm;
