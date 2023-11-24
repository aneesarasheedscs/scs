import React, { useState } from 'react';
import { useGetAccountTitle, useGetCustomGroup, useGetDocumentType } from '../queries';
import { Col, Form, Row } from 'antd';
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
import { useGetVoucherReport } from '../queries';
import { TVoucherReportCriterias } from '../types';
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

  return (
    <SearchCriteriaWrapper open={open} handleOpen={handleOpen} handleClose={handleClose}>
      <Form form={form} onFinish={onFinish} layout="vertical" initialValues={{ FromDate, ToDate }}>
        <Row gutter={[10, 10]}>
          <Col xs={24} sm={24} md={12}>
            <AntDatePicker name="FromDate" label="From Date" />
          </Col>

          <Col xs={24} sm={24} md={12}>
            <AntDatePicker name="ToDate" label="To Date" />
          </Col>

          <Col xs={24} sm={24} md={12}>
            <AntInputNumber name="FromDocNo" label="From Doc#" />
          </Col>

          <Col xs={24} sm={24} md={12}>
            <AntInputNumber name="ToDocNo" label="To Doc#" />
          </Col>

          <Col xs={24} sm={24} md={12}>
            <AntSelectDynamic
              fieldValue="Id"
              label="Account Title"
              query={useGetAccountTitle}
              fieldLabel="AccountTitle"
              name="AccountId"
            />
          </Col>

          <Col xs={24} sm={24} md={12}>
            <AntSelectDynamic
              fieldValue="Id"
              fieldLabel="AcLookUpsDescription"
              label="Custom Group"
              query={useGetCustomGroup}
              name="CustomerGroupId"
            />
          </Col>
          <Col xs={24} sm={24} md={12}>
            <AntSelectDynamic
              fieldValue="Id"
              label="Document Type"
              query={useGetDocumentType}
              fieldLabel="DocumentTypeDescription"
              name="SaleInvoiceDocumentTypeIds"
            />
          </Col>
          <Col xs={24} sm={24} md={12}>
            <AntInput name="ManualBillNo" label="Manual Number"></AntInput>
          </Col>

          {/* <Col xs={24} sm={24} md={12}>
            <Radio name="ManualBillNo"></Radio>
          </Col> */}
          <Col xs={24} sm={24} md={8}>
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
