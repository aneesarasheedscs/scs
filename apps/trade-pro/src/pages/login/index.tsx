import './style.scss';
import { TUser } from './types';
import useLogin from './queries';
import { useEffect } from 'react';
import { Card, Col, Form, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import { route } from '@tradePro/routes/constant';
import { AntButton, AntInput } from '@tradePro/components';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { isTokenExpired } from '@tradePro/utils/isTokenExpired';

function LoginPage() {
  const navigate = useNavigate();
  const { mutate } = useLogin();

  const onFinish = (values: TUser) => mutate(values);

  useEffect(() => {
    const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');

    if (userDetail?.access_token && !isTokenExpired()) {
      navigate(route.PURCHASE_ORDER);
    }
  }, []);

  return (
    <Row justify="center" align="middle" className="login-container">
      <Row justify="center" style={{ width: '100%', padding: '0px 15px 0px 15px' }}>
        <Col xs={24} sm={24} md={16} lg={12} xl={8} xxl={8}>
          <Card className="login-card">
            <div style={{ textAlign: 'center', marginBottom: 30 }}>
              <h1>TradePro</h1>
            </div>

            <Form onFinish={onFinish} initialValues={{ remember: true }}>
              <AntInput
                required
                name="username"
                label="Username"
                inputProps={{ prefix: <UserOutlined />, placeholder: 'Username', size: 'large' }}
              />

              <AntInput
                required
                name="password"
                label="Password"
                inputProps={{
                  size: 'large',
                  type: 'password',
                  placeholder: 'Password',
                  prefix: <LockOutlined />,
                }}
              />

              <Form.Item>
                <AntButton
                  size="large"
                  label="Log In"
                  htmlType="submit"
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

export default LoginPage;
