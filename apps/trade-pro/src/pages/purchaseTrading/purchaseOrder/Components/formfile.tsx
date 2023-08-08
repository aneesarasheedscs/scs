import './style.scss';
import Formfile2 from './formfile2';
import React, { useState } from 'react';
import { useGetDeliveryTerm, useGetPaymentTerm, useGetSupplierCombo } from './queries';
import { AntButton, AntInput, AntSelectDynamic, SearchCriteriaWrapper } from '@tradePro/components';
import { Checkbox, Col, DatePicker, DatePickerProps, Form, Input, Row, Select } from 'antd';
import { TPurchaseOrderSearchCriteria } from '../type';

const { useForm, useWatch } = Form;
const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

const onChange: DatePickerProps['onChange'] = (date, dateString) => {
  console.log(date, dateString);
};

function Formfile() {
  const [form] = useForm<TPurchaseOrderSearchCriteria>();
  const { data, isSuccess, isError, isLoading } = useGetPaymentTerm();
  const {
    data: payment,
    isSuccess: isSuccessPayment,
    isError: isPaymentError,
    isLoading: isPaymentLoading,
  } = useGetDeliveryTerm();

  const {
    data: supplier,
    isSuccess: suppSuccess,
    isError: suppError,
    isLoading: suppLoading,
  } = useGetSupplierCombo();
  const formValues = useWatch<TPurchaseOrderSearchCriteria>([], form);
  return (
    <>
      <div>
        <div className="main">
          <h4 className="form-label"></h4>
          <Form
            form={form}
            labelCol={{ span: 0 }}
            wrapperCol={{ span: 12 }}
            style={{ maxWidth: 400 }}
            initialValues={formValues}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Row className="form-row">
              <Col sm={{ span: 16 }} md={{ span: 10 }} lg={{ span: 8 }} className="form-col">
                <Form.Item
                  className=""
                  label="Doc Date & No"
                  name="date"
                  rules={[{ required: true, message: 'Please Select Date!' }]}
                >
                  <Row className="row2">
                    <Col sm={{ span: 12 }} lg={{ span: 18 }} md={{ span: 14 }}>
                      <DatePicker
                        className="rr3"
                        style={{ padding: 5, width: '100%', border: '' }}
                        placeholder="Select Date"
                        onChange={onChange}
                      />
                    </Col>
                    <Col sm={{ span: 4 }} lg={{ span: 6 }} md={{ span: 4 }}>
                      <Input type="number" style={{ marginLeft: 7, padding: 5 }} />
                    </Col>
                  </Row>
                </Form.Item>
              </Col>
              <Col
                sm={{ span: 16 }}
                md={{ span: 10, offset: 1 }}
                lg={{ span: 7, offset: 1 }}
                className="form-col"
              >
                <Form.Item
                  className=""
                  label="Payment Terms"
                  name="text1"
                  rules={[{ required: true, message: 'Please Select Term' }]}
                >
                  <AntSelectDynamic
                    fieldValue="Id"
                    isError={isPaymentError}
                    isLoading={isPaymentLoading}
                    fieldLabel="TermsDescription"
                    name="TermsDescriptionId"
                    className="rr33"
                    style={{ width: '100%', marginLeft: 20 }}
                    data={payment?.data?.Data?.Result}
                  />
                </Form.Item>
              </Col>
              <Col
                sm={{ span: 16 }}
                md={{ span: 10 }}
                lg={{ span: 7, offset: 1 }}
                className="form-col"
              >
                <Form.Item
                  className=""
                  label="Delivery Terms"
                  name="text2"
                  rules={[{ required: true, message: 'Please Select Term' }]}
                >
                  <AntSelectDynamic
                    fieldValue="Id"
                    isError={isError}
                    isLoading={isLoading}
                    fieldLabel="DeliveryTerm"
                    name="DeliveryTermId"
                    className="rr34"
                    style={{ width: '100%', marginLeft: 35 }}
                    data={data?.data?.Data?.Result}
                  />
                </Form.Item>
              </Col>
              <Col
                sm={{ span: 16 }}
                md={{ span: 10, offset: 1 }}
                lg={{ span: 8, offset: 0 }}
                className="form-col"
              >
                <Form.Item
                  className=""
                  label="Supplier Name"
                  name="supplier"
                  rules={[{ required: true, message: 'Please Select Supplier' }]}
                >
                  <AntSelectDynamic
                    fieldValue="Id"
                    isError={suppError}
                    isLoading={suppLoading}
                    label=""
                    fieldLabel="CompanyName"
                    name="CompanyNameId"
                    className="rr34"
                    style={{ width: '140%', marginLeft: 5 }}
                    data={supplier?.data?.Data?.Result}
                  />
                </Form.Item>
              </Col>
              <Col
                sm={{ span: 16 }}
                md={{ span: 10, offset: 0 }}
                lg={{ span: 7, offset: 1 }}
                className="form-col"
              >
                <Form.Item
                  className=""
                  label="Due Days"
                  name="number"
                  rules={[{ required: true, message: 'Please Enter Number' }]}
                >
                  <AntInput
                    name="dayss"
                    label=""
                    inputProps={{ type: 'number' }}
                    className="rr"
                    style={{ marginLeft: 50, padding: 5, border: '', width: '100%' }}
                  />
                </Form.Item>
              </Col>
              <Col
                sm={{ span: 16 }}
                md={{ span: 10, offset: 1 }}
                lg={{ span: 7, offset: 1 }}
                className="form-col"
              >
                <Form.Item className="RR" label="Delivery Start Date" name="start date">
                  <DatePicker
                    className="date"
                    style={{ padding: 5, width: '100%', marginLeft: 10 }}
                    placeholder="Select Date"
                    onChange={onChange}
                  />
                </Form.Item>
              </Col>
              <Col
                sm={{ span: 16 }}
                md={{ span: 10, offset: 0 }}
                lg={{ span: 8, offset: 0 }}
                className="form-col"
              >
                <Form.Item className="RR" label=" Remarks" name="text">
                  <AntInput
                    name="text"
                    label=""
                    className="rr"
                    inputProps={{ type: 'text' }}
                    style={{ marginLeft: 45, padding: 10, width: '144%' }}
                  />
                </Form.Item>
              </Col>
              <Col
                sm={{ span: 16 }}
                md={{ span: 10, offset: 1 }}
                lg={{ span: 7, offset: 1 }}
                className="form-col"
              >
                <Form.Item className="RR" label="Due Date" name="end date">
                  <DatePicker
                    className="rr5"
                    style={{ padding: 5, width: '101%', marginLeft: 53 }}
                    placeholder="Select Date"
                    onChange={onChange}
                  />
                </Form.Item>
              </Col>
              <Col
                sm={{ span: 16 }}
                md={{ span: 10, offset: 0 }}
                lg={{ span: 7, offset: 1 }}
                className="form-col"
              >
                <Form.Item className="RR" label="Delivery Days" name="days">
                  <AntInput
                    name="deliverydays"
                    label=""
                    className="rr4"
                    inputProps={{ type: 'number' }}
                    style={{ marginLeft: 40, padding: 5 }}
                  />
                </Form.Item>
              </Col>
              <Col
                sm={{ span: 16 }}
                md={{ span: 10, offset: 1 }}
                lg={{ span: 7, offset: 9 }}
                className="form-col"
              >
                <Form.Item className="RR" label="Supplier Ref No" name="Ref No">
                  <AntInput
                    name="SupplierRef"
                    label=""
                    className="rr2"
                    inputProps={{ type: 'number' }}
                    style={{ marginLeft: 15, padding: 5, width: '100%' }}
                  />
                </Form.Item>
              </Col>
              <Col
                sm={{ span: 16 }}
                md={{ span: 10, offset: 0 }}
                lg={{ span: 7, offset: 1 }}
                className="form-col"
              >
                <Form.Item className="RR" label="Preview" name="checkbox">
                  <Checkbox style={{ padding: 5 }} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <Formfile2 />
        </div>
      </div>
    </>
  );
}
export default Formfile;
