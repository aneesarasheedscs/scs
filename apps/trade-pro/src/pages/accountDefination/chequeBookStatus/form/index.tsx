import { useEffect } from 'react';
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

  const onFinish = (values: TSaveChequeStatus) => {
    console.log(values);
    // mutate(values);
  };

  return (
    <Form
      labelCol={{ span: 0 }}
      wrapperCol={{ span: 24 }} // Full width on small screens
      initialValues={{ remember: true }}
      autoComplete="off"
      form={form}
      layout="horizontal"
      onFinish={onFinish}
    >
      <Row align="middle" justify="space-between">
        <Col
          xs={{ span: 24, offset: 6 }}
          sm={{ span: 17, offset: 10 }}
          md={{ span: 15, offset: 15 }}
          lg={{ span: 15, offset: 14 }}
          xl={{ span: 10, offset: 18 }}
        >
          <Form.Item className="buttons">
            <Row align="middle" gutter={10}>
              <Col>
                <AntButton danger ghost htmlType="reset" label={t('reset')} icon={<SyncOutlined />} />
              </Col>
              <Col>
                <AntButton label={t('save_and_add_more')} htmlType="submit" />
              </Col>
              <Col>
                <AntButton ghost label={t('save')} htmlType="submit" icon={<SaveOutlined />} />
              </Col>
            </Row>
          </Form.Item>
        </Col>
      </Row>

      <ChequeBookStatusForm />
      <br />
      <ChequeBookStatusTable />
    </Form>
  );
}

export default ChequeStatusForm;
