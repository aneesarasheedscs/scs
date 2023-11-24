// import './style.scss';
// import useLogin from './queries';
// import { useEffect } from 'react';
// import { TUserLogin } from './types';
// import { LoginPage } from '@scs/pages';
// import { useNavigate } from 'react-router-dom';
// import { route } from '@revisionary/routes/constant';

// function Login() {
//   const navigate = useNavigate();
//   const { mutate, isError, isLoading, isSuccess } = useLogin();

//   const accessToken = localStorage.getItem('auth');
//   const handleLogin = (values: TUserLogin) => mutate(values);

//   useEffect(() => {
//     if (isSuccess || accessToken) navigate(route.SYLLABUS_MANAGEMENT);
//   }, [isSuccess, accessToken]);

//   return (
//     <LoginPage
//       handleLogin={handleLogin}
//       logo={<h1>Revisionary</h1>}
//       isLoading={isError ? false : isLoading}
//     />
//   );
// }

// export default Login;
import './style.scss';
import { useEffect } from 'react';
// import { TUser } from "@/types/user";
// import useLogin from "@/hooks/apis/useLogin";
import { useNavigate } from 'react-router-dom';
import { Button, Card, Col, Form, Input, Row } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import useLogin from './queries';

function LoginPage() {
  const navigate = useNavigate();
  const { mutate, isError, isLoading, isSuccess } = useLogin();

  const ACCESS_TOKEN = localStorage.getItem('auth');

  const onFinish = (values: TUser) => mutate(values);

  useEffect(() => {
    if (isSuccess || ACCESS_TOKEN) navigate('/syllabus-management');
  }, [isSuccess, ACCESS_TOKEN]);

  return (
    <Row justify="center" align="middle" className="login-container">
      <Row justify="center" style={{ width: '100%', padding: '0px 15px 0px 15px' }}>
        <Col xs={24} sm={24} md={16} lg={12} xl={8} xxl={8}>
          <Card className="login-card">
            <div style={{ textAlign: 'center', marginBottom: 30 }}>
              <h1>Revisionary</h1>
            </div>

            <Form onFinish={onFinish} initialValues={{ remember: true }}>
              <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!' }]}>
                <Input size="large" placeholder="Username" prefix={<UserOutlined />} />
              </Form.Item>

              <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
                <Input.Password size="large" placeholder="Password" prefix={<LockOutlined />} />
              </Form.Item>

              <Form.Item>
                <Button
                  size="large"
                  type="primary"
                  htmlType="submit"
                  style={{ width: '100%' }}
                  loading={isError ? false : isLoading}
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </Row>
  );
}

export default LoginPage;

export type TUser = { username: string; password: string };

export type TAppUserFormData = { LoginId: string; LoginPassword: string };

export type TAppUserData = {
  loginId: string;
  campusId: number;
  appUserId: number;
  rowVersion: number;
  instituteId: number;
  appUserName: string;
  appUserLogId: number;
  createdUserId: number;
  loginPassword: string;
  organizationId: number;
  lastModifiedUserId: number;
};
