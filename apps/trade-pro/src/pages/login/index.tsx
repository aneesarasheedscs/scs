import './style.scss';
import { size } from 'lodash';
import { TUser } from './types';
import { useLogin } from './queries';
import { useEffect, useState } from 'react';
import { Card, Col, Form, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import { route } from '@tradePro/routes/constant';
import CompanyBranchDetails from './CompanyBranchDetails';
import { AntButton, AntInput } from '@tradePro/components';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { isTokenExpired } from '@tradePro/utils/isTokenExpired';

function LoginPage() {
  const navigate = useNavigate();
  const [isCompanyBranchVisible, setCompanyBranchVisible] = useState(false);

  const { mutate, isError, isLoading, isSuccess } = useLogin();

  const onFinish = (values: TUser) => mutate(values);

  useEffect(() => {
    const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
    const financialYearDetail: any = JSON.parse(localStorage.getItem('financialYear') || '{}');

    if (userDetail?.access_token && !isTokenExpired()) {
      if (size(financialYearDetail) < 1) {
        setCompanyBranchVisible(true);
      } else {
        navigate(route.PURCHASE_ORDER);
      }
    }
  }, [isSuccess]);

  return (
    <Row justify="center" align="middle" className="login-container">
      <Row justify="center" style={{ width: '100%', padding: '0px 15px 0px 15px' }}>
        <Col xs={24} sm={24} md={16} lg={12} xl={8} xxl={8}>
          <Card className="login-card">
            <div style={{ textAlign: 'center', marginBottom: 30 }}>
              <h1>TradePro</h1>
            </div>

            {isCompanyBranchVisible ? (
              <CompanyBranchDetails />
            ) : (
              <Form layout="vertical" onFinish={onFinish} initialValues={{ remember: true }}>
                <AntInput
                  required
                  size="large"
                  name="username"
                  label="Username"
                  prefix={<UserOutlined />}
                  placeholder="Enter username"
                />

                <AntInput
                  required
                  size="large"
                  name="password"
                  type="password"
                  label="Password"
                  prefix={<LockOutlined />}
                  placeholder="Enter password"
                />

                <Form.Item>
                  <AntButton
                    size="large"
                    label="Log In"
                    htmlType="submit"
                    isError={isError}
                    isLoading={isLoading}
                  />
                </Form.Item>
              </Form>
            )}
          </Card>
        </Col>
      </Row>
    </Row>
  );
}

export default LoginPage;
