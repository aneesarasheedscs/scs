import { useEffect, useState } from 'react';
// import { TPurchaseOrderEntry } from '../type';
import { AntButton } from '@tradePro/components';
import { Card, Col, Form, Input, Row } from 'antd';
// import { useGetDocumentNumber } from '../queryOptions';
import { SaveOutlined, SyncOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import ChequeBookStatusForm from './checkBookStatusForm';
import ChequeBookStatusTable from '../table/chequeBookStatusTable';
import { TSaveChequeStatus } from './types';
import { useAddChequeBookStatus } from '../queries/querySave';

const { useForm } = Form;

function ChequeStatusForm() {
  const [form] = useForm<TSaveChequeStatus>();
  const { t } = useTranslation();
  const { mutate, isError, isLoading, isSuccess } = useAddChequeBookStatus();
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>();

  const onFinish = (values: TSaveChequeStatus) => {
    console.log(values);
    mutate(values);
  };

  return (
    <Card className="main_card">
      <Form
        labelCol={{ span: 0 }}
        wrapperCol={{ span: 24 }} // Full width on small screens
        initialValues={{ remember: true }}
        autoComplete="off"
        form={form}
        layout="horizontal"
        onFinish={onFinish}
      >
        <Row align="top" justify="space-between" style={{ border: ' ' }}>
          <Col span={24}>
            <Form.Item className="buttons">
              <Row align="top" justify={'end'} style={{ marginRight: '0%', border: ' ' }} gutter={10}>
                <Col>
                  <AntButton danger ghost htmlType="reset" label={t('reset')} icon={<SyncOutlined />} />
                </Col>

                <Col>
                  <AntButton ghost label={t('save')} htmlType="submit" icon={<SaveOutlined />} />
                </Col>
              </Row>
            </Form.Item>
          </Col>
        </Row>

        <ChequeBookStatusForm form={form} />

        <ChequeBookStatusTable setSelectedRecordId={setSelectedRecordId} />
      </Form>
    </Card>
  );
}

export default ChequeStatusForm;
