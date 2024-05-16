import './style.scss';
import { map } from 'lodash';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGetLocation, useGetMenu } from './queries';
import { AntSelectDynamic } from '@revisionary/components';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, Row, Switch } from 'antd';
import { storedUserDetail } from '@revisionary/utils/storageService';
import { RightOutlined, LeftOutlined, EnvironmentOutlined, GlobalOutlined } from '@ant-design/icons';

const { useForm } = Form;
function CompanyBranchesForm() {
  const navigate = useNavigate();
  const [form] = useForm<TAppUserFormDataforValidation>();
  const formValues = Form.useWatch<TAppUserFormDataforValidation>([], form);
  const [connectionType, setConnectionType] = useState<any[]>([]);
  const [connectionTypeId, setConnectionTypeId] = useState();
  const [clientLocation, setClientLocation] = useState<any[]>([]);
  const { data, isSuccess, isLoading: isnotLoadinglocations } = useGetLocation();
  const { mutate, data: menusData, isSuccess: successMenus, isLoading, isError } = useGetMenu();

  const userDetail = storedUserDetail();
  const onFinish = (values: TAppUserFormDataforValidation) => {
    values.LoginAppClientProductId = form.getFieldValue('LoginAppClientProductId');
    console.log(values);
    mutate(values);
    console.log(menusData);
    if (successMenus && !isLoading && !!userDetail) {
      navigate('/syllabus/management/');
    }
  };
  useEffect(() => {
    if (successMenus && !isLoading && !!userDetail) {
      navigate('/syllabus/management/');
    }
  }, [successMenus && !!userDetail]);
  useEffect(() => {
    if (isSuccess && !isnotLoadinglocations) {
      const connectionlist = data?.data?.apiData?.appClientConnections;
      const locationlist = data?.data?.apiData?.appClientProductLocations;
      const appClientConnectionId = data?.data?.apiData?.appClientConnections?.[0]?.appClientConnectionId;
      const appClientProductId = data?.data?.apiData?.appClientProductLocations?.[0]?.appClientProductId;
      setConnectionTypeId(appClientConnectionId);
      connectionlist?.map((item: any) => {
        item.connectionType, setConnectionType([item.connectionType]), console.log(connectionType);
      });
      locationlist?.map((item: any) => {
        item.appClientLocation, setClientLocation([item.appClientLocation]), console.log(clientLocation);
      });
      form.setFieldValue('LoginAppClientProductId', appClientProductId);
    }
  }, [form, formValues, isnotLoadinglocations]);

  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };
  const backtoLoginPage = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <Row className="login-container">
      <Row justify="center" style={{ width: '100%', padding: '0px 15px 0px 15px' }}>
        <Col xs={24} sm={24} md={16} lg={12} xl={8} xxl={8}>
          <Card
            className="login-card"
            cover={
              <div className="login_header">
                <h1 style={{ paddingTop: 15 }}>Welcome to Revisionary</h1>
                <p style={{ paddingBottom: 10, display: 'flex', justifyContent: 'center' }}>
                  <span style={{ fontSize: 20, marginRight: 10 }}>Please</span> <h2>Login</h2>
                </p>
              </div>
            }
          >
            <Form form={form} onFinish={onFinish} initialValues={{ remember: true }}>
              <Form.Item name="LoginId" rules={[{ required: true, message: 'Please input your Username!' }]}>
                <Input size="large" placeholder="Username" prefix={<UserOutlined />} />
              </Form.Item>

              <Form.Item name="LoginPassword" rules={[{ required: true, message: 'Please input your Password!' }]}>
                <Input.Password size="large" placeholder="Password" prefix={<LockOutlined />} />
              </Form.Item>
              <Form.Item name="LoginAppClientLocationId">
                <AntSelectDynamic
                  required
                  fieldLabel="locationName"
                  fieldValue="appClientLocationId"
                  label=""
                  name="LoginAppClientLocationId"
                  size="large"
                  bordered={false}
                  options={map(clientLocation, (item: any) => ({
                    value: item.appClientLocationId,
                    label: item.locationName,
                  }))}
                  style={{ border: '1px solid lightgray', borderRadius: 6, paddingLeft: 20 }}
                  placeholder={<h4 style={{ marginLeft: 20 }}>Select Location</h4>}
                />
                <div style={{ position: 'absolute', top: '30%', fontSize: 18, left: 8, transform: 'translateY(-50%)' }}>
                  <EnvironmentOutlined />
                </div>
              </Form.Item>
              <Form.Item name="LoginAppClientConnectionId" style={{ marginTop: -20 }}>
                <AntSelectDynamic
                  fieldLabel="connectionTypeName"
                  fieldValue="connectionTypeId"
                  label=""
                  name="LoginAppClientConnectionId"
                  size="large"
                  bordered={false}
                  options={map(connectionType, (item: any) => ({
                    value: connectionTypeId,
                    label: item.connectionTypeName,
                  }))}
                  style={{ border: '1px solid lightgray', borderRadius: 6, paddingLeft: 20 }}
                  placeholder={<h4 style={{ marginLeft: 20 }}>Select Connection Type </h4>}
                />
                <div style={{ position: 'absolute', top: '30%', fontSize: 18, left: 8, transform: 'translateY(-50%)' }}>
                  <GlobalOutlined />
                </div>
              </Form.Item>
              <Row justify={'space-between'} align="middle">
                <Switch defaultChecked style={{ marginTop: -20 }} onChange={onChange} />
                <Form.Item>
                  <Row gutter={[10, 10]}>
                    <Col span={12}>
                      <Button type="primary" htmlType="reset" style={{ width: '100%' }} onClick={backtoLoginPage}>
                        <LeftOutlined />
                        Previous
                      </Button>
                    </Col>
                    <Col span={12}>
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{ width: '100%' }}
                        loading={isError ? false : isLoading}
                      >
                        Login
                        <RightOutlined />
                      </Button>
                    </Col>
                  </Row>
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

export default CompanyBranchesForm;

export type TUser = { username: string; password: string };

export type TAppUserFormDataforValidation = {
  LoginId: string;
  LoginPassword: string;
  LoginAppClientConnectionId: number;
  LoginAppClientLocationId: number;
  LoginAppClientProductId: number;
};

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
