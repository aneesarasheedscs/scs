import React, { useEffect, useState } from 'react';
import { SelectValue } from 'antd/lib/select';
import { columnss } from './columns';
import {
  useParent,
  uselevel,
  usecompany,
  useAccount_group,
  useAccount_type,
  usePl,
  useBs,
  Parent_Account_Leave,
} from './queries/Parent';

import { AntButton, AntInput, AntSelectDynamic, AntTable } from '@tradePro/components';
import { Input, Form, Row, Space, theme } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import './index.scss';
import type { SizeType } from 'antd/es/config-provider/SizeContext';

const { useToken } = theme;

function Chart_form() {
  const {
    data: parent,
    isError: parentError,
    refetch: parentRefetch,
    isSuccess: parentSucess,
    isLoading: parentLoading,
  } = useParent();
  const {
    data: levle,
    isError: leveltError,
    refetch: leveltRefetch,
    isSuccess: levelSucess,
    isLoading: levelLoading,
  } = uselevel();
  console.log()
  const {
    data: plnote,
    isError: plnoteError,
    refetch: plnoteRefetch,
    isSuccess: plnoteSucess,
    isLoading: plnoteLoading,
  } = usePl();
  const {
    data: accountType,
    isError: accountTypeError,
    refetch: accountTypeRefetch,
    isSuccess: accountTypeSucess,
    isLoading: accountTypeLoading,
  } = useAccount_type();
  const {
    data: Bsnotes,
    isError: BsnotesError,
    refetch: BsnotesRefetch,
    isSuccess: BsnotesSucess,
    isLoading: BsnotesLoading,
  } = useBs();
  const {
    data: accountQroup,
    isError: accountQroupError,
    refetch: accountQroupRefetch,
    isSuccess: accountQroupSucess,
    isLoading: accountQroupLoading,
  } = useAccount_group();
  const {
    data: company,
    isError: companyError,
    refetch: companyRefetch,
    isSuccess: companySucess,
    isLoading: companyLoading,
  } = usecompany();

  const {
    data: leave,
    isError: leaveError,
    isLoading: leaveLoading,
    isSuccess: leaveSuccess,
  } = Parent_Account_Leave();

  const [showSearch, setShowSearch] = useState(false);

  const handleButtonClick = () => {
    setShowSearch(!showSearch);
  };

  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };
  const [size, setSize] = useState<SizeType>('large');

  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <div>
      <div className="FirstHeading">
        <h2>CHART OF ACCOUNT</h2>
        <AntButton className="savebtn" icon={<SyncOutlined />} />
      </div>
      <Row gutter={[16, 16]} style={{ marginTop: '2%' }}>
        <Form
          className="chartAccount"
          form={form}
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
          scrollToFirstError
        >
          <Form.Item
            name="Parent Account"
            rules={[{ required: true, message: 'Parent Account!' }]}
            className="d"
          >
            <div className="input-container" style={{ backgroundColor: 'white' }}>
              <AntSelectDynamic
                size={size}
                style={{ height: '5vh', width: '100%' }}
                placeholder="Parent Account"
                className="InputField"
                fieldValue="AccountCode"
                fieldLabel="AccountTitle"
                isError={parentError}
                isLoading={parentLoading}
                data={parent?.data?.Data?.Result}
              />
            </div>
          </Form.Item>
          <Row>
            <Form.Item
              name="Account Class"
              rules={[{ required: true, message: 'Account Class' }]}
              style={{ width: '49%' }}
            >
              <div className="input-container">
                <Input
                  style={{ height: '5vh', width: '100%' }}
                  placeholder="Account Class"
                  className="InputField"
                />
              </div>
            </Form.Item>
            <Form.Item
              name="Account Code"
              rules={[{ required: true, message: 'Account Code' }]}
              style={{ width: '49%', marginLeft: '2%' }}
            >
              <div className="input-container">
                <Input
                  style={{ height: '5vh', width: '100%' }}
                  placeholder="Account Code"
                  className="InputField"
                />
              </div>
            </Form.Item>
            <Space.Compact style={{ width: '100%' }}>
              <Form.Item
                name="Title"
                rules={[{ required: true, message: 'Account Title' }]}
                style={{ width: '80%' }}
              >
                <div className="input-container">
                  <Input
                    style={{ height: '5vh', width: '100%' }}
                    placeholder="Account Title"
                    className="InputField"
                  />
                </div>
              </Form.Item>

              <Form.Item
                name="Level"
                rules={[{ required: true, message: 'Level' }]}
                style={{ width: '20%' }}
              >
                <div className="input-container">
                  <Input
                    style={{ height: '5vh', width: '100%' }}
                    placeholder="Level"
                    className="InputField"
                  />
                </div>
              </Form.Item>
            </Space.Compact>

            <Form.Item
              name="Account Group"
              rules={[{ required: true, message: 'Account Group' }]}
              style={{ width: '49%' }}
              className="d"
            >
              <div className="input-container">
                <AntSelectDynamic
                  size={size}
                  style={{ height: '5vh', width: '100%' }}
                  placeholder="Account Group"
                  className="InputField"
                  fieldValue="Id"
                  fieldLabel="Name"
                  isError={accountQroupError}
                  isLoading={accountQroupLoading}
                  data={accountQroup?.data?.Data?.Result}
                />
              </div>
            </Form.Item>

            <Form.Item
              name="Other Code'"
              rules={[{ required: true, message: ' Other Code' }]}
              style={{ width: '49%', marginLeft: '2%' }}
            >
              <div className="input-container">
                <Input
                  style={{ height: '5vh', width: '100%' }}
                  placeholder="  Other Code"
                  className="InputField"
                />
              </div>
            </Form.Item>
          </Row>
          <Form.Item
            name="Account Type"
            rules={[{ required: true, message: 'Account Type' }]}
            className="d"
          >
            <div className="input-container">
              <AntSelectDynamic
                size={size}
                style={{ height: '5vh', width: '100%' }}
                placeholder="Account Type"
                className="InputField"
                fieldValue="Id"
                fieldLabel="AccountType"
                isError={accountTypeError}
                isLoading={accountTypeLoading}
                data={accountType?.data?.Data?.Result}
              />
            </div>
          </Form.Item>
          <Row>
            <Form.Item
              name="PL Notes"
              rules={[{ required: true, message: 'PL Notes' }]}
              style={{ width: '49%' }}
              className="d"
            >
              <div className="input-container">
                <AntSelectDynamic
                  size={size}
                  style={{ height: '5vh', width: '100%' }}
                  placeholder="PL Notes"
                  className="InputField"
                  fieldValue="Id"
                  fieldLabel="NoteTitle"
                  isError={plnoteError}
                  isLoading={plnoteLoading}
                  data={plnote?.data?.Data?.Result}
                />
              </div>
            </Form.Item>

            <Form.Item
              name="BS Notes"
              rules={[{ required: true, message: 'BS Notes' }]}
              style={{ width: '49%', marginLeft: '2%' }}
              className="d"
            >
              <AntSelectDynamic
                size={size}
                style={{ height: '5vh', width: '100%' }}
                placeholder="BS Notes"
                className="InputField"
                fieldValue="Id"
                fieldLabel="NoteTitle"
                isError={BsnotesError}
                isLoading={BsnotesLoading}
                data={Bsnotes?.data?.Data?.Result}
              />
            </Form.Item>
          </Row>
          <Form.Item
            name="Opening Balance"
            rules={[{ required: true, message: 'Opening Balance' }]}
          >
            <Input
              style={{ height: '5vh', width: '100%' }}
              placeholder="Opening Balance"
              className="InputField"
              name="Opening Balance"
            />
          </Form.Item>
          <Row>
            <Form.Item
              name="City Name"
              rules={[{ required: true, message: 'City Name' }]}
              style={{ width: '49%' }}
            >
              <Input
                style={{ height: '5vh', width: '100%' }}
                placeholder="City Name"
                className="InputField"
              />
            </Form.Item>
            <Form.Item
              name="Phone Number"
              rules={[{ required: true, message: 'Phone Number' }]}
              style={{ width: '49%', marginLeft: '2%' }}
            >
              <Input
                style={{ height: '5vh', width: '100%' }}
                placeholder="Phone Number"
                className="InputField"
              />
            </Form.Item>
          </Row>

          <Form.Item
            name="Select Companies"
            rules={[{ required: true, message: 'Select Companies' }]}
            className="d"
          >
            <AntSelectDynamic
              size={size}
              style={{ height: '5vh', width: '100%' }}
              placeholder="Select Companies"
              className="InputField"
              fieldValue="Id"
              fieldLabel="CompName"
              isError={companyError}
              isLoading={companyLoading}
              data={company?.data?.Data?.Result}
            />
          </Form.Item>
          <Form.Item>
            <AntButton className="savebtn" htmlType="submit" block label="Show" />
          </Form.Item>
        </Form>

        <div className="tablesetting">
          <div className="Table1">
            <h4
              style={{
                textAlign: 'center',
                fontWeight: '500',
                color: 'white',
                boxShadow: ' 0px 8px 32px 0 rgb(0, 0, 255, 0.33)',
                padding: '10px',
              }}
            >
              Child Accounts
            </h4>

            <AntTable
              size="small"
              columns={columnss()}
              numberOfSkeletons={8}
              // scroll={{ x: 'calc(700px + 50%)', y: 240 }}
              // scroll={{ x: '', y: convertVhToPixels('62vh') }}
              className="childAccount"
            />
          </div>

          <div className="Table1">
            <h4
              style={{
                textAlign: 'center',
                fontWeight: '500',
                color: 'white',
                boxShadow: ' 0px 8px 32px 0 rgb(0, 0, 255, 0.33)',
                padding: '10px',
              }}
            >
              Accounts(1st Level)
            </h4>

            <AntTable
              size="small"
              columns={columnss()}
              numberOfSkeletons={8}
              // scroll={{ x: 'calc(700px + 50%)', y: 240 }}
              // scroll={{ x: '', y: convertVhToPixels('62vh') }}
              className="childAccount"
            />
          </div>
          <div className="Table1">
            <h4
              style={{
                textAlign: 'center',
                fontWeight: '500',
                color: 'white',
                boxShadow: ' 0px 8px 32px 0 rgb(0, 0, 255, 0.33)',
                padding: '10px',
              }}
            >
              Accounts(2nd thLevel)
            </h4>

            <AntTable
              size="small"
              columns={columnss()}
              numberOfSkeletons={4}
              // scroll={{ x: 100, y: 100 }}
              // scroll={{ x: 'calc(700px + 50%)', y: 240 }}
              // scroll={{ x: '', y: convertVhToPixels('62vh') }}
              className="childAccount"
            />
          </div>
          <div className="Table1">
            <h4
              style={{
                textAlign: 'center',
                fontWeight: '500',
                color: 'white',
                boxShadow: ' 0px 8px 32px 0 rgb(0, 0, 255, 0.33)',
                padding: '10px',
              }}
            >
              Accounts(3rd Level)
            </h4>

            <AntTable
              size="small"
              columns={columnss()}
              numberOfSkeletons={8}
              // scroll={{ x: 'calc(700px + 50%)', y: 240 }}
              // scroll={{ x: '', y: convertVhToPixels('62vh') }}
              className="childAccount"
            />
          </div>
          <div className="Table1">
            <h4
              style={{
                textAlign: 'center',
                fontWeight: '500',
                color: 'white',
                boxShadow: ' 0px 8px 32px 0 rgb(0, 0, 255, 0.33)',
                padding: '10px',
              }}
            >
              Accounts(4thLevel)
            </h4>
            <AntTable
              size="small"
              columns={columnss()}
              numberOfSkeletons={8}
              scroll={{ x: 'calc(700px + 50%)', y: 100 }}
              // scroll={{ x: '', y: convertVhToPixels('62vh') }}
              className="childAccount"
            />
          </div>
        </div>
      </Row>
    </div>
  );
}

export default Chart_form;
