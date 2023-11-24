import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { GoogleOutlined, AppleOutlined, FacebookOutlined } from '@ant-design/icons';
import './style2.scss';
import { useTranslation } from 'react-i18next';

const Form1: React.FC = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    form.resetFields();
    message.success(<>{t('record_added_successfully 🥳')}</>);
  };

  return (
    <div className="form">
      <Form
        form={form}
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
      
        <Form.Item
          className="field"
          style={{ marginBottom: '5%' }}
          name="username"
          rules={[{ required: true, message: <>{t('please_input_your_login_id')}</> }]}
        >
          <Input size="large" prefix={<UserOutlined />} placeholder={t('login_id')} />
        </Form.Item>

        <Form.Item
          className="field"
          name="password"
          rules={[{ required: true, message: <>{t('please_input_your_password')}</> }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder={t('password')} size="large" />
        </Form.Item>

        <Form.Item>
          <Form.Item name="remember" noStyle>
            <Checkbox>{t('remember_me')}</Checkbox>
          </Form.Item>

          <a
            className="login-form-forgot"
            style={{
              color: '#1ebe928',
              fontWeight: 'bold',
              fontSize: '15px',
              fontFamily: 'helvetica',
            }}
            href=""
          >
            {t('forgot_password')}
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="submit"
            style={{
              color: 'white',
              background: '#1ebe92',
              border: 'none',
              fontSize: '17px',
              fontWeight: 'bold',
              textTransform: 'inherit',
              cursor: 'pointer',
              borderRadius: '30px',
              padding: '9px 36px',
              width: '51%',
              height: '20%',
              transition: 'all 0.3s ease-in-out',
            }}
          >
            {t('sign_in')}
          </Button>
        </Form.Item>
        <p style={{ marginTop: '10px', fontSize: '15px', fontWeight: 'bold' }}>
          {t('by_signing_up_you')}
          <span>
            <a href="" style={{ textDecoration: 'none', color: 'red' }}>
              &nbsp;&nbsp;{t('agree_to_the_terms_and_conditions')}
            </a>
          </span>
        </p>
        <h4 style={{ marginLeft: '24%', marginTop: '20px' }}>{t('or')}</h4>
        <div className="multiple">
          <Button
            className="hover1"
            style={{
              background: '#dc3545',
              color: 'white',
              // padding: "10px 15px",
              borderRadius: '10px',
              transition: 'all 0.3s ease-in-out',
              padding: '9px 36px',
              fontWeight: 'bold',
              width: '37%',
              height: '3.1rem',
            }}
          >
            <GoogleOutlined className="google" />
            &nbsp;{t('continue_with_google')}
          </Button>

          <Button
            className="hover2"
            style={{
              background: '#263f75',
              color: 'white',
              // padding: "5px",
              borderRadius: '10px',
              transition: 'all 0.3s ease-in-out',
              padding: '9px 36px',
              fontWeight: 'bold',
              marginLeft: '10px',
              width: '2px',
              height: '3.1rem',
              fontSize: '22px',
            }}
          >
            <FacebookOutlined style={{ fontSize: '1.7rem', marginLeft: '-0.7rem' }} />
          </Button>

          <Button
            className="hover3"
            style={{
              background: '#132133',
              color: 'white',
              // padding: "5px",
              borderRadius: '10px',
              transition: 'all 0.3s ease-in-out',
              padding: '9px 36px',
              fontWeight: 'bold',
              fontSize: '20px',
              marginLeft: '10px',
              height: '3.1rem',
              width: '2px',
            }}
          >
            <AppleOutlined
              style={{
                fontSize: '1.7rem',
                marginLeft: '-0.7rem',
                marginBottom: '2rem',
              }}
            />
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Form1;
