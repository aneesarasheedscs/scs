import { AntButton } from '@tradePro/components';
import { Card, Col, Form, Input, Row } from 'antd';
import { SaveOutlined, SyncOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import DynamicForm from './DetailEntry';
import MainEntryForm from './MainEntry';
import FormTable from '../Table/JournalVoucherDetail';
const { useForm } = Form;
function JournalVoucherForm() {
  const [form] = useForm<any>();
  const { t } = useTranslation();
  const onFinish = (values: any) => {
    console.log(values);
  };
  return (
    <Card>
      <Form
        labelCol={{ span: 0 }}
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        form={form}
        layout="horizontal"
        onFinish={onFinish}
      >
        <Row align="middle" justify="space-between">
          <Col
            xs={{ span: 24, offset: 1 }}
            sm={{ span: 15, offset: 11 }}
            md={{ span: 15, offset: 14 }}
            lg={{ span: 15, offset: 14 }}
            xl={{ span: 10, offset: 17 }}
          >
            <Form.Item>
              <Row align="middle" style={{ marginLeft: '-2.5%' }} gutter={10}>
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
        <Row gutter={[32, 32]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={{ span: 10, offset: 1 }}>
            <MainEntryForm />
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={{ span: 10, offset: 1 }}>
            <DynamicForm form={form} />
          </Col>
        </Row>
        <FormTable />
      </Form>
    </Card>
  );
}
export default JournalVoucherForm;
