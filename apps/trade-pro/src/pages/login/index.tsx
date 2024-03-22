import './style.scss';
import { Col, Form, Row } from 'antd';
import { size } from 'lodash';
import { TUser } from './types';
import { useEffect, useState } from 'react';
import { useLogin } from './queries';
import CardWrapper from './CardWrapper';
import { useNavigate } from 'react-router-dom';
import { route } from '@tradePro/routes/constant';
import { AntButton, AntInput } from '@tradePro/components';
import { isTokenExpired } from '@tradePro/utils/isTokenExpired';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { LockOutlined, UserOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

function LoginPage() {
  const navigate = useNavigate();
  const { mutate, isError, isLoading, isSuccess } = useLogin();
  const [type, setType] = useState(false);
  const onFinish = (values: TUser) => mutate(values);
  useEffect(() => {
    const userDetail = storedUserDetail();

    const financialYearDetail = storedFinancialYear();
    if (userDetail?.access_token && !isTokenExpired()) {
      if (size(financialYearDetail) < 1) {
        window.location.href = window.location.origin + route.COMPANY_BRANCH_DETAIL;
      } else {
        navigate(route.APP_MENU);
      }
    }
  }, [isSuccess]);
  const showPassword = () => {
    setType(true);
  };
  const hidePassword = () => {
    setType(false);
  };
  return (
    <CardWrapper>
      <Form layout="vertical" onFinish={onFinish} initialValues={{ remember: true }}>
        <AntInput
          required
          size="middle"
          name="username"
          label="Username"
          prefix={<UserOutlined />}
          placeholder="Enter username"
        />
        <AntInput
          required
          size="middle"
          name="password"
          type={type ? 'string' : 'password'}
          label="Password"
          prefix={<LockOutlined />}
          suffix={type ? <EyeInvisibleOutlined onClick={hidePassword} /> : <EyeOutlined onClick={showPassword} />}
          placeholder="Enter password"
        />
        <Form.Item>
          <Row justify={'center'}>
            <Col span={4}>
              <AntButton
                className="btnColor"
                label="Log In"
                size="large"
                htmlType="submit"
                isError={isError}
                isLoading={isLoading}
              />
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </CardWrapper>
  );
}
export default LoginPage;
