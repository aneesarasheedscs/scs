import { useEffect } from 'react';
import MainEntry from './MainEntry';
import DynamicForm from './DetailEntry';
import { TPurchaseOrderEntry } from '../type';
import { AntButton } from '@tradePro/components';
import { useGetDocumentNumber } from '../queryOptions';
import { Card, Col, Form, Input, Row, theme } from 'antd';
import { SaveOutlined, SyncOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { useToken } = theme;
const { useForm, useWatch } = Form;

function PurchaseOrderForm() {
  const { token } = useToken();
  const [form] = useForm<TPurchaseOrderEntry>();
  const formValues = useWatch<TPurchaseOrderEntry>([], form);
  const { data, isError, isLoading, isSuccess } = useGetDocumentNumber();

  const { t } = useTranslation();
  useEffect(() => {
    if (isSuccess) form.setFieldValue('DocNo', data?.data?.Data?.Result);
  }, [data, isSuccess]);

  const onFinish = (values: TPurchaseOrderEntry) => {
    console.log(values);
  };

  return (
    <Card>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row align="middle" justify="space-between">
          <Col>
            <Row gutter={10} align="middle">
              <Col style={{ fontSize: 18 }}> {t('document_no')}</Col>
              <Col>
                <strong style={{ fontSize: 18, color: token.colorPrimary }}>
                  {data?.data?.Data?.Result}
                </strong>
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
                  <AntButton label={t('save_and_add_more')} htmlType="submit" />
                </Col>
                <Col>
                  <AntButton ghost label={t('save')} htmlType="submit" icon={<SaveOutlined />} />
                </Col>
              </Row>
            </Form.Item>
          </Col>
        </Row>

        <MainEntry />
        <DynamicForm />
      </Form>
    </Card>
  );
}

export default PurchaseOrderForm;
