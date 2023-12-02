import React, { useState } from 'react';
import './style.scss';

import { Col, Form, Radio, Row, Space } from 'antd';
import dayjs from 'dayjs';

import {
  AntButton,
  AntDatePicker,
  AntInput,
  AntInputNumber,
  AntSelectDynamic,
  SearchCriteriaWrapper,
} from '@tradePro/components';
import { storedFinancialYear } from '@tradePro/utils/storageService';
import { TVoucherReportCriterias } from '../types';
import { useGetAccountTitle, useGetCustomGroup, useGetDocumentType, useGetVoucherReport } from './queries';

const financialYear = storedFinancialYear();
const { useForm, useWatch } = Form;

function searchCriteriaVoucherReport() {
  const [open, setOpen] = useState(false);
  const [form] = useForm<TVoucherReportCriterias>();
  const formValues = useWatch<TVoucherReportCriterias>([], form);

  const FromDate = dayjs(financialYear?.Start_Period);
  const ToDate = dayjs(financialYear?.End_Period);

  const {
    refetch,
    isFetching,
    isError: isVoucherReportError,
    isLoading: isVoucherReportLoading,
  } = useGetVoucherReport(false, form.getFieldsValue());

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onFinish = (_: TVoucherReportCriterias) => {
    refetch().then(() => handleClose());
  };
  const { data } = useGetCustomGroup();
  console.log('dataaa', data?.data?.Data?.Result);

  // const { data: daa1 } = useGetDocumentType();
  // console.log('customerData', daa1?.data?.Data?.Result);

  return (
    <SearchCriteriaWrapper open={open} handleOpen={handleOpen} handleClose={handleClose}>
      <Form form={form} onFinish={onFinish} layout="inline" initialValues={{ FromDate, ToDate }}>
        <Row gutter={[10, 10]}>
          <Col xs={12} sm={12} md={12} className="form_field">
            <AntDatePicker name="FromDate" label="From Date" bordered={false} />
          </Col>

          <Col xs={24} sm={12} md={11} className="form_field" offset={1}>
            <AntDatePicker name="ToDate" label="To Date" bordered={false} />
          </Col>

          <Col xs={12} sm={12} md={12} className="form_field">
            <AntInputNumber name="FromDocNo" label="From Doc#" bordered={false} />
          </Col>

          <Col xs={24} sm={12} md={11} className="form_field" offset={1}>
            <AntInputNumber name="ToDocNo" label="To Doc#" bordered={false} />
          </Col>

          <Col xs={24} sm={24} md={24} className="form_field">
            <AntSelectDynamic
              bordered={false}
              fieldValue="Id"
              label="Account Title"
              query={useGetAccountTitle}
              fieldLabel="AccountTitle"
              name="AccountId"
            />
          </Col>

          <Col xs={24} sm={24} md={24} className="form_field">
            <AntSelectDynamic
              bordered={false}
              fieldValue="Id"
              fieldLabel="AcLookUpsDescription"
              label="Custom Group"
              query={useGetCustomGroup}
              name="CustomerGroupId"
            />
          </Col>
          <Col xs={24} sm={24} md={24} className="form_field">
            <AntSelectDynamic
              bordered={false}
              mode="multiple"
              fieldValue="Id"
              label="Document Type"
              query={useGetDocumentType}
              fieldLabel="DocumentTypeDescription"
              name="SelectedDocuments"
            />
          </Col>
          <Col xs={12} sm={12} md={12} className="form_field">
            <AntInput name="ManualBillNo" label="Manual Number" bordered={false}></AntInput>
          </Col>
          <Col xs={12} sm={12} md={12} offset={1}></Col>

          {/* <Col xs={24} sm={24} md={12}>
            <Radio name="ManualBillNo"></Radio>
          </Col> */}
          <Col xs={24} sm={12} md={12}>
            <Form.Item name="ReportType" label="Report Type">
              <Radio.Group defaultValue={'3'}>
                <Space direction="vertical">
                  <Radio value="1">Approved</Radio>
                  <Radio value="2">UnApproved</Radio>
                  <Radio value="3">All</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={6}>
            <AntButton
              label="Show"
              htmlType="submit"
              style={{ marginTop: 2 }}
              isError={isVoucherReportError}
              isLoading={isVoucherReportLoading || isFetching}
            />
          </Col>
        </Row>
      </Form>
    </SearchCriteriaWrapper>
  );
}

export default searchCriteriaVoucherReport;
