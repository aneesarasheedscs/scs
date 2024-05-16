import './style.scss';
import useLogin from './queries';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { UserOutlined } from '@ant-design/icons';
import { RightOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { userAtom, locationAndConnectionAtom } from './atom';
import { Button, Card, Col, Form, Input, Row, Switch } from 'antd';

const { useForm } = Form;
function LoginForm() {
  const navigate = useNavigate();
  const [form] = useForm<TUser>();
  const formValues = Form.useWatch<TUser>([], form);
  const [user, setUser] = useAtom(userAtom);
  const [locationAndConnection, setLocationAndConnection] = useAtom(locationAndConnectionAtom);
  const { mutate, data, isError, isLoading, isSuccess } = useLogin(user);
  const { t } = useTranslation();
  const ACCESS_TOKEN = localStorage.getItem('auth');
  console.log(user);

  const onFinish = (values: TUser) => {
    const username = form.getFieldValue('UserName');
    setUser(username);
    console.log(username);

    localStorage.setItem('username', username);
    mutate(values);
  };
  useEffect(() => {
    const username = form.getFieldValue('UserName');
    setUser(username);
    console.log(username);

    localStorage.setItem('username', username);
  }, [formValues]);
  useEffect(() => {
    if (isSuccess || ACCESS_TOKEN) {
      setLocationAndConnection(data);
      navigate('/company_branches_detail');
    }
  }, [isSuccess, ACCESS_TOKEN]);
  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };

  return (
    <Row className="login-container">
      <Row justify="center" style={{ width: '100%', padding: '0px 15px 0px 15px' }}>
        <Col xs={24} sm={24} md={16} lg={12} xl={8} xxl={8}>
          <Card
            className="login-card"
            cover={
              <div className="login_header">
                <h1 style={{ paddingTop: 15 }}> {t('welcome_to_revisionary')} </h1>
                <p style={{ paddingBottom: 10, display: 'flex', justifyContent: 'center' }}>
                  <span style={{ fontSize: 20, marginRight: 10 }}>{t('please')} </span> <h2>Login</h2>
                </p>
              </div>
            }
          >
            <Form form={form} onFinish={onFinish}>
              <Form.Item name="UserName" rules={[{ required: true, message: 'Please input your Username!' }]}>
                <Input size="large" placeholder="UserName" prefix={<UserOutlined />} />
              </Form.Item>

              <Row justify={'space-between'} align="middle">
                <Switch defaultChecked style={{ marginTop: -10 }} onChange={onChange} />
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isError ? false : isLoading}
                    style={{ width: '100%' }}
                  >
                    Next
                    <RightOutlined />
                  </Button>
                </Form.Item>
              </Row>
            </Form>
            <Row justify={'center'}>
              <Link to={''}> Forgot Username?</Link>
            </Row>
          </Card>
        </Col>
      </Row>
    </Row>
  );
}

export default LoginForm;

export type TUser = { UserName: string };

export type TAppUserFormData = { LoginId: string };

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
