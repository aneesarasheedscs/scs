import { useEffect } from 'react';
import DocNumber from './DocNumber';
import MainEntry from './MainEntry';
import DynamicForm from './DetailEntry';
import { TPurchaseOrderEntry } from '../type';
import { AntButton } from '@tradePro/components';
import { useAddPurchaseOrder } from '../queries';
import { Card, Col, Form, Input, Row } from 'antd';
import { useGetDocumentNumber } from '../queryOptions';
import { SaveOutlined, SyncOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { useForm } = Form;

function PurchaseOrderForm() {
  const [form] = useForm<TPurchaseOrderEntry>();
  const { data, isError, refetch, isLoading, isSuccess } = useGetDocumentNumber();

  useEffect(() => {
    if (isSuccess) form.setFieldValue('DocNo', data?.data?.Data?.Result);
  }, [data, isSuccess]);

  const onFinish = (values: TPurchaseOrderEntry) => {
    console.log(values);
  };
  const { t } = useTranslation();
  return (
    <Card>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row align="middle" justify="space-between">
          <Col>
            <Row gutter={10} align="middle">
              <Col style={{ fontSize: 18 }}> {t('document_no')}</Col>
              <Col>
                <DocNumber isError={isError} refetch={refetch} isLoading={isLoading} data={data?.data?.Data?.Result} />
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
        <DynamicForm form={form} />
      </Form>
    </Card>
  );
}

export default PurchaseOrderForm;
