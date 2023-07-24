import './style.scss';
import { ReactNode } from 'react';
import { AntButton } from '@scs/ui';
import { Card, Col, Form, Input, Row } from 'antd';

export function LoginPage({ logo, isLoading, handleLogin }: TLoginPage) {
  return (
    <Row align="middle" justify="center" className="login-container">
      <Row justify="center" style={{ width: '100%', padding: '0px 15px 0px 15px' }}>
        <Col xs={24} sm={24} md={16} lg={21} xl={8} xxl={8}>
          <Card className="login-card">
            <div className="login-logo">{logo ? logo : <h1>Logo</h1>}</div>
            <Form onFinish={handleLogin} initialValues={{ remember: true }} className="login-form">
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your Username!' }]}
              >
                <Input size="large" placeholder="Username" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
              >
                <Input.Password size="large" placeholder="Password" />
              </Form.Item>

              <Form.Item>
                <AntButton
                  label="Log In"
                  htmlType="submit"
                  loading={isLoading}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </Row>
  );
}

type TLoginPage = {
  logo: ReactNode;
  isLoading?: boolean;
  handleLogin?: (values: any) => void;
};
