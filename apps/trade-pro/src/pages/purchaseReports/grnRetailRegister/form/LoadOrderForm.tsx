import { Card, Checkbox, Col, Form, Row } from 'antd';
import { useState } from 'react';
import { AntButton, AntDatePicker } from '@tradePro/components';
import { useTranslation } from 'react-i18next';
import { TGRNSearchCriteria } from '../types';
import { SaveOutlined, SyncOutlined, ExportOutlined } from '@ant-design/icons';
import GRNLoadOrderTable from './loadOrderTable';
import { useGRNDetailTableHistory } from '../query';

const { useForm, useWatch } = Form;

interface Props {
  setActiveTab: (tab: string) => void;
}

function LoadOrderDetailForm({ setActiveTab }: Props) {
  const { t } = useTranslation();
  const [form] = useForm<TGRNSearchCriteria>();
  const formValues = useWatch<TGRNSearchCriteria>([], form);

  // const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);

  const { data, refetch, isError, isLoading, isFetching } = useGRNDetailTableHistory(false, form.getFieldsValue());

  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const handleRowSelection = (selectedRowKeys: string[], selectedRows: any[]) => {
    setSelectedRows(selectedRows); // Update selected rows in state
  };
  const onFinish = (_: TGRNSearchCriteria) => {
    refetch();
  };

  return (
    <Card>
      <Form form={form} onFinish={onFinish} layout="inline" style={{ marginBottom: 30 }} initialValues={formValues}>
        <Row gutter={[10, 20]} style={{ width: '100%' }}>
          <Col xs={24} sm={24} md={6} className="formfield">
            <AntDatePicker name="FromDate" bordered={false} label="From Date" />
          </Col>

          <Col xs={24} sm={24} md={6} offset={1} className="formfield">
            <AntDatePicker name="ToDate" label="To Date" bordered={false} />
          </Col>

          <Col md={3} lg={2}>
            <AntButton
              label="Show"
              htmlType="submit"
              style={{ marginTop: 2 }}
              isError={isError}
              isLoading={isLoading || isFetching}
            />
          </Col>

          <Col md={4} lg={4} xl={2}>
            <AntButton ghost label={t('load')} onClick={() => setActiveTab('1')} />
          </Col>
          <Col md={4} lg={4} xl={2}>
            <AntButton danger ghost htmlType="reset" label={t('reset')} icon={<SyncOutlined />} />
          </Col>
        </Row>
      </Form>
      <GRNLoadOrderTable onSelectChange={handleRowSelection} selectedRowKeys={selectedRows.map((row) => row.Id)} />
      {/* <GRNLoadOrderTable onSelectChange={handleRowSelection} /> */}
    </Card>
  );
}

export default LoadOrderDetailForm;
