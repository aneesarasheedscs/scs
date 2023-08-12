import DynamicForm from './DetailEntry';
// import { useGetSuppliers } from '../queries';
import { Card, Col, Form, Row, Switch, theme } from 'antd';
import { AntDatePicker, AntInput, AntInputNumber, AntSelectDynamic } from '@tradePro/components';
import MainEntry from './MainEntry';
// import { getSuppliers } from '../queries';

const { useToken } = theme;
const { useForm, useWatch } = Form;

function PurchaseOrderForm() {
  const { token } = useToken();

  const [form] = useForm();

  return (
    <Card>
      <Form form={form} layout="vertical">
        <Row align="middle" justify="space-between">
          <Col>
            <Row gutter={10} align="middle">
              <Col style={{ fontSize: 18 }}>Document No.</Col>
              <Col>
                <strong style={{ fontSize: 18, color: token.colorPrimary }}>12</strong>
              </Col>
            </Row>
          </Col>

          <Col>
            <Form.Item>
              <Row align="middle" gutter={10}>
                <Col>Preview:</Col>
                <Col>
                  <Switch />
                </Col>
              </Row>
            </Form.Item>
          </Col>
        </Row>

        <br />

        <MainEntry />
      </Form>
    </Card>
  );
}

export default PurchaseOrderForm;
