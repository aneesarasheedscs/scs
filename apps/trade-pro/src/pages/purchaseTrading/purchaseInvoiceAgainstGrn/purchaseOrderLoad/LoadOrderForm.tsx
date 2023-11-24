import { Card, Checkbox, Col, Form, Row } from 'antd';
import { useEffect, useState } from 'react';
import { AntButton, AntDatePicker } from '@tradePro/components';
import { useTranslation } from 'react-i18next';
import { TGRNLoadOrderSearchCriteria } from '../types';
import { SaveOutlined, SyncOutlined } from '@ant-design/icons';
import { useGRNPurchaseOrderLoadTable } from '../query';
import GRNLoadOrderTable from './loadOrderTable';
import dayjs from 'dayjs';

const { useForm, useWatch } = Form;

interface Props {
  handleLoadButtonClick: () => void;
}

function LoadOrderDetailForm({ handleLoadButtonClick }: Props) {
  const { t } = useTranslation();
  const [form] = useForm<TGRNLoadOrderSearchCriteria>();
  const formValues = useWatch<TGRNLoadOrderSearchCriteria>([], form);

  const { data, refetch, isError, isSuccess, isLoading, isFetching } = useGRNPurchaseOrderLoadTable(
    false,
    form.getFieldsValue()
  );
  useEffect(() => {
    form.setFields([{ name: 'FromDate', value: dayjs(new Date()) }]);
    form.setFields([{ name: 'ToDate', value: dayjs(new Date()) }]);
  }, []);

  const onFinish = (_: TGRNLoadOrderSearchCriteria) => {
    refetch();
  };

  return (
    <Card>
      <h2 className="form-heading">Purchase Order Load</h2>
      <Form
        form={form}
        onFinish={onFinish}
        layout="inline"
        style={{ marginBottom: 30, marginTop: 20 }}
        initialValues={formValues}
      >
        <Row gutter={[10, 20]} style={{ width: '100%', marginLeft: 15 }}>
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
            <AntButton ghost label={t('load')} onClick={handleLoadButtonClick} />
          </Col>
          <Col md={4} lg={4} xl={2}>
            <AntButton danger ghost htmlType="reset" label={t('reset')} icon={<SyncOutlined />} />
          </Col>
        </Row>
      </Form>
      <GRNLoadOrderTable />
      {/* {showGRNDetailTable && <GRNDetailTable selectedRows={selectedRows} />} */}
    </Card>
  );
}

export default LoadOrderDetailForm;
